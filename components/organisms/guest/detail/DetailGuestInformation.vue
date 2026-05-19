<template>
  <div class="bg-white py-3 pb-3 px-3 rounded border">
    <div class="row" v-if="data.id">
      <div class="col-12 col-lg-9 mb-3">
        <p class="font-weight-bold font-size-16 mb-0">Informasi Tamu</p>
        <p class="font-size-13 text-secondary mb-0">
          Informasi detail tamu yang menginap di hotel selama periode tertentu.
        </p>
      </div>
      <div class="col-12 col-lg-3 text-right mb-3">
        <div
          class="d-flex flex-column align-items-end h-100 justify-content-center"
        >
          <active-button
            @click="modal.ocr = true"
            text="Lihat Form Tamu"
            type="outline"
            size="sm"
            icon="ic-file-02"
          />
        </div>
      </div>
      <div class="col-12 col-lg-12 my-0 py-0">
        <hr class="my-0" />
      </div>

      <div class="col-12 col-lg-3 my-3">
        <div class="d-flex">
          <div
            class="bg-primary-90 rounded-lg d-flex align-items-center justify-content-center px-2 my-1 mr-2"
          >
            <i class="ic-user-01 text-primary font-size-20 py-1"></i>
          </div>
          <div>
            <p class="font-weight-bold text-muted my-0 font-size-12">
              Nama / Nomor Kamar
            </p>
            <p class="my-0 font-size-14 font-weight-bold">
              {{ data.guestName }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-3 my-3">
        <div class="d-flex">
          <div
            class="bg-primary-90 rounded-lg d-flex align-items-center justify-content-center px-2 my-1 mr-2"
          >
            <i class="ic-credit-card-buyer text-primary font-size-20 py-1"></i>
          </div>
          <div>
            <p class="font-weight-bold text-muted my-0 font-size-12">
              Nomor Kartu
            </p>
            <p class="my-0 font-size-14 font-weight-bold">
              {{ processFindData(data.meta, "stepThree", "rfId") }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-3 my-3">
        <div class="d-flex">
          <div
            class="bg-primary-90 rounded-lg d-flex align-items-center justify-content-center px-2 my-1 mr-2"
          >
            <i
              :class="`ic-${
                processCheckVehicle() ? 'car-01' : 'motorcycle'
              } text-primary font-size-20 py-1`"
            ></i>
          </div>
          <div>
            <p class="font-weight-bold text-muted my-0 font-size-12">
              Jenis Kendaraan
            </p>
            <p class="my-0 font-size-14 font-weight-bold">
              <span v-if="processCheckVehicle()">Mobil</span>
              <span v-else>Motor</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-3 my-3">
        <div class="d-flex">
          <div
            class="bg-primary-90 rounded-lg d-flex align-items-center justify-content-center px-2 my-1 mr-2"
          >
            <i class="ic-keyboard-01 text-primary font-size-20 py-1"></i>
          </div>
          <div>
            <p class="font-weight-bold text-muted my-0 font-size-12">
              Plat Nomor
            </p>
            <p class="my-0 font-size-14 font-weight-bold">
              {{ processFindData(data.meta, "stepTwo", "licensePlate") }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-3 my-2">
        <p class="font-weight-bold text-muted my-0 font-size-12">Status</p>
        <p class="my-1" v-html="processSetLabelStatus(data)"></p>
      </div>

      <div class="col-12 col-lg-3 my-2">
        <p class="font-weight-bold text-muted my-0 font-size-12">
          Duplikasi Kartu
        </p>
        <p class="my-1 font-size-14">
          <span v-if="data.isDuplicate">
            <i class="ic-check-circle"></i> Ya
          </span>
          <span v-else><i class="ic-alert-circle"></i> Tidak</span>
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
                'ocrFile',
              )}`"
              alt="form-guest"
              class="img-fluid rounded border"
            />
            <a
              :href="`${$utility.getBaseAssetUrl()}/${processFindData(
                data.meta,
                'stepOne',
                'ocrFile',
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
        this.transactionIn.vehicle_code ?? "MT2",
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
      let iconLabel = "ic-alert-circle";
      if (data.status === "ACTIVE") {
        if (
          new Date().setHours(11, 59, 59, 0) >
          new Date(data.guestCheckout).setHours(11, 59, 59, 0)
        ) {
          iconLabel = "ic-error-circle";
          statusLabel = "Kedaluwarsa";
        } else {
          statusLabel = "AKTIF";
          iconLabel = "ic-parking-circle";
          cssClass = "primary";
        }
      } else if (data.status === "CHECKEDOUT") {
        statusLabel = "Sudah Check Out";
        iconLabel = "ic-check-circle";
        cssClass = "success";
      }

      return `<span class="badge font-size-12 p-2 text-${cssClass} bg-${cssClass}-90">
        <i class="${iconLabel} mr-1"></i>
        ${statusLabel}
        </span>`;
    },
  },
};
</script>

<style></style>
