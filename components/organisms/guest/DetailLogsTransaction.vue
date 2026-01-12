<template>
  <div class="row mt-3">
    <div class="col-12 col-lg-12">
      <p class="font-weight-bold font-size-14 mb-0">Transaksi Tamu</p>
      <p class="font-size-11 text-secondary mb-2">
        Informasi kartu checkin dan checkout tamu selama menginap
      </p>
    </div>

    <div class="col-12 col-lg-4 cursor-pointer">
      <div class="rounded bg-light p-2 border">
        <div>
          <p class="my-0 font-weight-bold text-muted font-size-10">
            Tiket Masuk (E-Money)
          </p>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="mt-1 mb-2">
            <p class="my-0 font-weight-bold text-muted font-size-14">
              Mobil - AB2F10
            </p>
            <p class="my-0 font-size-9">Waktu Masuk: 2 Jan 2024, 14:51</p>
          </div>
          <div>
            <i class="ic-log-in-03 font-size-20 text-success"></i>
          </div>
        </div>
        <div>
          <p class="my-0 font-size-9 text-muted">
            <i class="ic-alert-circle"></i> Klik untuk melihat lebih lengkap
          </p>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-4 cursor-pointer">
      <div class="rounded bg-light p-2 border">
        <div>
          <p class="my-0 font-weight-bold text-muted font-size-10">
            Tiket Keluar (Karcis)
          </p>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="mt-1 mb-2">
            <p class="my-0 font-weight-bold text-muted font-size-14">
              Mobil - AB2F10
            </p>
            <p class="my-0 font-size-9">Waktu Masuk: 2 Jan 2024, 14:51</p>
          </div>
          <div>
            <i class="ic-log-out-03 font-size-20 text-danger"></i>
          </div>
        </div>
        <div>
          <p class="my-0 font-size-9 text-muted">
            <i class="ic-alert-circle"></i> Klik untuk melihat lebih lengkap
          </p>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-4 cursor-pointer h-100">
      <div class="rounded bg-light p-2 border">
        <div>
          <p class="my-0 font-weight-bold text-muted font-size-10">
            Tiket Keluar (Karcis)
          </p>
        </div>
        <div
          class="d-flex justify-content-center flex-column align-items-center"
        >
          <div class="mt-2">
            <i class="ic-alert-circle font-size-20"></i>
          </div>
          <div class="font-size-11 mb-2 text-muted">Tiket belum dibuat</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
