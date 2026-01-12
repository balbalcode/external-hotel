<template>
  <div>
    <div class="row mt-4">
      <div class="col-12 col-lg-12">
        <p class="font-weight-bold font-size-14 mb-0">
          Riwayat Pengunaan Kartu
        </p>
        <p class="font-size-11 text-secondary mb-2">
          Daftar riwayat penggunaan kartu oleh tamu selama menginap di hotel.
        </p>
      </div>
    </div>

    <div class="rounded border p-0 overflow-hidden">
      <div class="row m-0">
        <div class="col-12 col-lg-2 bg-light p-2 font-weight-bold">
          Kode Transaksi
        </div>
        <div class="col-12 col-lg-3 bg-light p-2 font-weight-bold">
          Waktu Masuk
        </div>
        <div class="col-12 col-lg-3 bg-light p-2 font-weight-bold">
          Waktu Keluar
        </div>
        <div class="col-12 col-lg-1 bg-light p-2 font-weight-bold">Status</div>
        <div class="col-12 col-lg-2 bg-light p-2 font-weight-bold">
          Kendaraan
        </div>
        <div class="col-12 col-lg-1 bg-light p-2 font-weight-bold">Detail</div>
      </div>
      <div class="row m-0">
        <div class="col-12 col-lg-2 p-2">item.exitDoor</div>
        <div class="col-12 col-lg-3 p-2">item.entryTime</div>
        <div class="col-12 col-lg-3 p-2">item.exitTime</div>
        <div class="col-12 col-lg-1 p-2">
          <span> item.status</span>
        </div>
        <div class="col-12 col-lg-2 p-2">item.entryDoor</div>
        <div class="col-12 col-lg-1 p-2">
          <button class="btn btn-sm btn-primary">Lihat</button>
        </div>
      </div>
      <div class="row m-0">
        <div class="col-12 col-lg-2 p-2">item.exitDoor</div>
        <div class="col-12 col-lg-3 p-2">item.entryTime</div>
        <div class="col-12 col-lg-3 p-2">item.exitTime</div>
        <div class="col-12 col-lg-1 p-2">
          <span> item.status</span>
        </div>
        <div class="col-12 col-lg-2 p-2">item.entryDoor</div>
        <div class="col-12 col-lg-1 p-2">
          <button class="btn btn-sm btn-primary">Lihat</button>
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
};
</script>

<style></style>
