<script>
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DetailEvent: () => import("@/components/organisms/event/DetailEvent"),
    FormQuotaEvent: () => import("@/components/organisms/event/FormQuotaEvent"),
    Layout: () => import("@//layouts/main"),
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
  <Layout>
    <detail-event @addQuota="toggleModalQuota" />
    <plain-modal v-model="modal.quota" :size="'md'" @close="processCancelForm">
      <form-quota-event
        @cancel="processCancelForm"
        @refresh-state="processRefreshState"
      />
    </plain-modal>
  </Layout>
</template>
