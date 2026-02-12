<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-12 my-2">
        <p class="font-weight-bold my-0">Pencarian kendaraan pengguna</p>
        <p class="text-muted my-0 font-size-10">
          Anda harus memasukkan informasi kendaraan tamu untuk dapat memberikan
          parkir gratis.
        </p>
      </div>
      <div class="col-12 col-lg-4">
        <div class="d-flex flex-column align-items-top">
          <div
            :class="`col-12 rounded cursor-pointer  p-2 mt-1 ${
              helper.selectedFinder === 'license'
                ? 'bg-white border border-primary'
                : 'bg-white border border-secondary-90 text-muted'
            }`"
            @click="helper.selectedFinder = 'license'"
          >
            <div class="d-flex cursor-pointer">
              <div class="mr-2">
                <i class="ic-car-01"></i>
              </div>
              <div class="">
                <p class="my-0 font-size-12 font-weight-bold">
                  Pencarian Plat Nomor
                </p>
                <p class="my-0 font-size-10">
                  Pencarian tamu menggunakan plat nomor yang dideteksi pada saat
                  tamu masuk.
                </p>
              </div>
            </div>
          </div>

          <div
            :class="`col-12 rounded cursor-pointer  p-2 mt-1 ${
              helper.selectedFinder === 'id'
                ? 'bg-white border border-primary'
                : 'bg-white border border-secondary-90 text-muted'
            }`"
            @click="helper.selectedFinder = 'id'"
          >
            <div class="d-flex cursor-pointer">
              <div class="mr-2">
                <i class="ic-qr-code-01"></i>
              </div>
              <div class="">
                <p class="my-0 font-size-12 font-weight-bold">
                  Pencarian Scan Tiket
                </p>
                <p class="my-0 font-size-10">
                  Pencarian tamu menggunakan nomor tiket yang sudah terdaftar
                  dengan scanner kamera.
                </p>
              </div>
            </div>
          </div>

          <div
            :class="`col-12 rounded cursor-pointer  p-2 mt-1 ${
              helper.selectedFinder === 'rfid'
                ? 'bg-white border border-primary'
                : 'bg-white border border-secondary-90 text-muted'
            }`"
            @click="helper.selectedFinder = 'rfid'"
          >
            <div class="d-flex cursor-pointer">
              <div class="mr-2">
                <i class="ic-credit-card-search"></i>
              </div>
              <div class="">
                <p class="my-0 font-size-12 font-weight-bold">
                  Pencarian E-Money
                </p>
                <p class="my-0 font-size-10">
                  Pencarian tamu menggunakan e-money yang sudah digunakan untuk
                  masuk.
                </p>
              </div>
            </div>
          </div>

          <div
            :class="`col-12 rounded cursor-pointer  p-2 mt-1 ${
              helper.selectedFinder === 'key'
                ? 'bg-white border border-primary'
                : 'bg-white border border-secondary-90 text-muted'
            }`"
            @click="helper.selectedFinder = 'key'"
          >
            <div class="d-flex cursor-pointer">
              <div class="mr-2">
                <i class="ic-scan"></i>
              </div>
              <div class="">
                <p class="my-0 font-size-12 font-weight-bold">
                  Pencarian Kode QR
                </p>
                <p class="my-0 font-size-10">
                  Pencarian tamu dengan memasukkan kode QR yang terdapat pada
                  tiket.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-8 my-1">
        <div
          style="height: 300px !important; overflow-y: scroll; z-index: 10"
          class="rounded border border-secondary-90"
        >
          <div class="h-100">
            <div class="p-1" v-if="transaction.length > 0">
              <div class="col-12 font-size-12 font-weight-bold mt-2">
                Kendaraan Tamu Ditemukan
              </div>
              <div
                class="row rounded mb-1 p-1 m-0 cursor-pointer custom-hover"
                v-for="(trx, index) in transaction"
                :key="`trx-${index}`"
                @mouseenter="helper.hoverSuggestion = index"
                @mouseleave="helper.hoverSuggestion = null"
              >
                <div class="col-lg-2 p-2">
                  <div class="position-relative">
                    <img
                      :src="trx.image_url"
                      class="img-fluid cursor-pointer"
                      @mouseenter="
                        (e) => {
                          helper.showTooltip = index;
                          helper.tooltipPosition =
                            e.target.getBoundingClientRect();
                        }
                      "
                      @mouseleave="helper.showTooltip = null"
                    />
                    <div
                      v-if="helper.showTooltip === index"
                      class="position-fixed bg-white border shadow-sm p-1"
                      :style="`
                        top: ${helper.tooltipPosition.top - 190}px;
                        left: ${
                          helper.tooltipPosition.left +
                          helper.tooltipPosition.width / 2
                        }px;
                        transform: translateX(-50%);
                        z-index: 1000;
                      `"
                    >
                      <img
                        :src="trx.image_url"
                        style="width: 180px; height: 180px; object-fit: cover"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-10 p-0">
                  <div class="d-flex h-100 align-items-center">
                    <div>
                      <p class="my-1 text-muted font-size-10">Kode Tiket</p>
                      <p class="my-1 font-weight-bold">
                        {{ trx.search_key }}
                      </p>
                    </div>
                    <div class="ml-3">
                      <p class="my-1 text-muted font-size-10">Waktu Masuk</p>
                      <p class="my-1 font-weight-bold">
                        {{
                          $utility.momentAddDate(
                            trx.time_in,
                            "7",
                            "hours",
                            "DD-MM-YYYY HH:mm:ss",
                          )
                        }}
                      </p>
                    </div>
                    <div class="ml-3">
                      <p class="my-1 text-muted font-size-10">
                        Jenis Kendaraan
                      </p>
                      <p class="my-1 font-weight-bold">
                        {{ trx.vehicle_code }}
                      </p>
                    </div>
                    <div class="ml-3">
                      <template v-if="helper.hoverSuggestion !== index">
                        <p class="my-1 text-muted font-size-10">Akses Masuk</p>
                        <p class="my-1 font-weight-bold">
                          {{ trx.emoney_card_id ? "E-Money" : "Tiket" }}
                        </p>
                      </template>
                      <template v-else>
                        <active-button
                          text="Pilih"
                          size="sm"
                          additional_class="px-4 mt-2 "
                          @click="processSelectTransaction(trx)"
                        />
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="h-100 d-flex justify-content-center align-items-center"
            >
              <div
                :class="`text-center ${
                  helper.selectedFinder !== 'id' ? 'd-none' : ''
                }`"
              >
                <i class="ic-credit-card-search font-size-28 text-center"></i>
                <p class="my-0 text-center font-weight-bold font-size-12">
                  Scan Tiket
                </p>
                <p class="my-0 font-size-11 text-muted">
                  Arahkan Tiket ke reader untuk melakukan scan secara otomatis.
                </p>

                <active-button
                  text="Mulai Scan Tiket "
                  size="sm"
                  additional_class="px-3 py-1 mt-2 font-size-11 font-weight-bold"
                  :is_disabled="helper.loading.transaction"
                  @click="modal.scanner = true"
                />
              </div>

              <div
                :class="`text-center ${
                  helper.selectedFinder !== 'rfid' ? 'd-none' : ''
                }`"
              >
                <i class="ic-qr-code-01 font-size-28 text-center"></i>
                <p class="my-0 text-center font-weight-bold font-size-12">
                  Scan E-Money
                </p>
                <p class="my-0 font-size-11 text-muted">
                  Arahkan E-Money ke reader untuk melakukan scan secara
                  otomatis.
                </p>
                <active-button
                  text="Mulai Scan E-Money"
                  size="sm"
                  :is_disabled="helper.loading.transaction"
                  additional_class="px-3 py-1 mt-2 font-size-11 font-weight-bold"
                  @click="processStartScanEmoney"
                />
              </div>

              <div
                :class="`text-center ${
                  helper.selectedFinder !== 'key' ? 'd-none' : ''
                }`"
              >
                <i class="ic-scan font-size-28 text-center"></i>
                <p class="my-0 text-center font-weight-bold font-size-12">
                  Cari Kode Transaksi
                </p>
                <p class="my-0 font-size-11 text-muted">
                  Cari Kode Transaksi pada tiket secara manual.
                </p>

                <div class="d-flex justify-content-center text-left mt-1">
                  <div>
                    <input-text-group
                      v-model="filter.transaction.key"
                      :is_error="$v.filter.transaction.key.$error"
                      label_info=""
                      id="txt_key"
                      additional_class_group="my-1 mx-1"
                      additional_class_label="my-0 font-size-11 font-weight-bold d-none"
                      size="sm"
                      label="Kode Transaksi"
                      :is_submitted="filter.isSubmitted"
                      @submit="processSubmitTransaction"
                      placeholder="Contoh: AB2356"
                      :error_message="[
                        {
                          state: $v.filter.transaction.key.required,
                          message: 'Kode Transaksi tidak boleh kosong',
                        },
                        {
                          state: $v.filter.transaction.key.minLength,
                          message:
                            'Kode Transaksi tidak kurang dari 6 karakter',
                        },
                        {
                          state: $v.filter.transaction.key.maxLength,
                          message:
                            'Kode Transaksi tidak boleh lebih dari 6 karakter',
                        },
                      ]"
                      :test_id="`${id}__key`"
                      :ref="`${id}__key`"
                    />
                  </div>
                  <div>
                    <active-button
                      text="Cari"
                      :is_disabled="helper.loading.transaction"
                      size="sm"
                      @click="processSubmitTransaction"
                      additional_class="px-3 py-1 mt-1  font-size-11 font-weight-bold"
                    />
                  </div>
                </div>
              </div>

              <div
                :class="`text-center ${
                  helper.selectedFinder !== 'license' ? 'd-none' : ''
                }`"
              >
                <i class="ic-car-01 font-size-28 text-center"></i>
                <p class="my-0 text-center font-weight-bold font-size-12">
                  Cari Plat Nomor
                </p>
                <p class="my-0 font-size-11 text-muted">
                  Cari Plat Nomor pada tiket secara manual.
                </p>

                <div class="d-flex justify-content-center text-left mt-1">
                  <div>
                    <input-text-group
                      v-model="filter.transaction.key"
                      :is_error="$v.filter.transaction.key.$error"
                      label_info=""
                      id="txt_key"
                      additional_class_group="my-1 mx-1"
                      additional_class_label="my-0 font-size-11 font-weight-bold d-none"
                      size="sm"
                      format="license_plate"
                      label="Plat Nomor"
                      :is_submitted="filter.isSubmitted"
                      @submit="processSubmitTransaction"
                      placeholder="Contoh: B2729KGX"
                      :error_message="[
                        {
                          state: $v.filter.transaction.key.required,
                          message: 'Plat Nomor tidak boleh kosong',
                        },
                        {
                          state: $v.filter.transaction.key.minLength,
                          message:
                            'Plat Nomor tidak boleh lebih dari 3 karakter',
                        },
                      ]"
                      :test_id="`${id}__key`"
                      :ref="`${id}__key`"
                    />
                  </div>
                  <div>
                    <active-button
                      text="Cari"
                      :is_disabled="helper.loading.transaction"
                      size="sm"
                      @click="processSubmitTransaction"
                      additional_class="px-3 py-1 mt-1  font-size-11 font-weight-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-12 col-lg-6 mt-2 h-100 d-flex flex-column justify-content-center"
      ></div>
      <div class="col-12 col-lg-6 text-right mt-2 px-2">
        <active-button
          text="Batal"
          type="outline"
          variant="secondary"
          @click="$emit('cancel')"
          additional_class="mr-1 px-3"
        />
      </div>
    </div>

    <ModalScannerQrcode v-model="modal.scanner" @update="processGetScannedQR" />
    <!-- hidden input -->
    <div style="width: 1px !important; height: 1px; overflow: hidden">
      <input-text-group
        v-model="filter.transaction.key"
        :is_error="$v.filter.transaction.key.$error"
        label_info=""
        id="txt_key"
        additional_class_group="my-1 mx-1"
        additional_class_label="my-0 font-size-11 font-weight-bold d-none"
        size="sm"
        v-if="helper.selectedFinder === 'id'"
        label="ID Transaksi"
        :is_submitted="filter.isSubmitted"
        @submit="processSubmitTransaction"
        placeholder="Contoh: AB2356"
        :error_message="[
          {
            state: $v.filter.transaction.key.required,
            message: 'ID Transaksi tidak boleh kosong',
          },
        ]"
        :test_id="`${id}__key`"
        :ref="`${id}__key`"
      />
    </div>
  </div>
</template>

<script>
import { minLength, maxLength, required } from "vuelidate/lib/validators";
import {
  resolutionMethods,
  guestMethods,
  utilityMethods,
} from "@/store/helperActions";
export default {
  components: {
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    ModalScannerQrcode: () =>
      import("@utilities/molecules/modal-view/ModalScannerQrcode"),
  },
  data: () => {
    return {
      id: "FormBenefitGuest",
      transaction: [],
      data: {
        selectedTransaction: {},
      },
      filter: {
        transaction: {
          key: "",
          isSubmitted: false,
        },
      },
      modal: {
        scanner: false,
      },
      helper: {
        loading: {
          emoney: false,
          transaction: false,
        },
        hoverSuggestion: null,
        wasCheckCard: false,
        showTooltip: null,
        tooltipPosition: { top: 0, left: 0, width: 0 },
        selectedFinder: "rfid",
      },
    };
  },
  watch: {
    "helper.selectedFinder": {
      deep: true,
      handler() {
        this.data = {
          selectedTransaction: {},
        };
        this.filter.transaction = {
          key: "",
          isSubmitted: false,
        };
        this.helper.wasCheckCard = false;
        this.$v.filter.$reset();
      },
      immediate: false,
    },
  },
  validations() {
    return {
      filter: {
        transaction: {
          key: {
            required,
            ...(this.helper.selectedFinder === "key" && {
              minLength: minLength(6),
              maxLength: maxLength(6),
            }),
            ...(this.helper.selectedFinder === "license" && {
              minLength: minLength(3),
            }),
          },
        },
      },
    };
  },
  methods: {
    getDataResolution: resolutionMethods.getDataResolution,
    updateDataResolution: resolutionMethods.updateDataResolution,
    getMembership: guestMethods.getMembership,
    setDefaultErrorAlert: utilityMethods.setDefaultErrorAlert,

    setPayloadTransaction() {
      let payload = {
        filter: [
          { key: "spot_id", value: this.$utility.getSpotId() },
          { key: "values", value: this.filter.transaction.key },
        ],
      };

      if (this.helper.selectedFinder === "id") {
        payload.filter.push({ key: "type", value: "id" });
      } else if (this.helper.selectedFinder === "key") {
        payload.filter.push({ key: "type", value: "key" });
      } else if (this.helper.selectedFinder === "license") {
        payload.filter.push({ key: "type", value: "license" });
      }

      return payload;
    },

    processSelectTransaction(trx) {
      this.data.selectedTransaction = trx;
      this.processSubmitForm();
    },

    processStartScanEmoney() {
      this.helper.loading.emoney = true;
      document.getElementById("input-txt_key").focus();
    },

    processSubmitForm() {
      this.$emit("submit", {
        data: {
          selectedTransaction: this.data.selectedTransaction,
          transactionId: this.data.selectedTransaction.id,
          isNewMembership: false,
          rfId: "",
          cardId: "",
          selectedMembership: {},
        },
      });
    },

    processSubmitTransaction() {
      this.filter.transaction.isSubmitted = true;
      this.$v.filter.transaction.$touch();
      if (!this.$v.filter.transaction.$invalid) {
        this.processSearchTransaction();
      }
    },

    processGetScannedQR(value) {
      value = value.split(".");
      this.filter.transaction.key = value[0];
      this.processSubmitTransaction();
    },

    processSubmitMembership() {
      this.filter.membership.isSubmitted = true;
      this.$v.filter.membership.$touch();
      if (!this.$v.filter.membership.$invalid) {
        this.processSearchMembership();
      }
    },

    async processSearchTransaction() {
      try {
        this.helper.loading.transaction = true;
        const payload = this.setPayloadTransaction();
        const { values, total_values } = await this.getDataResolution(payload);
        this.transaction = values;
        if (total_values === 0) {
          this.data.selectedTransaction = values[0];
        }
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processSearchTransaction in FormGuestMembership`,
        );
      } finally {
        this.helper.loading.transaction = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/init/_color.scss";

.custom-hover {
  transition: background-color 0.2s ease;
  &:hover {
    background-color: mix(white, $primary, 90%);
  }
}
</style>
