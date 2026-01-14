<script>
export default {
  components: {
    AlertNotification: () => import("@/components/core/AlertNotification"),
  },
  props: {
    title: { default: "" },
  },
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight);
    window.addEventListener("message", this.handleMessage);
  },
  updated() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.updateHeight();
      }, 1000);
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.updateHeight);
    window.removeEventListener("message", this.handleMessage);
  },
  methods: {
    updateHeight() {
      this.height = document.body.scrollHeight;
      localStorage.setItem("frameHeight", this.height);
      window.parent.postMessage(
        {
          type: "VIEWPORT_CONFIG",
          value: parseInt(this.height) + 30,
          title: this.title,
        },
        "http://localhost:5173"
      );
    },

    handleMessage(event) {
      if (event.origin !== "http://localhost:5173") return;

      const { type, payload } = event.data;

      if (type === "ROUTING" && payload) {
        this.updateRoute(payload);
      }

      if (type === "VIEWPORT_CONFIG" && event.data.value) {
        this.height = event.data.value;
      }
    },

    updateRoute({ uri, query }) {
      this.$router.push({ path: uri, query });
    },
  },
};
</script>

<template>
  <div id="layout-wrapper" class="font-size-13" style="min-height: 540px !important">
    <slot />
    <AlertNotification />
  </div>
</template>
