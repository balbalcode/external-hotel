<script>
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    FormEvent: () => import("@/components/organisms/event/FormEvent"),
    TableEvent: () => import("@/components/organisms/event/TableEvent"),
    Layout: () => import("@//layouts/main"),
  },
  data: () => {
    return {
      selected: null,
      modal: {
        form: false,
        quota: false,
      },
    };
  },
  methods: {
    toggleModalQuota(data) {
      this.selected = null;
      if (data) {
        this.selected = data;
      }
      this.modal.quota = !this.modal.quota;
    },

    toggleModalForm() {
      this.modal.form = !this.modal.form;
    },

    processRefreshState() {
      this.$refs.tableEvent.processGetDataEvent();
      this.modal.form = false;
      this.modal.quota = false;
      this.selected = null;
    },
  },
};
</script>

<style></style>
<template>
  <Layout>
    <div class="d-flex justify-content-between mb-3">
      <div>
        <h5 class="font-weight-bold align-self-center font-size-16 mb-3">
          Daftar Event
        </h5>
      </div>
      <div class="">
        <active-button
          text="Buat event baru"
          additional_class=""
          @click="modal.form = true"
        />
      </div>
    </div>
    <table-event ref="tableEvent" @addQuota="toggleModalQuota" />
    <plain-modal
      id="formEvent"
      @close="modal.form = false"
      v-model="modal.form"
      size="lg"
      test_id="modal-form-product"
    >
      <form-event
        ref="formEvent"
        :data="selected"
        @saved="processRefreshState"
        @cancel="modal.form = false"
      />
    </plain-modal>

    <plain-modal
      id="modalQuota"
      v-model="modal.quota"
      @close="modal.quota = false"
      size="md"
      test_id="modal-add-quota-event"
    >
      <form-event-quota
        :data="selected"
        @saved="processRefreshState"
        @cancel="modal.quota = false"
      />
    </plain-modal>
  </Layout>
</template>
