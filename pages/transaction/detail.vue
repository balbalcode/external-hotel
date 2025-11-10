<script>
import {
  subscriptionMethods,
  transactionMethods,
  qrMethods,
} from "@/store/helperActions";
import QrcodeVue from "qrcode.vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  data: () => ({
    data: {},
    container: [],
    modal: {
      qr: false,
      temp: false,
      warning: false,
      paidWarning: false,
    },
    helper: {
      isCopied: false,
      selectedQr: {
        isSingle: false,
        container: {
          index: 0,
          service: 0,
        },
      },
      tempParkingQr: "",
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
    createQRService: qrMethods.createQRService,
    createQRParking: qrMethods.createQRParking,
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

    toggleModalQRParking(index = "") {
      if (this.data.paid_at === "") {
        this.modal.paidWarning = true;
        return;
      }
      this.modal.warning = false;
      this.helper.tempParkingQr = "";
      if (index !== "" && this.container[`${index}`].parking_qr !== "") {
        this.helper.tempParkingQr = index;
        this.modal.temp = true;
        this.modal.warning = false;
      } else if (index !== "") {
        this.helper.tempParkingQr = index;
        this.modal.warning = true;
        this.modal.temp = false;
      }
    },

    toggleModalQRService(index = "", service) {
      this.modal.qr = false;
      this.helper.selectedQr = {
        isSingle: true,
        container: {
          index: 0,
          service: 0,
        },
      };

      if (index === "ALL") {
        this.helper.selectedQr = {
          isSingle: false,
          container: {},
        };
        this.modal.qr = true;
      } else if (index !== "") {
        this.helper.selectedQr = {
          isSingle: true,
          container: {
            index: index,
            service: service,
          },
        };
        this.modal.qr = true;
      }
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
            parking_qr: "",
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

      const el = document.querySelector("#qr-body");
      el.style.removeProperty("max-height");
      el.style.removeProperty("overflow-y");
      const canvas = await html2canvas(el, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      // fit image to page width
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgW, imgH, undefined, "FAST");
      pdf.save("qr-layanan.pdf");
      this.modal.qr = false;
      this.modal.temp = false;
      this.helper.isLoading = false;
    },

    async processParkingQR() {
      try {
        this.modal.warning = false;
        this.helper.isLoading = true;
        const PAYLOAD = {
          id: this.$route.query.id,
        };
        const { values } = await this.createQRParking(PAYLOAD);
        this.container[`${this.helper.tempParkingQr}`].parking_qr =
          values.token;
        this.helper.isLoading = false;
        this.modal.temp = true;
      } catch (error) {
        this.helper.isError = true;
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetCorporate in FormPaymentMethod`
        );
        this.helper.isLoading = false;
      }
    },
  },
  components: {
    QrcodeVue,
    Layout: () => import("@/layouts/main"),
    SquareCard: () => import("@utilities/atoms/card/SquareCard"),
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    ContentTitle: () => import("@utilities/atoms/title/ContentTitle"),
    ContentSpan: () => import("@utilities/atoms/utility/ContentSpan"),
    ContentDivider: () => import("@utilities/atoms/utility/ContentDivider"),
  },
};
</script>
<template>
  <div class="font-size-13">
    <plain-modal v-model="modal.temp" size="lg">
      <div id="qr-body" class="p-3 rounded row" v-if="modal.temp">
        <div class="col-12 col-lg-8 pl-0">
          <div class="row">
            <div class="col-12 col-sm-12 mb-5">
              <p class="my-0 text-muted font-size-14">Layanan</p>
              <p class="my-0 font-weight-bold font-size-18 text-muted">
                Parkir Masuk/Keluar Area
              </p>
            </div>
            <div class="col-12 col-sm-12 mt-3 pt-3">
              <p class="my-0 text-muted font-size-10">Perusahaan</p>
              <p class="my-0 font-weight-bold font-size-13 text-muted">
                {{ helper.CORPORATE.name }}
              </p>
            </div>
            <div class="col-12">
              <hr />
            </div>
            <div class="col-12 col-sm-8 mb-2">
              <p class="my-0 text-muted font-size-10">Kontainer</p>
              <p class="my-0 font-weight-bold font-size-13 text-muted">
                {{ container[helper.tempParkingQr].container_code }}
                -
                {{
                  container[helper.tempParkingQr].data[0].transaction_data
                    .vehicle_type
                }},
                {{
                  container[helper.tempParkingQr].data[0].transaction_data
                    .vehicle_size
                }}
              </p>
            </div>
            <div class="col-12 col-sm-4 mb-2">
              <p class="my-0 text-muted font-size-10">Kode Pesanan</p>
              <p class="my-0 font-weight-bold font-size-13 text-muted">
                Pesanan #{{ data.id.substr(0, 8) }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 p-3 rounded border text-center">
          <qrcode-vue
            :value="container[helper.tempParkingQr].parking_qr"
            :size="200"
            level="M"
            :render-as="'canvas'"
          />
        </div>
      </div>
      <div class="w-100 px- text-right mt-3">
        <active-button
          size="sm"
          text="Unduh QR"
          :is_disabled="helper.isLoading"
          additional_class="px-3 "
          @click="exportPdf"
        />
        <active-button
          size="sm"
          variant="dark"
          text="Tutup"
          additional_class="px-3 "
          @click="modal.temp = false"
        />
      </div>
    </plain-modal>

    <plain-modal v-model="modal.warning" size="sm">
      <div class="mt-0 mb-2">
        <i class="bx bx-error-circle" style="font-size: 64px"></i>
        <p class="font-size-12 mt-3">
          <span class="font-weight-bold font-size-14">
            QR Akan aktif dan berlaku 24 jam!
          </span>
          <br />
          <span>
            QR Akan berlaku selama 24 jam kedepan, apakah anda yakin ingin
            memulai durasi tersebut
          </span>
        </p>
        <active-button
          size="sm"
          text="Mengerti dan Aktifkan"
          @click="processParkingQR"
          :is_disabled="helper.isLoading"
          additional_class="w-100"
        />
        <active-button
          size="sm"
          type="outline"
          text="Aktifkan Nanti"
          @click="modal.warning = false"
          additional_class="w-100 mt-1"
        />
      </div>
    </plain-modal>

    <plain-modal v-model="modal.paidWarning" size="sm">
      <div class="mt-0 mb-2">
        <i class="bx bx-error-circle" style="font-size: 64px"></i>
        <p class="font-size-12 mt-3">
          <span class="font-weight-bold font-size-14">
            Pemabayran belum selesai
          </span>
          <br />
          <span>
            QR tidak dapat ditampilkan karna anda belum menyelesaikan pembayaran
          </span>
        </p>
        <active-button
          size="sm"
          text="Mengerti"
          @click="modal.paidWarning = false"
          additional_class="w-100 mt-1"
        />
      </div>
    </plain-modal>

    <plain-modal v-model="modal.qr" size="lg">
      <div
        id="qr-body"
        class="p-3 rounded row"
        v-if="modal.qr && helper.selectedQr.isSingle"
      >
        <div class="col-12 col-lg-8 pl-0">
          <div class="row">
            <div class="col-12 col-sm-12 mb-5">
              <p class="my-0 text-muted font-size-14">Layanan</p>
              <p class="my-0 font-weight-bold font-size-18 text-muted">
                {{
                  container[helper.selectedQr.container.index].data[
                    helper.selectedQr.container.service
                  ].product_detail.name
                }}
              </p>
            </div>
            <div class="col-12 col-sm-12 mt-3 pt-3">
              <p class="my-0 text-muted font-size-10">Perusahaan</p>
              <p class="my-0 font-weight-bold font-size-13 text-muted">
                {{ helper.CORPORATE.name }}
              </p>
            </div>
            <div class="col-12">
              <hr />
            </div>
            <div class="col-12 col-sm-8 mb-2">
              <p class="my-0 text-muted font-size-10">Kontainer</p>
              <p class="my-0 font-weight-bold font-size-13 text-muted">
                {{
                  container[helper.selectedQr.container.index].container_code
                }}
                -
                {{
                  container[helper.selectedQr.container.index].data[0]
                    .transaction_data.vehicle_type
                }},
                {{
                  container[helper.selectedQr.container.index].data[0]
                    .transaction_data.vehicle_size
                }}
              </p>
            </div>
            <div class="col-12 col-sm-4 mb-2">
              <p class="my-0 text-muted font-size-10">Kode Pesanan</p>
              <p class="my-0 font-weight-bold font-size-13 text-muted">
                Pesanan #{{ data.id.substr(0, 8) }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 p-3 rounded border">
          <qrcode-vue
            value="https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png"
            :size="200"
            level="M"
            :render-as="'canvas'"
          />
        </div>
      </div>
      <div
        v-if="modal.qr && !helper.selectedQr.isSingle"
        class="p-3 m-1 w-100"
        id="qr-body"
        style="max-height: 300px; overflow-y: scroll"
      >
        <div
          v-for="(content, index) in container"
          class="border rounded my-3"
          :key="`content__${index}`"
        >
          <div
            v-for="(qr, idx) in content.data"
            :key="`content__${index}--qr__${idx}`"
            class="row m-0 px-1 py-3 border-bottom"
          >
            <div class="col-12 col-lg-8 pl-0">
              <div class="row m-0">
                <div class="col-12 col-sm-12 mb-5">
                  <p class="my-0 text-muted font-size-14">Layanan</p>
                  <p class="my-0 font-weight-bold font-size-18 text-muted">
                    {{ qr.product_detail.name }}
                  </p>
                </div>
                <div class="col-12 col-sm-12 mt-3 pt-3">
                  <p class="my-0 text-muted font-size-10">Perusahaan</p>
                  <p class="my-0 font-weight-bold font-size-13 text-muted">
                    {{ helper.CORPORATE.name }}
                  </p>
                </div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 col-sm-8 mb-2">
                  <p class="my-0 text-muted font-size-10">Kontainer</p>
                  <p class="my-0 font-weight-bold font-size-13 text-muted">
                    {{ content.container_code }}
                    -
                    {{ content.data[0].transaction_data.vehicle_type }},
                    {{ content.data[0].transaction_data.vehicle_size }}
                  </p>
                </div>
                <div class="col-12 col-sm-4 mb-2">
                  <p class="my-0 text-muted font-size-10">Kode Pesanan</p>
                  <p class="my-0 font-weight-bold font-size-13 text-muted">
                    Pesanan #{{ data.id.substr(0, 8) }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4 p-3 rounded border">
              <qrcode-vue
                value="https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png"
                :size="200"
                level="M"
                :render-as="'canvas'"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 px-1 text-right">
        <active-button
          size="sm"
          text="Unduh QR"
          :is_disabled="helper.isLoading"
          additional_class="px-3 "
          @click="exportPdf"
        />
        <active-button
          size="sm"
          variant="dark"
          text="Tutup"
          additional_class="px-3 "
          @click="modal.qr = false"
        />
      </div>
    </plain-modal>
    <div class="w-100">
      <h5 class="font-weight-bold align-self-center font-size-20 mb-3">
        Riwayat Transaksi
      </h5>
      <div
        class="bg-white rounded-lg shadow p-3 mt-3"
        v-if="data.id && !helper.isLoading"
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
          <div class="col-12 col-sm-2 pt-1 text-right">
            <active-button
              align="rtl"
              icon="bx bx-show"
              size="sm"
              text="Lihat Invoice"
              additional_class="px-3 rounded-pill"
              @click="
                $router.push(`/transaction/invoice?id=${$route.query.id}`)
              "
            />
            <active-button
              align="rtl"
              icon="bx bx-qr"
              variant="dark"
              size="sm"
              text="Unduh QR"
              :is_disabled="helper.isLoading"
              additional_class="px-4 rounded-pill my-1 d-none"
              @click="toggleModalQRService('ALL')"
            />
          </div>

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
                <div class="d-flex">
                  <div class="flex-grow-1">
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
                  <div class="ml-2">
                    <active-button
                      text="QR Parkir"
                      additional_class=""
                      @click="toggleModalQRParking(index)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="clearboth clearfix"></div>
            <div class="row py-1 m-0" v-if="content.isOpen">
              <div class="table-responsive rounded-lg table-freeze mb-0">
                <table
                  class="table table-striped table-borderless mb-0 custom-tbl"
                >
                  <thead class="thead-freeze bg-light">
                    <tr class="border-bottom-table">
                      <th class="text-dark">Layanan</th>
                      <th class="text-dark">Status</th>
                      <th class="text-dark">Tanggal Dikerjakan</th>
                      <th class="text-dark">Tanggal Selesai</th>
                      <th class="text-dark">Petugas</th>
                      <th class="text-dark">Biaya</th>
                      <th class="text-dark">QR Layanan</th>
                      <th style="width: 20% !important" class="text-dark">
                        Lampiran
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(service, idx) in content.data"
                      :key="`service-${index}__${idx}`"
                    >
                      <td>{{ service.product_detail.name }}</td>
                      <td>
                        <span class="font-size-10"> Belum tersedia </span>
                        <!-- <span
                          class="badge p-2 rounded-pill"
                          :style="`
                    color: ${true ? '#027A48' : '#B93815'} !important;
                    background: ${true ? '#ECFDF3' : '#FFF4ED'} !important`"
                        >
                          {{ true ? "Selesai" : "Belum Selesai" }}
                        </span> -->
                      </td>
                      <td>
                        <span class="font-size-10"> Belum tersedia </span>
                      </td>
                      <td>
                        <span class="font-size-10"> Belum tersedia </span>
                      </td>
                      <td>
                        <span class="font-size-10"> Belum tersedia </span>
                      </td>
                      <td>
                        {{
                          $utility.convertToRupiah(service.product_detail.price)
                        }}
                      </td>
                      <td>
                        <span class="font-size-10"> Belum tersedia </span>
                        <!-- <active-button
                          text="Unduh"
                          additional_class="rounded-pill"
                          size="sm"
                          @click="toggleModalQRService(index, idx)"
                        /> -->
                      </td>
                      <td>
                        <span class="font-size-10">
                          Lampiran tidak tersedia
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr @click="toggleDetailService(index)">
                      <td
                        colspan="7"
                        class="bg-gray-90 cursor-pointer font-size-12 font-weight-bold"
                      >
                        Tutup Detail Layanan
                      </td>
                      <td
                        class="bg-gray-90 cursor-pointer font-size-12 font-weight-bold text-right"
                      >
                        <i class="bx bx-chevron-up font-size-14"></i>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div
              class="rounded d-flex p-2 bg-light d-flex justify-content-between cursor-pointer"
              @click="toggleDetailService(index)"
              v-else
            >
              <div class="text-dark">
                Tampilkan {{ content.data.length }} Layanan
              </div>
              <div class="">
                <i class="bx bx-chevron-down font-size-20"></i>
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
                  <div
                    class="rounded border border-secondary py-1 px-3"
                    v-if="data.transaction_data.payment_data"
                  >
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
    </div>
  </div>
</template>
