<template>
  <div>
    <div class="mt-0 d-flex mb-3">
      <div class="badge badge-pill pt-1 badge-primary">2</div>
      <div class="font-size-12 ml-2 font-weight-bold">Kendaraan</div>
    </div>

    <div class="row">
      <div class="col-12 col-lg-12 mb-2">
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
        <div class="rounded border border-secondary-90 h-100">
          <div class="p-1" v-if="data.selectedTransaction.id">
            <div class="col-12 font-size-12 font-weight-bold mt-2">
              Kendaraan Tamu Ditemukan
            </div>
            <div class="row rounded mb-1 p-1 m-0">
              <div class="col-lg-2 p-2">
                <div class="position-relative">
                  <img
                    :src="data.selectedTransaction.image_url"
                    class="img-fluid cursor-pointer"
                    @mouseenter="helper.showTooltip = true"
                    @mouseleave="helper.showTooltip = false"
                  />
                  <div
                    v-if="helper.showTooltip"
                    class="position-absolute bg-white border shadow-sm p-1"
                    style="
                      bottom: 100%;
                      left: 50%;
                      transform: translateX(-50%);
                      z-index: 1000;
                      margin-bottom: 5px;
                    "
                  >
                    <img
                      :src="data.selectedTransaction.image_url"
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
                      {{ data.selectedTransaction.search_key }}
                    </p>
                  </div>
                  <div class="ml-3">
                    <p class="my-1 text-muted font-size-10">Waktu Masuk</p>
                    <p class="my-1 font-weight-bold">
                      {{
                        $utility.formatDateMoment(
                          data.selectedTransaction.time_in,
                          "DD-MM-YYYY HH:mm:ss"
                        )
                      }}
                    </p>
                  </div>
                  <div class="ml-3">
                    <p class="my-1 text-muted font-size-10">Jenis Kendaraan</p>
                    <p class="my-1 font-weight-bold">
                      {{ data.selectedTransaction.vehicle_code }}
                    </p>
                  </div>
                  <div class="ml-3">
                    <p class="my-1 text-muted font-size-10">Akses Masuk</p>
                    <p class="my-1 font-weight-bold">
                      {{
                        data.selectedTransaction.emoney_card_id
                          ? "E-Money"
                          : "Tiket"
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="row p-2 mx-0 mt-n2">
              <div class="col-lg-12 bg-light p-2 rounded mx-1">
                <p class="font-size-12 font-weight-bold my-0">
                  <i class="bx bx-error-circle"></i>
                  Scan Kartu Kamar atau Kartu Khusus
                </p>
                <p class="text-muted font-size-11 mb-0 mt-1">
                  Gunakan kartu kamar atau kartu khusus untuk memberikan parkir
                  gratis kendaraan tamu dan Pastikan anda telah memeriksa data
                  kendaraan tamu dengan benar sebelum memberikan parkir gratis.
                </p>
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
                Arahkan E-Money ke reader untuk melakukan scan secara otomatis.
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
                        message: 'Kode Transaksi tidak kurang dari 6 karakter',
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
          </div>
        </div>
      </div>
      <div
        class="col-12 col-lg-6 mt-2 h-100 d-flex flex-column justify-content-center"
      >
        <p
          class="my-0 font-size-10 text-muted"
          v-if="!helper.loading.membership && !helper.wasCheckCard"
        >
          <i class="bx bx-error-circle"></i>
          Anda belum memindai kartu kamar atau kartu khusus untuk memberikan
          parkir gratis pada kendaraan tamu.
        </p>

        <p
          class="my-0 font-size-10 text-muted"
          v-else-if="!helper.loading.membership && helper.wasCheckCard"
        >
          <i class="bx bx-check-circle"></i>
          Kartu kamar berhasil dipindai. Kode Kartu: {{ data.rfId }}
        </p>

        <p
          class="my-0 font-size-10 text-muted"
          v-else-if="helper.loading.membership"
        >
          <i class="bx bx-spinner bx-spin"></i>
          Memproses kartu, mohon tunggu...
        </p>
      </div>
      <div class="col-12 col-lg-6 text-right mt-2 px-2">
        <template v-if="data.selectedTransaction.id">
          <active-button
            v-if="
              !helper.loading.membership &&
              helper.wasCheckCard &&
              !helper.conflictMember
            "
            text="Proses Benefit Parkir"
            test_id="btn_start_scan_rfid"
            id="btn_start_scan_rfid"
            ref="btn_start_scan_rfid"
            @click="processSubmitForm"
          />
          <active-button
            v-if="!helper.loading.membership"
            :text="`${
              helper.wasCheckCard ? 'Pindai Ulang Kartu' : 'Scan Kartu Sekarang'
            }`"
            :type="helper.wasCheckCard ? 'outline' : ''"
            test_id="btn_start_scan_rfid"
            id="btn_start_scan_rfid"
            ref="btn_start_scan_rfid"
            @click="processStartScanRFID"
          />
          <active-button
            v-else
            text="Scan Kartu Sekarang"
            test_id="btn_loading_scan_rfid"
            id="btn_loading_scan_rfid"
            ref="btn_loading_scan_rfid"
            is_disabled
          />
        </template>
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
        v-if="helper.selectedFinder !== 'key'"
        label="Kode Transaksi"
        :is_submitted="filter.isSubmitted"
        @submit="processSubmitTransaction"
        placeholder="Contoh: AB2356"
        :error_message="[
          {
            state: $v.filter.transaction.key.required,
            message: 'Kode Transaksi tidak boleh kosong',
          },
        ]"
        :test_id="`${id}__key`"
        :ref="`${id}__key`"
      />
    </div>

    <div style="width: 1px !important; height: 1px; overflow: hidden">
      <input-text-group
        v-model="filter.membership.rfid"
        :is_error="$v.filter.membership.rfid.$error"
        v-if="data.selectedTransaction.id"
        label_info=""
        id="txt_rfid"
        additional_class_group="my-1 mx-1"
        additional_class_label="my-0 font-size-11 font-weight-bold d-none"
        size="sm"
        label="Kode Kartu"
        :is_submitted="filter.isSubmitted"
        @submit="processSubmitMembership"
        placeholder="Contoh: AB2356"
        :error_message="[
          {
            state: $v.filter.membership.rfid.required,
            message: 'Kode Kartu tidak boleh kosong',
          },
        ]"
        :test_id="`${id}__rfid`"
        :ref="`${id}__rfid`"
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
      id: "FormGuestVehicleFinder",
      transaction: [],
      data: {
        isNewMembership: false,
        rfId: "",
        cardId: "",
        selectedTransaction: {},
        selectedMembership: {},
      },
      filter: {
        membership: {
          rfid: "",
          isSubmitted: false,
        },
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
          membership: false,
        },
        wasCheckCard: false,
        showTooltip: false,
        selectedFinder: "rfid",
      },
    };
  },
  watch: {
    "helper.selectedFinder": {
      deep: true,
      handler() {
        this.data = {
          isNewMembership: false,
          rfId: "",
          cardId: "",
          selectedTransaction: {},
        };
        this.filter.transaction = {
          key: "",
          isSubmitted: false,
        };
        this.helper.wasCheckCard = false;
        this.helper.loading.membership = false;
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
          },
        },
        membership: {
          rfid: { required },
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
      }

      return payload;
    },

    setPayloadMembership() {
      return {
        filter: [
          { key: "spot_id", value: this.$utility.getSpotId() },
          { key: "rf_id", value: this.filter.membership.rfid },
          { key: "history", value: true },
        ],
        pagination: {
          page: 1,
          per_page: 10,
        },
      };
    },

    processStartScanEmoney() {
      this.helper.loading.emoney = true;
      document.getElementById("input-txt_key").focus();
    },

    processStartScanRFID() {
      this.helper.loading.membership = true;
      this.helper.wasCheckCard = false;
      this.filter.membership.isSubmitted = false;
      this.$v.filter.membership.$reset();
      this.filter.membership.rfid = "";
      this.data.isNewMembership = false;
      this.data.rfId = "";
      this.data.cardId = "";
      document.getElementById("input-txt_rfid").focus();
    },

    processSubmitForm() {
      this.$emit("submit", {
        data: {
          selectedTransaction: this.data.selectedTransaction,
          transactionId: this.data.selectedTransaction.id,
          isNewMembership: this.data.isNewMembership,
          rfId: this.data.rfId,
          cardId: this.data.cardId,
          selectedMembership: this.data.selectedMembership,
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

    processCheckingMembership(membership) {
      if (parseInt(membership.end) > parseInt(new Date().getTime())) {
        this.setDefaultErrorAlert({
          message:
            "Kartu yang anda scan masih memiliki masa aktif, silahkan pindai kartu lain atau hentikan masa aktif pada halaman manajemen kartu.",
        });
        this.helper.conflictMember = true;
      }
      this.data.isNewMembership = false;
      this.data.rfId = membership.rf_id;
      this.data.cardId = membership.card_id;
      this.data.selectedMembership = membership;
    },

    async processSearchMembership() {
      try {
        this.helper.loading.membership = true;
        this.helper.wasCheckCard = true;
        this.helper.conflictMember = false;
        const payload = this.setPayloadMembership();
        const { values, total_values } = await this.getMembership(payload);
        if (total_values > 0) {
          this.processCheckingMembership(values[0]);
        } else {
          this.data.isNewMembership = true;
          this.data.rfId = this.filter.membership.rfid;
          this.data.cardId = "";
        }
      } catch (error) {
        this.data.isNewMembership = true;
        this.data.rfId = this.filter.membership.rfid;
        this.data.cardId = "";
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processSearchMembership in FormGuestMembership`
        );
      } finally {
        this.helper.loading.membership = false;
      }
    },

    async processSearchTransaction() {
      try {
        this.helper.loading.transaction = true;
        const payload = this.setPayloadTransaction();
        const { values, total_values } = await this.getDataResolution(payload);
        this.transaction = values;
        if (total_values > 0) {
          this.data.selectedTransaction = values[0];
        }
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processSearchTransaction in FormGuestMembership`
        );
      } finally {
        this.helper.loading.transaction = false;
      }
    },
  },
};
</script>

<style></style>
