<template>
  <div>
    <div class="row" v-if="data.id">
      <div class="col-12 col-lg-12 mb-3">
        <p class="font-weight-bold font-size-14 mb-0">Informasi Tamu</p>
        <p class="font-size-11 text-secondary mb-0">
          Informasi detail tamu yang menginap di hotel selama periode tertentu.
        </p>
      </div>

      <div class="col-12 col-lg-3 my-2">
        <p class="font-weight-bold text-muted my-0 font-size-11">
          Nama/Nomor Kamar
        </p>
        <p class="my-0 font-size-13">{{ data.guestName }}</p>
      </div>

      <div class="col-12 col-lg-3 my-2">
        <p class="font-weight-bold text-muted my-0 font-size-11">Nomor Kartu</p>
        <p class="my-0 font-size-13">
          {{ processFindData(data.meta, "stepThree", "rfId") }}
        </p>
      </div>

      <div class="col-12 col-lg-3 my-2">
        <p class="font-weight-bold text-muted my-0 font-size-11">
          Jenis Kendaraan
        </p>
        <p class="my-0 font-size-13">
          <span v-if="processCheckVehicle()">Mobil</span>
          <span v-else>Motor</span>
        </p>
      </div>

      <div class="col-12 col-lg-3 my-2">
        <p class="font-weight-bold text-muted my-0 font-size-11">Plat Nomor</p>
        <p class="my-0 font-size-13">
          {{ processFindData(data.meta, "stepTwo", "licensePlate") }}
        </p>
      </div>

      <div class="col-12 col-lg-3 my-2">
        <p class="font-weight-bold text-muted my-0 font-size-11">Status</p>
        <p class="my-0 font-size-13" v-html="processSetLabelStatus(data)"></p>
      </div>

      <div class="col-12 col-lg-3 my-2">
        <p class="font-weight-bold text-muted my-0 font-size-11">
          Duplikasi Kartu
        </p>
        <p class="my-0 font-size-13">
          <span v-if="data.isDuplicate">
            <i class="ic-check-circle"></i> Ya
          </span>
          <span v-else><i class="ic-alert-circle"></i> Tidak</span>
        </p>
      </div>

      <div class="col-12 col-lg-3 my-2">
        <p class="font-weight-bold text-muted my-0 font-size-11">Form Tamu</p>
        <p
          class="my-0 font-size-13 text-primary cursor-pointer"
          @click="modal.ocr = true"
        >
          Lihat Form <i class="ic-external-link-01"></i>
        </p>
      </div>

      <plain-modal v-model="modal.ocr" size="lg">
        <div class="row">
          <div class="col-12 col-lg-4">
            <p class="font-weight-bold my-1">Form Tamu</p>
            <img
              :src="`${$utility.getBaseAssetUrl()}/${processFindData(
                data.meta,
                'stepOne',
                'ocrFile'
              )}`"
              alt="form-guest"
              class="img-fluid rounded border"
            />
            <a
              :href="`${$utility.getBaseAssetUrl()}/${processFindData(
                data.meta,
                'stepOne',
                'ocrFile'
              )}`"
              target="_blank"
            >
              <active-button
                text="Unduh"
                type="outline"
                size="sm"
                additional_class="mt-2 w-100"
              />
            </a>
          </div>
          <div class="col-12 col-lg-8">
            <p class="font-weight-bold my-1">Meta Data</p>
            <div
              class="bg-light rounded border font-size-10 p-3"
              style="
                overflow: scroll;
                font-family: consolas, monospace;
                max-height: 400px !important;
              "
            >
              <pre>{{ JSON.parse(data.meta) }}</pre>
            </div>
          </div>
        </div>
      </plain-modal>
    </div>
    <div v-else class="my-5 text-center py-5">
      <b-spinner />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ActiveButton: () => import("@/components/atoms/button/ActiveButton"),
    PlainModal: () => import("@/components/atoms/modal/PlainModal"),
  },
  data: () => ({
    modal: {
      ocr: false,
    },
  }),
  props: {
    data: {
      required: true,
    },
    transactionIn: {
      required: false,
      default: () => ({}),
    },
    transactionOut: {
      required: false,
      default: () => ({}),
    },
  },
  methods: {
    processFindData(data, step, key) {
      const DATA = JSON.parse(data);
      if (!DATA[step]) return null;
      return DATA[step][key] !== undefined
        ? DATA[step][key]
        : DATA[step].data?.[key];
    },

    processCheckVehicle() {
      const vehicle = String(
        this.transactionIn.vehicle_code ?? "MT2"
      ).toLowerCase();

      if (vehicle.includes("mb")) {
        return true;
      } else {
        return false;
      }
    },

    processsCountDateDifference() {
      const start = new Date(this.data.guestCheckin);
      const end = new Date(this.data.guestCheckout);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      return differenceInDays;
    },

    processSetLabelStatus(data) {
      let statusLabel = "DATA BERMASALAH";
      let cssClass = "danger";
      if (data.status === "ACTIVE") {
        if (
          new Date().setHours(11, 59, 59, 0) >
          new Date(data.guestCheckout).setHours(11, 59, 59, 0)
        ) {
          statusLabel = "Kedaluwarsa";
        } else {
          statusLabel = "AKTIF";
          cssClass = "primary";
        }
      } else if (data.status === "CHECKEDOUT") {
        cssClass = "success";
      }

      return `<span class="badge badge-${cssClass} font-size-10">${statusLabel}</span>`;
    },
  },
};
</script>

<style></style>
