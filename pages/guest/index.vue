<script>
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    FormGuest: () => import("@/components/templates/guest/FormGuest"),
    TableGuest: () => import("@/components/organisms/guest/TableGuest"),
  },
  data: () => {
    return {
      modal: {
        form: true,
      },
    };
  },
  methods: {
    processCancelForm() {
      this.modal.form = false;
    },
    processRefreshState() {
      // this.$refs.tableGuest.processGetData();
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
          Daftar Tamu
        </h5>
      </div>
      <div class="">
        <active-button
          text="Buat Tamu Baru"
          additional_class=""
          @click="modal.form = true"
        />
      </div>
    </div>
    <table-guest ref="tableGuest" />
    <plain-modal
      id="FormGuest"
      @close="processCancelForm"
      v-model="modal.form"
      size="lg"
      test_id="modal-form-product"
    >
      <form-guest
        ref="FormGuest"
        :data="selected"
        @saved="processRefreshState"
        @cancel="processCancelForm"
      />
    </plain-modal>
  </div>
</template>
