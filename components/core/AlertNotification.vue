<script>
import { utilityGetters } from "~/store/helperGetters";
import { utilityMethods } from "@/store/helperActions";

export default {
  computed: {
    alert_toast() {
      return this.getAlert();
    },
  },
  methods: {
    ...utilityGetters,
    ...utilityMethods,
    processRemoveAlert(index) {
      this.removeAlert(index);
    },
  },
};
</script>
<template>
  <div id="toast-message" class="toast-message-wrapper">
    <template v-for="(alert, index) in alert_toast">
      <b-toast
        :key="index"
        toaster="b-toaster-top-right"
        :auto-hide-delay="alert.duration"
        :visible="alert.opener === $route.path"
        header-class="d-none"
        :id="`toast-message__pane-${index}`"
        :body-class="`bg-white  p-0`"
        v-if="alert.content !== ''"
      >
        <div class="rounded shadow-lg">
          <div class="bg-white rounded">
            <div class="d-flex h-100 p-3">
              <div class="mt-2">
                <i
                  v-if="alert.type === 'success'"
                  class="bx bxs-check-circle font-size-22 text-success"
                ></i>
                <i
                  v-else-if="alert.type === 'danger'"
                  class="bx bxs-error-circle font-size-22 text-danger"
                ></i>
                <i
                  v-else
                  :class="`bx bxs-error-circle font-size-22 text-${alert.type}`"
                ></i>
              </div>
              <div class="flex-grow-1 px-2">
                <p class="pt-2 pb-0 font-weight-semibold">
                  {{ alert.content }}
                </p>
              </div>
              <div class="mt-2">
                <div
                  class="p-1 bg-light rounded cursor-pointer"
                  @click="processRemoveAlert(index)"
                >
                  <i class="bx bx-x text-muted"></i>
                </div>
              </div>
            </div>
          </div>
          <div :class="`bg-${alert.type}`" style="height: 5px"></div>
        </div>
      </b-toast>
    </template>
  </div>
</template>
<style>
.b-toast .toast {
  background: transparent !important;
}
.toast {
  border: 0 !important;
  box-shadow: none !important;
}
.custom-padding {
  padding: 0.1rem 0.4rem;
}
</style>
