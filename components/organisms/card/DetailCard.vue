<template>
  <div class="row">
    <div class="col-12 col-lg-12 mt-2 mb-4">
      <p class="font-weight-bold my-0 font-size-16">Informasi Kartu</p>
      <p class="text-muted my-0 font-size-12">
        Informasi detail kartu tamu yang sedang aktif digunakan pada sistem
      </p>
    </div>
    <div class="col-12 col-lg-4">
      <div
        class="card shadow position-relative overflow-hidden bg-primary text-dark border-0 shadow"
        style="border-radius: 12px"
      >
        <div class="card-body p-3">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div class="">
              <p v-html="getStatusLabel()"></p>
            </div>
            <div
              class="rounded-circle d-flex align-items-center justify-content-center"
              style="
                width: 28px;
                height: 28px;
                background: rgba(255, 255, 255, 0.2);
              "
            >
              <i class="ic-credit-card" style="font-size: 14px"></i>
            </div>
          </div>

          <div class="mt-2 mb-3 font-size-16">{{ helper.CORPORATE.name }}</div>

          <div class="mb-2">
            <p class="mb-1 text-uppercase font-size-9 text-dark">RFID Number</p>
            <h6
              class="mb-0 font-weight-bold text-dark"
              style="letter-spacing: 1px; font-family: 'Courier New', monospace"
            >
              {{ selectedData.rfid }}
            </h6>
          </div>

          <div class="d-flex justify-content-between">
            <div>
              <small
                class="d-block text-uppercase"
                style="font-size: 7px; letter-spacing: 0.3px; opacity: 0.8"
              >
                Room
              </small>
              <span class="font-weight-bold" style="font-size: 10px">
                {{ selectedData.guestName }}
              </span>
            </div>
            <div>
              <small
                class="d-block text-uppercase"
                style="font-size: 7px; letter-spacing: 0.3px; opacity: 0.8"
                >Tipe</small
              >
              <span class="font-weight-bold" style="font-size: 10px">
                Tamu
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-8">
      <div class="h-100 bg-light rounded rounded-lg px-4 py-3">
        <div class="h-100 d-flex flex-column justify-content-center">
          <div v-if="helper.status === 'ACTIVE'">
            <p class="my-1 font-weight-bold font-size-14">
              Penggunaan Kartu Sedang Berlangsung
            </p>

            <p class="my-1 text-muted font-size-12">
              Kartu ini aktif digunakan oleh tamu yang sedang menginap di hotel.
              Anda dapat menghapus akses kartu ini apabila terdapat kesalahan
            </p>
          </div>

          <div v-else-if="helper.status === 'EXPIRED'">
            <p class="my-1 font-weight-bold font-size-14">
              Penggunaan Kartu Telah Kedaluwarsa
            </p>
            <p class="my-1 text-muted font-size-12">
              Kartu ini telah melewati tanggal check-out tamu, tamu akan
              dikenakan denda parkir apabila kendaraan masih berada di area
              hotel. Batas benefit parkir:
              {{
                $utility.momentAddDate(
                  selectedData.checkOut,
                  "1",
                  "hours",
                  "DD-MM-YYYY HH:mm",
                )
              }}
            </p>
          </div>

          <div v-else-if="helper.status === 'CHECKEDOUT'">
            <p class="my-1 font-weight-bold font-size-14">
              Kartu Telah Tidak Aktif Karena Tamu Sudah Check-Out
            </p>

            <p class="my-1 text-muted font-size-12">
              Kartu ini sudah tidak aktif karena tamu telah melakukan proses
              check-out. Anda dapat menggunakan kartu ini kembali untuk tamu
              lainnya.
            </p>
          </div>

          <div class="text-left mt-1">
            <active-button
              text="Lihat Detail Tamu"
              size="sm"
              type="outline"
              @click="$router.push('/guest/detail?id=' + selectedData.id)"
            />
            <active-button
              v-if="helper.status === 'EXPIRED'"
              text="Hapus Akses"
              size="sm"
              variant="danger"
              type="outline"
              text_color="danger"
            />
            <active-button
              text="Scan Kartu Baru"
              size="sm"
              variant="info"
              type="outline"
              text_color="info"
              @click="$emit('requestScan')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
  },
  name: "DetailCard",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      selectedData: {},
      pagination: {
        page: 1,
        per_page: 10,
        total: 0,
      },
      helper: {
        CORPORATE: {},
        status: "ACTIVE",
        loading: false,
      },
    };
  },
  async mounted() {
    this.helper.CORPORATE = await this.$utility.getCorporateData();
    this.getCurrentData();
    this.processStatus();
  },
  methods: {
    getCurrentData() {
      if (this.data.values.length === 1) {
        this.selectedData = this.data.values[0];
      } else {
      }
    },

    processStatus() {
      const data = this.selectedData;
      if (data.status === "ACTIVE") {
        if (
          new Date().setHours(11, 59, 59, 0) >
          new Date(data.guestCheckout).setHours(11, 59, 59, 0)
        ) {
          this.helper.status = "EXPIRED";
        } else {
          this.helper.status = "ACTIVE";
        }
      } else if (data.status === "CHECKEDOUT") {
        this.helper.status = "CHECKEDOUT";
      } else {
        this.helper.status = "PROBLEM";
      }
    },

    getStatusLabel() {
      const statusMap = {
        ACTIVE: { label: "AKTIF", class: "primary-80" },
        EXPIRED: { label: "KEDALUARSA", class: "danger-80" },
        CHECKEDOUT: { label: "SUDAH CHECKOUT", class: "success-80" },
        PROBLEM: { label: "DATA BERMASALAH", class: "danger-80" },
      };

      const status = statusMap[this.helper.status] || statusMap.PROBLEM;
      return `<span class="badge px-2 py-1 bg-${status.class} font-size-11 font-weight-bold">${status.label}</span>`;
    },

    processSetLabelStatus(data) {
      let statusLabel = "DATA BERMASALAH";
      let cssClass = "danger-80";
      if (data.status === "ACTIVE") {
        if (
          new Date().setHours(11, 59, 59, 0) >
          new Date(data.guestCheckout).setHours(11, 59, 59, 0)
        ) {
          statusLabel = "KEDALUARSA";
        } else {
          statusLabel = "AKTIF";
          cssClass = "primary-80";
        }
      } else if (data.status === "CHECKEDOUT") {
        statusLabel = "SUDAH CHECKOUT";
        cssClass = "success-80";
      }

      return `<span class="badge px-2 py-1 bg-${cssClass} font-size-11 font-weight-bold">${statusLabel}</span>`;
    },
  },
};
</script>

<style scoped>
/* No custom styles needed - using Bootstrap 4.1 classes */
</style>
