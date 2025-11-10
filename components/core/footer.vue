<script>
import {utilityMethods} from "~/store/helperActions";
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
  },
  data() {
    return {
      data: "",
      asset_url: process.env.ASSET_URL,
      modal: {
        modal_version: false
      },
      title: process.env.APP_TITLE,
      type: process.env.vers
    };
  },
  async created() {
    // THIS HARD WAY CODE FOR IMPROVE PERFORMANCE
    // PLEASE IMPROVE SOON
    if (this.$route.path === "/dashboard") {
      await this.getCurrentVersion()
    }
  },
  methods: {
    ...utilityMethods,
    setPayloadVersionCode() {
      return {type: "mgmt.web"}
    },
    async getCurrentVersion() {
      try {
        let payload = this.setPayloadVersionCode()
        this.data = await this.getCurrentVersionCode(payload)
        this.checkVersion()
      } catch (error) {
        this.$utility.setErrorContextSentry(error)
        this.$sentry.captureException(`${error.message} bug in getCurrentVersion in footer`)
      }
    },
    checkVersion() {
      if (
          parseInt(localStorage.getItem("version")) !== "test-passer" &&
          parseInt(localStorage.getItem("version")) !== this.data.version
      ) {
        this.modal.modal_version = true
      }
    },
    updateApp() {
      localStorage.setItem("version", this.data.version)
      location.reload(true)
    },
    closeUpdate() {
      this.modal.modal_version = false
    }
  }
};
</script>
<template>
  <footer class="footer">
    <plain-modal v-model="modal.modal_version">
      <div class="row p-1 p-lg-5">
        <div class="col-12 col-lg-4 mb-4 mx-auto text-center">
          <img :src="asset_url + '/motorcycle.png'" class="mt-3 img-fluid">
        </div>
        <div class="col-12 col-lg-12 mx-auto text-center">
          <h4 class="font-weight-bolder">Versi terbaru telah rilis!</h4>
          <p class="font-size-14 my-3 mb-5 text-muted">
            Versi terbaru aplikasi, Soul Parking Management telah rilis. Silahkan update aplikasi untuk mendapatkan
            experience baru
          </p>
          <active-button variant="default" additional_class="border" text="Batal Update" :is_capitalize="false"
                         @click="closeUpdate" id="btn-close_update_modal_version"/>
          <active-button variant="primary" text="Update Aplikasi" :is_capitalize="false" @click="updateApp"
                         id="btn_update_app_modal_version"/>
        </div>
      </div>
    </plain-modal>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 text-center text-dark text-md-left">
          <img :src="asset_url + '/logo-dark.png'" alt height="28" class="mr-2 my-2"/>
          <strong>Copyright &copy; {{ new Date().getFullYear() }}</strong>
        </div>
      </div>
    </div>
  </footer>
</template>