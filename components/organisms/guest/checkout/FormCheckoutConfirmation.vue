<template>
  <div>
    <plain-modal
      id="modalCheckout"
      v-model="modal.checkout"
      @close="
        modal.checkout = false;
        $emit('close');
      "
      :size="helper.wasExpired ? 'sm' : 'lg'"
      test_id="modal-checkout"
    >
      <div v-if="helper.wasExpired">
        <i
          class="ic-alert-circle font-size-26 text-danger rounded-circle"
          style="
            background-color: #fc8d93;
            border: 6px solid #fad4d6;
            padding: 6px;
          "
        >
        </i>

        <p class="mt-3 mb-1 font-weight-bold">Kartu telah expired</p>
        <p class="my-0 font-size-10 text-secondary">
          Anda tidak dapat melakukan proses checkout karena kartu kamar telah
          expired. Silahkan pergi ke halaman manajemen kartu untuk menonaktifkan
          kartu tersebut.
        </p>

        <active-button
          text="Tutup"
          type="outline"
          size="sm"
          variant="info"
          text_color="info"
          @click="
            modal.checkout = false;
            $emit('close');
          "
          additional_class="w-100 px-3 mt-3"
        />
      </div>
      <div v-else>
        <div class="" v-if="helper.step === 0">
          <div class="d-flex">
            <div class="rounded border text-center">
              <div v-if="!helper.loading.scanning" key="prepare">
                <Lottie
                  :options="helper.lottie[0]"
                  :width="248"
                  :height="194"
                />
              </div>
              <div v-else key="scanning">
                <Lottie
                  :options="helper.lottie[1]"
                  :width="248"
                  :height="194"
                />
              </div>
              <div style="width: 1px !important; height: 1px; overflow: hidden">
                <input-text-group
                  v-model="form.rfid"
                  :is_error="$v.form.rfid.$error"
                  label_info=""
                  id="txt_rfid"
                  additional_class_group="my-1 mx-1"
                  additional_class_label="my-0 font-size-11 font-weight-bold d-none"
                  size="sm"
                  label="Kode Transaksi"
                  :is_submitted="form.isSubmitted"
                  @submit="processSubmitCard"
                />
              </div>
            </div>
            <div class="px-3">
              <p class="mt-2 mb-1 font-size-14 font-weight-bold">
                Siapkan Kartu Kamar
              </p>
              <p class="mt-0 mb-3 font-size-11 text-secondary">
                Tempelkan kartu kamar pada mesin pembaca kartu untuk memproses
                checkout, pastikan anda menempelkan kartu yang sesuai dengan
                data tamu.
              </p>
              <p class="font-size-12">
                Kamar:
                <span class="font-weight-bold font-size-13">
                  {{ data.guestName }}
                </span>
                <br />
                Kartu Terdaftar:
                <span class="font-weight-bold font-size-13">
                  {{ data.rfid }}
                </span>
              </p>
              <span
                class="badge text-danger bg-danger-80 px-2 py-1 font-size-9 mt-2"
                v-if="helper.isDuplicateCard && !helper.isNonMatchCard"
              >
                <i class="ic-alert-circle"></i> Kartu hasil duplikasi tidak
                dapat digunakan untuk proses checkout!
              </span>
              <span
                class="badge text-success bg-success-80 px-2 py-1 font-size-9 mt-2"
                v-else-if="
                  !helper.isDuplicateCard &&
                  !helper.isNonMatchCard &&
                  helper.wasScanned
                "
              >
                <i class="ic-check-circle"></i> Kartu asli terdeteksi, silahkan
                melanjutkan proses checkout.
              </span>
              <span
                class="badge text-danger bg-danger-80 px-2 py-1 font-size-9 mt-2"
                v-else-if="!helper.isDuplicateCard && helper.isNonMatchCard"
              >
                <i class="ic-alert-circle"></i> Kartu Tidak Sesuai
              </span>
              <div class="d-flex mt-1">
                <div v-if="helper.step === 0">
                  <div
                    v-if="
                      !(
                        !helper.isDuplicateCard &&
                        !helper.isNonMatchCard &&
                        helper.wasScanned
                      )
                    "
                  >
                    <disabled-button
                      text="Membaca Kartu..."
                      size="sm"
                      v-if="helper.loading.scanning"
                      variant="primary"
                      text_color="primary"
                    />
                    <active-button
                      :text="`${
                        helper.wasScanned ? 'Scan Kartu Kembali' : 'Scan Kartu'
                      }`"
                      @click="processStartScanCard()"
                      size="sm"
                      v-else
                      variant="primary"
                      text_color="primary"
                    />
                  </div>
                  <div v-else>
                    <active-button
                      text="Proses Checkout"
                      @click="startProcess()"
                      size="sm"
                      variant="primary"
                      text_color="primary"
                    />
                  </div>
                </div>
                <div>
                  <active-button
                    text="Batal"
                    additional_class="ml-2"
                    type="outline"
                    size="sm"
                    variant="primary"
                    text_color="primary"
                    @click="
                      modal.checkout = false;
                      $emit('close');
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="" v-else>
          <div class="d-flex">
            <div class="rounded border text-center">
              <Lottie :options="helper.lottie[2]" :width="248" :height="194" />
            </div>
            <div class="px-3">
              <p class="mb-1 font-size-14 font-weight-bold">
                Memproses Checkout
              </p>
              <div class="d-flex align-items-top my-2">
                <div v-if="helper.currentProcess >= 2" class="text-success">
                  <i class="bx bx-check-circle font-size-20"></i>
                </div>
                <div v-else-if="helper.currentProcess === 1" class="text-dark">
                  <i class="bx bx-loader-alt bx-spin font-size-20"></i>
                </div>
                <div v-else class="text-secondary">
                  <i class="bx bx-circle font-size-20"></i>
                </div>
                <div class="ml-2 mt-0">
                  <p
                    class="font-size-13 mt-n1 mb-0"
                    :class="
                      helper.currentProcess >= 2
                        ? 'text-success'
                        : helper.currentProcess === 1
                        ? 'text-dark'
                        : 'text-secondary'
                    "
                  >
                    <span class="d-block font-weight-bold">
                      Validasi Informasi Tamu
                    </span>
                    <span class="d-block font-size-9">
                      {{
                        helper.currentProcess >= 2
                          ? "Berhasil memvalidasi data informasi tamu mulai dari nomor kamar, nama, dan waktu check-out ke server"
                          : helper.currentProcess === 1
                          ? "Sistem sedang memvalidasi data informasi tamu mulai dari nomor kamar, nama, dan waktu check-out ke server"
                          : "Memvalidasi data informasi tamu mulai dari nomor kamar, nama, dan waktu check-out ke server"
                      }}
                    </span>
                  </p>
                </div>
              </div>

              <div class="d-flex align-items-top my-2">
                <div v-if="helper.currentProcess >= 3" class="text-success">
                  <i class="bx bx-check-circle font-size-20"></i>
                </div>
                <div v-else-if="helper.currentProcess === 2" class="text-dark">
                  <i class="bx bx-loader-alt bx-spin font-size-20"></i>
                </div>
                <div v-else class="text-secondary">
                  <i class="bx bx-circle font-size-20"></i>
                </div>
                <div class="ml-2 mt-0">
                  <p
                    class="font-size-13 mt-n1 mb-0"
                    :class="
                      helper.currentProcess >= 3
                        ? 'text-success'
                        : helper.currentProcess === 2
                        ? 'text-dark'
                        : 'text-secondary'
                    "
                  >
                    <span class="d-block font-weight-bold">
                      Merubah informasi kartu kamar
                    </span>
                    <span class="d-block font-size-9">
                      {{
                        helper.currentProcess >= 3
                          ? "Berhasil menyimpan informasi kartu kamar pada server"
                          : helper.currentProcess === 2
                          ? "Sistem sedang merubah informasi kartu kamar pada server"
                          : "Menyimpan informasi kartu kamar pada server"
                      }}
                    </span>
                  </p>
                </div>
              </div>

              <div class="d-flex align-items-top my-2">
                <div v-if="helper.currentProcess >= 4" class="text-success">
                  <i class="bx bx-check-circle font-size-20"></i>
                </div>
                <div v-else-if="helper.currentProcess === 3" class="text-dark">
                  <i class="bx bx-loader-alt bx-spin font-size-20"></i>
                </div>
                <div v-else class="text-secondary">
                  <i class="bx bx-circle font-size-20"></i>
                </div>
                <div class="ml-2 mt-0">
                  <p
                    class="font-size-13 mt-n1 mb-0"
                    :class="
                      helper.currentProcess >= 4
                        ? 'text-success'
                        : helper.currentProcess === 3
                        ? 'text-dark'
                        : 'text-secondary'
                    "
                  >
                    <span class="d-block font-weight-bold">
                      Membuat transaksi keluar
                    </span>
                    <span class="d-block font-size-9">
                      {{
                        helper.currentProcess >= 4
                          ? "Berhasil membatalkan transaksi sebelumnya dan membuat transaksi baru untuk transaksi keluar"
                          : helper.currentProcess === 3
                          ? "Sistem sedang membatalkan transaksi sebelumnya dan membuat transaksi baru untuk transaksi keluar"
                          : "Membatalkan transaksi sebelumnya dan membuat transaksi baru untuk transaksi keluar"
                      }}
                    </span>
                  </p>
                </div>
              </div>

              <div class="d-flex align-items-top my-2">
                <div v-if="helper.currentProcess >= 5" class="text-success">
                  <i class="bx bx-check-circle font-size-20"></i>
                </div>
                <div v-else-if="helper.currentProcess === 4" class="text-dark">
                  <i class="bx bx-loader-alt bx-spin font-size-20"></i>
                </div>
                <div v-else class="text-secondary">
                  <i class="bx bx-circle font-size-20"></i>
                </div>
                <div class="ml-2 mt-0">
                  <p
                    class="font-size-13 mt-n1 mb-0"
                    :class="
                      helper.currentProcess >= 5
                        ? 'text-success'
                        : helper.currentProcess === 4
                        ? 'text-dark'
                        : 'text-secondary'
                    "
                  >
                    <span class="d-block font-weight-bold">
                      Menyimpan informasi tamu
                    </span>
                    <span class="d-block font-size-9">
                      {{
                        helper.currentProcess >= 4
                          ? "Berhasil menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-out ke server"
                          : helper.currentProcess === 4
                          ? "Berhasil menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-out ke server"
                          : "Menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-out ke server"
                      }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </plain-modal>
  </div>
</template>

<script>
import {
  resolutionMethods,
  guestMethods,
  transactionMethods,
  utilityMethods,
} from "@/store/helperActions";
import { required } from "vuelidate/lib/validators";
import Lottie from "vue-lottie";
import prepareCard from "~/static/prepareCard.json";
import loadingCard from "~/static/loadingCard.json";
import tappingCard from "~/static/tapGuide.json";
import md5 from "md5";
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DisabledButton: () => import("@utilities/atoms/button/DisabledButton"),
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    Lottie,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(newVal) {
        this.processCheckExpiredCard();
        this.modal.checkout = newVal;
        this.helper.step = 0;
        this.helper.currentProcess = 1;
        this.helper.isDuplicateCard = false;
        this.helper.isNonMatchCard = false;
        this.helper.wasScanned = false;
      },
    },
  },
  validations: {
    form: {
      rfid: { required },
    },
  },
  data: () => {
    return {
      form: {
        rfid: "",
        isSubmitted: false,
      },
      transactionId: "",
      authTransactionData: {},
      selectedTransaction: {},
      createdTransaction: {},
      membership: {},
      helper: {
        lottie: [
          {
            loop: true,
            autoplay: true,
            animationData: prepareCard,
          },
          {
            loop: true,
            autoplay: true,
            animationData: tappingCard,
          },
          {
            loop: true,
            autoplay: true,
            animationData: loadingCard,
          },
        ],
        isDuplicateCard: false,
        isNonMatchCard: false,
        wasScanned: false,
        step: 0,
        currentProcess: 1,
        loading: {
          scanning: false,
        },
      },
      modal: {
        checkout: false,
      },
    };
  },
  mounted() {
    this.processCheckExpiredCard();
    this.transactionId = this.$utility.generateUUID();
  },
  methods: {
    getDataResolution: resolutionMethods.getDataResolution,
    updateDataResolution: resolutionMethods.updateDataResolution,
    updateGuest: guestMethods.updateGuest,
    createTransaction: transactionMethods.createTransaction,
    authTransaction: transactionMethods.authTransaction,
    setDefaultSuccessAlert: utilityMethods.setDefaultSuccessAlert,
    getMembership: guestMethods.getMembership,
    changePeriodMember: guestMethods.changePeriodMember,

    processCheckExpiredCard() {
      const start = new Date(this.data.guestCheckout);
      const end = new Date();
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInMinutes = Math.ceil(differenceInTime / (1000 * 60));

      differenceInMinutes >= -60
        ? (this.helper.wasExpired = true)
        : (this.helper.wasExpired = false);
    },

    processSubmitCard() {
      this.form.isSubmitted = true;
      this.helper.wasScanned = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.processValidateRFID();
        this.form.isSubmitted = false;
      }
      this.helper.loading.scanning = false;
    },

    processValidateRFID() {
      if (this.data.rfid === this.form.rfid) {
        this.helper.isNonMatchCard = false;
      } else {
        this.helper.isNonMatchCard = true;
      }
    },

    processStartScanCard() {
      this.helper.loading.scanning = true;
      this.form.rfid = "";
      document.getElementById("input-txt_rfid").focus();
    },

    setPayloadCancelTransaction() {
      return {
        transaction_id: this.selectedTransaction.id,
        method: "flag_problem",
        reason: `CO-TAMU_HOTEL-${this.data.corporateId}-${this.data.id}`,
      };
    },

    setPayloadGetTransaction() {
      return {
        filter: [
          { key: "spot_id", value: this.$utility.getSpotId() },
          { key: "values", value: this.form.rfid },
          { key: "type", value: "rfid" },
        ],
      };
    },

    setPayloadGetMembership() {
      return {
        filter: [
          { key: "rf_id", value: this.data.rfid },
          {
            key: "spot_id",
            value: this.$utility.getSpotId(),
          },
          { key: "history", value: true },
        ],
        pagination: {
          page: 1,
          per_page: 10,
        },
      };
    },

    setPayloadAuthTransaction() {
      return {
        spot_id: this.$utility.getSpotId(),
        corporate_id: this.$utility.getCorporateId(),
        secret_key: "95c87ec61a7a4091bcbb04d36cc9110a",
      };
    },

    setPayloadCreateTransactionOut() {
      const transactionId = this.transactionId;
      const handshake = md5(
        `${transactionId}.${this.$utility.getSpotId()}.95c87ec61a7a4091bcbb04d36cc9110a`,
      );

      return {
        token: this.authTransactionData.access_token,
        image: "",
        user_id: "7166aa38-e193-4134-8a52-18f784baa43f",
        spot_id: this.$utility.getSpotId(),
        transaction_id: transactionId,
        handshake: handshake,
        rf_id: "",
        membership_id: "",
        pos_in: this.selectedTransaction.pos_in,
        vehicle_code: this.data.guestVechicleCode,
        gate_code: this.selectedTransaction.pos_in,
        created_at: new Date().getTime(),
        time_in: this.selectedTransaction.time_in,
        source: "HOTEL_GUEST",
      };
    },

    setPayloadChangePeriodMember() {
      const NEW_START_DATE = this.$utility.momentAddDate(
        new Date(),
        -5,
        "minutes",
        "YYYY-MM-DD HH:mm:ss",
      );
      return {
        id: this.membership.employee_detail.id,
        spot_id: this.$utility.getSpotId(),
        member_type: "CARD",
        type: "CHANGE_PERIOD",
        data: {
          membership_id: this.membership.id,
          updated_data: {
            end_date: NEW_START_DATE,
            hour_start: this.$utility.formatDateMoment(
              NEW_START_DATE,
              "HH:mm:ss",
            ),
          },
        },
        amount: 0,
      };
    },

    setPayloadCreateTransaction() {
      const transactionId = this.transactionId;
      const handshake = md5(
        `${transactionId}.${this.$utility.getSpotId()}.95c87ec61a7a4091bcbb04d36cc9110a`,
      );

      return {
        token: this.authTransactionData.access_token,
        image: "",
        user_id: "7166aa38-e193-4134-8a52-18f784baa43f",
        spot_id: this.$utility.getSpotId(),
        transaction_id: transactionId,
        handshake: handshake,
        rf_id: this.data.rfid,
        membership_id: this.membership.id,
        pos_in: "",
        vehicle_code: this.data.guestVechicleCode,
        gate_code: "",
        created_at: new Date().getTime(),
        time_in: this.selectedTransaction.time_in,
        source: "HOTEL_GUEST",
      };
    },

    setPayloadLogsTransactionUpdate() {
      return {
        id: this.data.id,
        checkoutCreateBy: this.$utility.getUserLoggedIn().email,
        checkoutCreatedAt: new Date().getTime(),
        checkoutTransactionId: this.transactionId,
        status: "CHECKEDOUT",
      };
    },

    processSelectTransaction(transaction = []) {
      transaction.filter((item) => {
        return item.status === "P";
      });

      this.selectedTransaction = transaction[0];
      if (this.selectedTransaction) {
        return true;
      } else {
        return false;
      }
    },

    async processSearchTransaction() {
      try {
        const payload = this.setPayloadGetTransaction();
        const { values } = await this.getDataResolution(payload);
        if (values.length > 0 && this.processSelectTransaction(values)) {
          this.processCancelTransaction();
        } else {
          throw new Error("Transaksi tidak ditemukan");
        }
      } catch (error) {
        console.log("error at processSearchTransaction", error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processSearchTransaction in FormCheckoutConfirmation`,
        );
      }
    },

    async processCancelTransaction() {
      try {
        const PAYLOAD = this.setPayloadCancelTransaction();
        await this.updateDataResolution(PAYLOAD);
        console.log(PAYLOAD, "canceled");
      } catch (error) {
        console.log("error at processCancelTransaction", error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processCancelTransaction in FormCheckoutConfirmation`,
        );
        throw error;
      }
    },

    async processSearchMembership() {
      try {
        const payload = this.setPayloadGetMembership();
        const { values } = await this.getMembership(payload);
        this.membership = values[0];
      } catch (error) {
        console.log("error at processSearchMembership", error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processSearchMembership in FormCheckoutConfirmation`,
        );
      }
    },

    async processChangePeriodMember() {
      try {
        const PAYLOAD = this.setPayloadChangePeriodMember();
        await this.changePeriodMember(PAYLOAD);
      } catch (error) {
        console.log("error at processChangePeriodMember", error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processChangePeriodMember in FormCheckoutConfirmation`,
        );
        throw error;
      }
    },

    async processAuthTransaction() {
      try {
        const PAYLOAD_AUTH = this.setPayloadAuthTransaction();
        const { values } = await this.authTransaction(PAYLOAD_AUTH);
        this.authTransactionData = values;
        await this.processCreateTransaction();
      } catch (error) {
        console.log("error at processAuthTransaction", error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processAuthTransaction in FormCheckoutConfirmation`,
        );
        throw error;
      }
    },

    async processCreateTransaction() {
      try {
        const PAYLOAD = this.setPayloadCreateTransaction();
        const { values } = await this.createTransaction(PAYLOAD);
        this.createdTransaction = values;
      } catch (error) {
        console.log("error at processCreateTransaction", error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processCreateTransaction in FormCheckoutConfirmation`,
        );
        throw error;
      }
    },

    async processUpdateGuest() {
      try {
        const PAYLOAD = this.setPayloadLogsTransactionUpdate();
        await this.updateGuest(PAYLOAD);
      } catch (error) {
        console.log("error at processUpdateGuest", error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processUpdateGuest in FormGuestProcess`,
        );
        throw error;
      }
    },

    async startProcess() {
      try {
        this.helper.step = 1;
        await this.processSearchTransaction();
        this.helper.currentProcess++;
        await this.processSearchMembership();
        // await this.processChangePeriodMember();
        this.helper.currentProcess++;
        await this.processAuthTransaction();
        this.helper.currentProcess++;
        await this.processUpdateGuest();
        this.helper.currentProcess++;
        this.$emit("finish");
      } catch (error) {
        console.log("here", error);
        // WHAT SHOULD I DO HERE? bcs its rollbacking 3-4 process is complicated
      }
    },
  },
};
</script>

<style></style>
