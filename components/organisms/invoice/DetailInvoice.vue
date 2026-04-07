<template>
  <div
    class="invoice-wrap"
    :class="{ 'invoice-print-target': helper.isPrintTarget }"
  >
    <div v-if="helper.isLoading" class="my-5 py-5 text-center">
      <div class="my-5 py-5 text-center">
        <b-spinner size="lg" />
      </div>
    </div>
    <div v-else>
      <div class="invoice-card card border-0">
        <!-- Top Bar -->
        <div class="topbar px-4 px-lg-5 py-4">
          <div
            class="d-flex flex-wrap justify-content-between align-items-start gap-3"
          >
            <div class="d-flex align-items-center gap-3">
              <div class="">
                <p class="mb-1 label">{{ data.name }}</p>
                <h4 class="mb-1 title">Invoice Detail</h4>
                <p class="mb-0 meta">
                  #{{ data.id.substr(0, 6) }} • Penagihan
                  {{
                    $utility.formatDateMoment(
                      data.createdAt,
                      "DD-MM-YYYY HH:mm",
                    )
                  }}
                </p>
              </div>
            </div>

            <div class="d-flex flex-wrap align-items-center gap-2 no-print">
              <span class="status-pill" :class="statusMeta.className">{{
                statusMeta.label
              }}</span>
            </div>

            <div class="print-only">
              <span class="status-pill" :class="statusMeta.className">{{
                statusMeta.label
              }}</span>
            </div>
          </div>
        </div>

        <div class="card-body p-4 p-lg-5">
          <!-- Parties -->
          <div class="row g-3 mb-4">
            <div class="col-lg-6">
              <div class="border rounded h-100 p-3 p-lg-4">
                <div class="d-flex align-items-start gap-3">
                  <div class="">
                    <p class="section-label mb-1">Billed From</p>
                    <h6 class="mb-1 font-weight-bold">
                      {{ helper.spotDetail.name }}
                    </h6>
                    <p class="mb-0 text-muted small">
                      {{ helper.spotDetail.address }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="border rounded h-100 p-3 p-lg-4">
                <div
                  class="d-flex justify-content-between align-items-start gap-3"
                >
                  <div v-if="helper.corporate.hasOwnProperty('id')">
                    <p class="section-label mb-1">Billed To</p>
                    <h6 class="mb-1 font-weight-bold">
                      {{ helper.corporate.name }}
                    </h6>
                    <p class="mb-0 text-muted small">
                      {{ helper.corporate.pic_email }} ({{
                        helper.corporate.pic_phone_number
                      }})
                    </p>
                    <p class="mb-0 text-muted small">
                      {{ helper.corporate.address }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Items -->
          <div class="border rounded">
            <div class="row col-12 no-gutters p-0">
              <div
                class="col-lg-1 bg-secondary text-dark p-2 font-weight-bold"
                style="border-top-left-radius: 0.275rem; overflow: hidden"
              >
                No
              </div>
              <div class="col-lg-5 bg-secondary text-dark p-2 font-weight-bold">
                Layanan
              </div>
              <div class="col-lg-2 bg-secondary text-dark p-2 font-weight-bold">
                Jumlah
              </div>
              <div class="col-lg-2 bg-secondary text-dark p-2 font-weight-bold">
                Biaya
              </div>
              <div
                class="col-lg-2 bg-secondary text-dark p-2 font-weight-bold text-center"
                style="border-top-right-radius: 0.275rem; overflow: hidden"
              >
                Total
              </div>
            </div>
            <div
              v-for="(product, index) in Object.values(options.product)"
              :key="index"
              class="col-12 row pr-lg-0"
            >
              <template v-if="product.total > 0">
                <div class="col-lg-1 p-2">
                  {{
                    Object.values(options.product)
                      .slice(0, index + 1)
                      .filter((p) => p.total > 0).length
                  }}
                </div>
                <div class="col-lg-5 p-2">
                  {{ product.label }}
                </div>
                <div class="col-lg-2 p-2">
                  {{ product.total }}
                </div>
                <div class="col-lg-2 p-2">
                  Rp {{ $utility.convertToRupiah(product.cost) }}
                </div>
                <div class="col-lg-2 p-2 text-left">
                  Rp {{ $utility.convertToRupiah(product.subTotal) }}
                </div>
              </template>
            </div>

            <div
              v-for="(event, index) in events"
              :key="index"
              class="col-12 row pr-lg-0"
            >
              <div class="col-lg-1 p-2">
                {{
                  Object.values(options.product).filter((p) => p.total > 0)
                    .length +
                  index +
                  1
                }}
              </div>
              <div class="col-lg-5 p-2">
                {{ event.name }}
              </div>
              <div class="col-lg-2 p-2">1</div>
              <div class="col-lg-2 p-2">
                Rp
                {{
                  $utility.convertToRupiah(
                    parseInt(event.product_motorcycle) +
                      parseInt(event.product_car) +
                      parseInt(event.product_vip),
                  )
                }}
              </div>
              <div class="col-lg-2 p-2 text-left">
                Rp
                {{
                  $utility.convertToRupiah(
                    parseInt(event.product_motorcycle) +
                      parseInt(event.product_car) +
                      parseInt(event.product_vip),
                  )
                }}
              </div>
            </div>
          </div>

          <!-- Total -->
          <div class="row justify-content-end mt-3">
            <div class="col-lg-5">
              <div class="border rounded px-3">
                <div class="d-flex justify-content-between pt-1 my-1">
                  <div class="font-weight-bold text-muted">Sub Total</div>
                  <div class="text-right">
                    Rp {{ $utility.convertToRupiah(data.subTotal) }}
                  </div>
                </div>

                <div class="d-flex justify-content-between my-1">
                  <div class="font-weight-bold text-muted">Discount</div>
                  <div class="text-right">
                    Rp {{ $utility.convertToRupiah(data.discount) }}
                  </div>
                </div>

                <div class="d-flex justify-content-between my-1">
                  <div class="font-weight-bold text-muted">Pajak</div>
                  <div class="text-right">
                    Rp {{ $utility.convertToRupiah(data.tax) }}
                  </div>
                </div>

                <div class="d-flex justify-content-between my-1">
                  <div class="font-weight-bold text-muted">Total</div>
                  <div class="text-right font-weight-bold font-size-18">
                    Rp {{ $utility.convertToRupiah(data.amount) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="note-box mt-4 p-3">
            <div class="d-flex align-items-start gap-2">
              <i class="bx bx-info-circle fs-5"></i>
              <div class="ml-1">
                <p class="mb-1 small font-weight-bold">Perhatian</p>
                <p class="mb-0 small">
                  Anda dapat melihat detail transaksi secara rinci melalui
                  sistem kami. Pastikan untuk memeriksa setiap item tagihan dan
                  tanggal transaksi untuk memastikan keakuratan informasi
                  sebelum melakukan pembayaran. Jika Anda memiliki pertanyaan
                  atau membutuhkan bantuan, jangan ragu untuk menghubungi tim
                  dukungan kami.
                </p>
              </div>
            </div>
          </div>

          <div class="note-box-success mt-1 p-3" v-if="data.paymentFile !== ''">
            <div class="d-flex align-items-start gap-2">
              <i class="bx bx-info-circle fs-5"></i>
              <div class="ml-1">
                <p class="mb-1 small font-weight-bold">
                  Pembayaran Terkonfirmasi
                </p>
                <p class="mb-0 small">
                  Anda telah mengkonfirmasi pembayaran untuk tagihan ini pada
                  tanggal
                  {{
                    $utility.formatDateMoment(
                      data.paymentDate,
                      "DD-MM-YYYY HH:mm",
                    )
                  }}.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="card-footer footer-bar bg-white px-4 px-lg-5 py-3">
          <div
            class="d-flex flex-wrap justify-content-end align-items-center gap-2 text-right"
          >
            <div class="d-flex gap-2 no-print">
              <active-button text="Print Invoice" @click="handlePrint" />
              <active-button
                text="Daftar Transaksi"
                additional_class="ml-2"
                @click="modal.transaction = true"
              />
              <active-button
                type="outline"
                additional_class="ml-2"
                text="Tutup"
                @click="$emit('cancel')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <plain-modal v-model="modal.transaction" size="lg">
      <div class="font-weight-bold my-1">Daftar Layanan</div>
      <div
        style="
          max-height: 600px !important;
          overflow-y: scroll;
          overflow-x: hidden;
        "
        class="border rounded"
      >
        <div class="row col-12 no-gutters p-0">
          <div
            class="col-lg-1 bg-secondary text-dark p-2 font-weight-bold"
            style="border-top-left-radius: 0.275rem; overflow: hidden"
          >
            No
          </div>
          <div class="col-lg-5 bg-secondary text-dark p-2 font-weight-bold">
            Transaksi
          </div>
          <div class="col-lg-2 bg-secondary text-dark p-2 font-weight-bold">
            Tanggal
          </div>
          <div class="col-lg-2 bg-secondary text-dark p-2 font-weight-bold">
            Harga
          </div>
          <div
            class="col-lg-2 bg-secondary text-dark p-2 font-weight-bold text-center"
            style="border-top-right-radius: 0.275rem; overflow: hidden"
          >
            Detail
          </div>
        </div>
        <div
          class="col-12 row pr-lg-0"
          v-for="(log, index) in logs"
          :key="log.id"
        >
          <div class="col-lg-1 p-2">
            {{ index + 1 }}
          </div>
          <div class="col-lg-5 p-2" v-if="options.product[log.productId].label">
            {{
              options.product[log.productId].label || "Produk tidak ditemukan"
            }}
          </div>
          <div class="col-lg-2 p-2">
            {{ $utility.formatDateMoment(log.created_at, "DD-MM-YYYY HH:mm") }}
          </div>
          <div
            class="col-lg-2 p-2 text-right"
            v-if="options.product[log.productId].cost"
          >
            Rp
            {{
              $utility.convertToRupiah(options.product[log.productId].cost || 0)
            }}
          </div>
          <div class="col-lg-2 p-2">
            <active-button
              text="Lihat Detail"
              size="sm"
              @click="$router.push(`/guest/detail?id=${log.id}`)"
            />
          </div>
        </div>
      </div>

      <div class="font-weight-bold my-1">Daftar Event</div>
      <div
        style="
          max-height: 600px !important;
          overflow-y: scroll;
          overflow-x: hidden;
        "
        class="border rounded"
      >
        <div class="row col-12 no-gutters p-0">
          <div
            class="col-lg-1 bg-secondary text-dark p-2 font-weight-bold"
            style="border-top-left-radius: 0.275rem; overflow: hidden"
          >
            No
          </div>
          <div class="col-lg-5 bg-secondary text-dark p-2 font-weight-bold">
            Event
          </div>
          <div class="col-lg-2 bg-secondary text-dark p-2 font-weight-bold">
            Tanggal
          </div>
          <div class="col-lg-2 bg-secondary text-dark p-2 font-weight-bold">
            Harga
          </div>
          <div
            class="col-lg-2 bg-secondary text-dark p-2 font-weight-bold"
            style="border-top-right-radius: 0.275rem; overflow: hidden"
          >
            Dibuat Oleh
          </div>
        </div>
        <div
          class="col-12 row pr-lg-0"
          v-for="(event, index) in events"
          :key="event.id"
        >
          <div class="col-lg-1 p-2">
            {{ logs.length + index + 1 }}
          </div>
          <div class="col-lg-5 p-2">{{ event.name }}</div>
          <div class="col-lg-2 p-2">
            {{ $utility.formatDateMoment(event.start, "DD-MM-YYYY HH:mm") }}
            -
            {{ $utility.formatDateMoment(event.end, "DD-MM-YYYY HH:mm") }}
          </div>
          <div class="col-lg-2 p-2">
            <span v-html="formatEventData(event).__html"></span>
          </div>
          <div class="col-lg-2 p-2">
            {{ event.created_by }}
          </div>
        </div>
      </div>
    </plain-modal>
  </div>
</template>

<script>
import {
  eventMethods,
  guestMethods,
  productMethods,
  subscriptionMethods,
} from "@/store/helperActions";
export default {
  name: "DetailCorporateInvoice",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    corporate: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      logs: [],
      events: [],
      options: {
        baseProduct: [],
        product: {},
      },
      modal: {
        transaction: false,
      },
      helper: {
        corporate: {},
        spotDetail: {},
        isLoading: false,
        isPrintTarget: false,
      },
    };
  },
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
  },
  async mounted() {
    window.addEventListener("afterprint", this.resetPrintTarget);
    this.helper.spotDetail = await this.$utility.getSpotInfo();
    await this.processGetCorporate();
    await this.processGetBaseProduct();
    await this.processGetProduct();
    this.processPopulateInvoice();
  },
  beforeDestroy() {
    window.removeEventListener("afterprint", this.resetPrintTarget);
  },
  computed: {
    statusMeta() {
      const status = (this.data.status || "").toLowerCase();
      const map = {
        paid: { label: "PAID", className: "status-paid" },
        unpaid: { label: "UNPAID", className: "status-unpaid" },
      };
      return map[status] || { label: "Unknown", className: "status-unpaid" };
    },
  },
  methods: {
    getMembershipProduct: productMethods.getMembershipProduct,
    getCorporateDetail: subscriptionMethods.getCorporateDetail,
    getGuestDetail: guestMethods.getGuestDetail,
    getEventDetail: eventMethods.getEventDetail,

    handlePrint() {
      this.helper.isPrintTarget = true;
      this.$nextTick(() => {
        window.print();
      });
    },

    resetPrintTarget() {
      this.helper.isPrintTarget = false;
    },

    setPayloadProduct() {
      const payload = {
        filter: [{ key: "corporateId", value: this.$utility.getCorporateId() }],
        pagination: {
          currentPage: 1,
          perPage: 1000,
        },
      };
      return payload;
    },

    formatProductData(values) {
      const productOptions = values.reduce((acc, product) => {
        acc[
          this.options.baseProduct.find(
            (base) => base.id === product.productId,
          )?.id
        ] = {
          ...product,
          total: 0,
          subTotal: 0,
          cost:
            this.options.baseProduct.find(
              (base) => base.id === product.productId,
            )?.price || 0,
        };
        return acc;
      }, {});

      this.options.product = productOptions;
    },

    formatEventData(event) {
      if (!event) {
        this.helper.error.product = true;
        return {
          __html:
            "<span class='text-danger font-size-9'><i class='bx bx-error-circle'></i> Data bermasalah</span>",
          state: false,
        };
      }
      return {
        __html: `
        <span class="font-size-10 text-muted">
          Motor: Rp ${this.$utility.convertToRupiah(
            event.product_motorcycle,
          )} <br>
          Mobil: Rp ${this.$utility.convertToRupiah(event.product_car)} <br>
          VIP: Rp ${this.$utility.convertToRupiah(event.product_vip)}
        </span>`,
        state: true,
        total:
          parseInt(event.product_motorcycle || 0) +
          parseInt(event.product_car || 0) +
          parseInt(event.product_vip || 0),
      };
    },

    async processPopulateInvoice() {
      const logsId = this.data.logsId.split(",");
      for (const log of logsId) {
        await this.processGetLogsDetail(log);
      }

      const eventId = this.data.eventsId.split(",");
      for (const event of eventId) {
        await this.processGetEventDetail(event);
      }
    },

    async processGetEventDetail(eventId) {
      try {
        this.helper.isLoading = true;
        const payload = { id: eventId };
        const data = await this.getEventDetail(payload);
        this.events.push(data[0]);
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at getEventDetail in FormCorporateInvoice`,
        );
      } finally {
        this.helper.isLoading = false;
      }
    },

    async processGetBaseProduct() {
      this.helper.isLoading = true;
      try {
        this.options.baseProduct =
          await this.$utility.getOptionProductMembership();
      } catch (error) {
        this.options.product = [];
        this.$utility.fireToast(
          "Gagal memuat produk",
          "primary",
          "Sistem gagal mendapatkan data produk, anda tidak dapat melanjutkan proses. Mohon muat ulang halaman ini",
        );
      } finally {
        this.helper.isLoading = false;
      }
    },

    async processGetCorporate() {
      this.helper.isLoading = true;
      this.helper.isError = false;
      try {
        const payload = {
          id: this.$utility.getCorporateId(),
        };
        const data = await this.getCorporateDetail(payload);
        this.helper.corporate = data;
        this.helper.isLoading = false;
      } catch (error) {
        this.helper.isError = true;
        this.passErrorToParent(error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetCorporate in DetailInvoice`,
        );
        this.helper.isLoading = false;
      }
    },

    async processGetLogsDetail(logsId) {
      try {
        this.helper.isLoading = true;
        const payload = { id: logsId };
        const data = await this.getGuestDetail(payload);
        this.logs.push(data[0]);
        this.options.product[data[0].productId].total =
          this.options.product[data[0].productId].total + 1;
        this.options.product[data[0].productId].subTotal =
          this.options.product[data[0].productId].subTotal +
          this.options.product[data[0].productId].cost;
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetLogs in DetailInvoice`,
        );
      } finally {
        this.helper.isLoading = false;
      }
    },

    async processGetProduct() {
      this.helper.isLoading = true;
      try {
        let payload = this.setPayloadProduct();
        let { values } = await this.getMembershipProduct(payload);
        this.formatProductData(values);
      } catch (error) {
        this.options.product = [];
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetProduct in FormCorporateInvoice`,
        );
      } finally {
        this.helper.isLoading = false;
      }
    },
  },
};
</script>

