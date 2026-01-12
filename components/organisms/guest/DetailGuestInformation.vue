<template>
  <div class="row">
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
      <p class="my-0 font-size-13">101</p>
    </div>

    <div class="col-12 col-lg-3 my-2">
      <p class="font-weight-bold text-muted my-0 font-size-11">Nomor Kartu</p>
      <p class="my-0 font-size-13">123490123456</p>
    </div>

    <div class="col-12 col-lg-3 my-2">
      <p class="font-weight-bold text-muted my-0 font-size-11">
        Jenis Kendaraan
      </p>
      <p class="my-0 font-size-13">Motor/Mobil</p>
    </div>

    <div class="col-12 col-lg-3 my-2">
      <p class="font-weight-bold text-muted my-0 font-size-11">Plat Nomor</p>
      <p class="my-0 font-size-13">B1281SPN</p>
    </div>

    <div class="col-12 col-lg-3 my-2">
      <p class="font-weight-bold text-muted my-0 font-size-11">
        Waktu Input Sistem
      </p>
      <p class="my-0 font-size-13">22 Januari 2024, 14:51</p>
    </div>

    <div class="col-12 col-lg-3 my-2">
      <p class="font-weight-bold text-muted my-0 font-size-11">
        Duplikasi Kartu
      </p>
      <p class="my-0 font-size-13">
        <i class="ic-alert-circle"></i> Tidak <i class="ic-check-circle"></i> Ya
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

    <div class="col-12 col-lg-3 my-2">
      <p class="font-weight-bold text-muted my-0 font-size-11">Status Tamu</p>
      <p class="my-0 font-size-13">
        <span class="badge badge-success px-2 py-1 font-size-10">Aktif</span>
      </p>
    </div>

    <plain-modal v-model="modal.ocr" size="lg">
      <div class="row">
        <div class="col-12 col-lg-4">
          <p class="font-weight-bold my-1">Form Tamu</p>
          <img
            src="https://placehold.co/300x300"
            alt="form-guest"
            class="img-fluid rounded border"
          />
          <a href="#" target="_blank">
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
            style="overflow: scroll; font-family: consolas, monospace; max-height: 400px !important;"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            consequatur quaerat minima explicabo quidem, amet eius illum
            suscipit labore quod laboriosam eligendi quisquam, quis eum. Dolorum
            similique tempore earum quia?
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            consequatur quaerat minima explicabo quidem, amet eius illum
            suscipit labore quod laboriosam eligendi quisquam, quis eum. Dolorum
            similique tempore earum quia?
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            consequatur quaerat minima explicabo quidem, amet eius illum
            suscipit labore quod laboriosam eligendi quisquam, quis eum. Dolorum
            similique tempore earum quia?
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            consequatur quaerat minima explicabo quidem, amet eius illum
            suscipit labore quod laboriosam eligendi quisquam, quis eum. Dolorum
            similique tempore earum quia?
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            consequatur quaerat minima explicabo quidem, amet eius illum
            suscipit labore quod laboriosam eligendi quisquam, quis eum. Dolorum
            similique tempore earum quia?
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            consequatur quaerat minima explicabo quidem, amet eius illum
            suscipit labore quod laboriosam eligendi quisquam, quis eum. Dolorum
            similique tempore earum quia?
            <br />
          </div>
        </div>
      </div>
    </plain-modal>
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
      ocr: true,
    },
  }),
};
</script>

<style></style>
