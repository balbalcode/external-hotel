<script>
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DetailEvent: () => import("@/components/organisms/event/DetailEvent"),
    FormQuotaEvent: () => import("@/components/organisms/event/FormQuotaEvent"),
  },
  data: () => {
    return {
      modal: {
        form: true,
        quota: false,
      },
      selectedVehicle: null,
    };
  },
  methods: {
    toggleModalQuota() {
      this.processRefreshState();
      this.modal.quota = true;
    },

    processCancelForm() {
      this.modal.form = false;
      this.modal.quota = false;
      this.selectedVehicle = null;
    },

    processRefreshState() {
      this.processCancelForm();
    },
  },
};
</script>

<style></style>
<template>
  <div class="p-5">
    <div class="d-flex justify-content-between mb-3">
      <div>
        <h5 class="font-weight-bold align-self-center font-size-16 mb-0">
          Detail Event
        </h5>
      </div>
    </div>
    <detail-event @addQuota="toggleModalQuota" />
    <plain-modal v-model="modal.quota" :size="'md'" @close="processCancelForm">
      <form-quota-event
        @cancel="processCancelForm"
        @refresh-state="processRefreshState"
      />
    </plain-modal>
  </div>
</template>
