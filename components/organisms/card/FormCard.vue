<template>
  <div class="">
    <div class="p-3 border border-light text-center mt-3 pb-5 mb-5">
      <div v-if="!helper.loading">
        <div v-if="helper.scanning" key="scanning" class="ml-n5">
          <Lottie :options="helper.lottie[1]" :width="248" :height="194" />
        </div>
        <div v-else key="basic">
          <Lottie :options="helper.lottie[0]" :width="248" :height="194" />
        </div>
        <p class="font-weight-bold my-1 font-size-16 mt-n5">
          {{ helper.scanning ? "Tempelkan kartu" : "Cek Kartu Parkir" }}
        </p>
        <p class="font-size-14 text-secondary mb-3 mt-n1 font-size-12">
          {{
            helper.scanning
              ? "Tempelkan kartu parkir Anda pada pembaca kartu untuk memindai secara otomatis."
              : "Masukkan nomor kartu parkir Anda atau pindai secara otomatis."
          }}
        </p>
        <div class="d-flex mx-auto w-100 justify-content-center">
          <div :class="helper.scanning ? 'hider' : ''">
            <input-text-group
              label="Nomor Kartu Parkir"
              placeholder="Masukkan nomor kartu parkir"
              type="text"
              id="txt_rfid"
              test_id="txt_rfid"
              class="mb-3"
              @submit="processGetData"
              v-model="filter.rfid"
              additional_class_label="d-none"
            />
          </div>
          <div class="d-flex">
            <div>
              <active-button
                class="ml-1"
                @click="processGetData"
                text="Cek Kartu"
                v-if="!helper.scanning"
              />
            </div>
            <div>
              <active-button
                class="ml-1"
                text="Scan Otomatis"
                type="outline"
                @click="processScanCard"
                v-if="!helper.scanning"
              />
              <disabled-button
                class="ml-1"
                text="Scan Kartu"
                type="outline"
                v-if="helper.scanning"
              />
              <active-button
                class="ml-1"
                text="Batal"
                type="outline"
                @click="processCancelScan"
                v-if="helper.scanning"
              />
            </div>
          </div>
        </div>
        <div v-if="helper.isBlank" class="text-muted font-size-10 mt-2">
          Kartu belum terdaftar pada sistem, hubungi pengelola untuk informasi
          lebih lanjut. RFID: <strong>{{ filter.rfid }}</strong>
        </div>
        <div class="text-muted font-size-10 mt-2">
          Pencarian hanya dapat dilakukan data 2 bulan terakhir. Silakan hubungi
          pengelola untuk informasi lebih lanjut.
        </div>
      </div>
      <div v-else>
        <div key="loading">
          <Lottie :options="helper.lottie[2]" :width="248" :height="194" />
          <p class="font-weight-bold my-1 font-size-16">Memproses...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { guestMethods } from "@/store/helperActions";
import Lottie from "vue-lottie";
import prepareCard from "~/static/prepareCard.json";
import loadingCard from "~/static/loadingCard.json";
import tappingCard from "~/static/tapGuide.json";
export default {
  props: {
    newScan: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DisabledButton: () => import("@utilities/atoms/button/DisabledButton"),
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    Lottie,
  },
  data() {
    return {
      filter: {
        rfid: "",
      },
      pagination: {
        page: 1,
        per_page: 10,
        total: 0,
      },
      helper: {
        loading: false,
        scanning: false,
        isBlank: false,
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
      },
    };
  },
  watch: {
    newScan(newVal) {
      if (newVal) {
        this.helper.loading = false;
        this.helper.scanning = false;
        this.helper.isBlank = false;
        this.$emit("reset", false);
      }
    },
  },
  methods: {
    getGuest: guestMethods.getGuest,

    setPayloadGet() {
      const payload = {
        filter: [
          { key: "corporateId", value: this.$utility.getCorporateId() },
          { key: "rfid", value: this.filter.rfid.trim() },
          {
            key: "dateRange",
            value: [
              this.$utility.momentAddDate(
                new Date(),
                "-2",
                "months",
                "YYYY-MM-DD",
              ),
              this.$utility.formatDateMoment(new Date(), "YYYY-MM-DD"),
            ].join("_"),
          },
        ],
        pagination: {
          page: this.pagination.page,
          per_page: this.pagination.per_page,
        },
      };

      return payload;
    },

    processScanCard() {
      this.filter.rfid = "";
      document.getElementById("input-txt_rfid").focus();
      this.helper.scanning = true;
    },

    processCancelScan() {
      this.helper.scanning = false;
      this.filter.rfid = "";
    },

    passDatatoParent(values, total_values) {
      this.$emit("ready", {
        values: values,
        totalValues: total_values,
      });
    },

    async processGetData() {
      try {
        this.helper.loading = true;
        this.helper.isBlank = false;
        const PAYLOAD = this.setPayloadGet();
        const { values, total_values } = await this.getGuest(PAYLOAD);
        if (total_values > 0) this.passDatatoParent(values, total_values);
        else this.helper.isBlank = true;
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetData in TableCards`,
        );
      } finally {
        this.helper.loading = false;
        this.helper.scanning = false;
        this.filter.rfid = "";
      }
    },
  },
};
</script>

<style scoped>
.hider {
  width: 1px !important;
  height: 1px !important;
  position: absolute !important;
  top: -100px !important;
}
</style>
