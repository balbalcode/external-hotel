<template>
  <div class="bg-white border rounded p-3">
    <div class="d-flex">
      <div class="mr-1">
        <i
          class="ic-users-check font-size-20 text-info rounded-circle"
          style="
            background-color: #a6cdfe;
            border: 3px solid #cfe4ff;
            padding: 3px;
          "
        >
        </i>
      </div>
      <div class="mt-n1 pt-1 ml-1">
        <p class="font-weight-bold my-0">Ringkasan Informasi</p>
        <p class="text-muted font-size-8 my-0 mt-n1">
          Tanggal Input: 22 Januari 2020 14:41
        </p>
      </div>
    </div>

    <div class="my-3">
      <div class="d-flex justify-content-between font-size-11 mb-1">
        <div class="text-muted">Plat Nomor</div>
        <div>
          <span
            class="border border-gray-70 rounded font-size-9 font-weight-bold px-2 py-1"
          >
            B1281SPN
          </span>
        </div>
      </div>

      <div class="d-flex justify-content-between font-size-11">
        <div class="text-muted">Kendaraan</div>
        <div>
          <i class="ic-car-01 font-size-14 mt-1"></i>
          <i class="ic-motorcycle font-size-14 mt-1"></i>
        </div>
      </div>

      <div class="d-flex justify-content-between font-size-11 mb-1">
        <div class="text-muted">Jenis Tiket Masuk</div>
        <div>Kartu/E-Money</div>
      </div>

      <div class="d-flex justify-content-between font-size-11 mb-1">
        <div class="text-muted">Kode Tiket Masuk</div>
        <div>uuid</div>
      </div>

      <div class="d-flex justify-content-between font-size-11 mb-1">
        <div class="text-muted">Waktu Checkin</div>
        <div>2 Januari 2026 14:51:32</div>
      </div>

      <div class="d-flex justify-content-between font-size-11 mb-1">
        <div class="text-muted">Total Menginap</div>
        <div>3 Hari 2 Malam</div>
      </div>

      <div class="d-flex justify-content-between font-size-11 mb-1">
        <div class="text-muted">Jenis Tiket Keluar</div>
        <div>-</div>
      </div>

      <div class="d-flex justify-content-between font-size-11 mb-1">
        <div class="text-muted">Kode Tiket Keluar</div>
        <div>-</div>
      </div>

      <div class="d-flex justify-content-between font-size-11 mb-1">
        <div class="text-muted">Waktu Checkout</div>
        <div>-</div>
      </div>
    </div>

    <div class="mt-3">
      <active-button
        text="Buat Kartu Baru"
        type="outline"
        size="sm"
        variant="dark"
        text_color="dark"
        @click="$emit('new-card')"
        additional_class="w-100 px-3"
      />
    </div>

    <div class="mt-1">
      <active-button
        text="Proses Checkout"
        type="outline"
        size="sm"
        variant="success"
        text_color="success"
        @click="$emit('checkout-request')"
        additional_class="w-100 px-3"
      />
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
