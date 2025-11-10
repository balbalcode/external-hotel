<template>
  <div class="d-flex border border-light rounded-lg bg-white p-3">
    <div class="mr-3 mt-3">
      <i
        class="ic-alarm-clock font-size-16 text-warning rounded-circle"
        style="
          background-color: #fef0c7;
          border: 6px solid #fffaeb;
          padding: 6px;
        "
      ></i>
    </div>
    <div>
      <p class="mb-0">
        <span class="font-weight-bold"> Tagihan Belum Dibayarkan </span>
        <br />
        Anda memiliki tagihan yang belum dibayar. Silakan selesaikan pembayaran
        sebelum batas waktu yang ditentukan
        <br />
        <span
          class="text-primary cursor-pointer"
          @click="$router.push('/transaction/history/invoice?id=xxxx')"
        >
          Tampilkan tagihan
          <i class="ic-arrow-narrow-up-right"></i>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style></style>
