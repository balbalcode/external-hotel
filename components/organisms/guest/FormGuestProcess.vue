<template>
  <div class="">
    <div class="row">
      <div class="col-12 d-none d-md-block col-lg-4">
        <div class="h-100 d-flex justify-content-center align-items-center">
          <div>
            <Lottie :options="defaultOptions" :width="198" :height="144" />
            <p
              class="font-weight-bold mt-n3 font-size-9 text-muted text-center"
            >
              Mohon tunggu, <br />Kartu sedang disiapkan...
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-8">
        <div class="d-flex align-items-top my-3">
          <div v-if="currentProcess >= 2" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="currentProcess === 1" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                currentProcess >= 2
                  ? 'text-success'
                  : currentProcess === 1
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menyimpan informasi tamu
              </span>
              <span class="d-block font-size-9">
                {{
                  currentProcess >= 2
                    ? "Berhasil menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-in ke server"
                    : currentProcess === 1
                    ? "Sistem sedang menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-in ke server"
                    : "Menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-in ke server"
                }}
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex align-items-top my-3">
          <div v-if="currentProcess >= 3" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="currentProcess === 2" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                currentProcess >= 3
                  ? 'text-success'
                  : currentProcess === 2
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menyimpan informasi kendaraan
              </span>
              <span class="d-block font-size-9">
                {{
                  currentProcess >= 3
                    ? "Berhasil menyimpan data log informasi kendaraan tamu seperti nomor plat, jenis kendaraan, dan waktu masuk ke server"
                    : currentProcess === 2
                    ? "Sistem sedang menyimpan data log informasi kendaraan tamu seperti nomor plat, jenis kendaraan, dan waktu masuk ke server"
                    : "Menyimpan data log informasi kendaraan tamu seperti nomor plat, jenis kendaraan, dan waktu masuk ke server"
                }}
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex align-items-top my-3">
          <div v-if="currentProcess >= 4" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="currentProcess === 3" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                currentProcess >= 4
                  ? 'text-success'
                  : currentProcess === 3
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menghubungkan transaksi kendaraan
              </span>
              <span class="d-block font-size-9">
                {{
                  currentProcess >= 4
                    ? "Berhasil menyimpan data log informasi transaksi yang digunakan oleh tamu sebelumnya ke server"
                    : currentProcess === 3
                    ? "Sistem sedang menyimpan data log informasi transaksi yang digunakan oleh tamu sebelumnya ke server"
                    : "Menyimpan data log informasi transaksi yang digunakan oleh tamu sebelumnya ke server"
                }}
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex align-items-top my-3">
          <div v-if="currentProcess >= 4" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="currentProcess === 3" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                currentProcess >= 4
                  ? 'text-success'
                  : currentProcess === 3
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menyimpan log informasi tamu
              </span>
              <span class="d-block font-size-9">
                {{
                  currentProcess >= 4
                    ? "Berhasil menyimpan data log aktivitas aktivasi ke server"
                    : currentProcess === 3
                    ? "Sistem sedang menyimpan data log aktivitas aktivasi ke server"
                    : "Menyimpan data log aktivitas aktivasi ke server"
                }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lottie from "vue-lottie";
import animationData from "~/static/animationData.json";
export default {
  components: {
    Lottie,
  },
  computed: {
    defaultOptions() {
      return {
        loop: true,
        autoplay: true,
        animationData: animationData,
      };
    },
  },
  data() {
    return {
      currentProcess: 2,
    };
  },
  methods: {
    nextProcess() {
      if (this.currentProcess < 5) {
        this.currentProcess++;
      }
    },
  },
};
</script>

<style></style>