<!-- scoped: screen styles only -->
<style scoped>
.invoice-wrap {
  background: #f3f6fb;
  border-radius: 0.275rem;
  padding: 2px;
}

.invoice-card {
  border-radius: 0.275rem;
  background: #fff;
}

.topbar {
  background: #eeeef0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-top-left-radius: 0.275rem;
  border-top-right-radius: 0.275rem;
}

.label {
  color: #333;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.title {
  color: #333;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.meta {
  color: #333;
  font-size: 13px;
}

.btn-action {
  border-radius: 10px;
  font-weight: 600;
}

.panel {
  border: 1px solid #e8edf5;
  border-radius: 14px;
  background: #ffffff;
}

.panel-head {
  border-bottom: 1px solid #e8edf5;
  background: #fcfdff;
  border-top-left-radius: 0.275rem;
  border-top-right-radius: 0.275rem;
}

.panel-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 20px;
}

.icon-blue {
  background: #e8f0ff;
  color: #1d4ed8;
}

.section-label {
  font-size: 11px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 700;
}

.invoice-table thead th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #64748b;
  background: #f8fafc;
  border-bottom: 1px solid #e8edf5;
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
}

.invoice-table tbody td {
  border-top: 1px solid #f1f5f9;
}

.invoice-table tbody tr:hover {
  background: #fbfdff;
}

