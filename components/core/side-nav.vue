<script>
// Hi,  maybe this file more hard to read cause this code is very sensitive.
// i got this code from our template (skote) so I hope you can tolerate it and
// btw, iam delete the code who can make our menu stacked till 3 level so if you want
// create menu who has 3 level, please watch skote documentation
import MetisMenu from "metismenujs/dist/metismenujs";
import jscookie from "js-cookie";
import { menuItems, getPageAttribute } from "./menu";
import { utilityMethods } from "@/store/helperActions";

export default {
  components: {},
  data() {
    return {
      mode: process.env.MODE,
      user: {},
      size: 0,
      menuItems: menuItems,
      menu_width: 0,
      bottomSpace: 0,
    };
  },
  watch: {
    togglingMenu: function (value) {
      this.processCountMenuWidth();
      this.resizeMenu();

      // !! please don't remove statements below. this is function for keeping our menu is not broken in several device
      if (value && screen.width >= 1199) {
        let component = document.getElementsByClassName("vertical-menu");
      } else if (!value && screen.width >= 1199) {
        let component = document.getElementsByClassName("vertical-menu");
      } else {
        //do nothing for now...
      }
    },
  },
  computed: {
    togglingMenu() {
      return (
        this.$store.state.modules.utility.storeUtility.toggling_menu ?? false
      );
    },
    parents() {
      const attribute = getPageAttribute(this.$route.path);
      if (attribute && attribute.parents && attribute.parents.length)
        return attribute.parents;
      else return [];
    },
  },
  mounted: async function () {
    await this.processSetUpMenu();
  },
  methods: {
    ...utilityMethods,
    resizeMenu() {
      let component = document.getElementById("sidebar-menu");
      this.menu_width = component.offsetWidth;
    },
    formatUserType(userType) {
      switch (userType) {
        case "A":
          return "Admin";
        case "U":
          return "User";
        case "S":
          return "Superadmin";
        case "O":
          return "Operasional";
        case "E":
          return "Eksternal";
        case "G":
          return "Agen";
        default:
          return "Akses Error!";
      }
    },
    isShowMenu(item) {
      const hideOnProduction = this.mode === "PRODUCTION" && item.is_dev;

      return !hideOnProduction;
    },
    async processSetUpMenu() {
      // set data that might affect menu visibility
      this.user = JSON.parse(jscookie.get("user"));

      // get menu version

      // set menuItems
      await this.$nextTick();

      // call Metismenu plugin
      new MetisMenu("#side-menu");

      // highlight selected menu and its parents
      this.parents.forEach((parent, index) => {
        const parentLi = document.getElementById(`${parent}`);
        if (parentLi) parentLi.classList.add("mm-active");

        const parentA = document.getElementById(`a__${parent}`);
        if (parentA) {
          parentA.setAttribute("aria-expanded", "true");
          parentA.classList.add("mm-active");
          // set bottomSpace
          if (index == 0) this.bottomSpace = parseInt(parentA.clientHeight) * 2;
        }

        const parentUl = document.getElementById(`ul__${parent}`);
        if (parentUl) parentUl.classList.add("mm-show");
      });

      // set menu width
      this.resizeMenu();

      // hide menu if window.innerWidth <= 990
      if (window.innerWidth <= 990) {
        const verticalMenu = document.getElementById("vertical-menu-btn");
        if (verticalMenu) verticalMenu.click();
      }

      this.processCountMenuWidth();
    },
    processCountMenuWidth() {
      const secondLi = document.querySelector("#side-menu > li:nth-child(2)");
      if (secondLi) this.size = secondLi.clientWidth;
      else setTimeout(this.processCountMenuWidth, 1000);
    },
    processTrackMenu(value) {
      // this.$fire.analytics.logEvent("menu_clicked", {
      //   menu_id: value.id,
      //   path: value.link,
      //   corporate: this.user.corporate,
      //   user_name: this.user.name,
      //   user_role: this.user.type,
      // });
      this.$router.push(value.link);
    },
    processFillingToggle() {
      if (this.togglingMenu) this.menu_width = 190 + parseInt(this.size);
    },
    processUnFillingToggle() {
      this.menu_width = this.size;
    },
    processCheckActiveMenu(link) {
      let path = this.$route.path;
      path = path.replace(/\/$/g, ""); // remove '/' behind the route
      return link == path;
    },
  },
};
</script>
<template>
  <div id="sidebar-menu" :style="`padding-bottom: ${bottomSpace}px;`">
    <ul id="side-menu" class="metismenu cursor-pointer list-unstyled">
      <!-- mobile view user information-->
      <li class="unstyled bg-primary d-block d-md-none">
        <a href="#" class="oranger bg-primary">
          <p class="my-0 py-0">
            <i class="bx bxs-user-circle" style="color: white !important"></i>
            <span>
              <b style="color: white">{{ user.name }}</b>
              <small class="text-dark"
                >({{ this.formatUserType(user.type) }})</small
              >
              <br />
            </span>
            <span class="pl-2">
              <span
                @click="$router.push('/profile')"
                class="badge ml-4 px-3 py-1 font-size-11 badge-dark mr-1"
                >Profil</span
              >
              <span
                @click="$router.push('/logout')"
                class="badge px-3 py-1 font-size-11 badge-dark"
                >Keluar</span
              >
            </span>
            <br />
          </p>
          <p class="my-0 py-0">
            <i class="bx bx-face d-none" style="color: white !important"></i>
          </p>
        </a>
      </li>
      <!-- end of mobile view user information-->
      <!-- desktop menu view -->
      <template v-for="item in menuItems">
        <!-- menu which as title -->
        <li v-if="item.is_title" class="" :key="item.id">
          <span class="titles text-dark font-weight-bold font-size-11">{{
            item.label
          }}</span>
          <sup v-if="item.is_beta" class="badge badge-pill badge-primary"
            >Beta</sup
          >
        </li>
        <!-- end of menu which as title -->

        <li
          v-else-if="isShowMenu(item)"
          @mouseenter="processFillingToggle"
          @mouseleave="processUnFillingToggle"
          :key="`wrapper-${item.id}`"
          :class="{
            'mm-active active': processCheckActiveMenu(item.link),
            'position-relative d-none d-lg-block': item.reverse_menu_order,
          }"
          :id="item.id"
          :ref="item.id"
        >
          <!-- menu which has no sub item / sub menu -->
          <router-link
            v-if="item.link"
            :to="item.link"
            @click.native="processTrackMenu(item)"
            :class="`side-nav-link-ref font-weight-bold text-decoration-none cursor-pointer bg-white ${
              item.reverse_menu_order ? 'position-fixed fixed-bottom' : ''
            }`"
            :style="`${
              item.reverse_menu_order
                ? 'padding-bottom: ' +
                  ((item.reverse_menu_order - 1) * 48 + 10) +
                  'px; width: ' +
                  menu_width +
                  'px !important'
                : ''
            }`"
          >
            <i :class="`bx ${item.icon}`" v-if="item.icon"></i>
            <span
              :id="`single_menu_${item.id}`"
              :ref="`single_menu_${item.id}`"
              >{{ item.label }}</span
            >
            <sup v-if="item.is_beta" class="badge badge-pill badge-primary"
              >Beta</sup
            >
            <span
              :class="`badge badge-pill badge-${item.badge.variant} float-right`"
              v-if="item.badge"
            >
              {{ item.badge.text }}
            </span>
          </router-link>
          <!-- end of menu which hasn't sub item / sub menu -->

          <!-- menu which has sub item/sub menu -->
          <template v-else>
            <!--  parent menu-->
            <a
              href="javascript:void(0);"
              class="is-parent menu-list font-weight-bold text-decoration-none has-arrow"
              :id="`a__${item.id}`"
            >
              <i :class="`bx ${item.icon}`" v-if="item.icon"></i>
              <span
                :id="`multiple_parent_menu_${item.id}`"
                :ref="`multiple_parent_menu_${item.id}`"
              >
                {{ item.label }}
              </span>
              <sup v-if="item.is_beta" class="badge badge-pill badge-primary"
                >Beta</sup
              >
              <span
                :class="`badge badge-pill badge-${item.badge.variant} float-right`"
                v-if="item.badge"
              >
                {{ item.badge.text }}
              </span>
              <i
                v-if="!togglingMenu"
                class="bx float-right text-right bx-chevron"
              ></i>
            </a>
            <!-- end of parent menu-->

            <!-- sub item menu which has sub sub item / sub sub menu -->
            <ul class="sub-menu mm-collapse" :id="`ul__${item.id}`">
              <li
                class="p-0"
                v-for="subItem of item.subItems"
                :key="subItem.id"
                v-show="isShowMenu(subItem)"
                :class="{
                  'mm-active active': processCheckActiveMenu(subItem.link),
                }"
                :id="subItem.id"
                :ref="subItem.id"
              >
                <!-- title sub item / sub menu -->
                <h5
                  class="titles text-dark font-weight-bold m-0 p-0 font-size-11 font-weight-semibold text-uppercase"
                  v-if="subItem.is_title"
                >
                  <span class="pl-0 pl-lg-3">{{ subItem.label }}</span>
                  <sup
                    v-if="subItem.is_beta"
                    class="badge badge-pill badge-primary"
                    >Beta</sup
                  >
                </h5>
                <!-- end of title sub item / sub menu -->

                <template v-else>
                  <!-- sub item / sub menu which hasn't sub sub item/ sub sub menu -->
                  <router-link
                    :to="subItem.link"
                    v-if="subItem.link"
                    @click.native="processTrackMenu(subItem)"
                    :id="`${item.id}__${subItem.id}`"
                    :ref="`${item.id}__${subItem.id}`"
                    class="side-nav-link-ref font-weight-normal cursor-pointer cursor-pointer text-decoration-none"
                  >
                    {{ subItem.label }}
                    <sup
                      v-if="subItem.is_beta"
                      class="badge badge-pill badge-primary"
                      >Beta</sup
                    >
                  </router-link>
                  <!-- end of sub item / sub menu which hasn't sub sub item/ sub sub menu -->

                  <template v-else>
                    <!-- parent sub item / sub menu which has sub sub item/ sub sub menu -->
                    <a
                      class="side-nav-link-a-ref text-decoration-none has-arrow is-sub-parent"
                      href="javascript:void(0);"
                      :id="`a__${subItem.id}`"
                    >
                      {{ subItem.label }}
                      <i
                        v-if="!togglingMenu"
                        class="bx float-right text-right bx-chevron"
                      ></i>
                      <sup
                        v-if="subItem.is_beta"
                        class="badge badge-pill badge-primary"
                        >Beta</sup
                      >
                    </a>
                    <!-- end of parent sub item / sub menu which has sub sub item/ sub sub menu -->

                    <!-- sub sub item / sub sub menu  -->
                    <ul
                      class="sub-menu cursor-pointer mm-collapse"
                      :id="`ul__${subItem.id}`"
                    >
                      <li
                        v-for="subSubItem of subItem.subItems"
                        :key="subSubItem.id"
                        v-show="isShowMenu(subSubItem)"
                        :class="{
                          'mm-active active': processCheckActiveMenu(
                            subSubItem.link
                          ),
                        }"
                        :id="subItem.id"
                        :ref="subItem.id"
                      >
                        <router-link
                          :to="subSubItem.link"
                          @click.native="processTrackMenu(subSubItem)"
                          :data-link="subSubItem.link"
                          class="side-nav-link-ref cursor-pointer font-weight-normal text-decoration-none"
                          :id="`${item.id}__${subItem.id}__${subSubItem.id}`"
                          :ref="`${item.id}__${subItem.id}__${subSubItem.id}`"
                        >
                          {{ subSubItem.label }}
                          <sup
                            v-if="subSubItem.is_beta"
                            class="badge badge-pill badge-primary"
                            >Beta</sup
                          >
                        </router-link>
                      </li>
                    </ul>
                    <!-- end of sub sub item / sub sub menu  -->
                  </template>
                </template>
              </li>
            </ul>
            <!-- menu who hasn't sub item / sub menu -->
          </template>
        </li>
      </template>
    </ul>
  </div>
</template>
<style lang="scss">
.metismenu > li > ul > li {
  white-space: normal !important;
  background: white !important;
}

.metismenu > li > ul > li > a:hover {
  color: var(--primary) !important;
  background: #f5f5f5 !important;
}

.metismenu > li.mm-active > a.current-menu > i {
  color: var(--primary) !important;
}

.metismenu > li.mm-active > a.current-menu > span {
  color: var(--primary) !important;
}

li.mm-active > a.current-menu {
  border-left: 3px solid var(--primary) !important;
  padding-left: 21px !important;
}

ul.sub-menu > li.mm-active > a:not(.mm-active) {
  background: var(--primary) !important;
  color: var(--dark) !important;
}

li.mm-active > a.is-parent.mm-active {
  color: var(--primary) !important;
  border-left: 3px solid var(--primary) !important;
  padding-left: 21px !important;
}
ul.sub-menu > li.mm-active > a:not(.mm-active).is-sub-parent {
  color: var(--primary) !important;
  border-left: 3px solid var(--primary) !important;
  background: white !important;
}
ul.sub-menu > li.mm-active > a:not(.mm-active).is-sub-parent > i {
  color: var(--primary) !important;
}
ul.sub-menu > li.mm-active > a.mm-active.is-sub-parent {
  color: var(--primary) !important;
  border-left: 3px solid var(--primary) !important;
  background: white !important;
}
a:not([aria-expanded="true"]) .bx-chevron::before {
  content: "\ea4a";
}

a[aria-expanded="true"] .bx-chevron::before {
  content: "\ea57";
}

.titles {
  padding: 12px 20px !important;
  letter-spacing: 0.05em;
  pointer-events: none;
  cursor: default;
}
</style>