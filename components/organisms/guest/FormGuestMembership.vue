<template>
  <div>
    <div class="mt-0 d-flex mb-3">
      <div class="badge badge-pill pt-1 badge-primary">2</div>
      <div class="font-size-12 ml-2 font-weight-bold">Kendaraan</div>
    </div>

    <pre>
      {{ $v.filter }}
      </pre
    >

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
        <input-text-group
          v-model="filter.key"
          :is_error="$v.filter.key.$error"
          label_info=""
          id="txt_key"
          additional_class_group="my-1 mx-1 d-none"
          additional_class_label="my-0 font-size-11 font-weight-bold d-none"
          size="sm"
          v-if="helper.selectedFinder !== 'key'"
          label="Kode Transaksi"
          :is_submitted="filter.isSubmitted"
          @submit="processSubmitSearch"
          placeholder="Contoh: AB2356"
          :error_message="[
            {
              state: $v.filter.key.required,
              message: 'Kode Transaksi tidak boleh kosong',
            },
          ]"
          :test_id="`${id}__key`"
          :ref="`${id}__key`"
        />
        <div class="rounded border border-secondary-90 h-100">
          <div class="h-100 d-flex justify-content-center align-items-center">
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
                text="Mulai Scan E-Money"
                size="sm"
                additional_class="px-3 py-1 mt-2 font-size-11 font-weight-bold"
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
                text="Mulai Scan Tiket "
                size="sm"
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
                    v-model="filter.key"
                    :is_error="$v.filter.key.$error"
                    label_info=""
                    id="txt_key"
                    additional_class_group="my-1 mx-1"
                    additional_class_label="my-0 font-size-11 font-weight-bold d-none"
                    size="sm"
                    label="Kode Transaksi"
                    :is_submitted="filter.isSubmitted"
                    @submit="processSubmitSearch"
                    placeholder="Contoh: AB2356"
                    :error_message="[
                      {
                        state: $v.filter.key.required,
                        message: 'Kode Transaksi tidak boleh kosong',
                      },
                      {
                        state: $v.filter.key.minLength,
                        message: 'Kode Transaksi tidak kurang dari 6 karakter',
                      },
                      {
                        state: $v.filter.key.maxLength,
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
                    size="sm"
                    @click="processSubmitSearch"
                    additional_class="px-3 py-1 mt-1  font-size-11 font-weight-bold"
                  />
                </div>
              </div>
            </div>
            <div class=""></div>
            <div class=""></div>
          </div>
        </div>
      </div>
    </div>
    <ModalScannerQrcode v-model="modal.scanner" @update="processGetScannedQR" />
  </div>
</template>

<script>
import { minLength, maxLength, required } from "vuelidate/lib/validators";
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
        selectedTransacition: {},
      },
      filter: {
        key: "",
        isSubmitted: false,
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
        selectedFinder: "rfid",
      },
    };
  },
  validations() {
    return {
      filter: {
        key: {
          required,
          ...(this.helper.selectedFinder === "key" && {
            minLength: minLength(6),
            maxLength: maxLength(6),
          }),
        },
      },
    };
  },
  methods: {
    setPayloadTransaction() {
      let payload = {
        filter: [{ key: "spot_id", value: this.$utility.getSpotId() }],
      };

      if (this.helper.selectedFinder === "id") {
        payload.filter.push({ key: "id", value: this.filter.key });
      } else if (this.helper.selectedFinder === "rfid") {
        payload.filter.push({ key: "rfid", value: this.filter.key });
      } else if (this.helper.selectedFinder === "key") {
        payload.filter.push({
          key: "key",
          value: this.filter.key,
        });
      }

      return payload;
    },

    setPayloadMembership() {
      return {
        filter: [
          { key: "spot_id", value: this.$utility.getSpotId() },
          { key: "rfid", value: this.filter.key },
          { key: "company_id", value: this.$utility.getCompanyId() },
        ],
      };
    },

    processStartScanEmoney() {
      this.helper.loading.emoney = true;
      document.getElementById("input-txt_key").focus();
    },

    processSubmitSearch() {
      this.filter.isSubmitted = true;
      this.$v.filter.$touch();
      if (!this.$v.filter.$invalid) {
        this.processSearchTransaction();
      }
    },

    processGetScannedQR(value) {
      this.filter.key = value;
      this.processSubmitSearch();
    },

    processSearchTransaction() {
      try {
        const payload = this.setPayloadTransaction();
        alert(JSON.stringify(payload));
        this.helper.loading.transaction = true;
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
