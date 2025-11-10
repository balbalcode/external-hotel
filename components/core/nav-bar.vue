<script>
import user_constant from "@/constants/user";
import general_constant from "@/constants/general";
import { getPageAttribute, reloadMenu } from "./menu";
export default {
  data() {
    return {
      asset_url: process.env.ASSET_URL,
      options: {
        user_type: user_constant.type(),
      },
      user: {},
      helper: {
        default_user_image: process.env.ASSET_URL + "/plain.png",
      },
    };
  },
  components: {
    simplebar: () => import("simplebar-vue"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
  },
  computed: {
    togglingMenu() {
      return (
        this.$store.state.modules.utility.storeUtility.toggling_menu ?? false
      );
    },
    backwardButton() {
      return (
        this.$store.state.modules.utility.storeUtility.backward_button ?? false
      );
    },
  },
  created() {
    this.processSetupCookie();
    this.processCheckScreenWidth();
  },
  methods: {
    toggleMenu() {
      if (this.togglingMenu) {
        document.body.classList.remove("vertical-collpsed");
        document.body.classList.remove("sidebar-enable");
      } else {
        document.body.classList.add("vertical-collpsed");
        document.body.classList.add("sidebar-enable");
      }

      this.$store.dispatch(
        "modules/utility/storeUtility/togglingMenu",
        !this.togglingMenu
      );
    },
    processSetupCookie() {
      this.user = this.$utility.getUserLoggedIn();
    },
    processCheckScreenWidth() {
      // if user open our site in browser tablet, menu will automatic hide
      if (window.screen.width <= 1140) {
        this.toggleMenu();
      }
    },
    getUserType(type) {
      const user_type = this.$utility.findConstantData(
        "value",
        user_constant.type(),
        type
      );
      return user_type.text ?? "Akses Error";
    },
    backwardRoute() {
      this.$store.dispatch(
        "modules/utility/storeUtility/backwardButton",
        !this.backwardButton
      );
      this.$router.go(-1);
    },
  },
};
</script>
<template>
  <header id="page-topbar">
    <div class="navbar-header bg-dark">
      <div class="d-flex bg-dark">
        <!-- soulparking logo -->
        <div
          class="navbar-brand-box d-none d-lg-block"
          style="background: #fff !important"
        >
          <router-link tag="a" to="/dashboard" class="logo logo-dark">
            <span class="logo-sm">
              <img
                id="home_logo_sm"
                :src="asset_url + '/sm-icon.png'"
                alt
                height="28"
              />
            </span>
            <span class="logo-lg">
              <img
                id="home_logo_lg"
                :src="asset_url + '/logo-dark.png'"
                alt
                height="37"
              />
            </span>
          </router-link>
        </div>
        <!-- end of soulparking logo -->
        <!-- hamburger menu for toggle menu view -->
        <button
          id="backward-btn"
          type="button"
          class="btn btn-sm px-3 font-size-18 header-item"
          @click="backwardRoute"
          v-if="backwardButton"
        >
          <div class="d-flex">
            <span class="bx bx-left-arrow-alt text-primary"></span>
            <span class="d-none d-lg-inline font-size-12 text-primary"
              >Kembali</span
            >
          </div>
        </button>
        <button
          id="vertical-menu-btn"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item"
          @click="toggleMenu"
          v-else
        >
          <i class="bx bx-menu text-primary pt-2"></i>
        </button>

        <!-- end of hamburger menu for toggle menu view -->
      </div>
    </div>
  </header>
</template>
<style src="vue-select/dist/vue-select.css"></style>
<style>
#menu-navbar > div {
  margin-right: 1.5rem !important;
}

#menu-navbar > div > div {
  margin-top: 0.78rem !important;
}

.btn-icon-append {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.btn-form-prepend {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.vs__dropdown-toggle {
  padding: 0 0 6px !important;
}

.vs__dropdown-option--highlight {
  background: var(--primary) !important;
}
</style>
