<script>
import { subscriptionMethods, transactionMethods } from "@/store/helperActions";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  data: () => ({
    data: {},
    container: [],
    helper: {
      isCopied: false,
      subTotal: 0,
      serviceTax: 0,
      serviceFee: 0,
      total: 0,
      CORPORATE: {},
      isLoading: false,
    },
  }),
  async mounted() {
    this.helper.CORPORATE = JSON.parse(this.$utility.getCookie("corporate"));
    await this.processGetCorporate();
    this.processGetInvoice();
  },
  methods: {
    getCorporateDetail: subscriptionMethods.getCorporateDetail,
    getCorporateTransactionDetail:
      transactionMethods.getCorporateTransactionDetail,
    setPayloadGet() {
      return {
        id: this.$route.query.id,
      };
    },
    async processGetInvoice() {
      try {
        this.helper.isLoading = true;
        const payload = this.setPayloadGet();
        this.data = await this.getCorporateTransactionDetail(payload);
        this.processDataContainer(this.data.item_transactions);
        this.helper.isLoading = false;
      } catch (error) {
        this.helper.isLoading = false;
        this.helper.isError = true;
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetInvoice in transaction/detail`
        );
      }
    },

    copyToClipboard(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      document.execCommand("copy");
      document.body.removeChild(textarea);
      this.helper.isCopied = true;
      setTimeout(() => {
        this.helper.isCopied = false;
      }, 5000);
    },

    toggleDetailService(index) {
      this.container[`${index}`].isOpen = !this.container[`${index}`].isOpen;
    },

    processDataContainer(transactionItems) {
      transactionItems.map((opt) => {
        if (
          this.container
            .map((finder) => finder.container_code)
            .indexOf(opt.transaction_data.container_code) > -1
        ) {
          const idx = this.container
            .map((finder) => finder.container_code)
            .indexOf(opt.transaction_data.container_code);
          this.container[`${idx}`].data.push(opt);
          this.container[`${idx}`].total += parseInt(opt.price);
        } else {
          this.container.push({
            container_code: opt.transaction_data.container_code,
            data: [opt],
            total: parseInt(opt.price),
            isOpen: false,
          });
        }
      });
      this.helper.subTotal = parseInt(
        this.container.reduce((total, item) => total + item.total, 0)
      );
      this.helper.serviceTax = parseInt(
        this.helper.subTotal * (parseInt(this.helper.CORPORATE.tax) / 100)
      );
      this.helper.serviceFee = this.container.length * 100000;
      this.helper.total =
        parseInt(this.helper.CORPORATE.admin_charge) +
        parseInt(this.helper.subTotal) +
        parseInt(this.helper.serviceTax) +
        parseInt(this.helper.serviceFee);
    },

    async processGetCorporate() {
      this.helper.isLoading = true;
      this.helper.isError = false;
      try {
        const payload = {
          id: this.helper.CORPORATE.id,
        };
        const data = await this.getCorporateDetail(payload);
        this.helper.CORPORATE = { ...data, service_fee: 100000 };
        this.helper.isLoading = false;
      } catch (error) {
        this.helper.isError = true;
        this.passErrorToParent(error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetCorporate in FormPaymentMethod`
        );
        this.helper.isLoading = false;
      }
    },

    async exportPdf() {
      this.helper.isLoading = true;
      if (!process.client) {
        this.helper.isLoading = false;
        return;
      }

      const el = document.querySelector("#invoice-body");
      const canvas = await html2canvas(el, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      // fit image to page width
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgW, imgH, undefined, "FAST");
      pdf.save("invoice.pdf");
      this.helper.isLoading = false;
    },
  },
  components: {
    Layout: () => import("@/layouts/main"),
    SquareCard: () => import("@utilities/atoms/card/SquareCard"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    ContentSpan: () => import("@utilities/atoms/utility/ContentSpan"),
    ContentTitle: () => import("@utilities/atoms/title/ContentTitle"),
    ContentDivider: () => import("@utilities/atoms/utility/ContentDivider"),
  },
};
</script>
<template>
  <div class="font-size-13">
    <div class="w-100">
      <div
        class="bg-white rounded-lg shadow p-3 mt-3"
        v-if="data.id && !helper.isLoading"
        id="invoice-body"
      >
        <div class="row">
          <div class="col-12 col-sm-1 pr-0">
            <img src="https://placehold.co/400" class="img-fluid rounded-lg" />
          </div>
          <div class="col-12 col-sm-9">
            <p class="my-0 font-size-20 font-weight-bold">
              Pesanan #{{ data.id.substr(0, 8) }}
            </p>
            <p class="my-0 text-muted">
              {{ helper.CORPORATE.pic_name }} -
              {{ helper.CORPORATE.pic_phone_number }}
            </p>
            <p class="my-0 text-muted">
              {{ helper.CORPORATE.address }}
            </p>
          </div>
          <div class="col-12 col-sm-2 pt-3 text-right"></div>

          <div class="col-12 my-2"></div>

          <div class="col-12 col-sm-3 my-2">
            <p class="my-1 text-muted">Nomor Invoice</p>
            <p class="my-1 font-weight-bold font-size-16 text-muted">
              #{{ data.id }}
            </p>
          </div>
          <div class="col-12 col-sm-3 my-2">
            <p class="my-1 text-muted">Tanggal Pemesanan</p>
            <p class="my-1 font-weight-bold font-size-16 text-muted">
              {{
                $utility.momentAddDate(
                  data.created_at,
                  "7",
                  "hour",
                  "DD/MM/YYYY HH:mm:ss"
                )
              }}
            </p>
          </div>
          <div class="col-12 col-sm-3 my-2">
            <p class="my-1 text-muted">Tanggal Pembayaran</p>
            <p
              class="my-1 font-weight-bold font-size-16 text-muted"
              v-if="data.paid_at"
            >
              {{
                $utility.momentAddDate(
                  data.created_at,
                  "7",
                  "hour",
                  "DD/MM/YYYY HH:mm:ss"
                )
              }}
            </p>
            <p class="my-1 font-weight-bold font-size-16 text-muted" v-else>
              INVOICE BELUM DIBAYAR
            </p>
          </div>
          <div class="col-12 col-sm-3 my-2">
            <p class="my-1 text-muted">Status Pembayaran</p>
            <p class="my-1 font-weight-bold font-size-16 text-muted">
              <span
                class="badge p-2 rounded-pill"
                :style="`
                    color: ${data.paid_at ? '#027A48' : '#B93815'} !important;
                    background: ${
                      data.paid_at ? '#ECFDF3' : '#FFF4ED'
                    } !important`"
              >
                {{ data.paid_at ? "Sudah dibayar" : "Belum dibayar" }}
              </span>
            </p>
          </div>

          <div class="col-12 col-sm-3 my-2">
            <p class="my-1 text-muted">Total Kontainer</p>
            <p class="my-1 font-weight-bold font-size-16 text-muted">
              {{ container.length }}
            </p>
          </div>
          <div class="col-12 col-sm-3 my-2">
            <p class="my-1 text-muted">Customer</p>
            <p class="my-1 font-weight-bold font-size-16 text-muted">
              {{ helper.CORPORATE.name }}
            </p>
          </div>
          <div class="col-12 col-sm-6 my-2">
            <p class="my-1 text-muted">PIC</p>
            <p class="my-1 font-weight-bold font-size-16 text-muted">
              {{ helper.CORPORATE.pic_name }} -
              {{ helper.CORPORATE.pic_phone_number }}
            </p>
          </div>
        </div>

        <div class="my-3">
          <p class="my-0 font-size-16 font-weight-bold">
            Kontainer dan Layanan
          </p>
          <div
            class="rounded-lg border p-3 my-2"
            v-for="(content, index) in container"
            :key="`content-${index}`"
          >
            <div class="d-flex justify-content-between">
              <div class="flex-grow-1">
                <p class="my-0 font-weight-bold font-size-14">
                  {{ content.data[0].transaction_data.container_code }}
                </p>
                <p class="font-size-12">
                  <span class="text-muted">Tipe: </span>
                  <span class="">
                    {{ content.data[0].transaction_data.vehicle_type }}
                  </span>
                  | <span class="text-muted">Jenis: </span>
                  <span class="">
                    {{ content.data[0].transaction_data.vehicle_size }}
                  </span>
                  | <span class="text-muted">Muatan: </span>
                  <span class="">
                    {{
                      content.data[0].transaction_data.container_fill === "FILL"
                        ? "Muatan Terisi"
                        : "Muatan Kosong"
                    }}
                  </span>
                </p>
              </div>
              <div class="text-lg-right">
                <p class="my-0 font-weight-bold font-size-14">
                  <span v-if="content.data.length < 2">
                    {{ content.data[0].product_detail.name }}
                  </span>
                  <span v-else>
                    {{ content.data.length }} produk
                    <i
                      v-b-tooltip
                      class="bx bx-error-circle"
                      :title="
                        content.data
                          .map((opt) => opt.product_detail.name)
                          .join(' + ')
                      "
                    ></i>
                  </span>
                </p>
                <p class="font-size-12">
                  <span class="text-muted"
                    >Rp{{ $utility.convertToRupiah(content.total) }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <p class="my-0 font-size-16 font-weight-bold">Informasi Pembayaran</p>
          <div class="row">
            <div class="col-12 my-3 col-lg-6">
              <div class="row">
                <div class="col-12 col-lg-6 my-1">
                  <p class="my-1 font-size-12 text-muted">Tanggal Pemesanan</p>
                  <p
                    class="my-1 font-size-12 font-weight-bold font-size-14 text-muted"
                  >
                    {{
                      $utility.momentAddDate(
                        data.created_at,
                        "7",
                        "hour",
                        "DD/MM/YYYY HH:mm:ss"
                      )
                    }}
                  </p>
                </div>
                <div class="col-12 col-lg-6 my-1">
                  <p class="my-1 font-size-12 text-muted">Tanggal Pembayaran</p>
                  <p
                    class="my-1 font-weight-bold font-size-14 text-muted"
                    v-if="data.paid_at"
                  >
                    {{
                      $utility.momentAddDate(
                        data.paid_at,
                        "7",
                        "hour",
                        "DD/MM/YYYY HH:mm:ss"
                      )
                    }}
                  </p>
                  <p
                    class="my-1 font-weight-bold font-size-14 text-muted"
                    v-else
                  >
                    INVOICE BELUM DIBAYAR
                  </p>
                </div>
                <div class="col-12 col-lg-6 my-1">
                  <p class="my-1 font-size-12 text-muted">Metode Pembayaran</p>
                  <p
                    class="my-1 font-size-12 font-weight-bold font-size-14 text-muted"
                  >
                    {{ data.payment_method.toString().toUpperCase() }}
                  </p>
                </div>
                <div class="col-12 col-lg-6 my-1">
                  <p class="my-1 font-size-12 text-muted">Total Pembayaran</p>
                  <p
                    class="my-1 font-size-12 font-weight-bold font-size-14 text-muted"
                  >
                    Rp{{ $utility.convertToRupiah(helper.total) }}
                  </p>
                </div>
                <div class="col-12 col-lg-12 my-1">
                  <div class="rounded border border-secondary py-1 px-3">
                    <p class="my-1 font-size-12 text-muted">Virtual Account</p>
                    <p
                      class="my-1 font-size-12 font-weight-bold font-size-14 text-muted"
                    >
                      {{
                        data.transaction_data.va_number.toString().toUpperCase()
                      }}
                      <i
                        class="bx bx-copy cursor-pointer"
                        @click="
                          copyToClipboard(
                            data.transaction_data.va_number
                              .toString()
                              .toUpperCase()
                          )
                        "
                        v-if="!helper.isCopied"
                      ></i>
                      <span
                        v-else
                        class="text-success font-size-10 font-weight-normal"
                        ><i class="bx bx-check-double text-success"></i>
                        Berhasil disalin!</span
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 my-3 col-lg-6">
              <div class="bg-light rounded-lg shadow p-3">
                <div class="d-flex justify-content-between my-2">
                  <div class="font-size-14 text-muted">Sub Total</div>
                  <div class="font-size-14 font-weight-bold">
                    {{ $utility.convertToRupiah(helper.subTotal) }}
                  </div>
                </div>
                <div class="d-flex justify-content-between my-2">
                  <div class="font-size-14 text-muted">Service Fee</div>
                  <div class="font-size-14 font-weight-bold">
                    {{ container.length }} x
                    {{ $utility.convertToRupiah(helper.CORPORATE.service_fee) }}
                  </div>
                </div>
                <div class="d-flex justify-content-between my-2">
                  <div class="font-size-14 text-muted">Service Tax</div>
                  <div class="font-size-14 font-weight-bold">
                    {{ $utility.convertToRupiah(helper.serviceTax) }}
                  </div>
                </div>
                <div class="d-flex justify-content-between my-2">
                  <div class="font-size-14 text-muted">Biaya Admin</div>
                  <div class="font-size-14 font-weight-bold">
                    {{
                      $utility.convertToRupiah(helper.CORPORATE.admin_charge)
                    }}
                  </div>
                </div>

                <div class="d-flex justify-content-between my-3">
                  <div class="font-size-16 font-weight-bold text-muted">
                    Total Pembayaran
                  </div>
                  <div class="font-size-16 font-weight-bold">
                    Rp{{ $utility.convertToRupiah(helper.total) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="helper.isLoading" class="text-center bg-white py-5">
        <content-span size="lg" caption="" />
        <h4 class="font-weight-bold mt-n4">
          Kami sedang memproses permintaan anda
        </h4>
      </div>

      <div v-else-if="helper.isError" class="text-center bg-white py-5">
        <content-span size="lg" caption="" image="error.png" />
        <h4 class="font-weight-bold mt-n4">
          Oopss... Kami gagal memproses permintaan anda
        </h4>
        <active-button
          text="Kembali"
          @click="$router.push('/transaction/history')"
        />
      </div>
      <div class="w-100 mt-3">
        <active-button
          text="Download Invoice"
          @click="exportPdf"
          :is_disabled="helper.isLoading"
          additional_class="bg-primary text-dark font-weight-bold rounded-lg w-100 p-2 text-center font-weight-bold font-size-16 mt-3 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