.total-card {
  border: 1px solid #e8edf5;
  border-radius: 0.275rem;
  background: #ffffff;
}

.grand-total {
  border: 1px solid #1e3a8a;
  background: #ffffff;
  color: #333;
}

.amount {
  font-weight: 800;
  font-size: 1.2rem;
  color: #93c5fd;
}

.note-box {
  border-radius: 12px;
  border: 1px solid #fde68a;
  background: #fffbeb;
  color: #92400e;
}

.note-box-success {
  border-radius: 12px;
  border: 1px solid #a7fd8a;
  background: #f4ffeb;
  color: #50920e;
}

.footer-bar {
  border-top: 1px solid #e8edf5 !important;
}

.status-pill {
  padding: 0.42rem 0.75rem;
  border-radius: 0.275rem;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.status-paid {
  background: #dcfce7;
  color: #166534;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-unpaid {
  background: #fee2e2;
  color: #991b1b;
}

.print-only {
  display: none;
}
</style>

<!-- non-scoped: print styles must be global to work -->
<style>
@page {
  size: A3 landscape;
  margin: 12mm;
}

@media print {
  body * {
    visibility: hidden !important;
  }

  .invoice-wrap.invoice-print-target,
  .invoice-wrap.invoice-print-target * {
    visibility: visible !important;
  }

  .invoice-wrap.invoice-print-target {
    position: static !important;
    top: auto !important;
    left: auto !important;
    width: 100% !important;
    min-width: 992px !important;
    max-width: none !important;
    background: #fff !important;
    padding: 0 !important;
    margin: 0 !important;
    z-index: 9999 !important;
  }

  /* Emulate lg utility classes because print media does not trigger screen breakpoints reliably */
  .invoice-wrap.invoice-print-target .px-lg-5 {
    padding-left: 3rem !important;
    padding-right: 3rem !important;
  }

  .invoice-wrap.invoice-print-target .p-lg-5 {
    padding: 3rem !important;
  }

  .invoice-wrap.invoice-print-target .p-lg-4 {
    padding: 1.5rem !important;
  }

  .invoice-wrap.invoice-print-target .pr-lg-0 {
    padding-right: 0 !important;
  }

  .invoice-wrap.invoice-print-target .row {
    display: flex !important;
    flex-wrap: wrap !important;
  }

  .invoice-wrap.invoice-print-target .col-lg-1,
  .invoice-wrap.invoice-print-target .col-md-1,
  .invoice-wrap.invoice-print-target .col-sm-1,
  .invoice-wrap.invoice-print-target .col-xs-1 {
    flex: 0 0 8.333333% !important;
    max-width: 8.333333% !important;
  }

  .invoice-wrap.invoice-print-target .col-lg-2,
  .invoice-wrap.invoice-print-target .col-md-2,
  .invoice-wrap.invoice-print-target .col-sm-2,
  .invoice-wrap.invoice-print-target .col-xs-2 {
    flex: 0 0 16.666667% !important;
    max-width: 16.666667% !important;
  }

  .invoice-wrap.invoice-print-target .col-lg-5,
  .invoice-wrap.invoice-print-target .col-md-5,
  .invoice-wrap.invoice-print-target .col-sm-5,
  .invoice-wrap.invoice-print-target .col-xs-5 {
    flex: 0 0 41.666667% !important;
    max-width: 41.666667% !important;
  }

  .invoice-wrap.invoice-print-target .col-lg-6 {
    flex: 0 0 50% !important;
    max-width: 50% !important;
  }

  .invoice-wrap.invoice-print-target .col-12 {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }

  .invoice-card {
    border-radius: 0 !important;
  }

  .no-print {
    display: none !important;
    visibility: hidden !important;
  }

  .print-only {
    display: block !important;
    visibility: visible !important;
  }

  .topbar {
    background: #ffffff !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .grand-total {
    background: #ffffff !important;
    color: #333 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .amount {
    color: #93c5fd !important;
  }

  .invoice-table thead th {
    background: #f8fafc !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .bg-secondary {
    background-color: #eeeef0 !important;
    color: #333 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .panel,
  .total-card,
  .note-box {
    border: 1px solid #e8edf5 !important;
    break-inside: avoid !important;
  }

  .note-box-success {
    border-radius: 12px !important;
    border: 1px solid #a7fd8a !important;
    background: #fffbeb !important;
    color: #50920e !important;
  }

  .footer-bar {
    display: flex !important;
    visibility: visible !important;
  }
}
</style>
