<template>
  <div class="bg-white border rounded p-3">
    <div v-if="data.id">
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
            Tanggal Input:
            {{
              $utility.formatDateMoment(
                new Date(data.created_at),
                "DD/MM/YYYY HH:mm:ss",
              )
            }}
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
              {{ processFindData(data.meta, "stepTwo", "licensePlate") }}
            </span>
          </div>
        </div>

        <div class="d-flex justify-content-between font-size-11">
          <div class="text-muted">Kendaraan</div>
          <div>
            <i
              v-if="processCheckVehicle()"
              class="ic-motorcycle font-size-14 mt-1"
            ></i>
            <i v-else class="ic-car-01 font-size-14 mt-1"></i>
          </div>
        </div>

        <div class="d-flex justify-content-between font-size-11 mb-1">
          <div class="text-muted">Jenis Tiket Masuk</div>
          <div>
            {{ transactionIn.e_card_id ? "Kartu/E-Money" : "Karcis" }}
          </div>
        </div>

        <div class="d-flex justify-content-between font-size-11 mb-1">
          <div class="text-muted">Kode Tiket Masuk</div>
          <div>
            {{
              String(data.checkinTransactionId).substring(0, 6).toUpperCase()
            }}
          </div>
        </div>

        <div class="d-flex justify-content-between font-size-11 mb-1">
          <div class="text-muted">Waktu Checkin</div>
          <div>
            {{
              $utility.formatDateMoment(
                new Date(data.guestCheckin),
                "DD MMMM YYYY",
              )
            }}
          </div>
        </div>

        <div class="d-flex justify-content-between font-size-11 mb-1">
          <div class="text-muted">Total Menginap</div>
          <div>{{ processsCountDateDifference() }} Malam</div>
        </div>

        <div class="d-flex justify-content-between font-size-11 mb-1">
          <div class="text-muted">Jenis Tiket Keluar</div>
          <div>
            <span v-if="transactionOut.id">
              {{ transactionOut.e_card_id ? "Kartu/E-Money" : "Karcis" }}
            </span>
            <span v-else>-</span>
          </div>
        </div>

        <div class="d-flex justify-content-between font-size-11 mb-1">
          <div class="text-muted">Kode Tiket Keluar</div>
          <div>
            <span v-if="data.checkoutTransactionId !== ''">
              {{
                String(data.checkoutTransactionId).substring(0, 6).toUpperCase()
              }}
            </span>
            <span v-else>-</span>
          </div>
        </div>

        <div class="d-flex justify-content-between font-size-11 mb-1">
          <div class="text-muted">Waktu Checkout</div>
          <div>
            <div>
              {{
                $utility.formatDateMoment(
                  new Date(data.guestCheckout),
                  "DD MMMM YYYY",
                )
              }}
            </div>
          </div>
        </div>

        <div class="mt-3" v-if="data.status !== 'CHECKEDOUT'">
          <active-button
            text="Buat Kartu Baru"
            type="outline"
            size="sm"
            variant="dark"
            text_color="dark"
            v-if="!data.isDuplicate"
            @click="$emit('duplicateRequest')"
            additional_class="w-100 px-3"
          />
        </div>

        <div class="mt-1" v-if="data.status !== 'CHECKEDOUT'">
          <active-button
            text="Proses Checkout"
            type="outline"
            size="sm"
            variant="success"
            text_color="success"
            @click="$emit('checkoutRequest')"
            additional_class="w-100 px-3"
          />
        </div>
      </div>
    </div>
    <div v-else class="py-5 my-5">
      <p class="text-center text-muted font-size-12 my-3 w-100">
        <i class="ic-alert-circle"></i>
        Tidak ada data untuk ditampilkan
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    transactionIn: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    transactionOut: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  methods: {
    processFindData(data, step, key) {
      const DATA = JSON.parse(data);
      return DATA[step] ? DATA[step].data[key] : null;
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
  },
};
</script>

<style></style>
