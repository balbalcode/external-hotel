<script>
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    FormEvent: () => import("@/components/organisms/event/FormEvent"),
    TableEvent: () => import("@/components/organisms/event/TableEvent"),
  },
  data: () => {
    return {
      modal: {
        form: false,
      },
    };
  },
  methods: {
    processCancelForm() {
      this.modal.form = false;
    },
    processRefreshState() {
      // this.$refs.tableEvent.processFetchData();
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
    <table-event ref="tableEvent" />
    <plain-modal
      id="formEvent"
      @close="processCancelForm"
      v-model="modal.form"
      size="lg"
      test_id="modal-form-product"
    >
      <form-event
        ref="formEvent"
        :data="selected"
        @saved="processRefreshState"
        @cancel="processCancelForm"
      />
    </plain-modal>
  </div>
</template>
