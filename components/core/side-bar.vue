<script>
export default {
  components: {
    simplebar: () => import("simplebar-vue"),
    SideNav: () => import("./side-nav"),
  },
  props: {
    isCondensed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      settings: {
        menuSize: 0,
      },
    };
  },
  watch: {
    isCondensed() {
      this.processCountMenuWidth();
    },
  },
  mounted() {
    setTimeout(() => {
      this.processCountMenuWidth();
    }, 500);
  },
  methods: {
    processCountMenuWidth() {
      const secondLi = document.querySelector("#side-menu > li:nth-child(2)");
      if (!secondLi) {
        setTimeout(() => {
          this.processCountMenuWidth();
        }, 1000);
      } else {
        this.settings.menuSize = secondLi.clientWidth;
      }
    },
  },
};
</script>

<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu position-fixed">
    <simplebar v-if="!isCondensed" :settings="settings" class="h-100">
      <SideNav :size="settings.menuSize" :condensed="isCondensed" />
    </simplebar>

    <simplebar v-else class="h-100">
      <SideNav :size="settings.menuSize" :condensed="isCondensed" />
    </simplebar>
  </div>
  <!-- Left Sidebar End -->
</template>

