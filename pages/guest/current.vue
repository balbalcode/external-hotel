<script>
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    Layout: () => import("@//layouts/main"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    FormGuest: () => import("@/components/templates/guest/FormGuest"),
    TableGuest: () => import("@/components/organisms/guest/data/TableGuest"),
    FilterGuest: () => import("@/components/organisms/guest/data/FilterGuest"),
  },
  data: () => {
    return {
      filter: {
        name: "",
        range: [],
      },
      helper: {
        isSearching: false,
      },
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
      this.$refs.tableGuest.processGetData();
      this.processCancelForm();
    },

    passUpdateSearch(data) {
      this.filter = data;
      this.helper.isSearching = true;
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
    <div class="bg-white rounded-lg shadow p-3 mt-3">
      <filter-guest @update="passUpdateSearch" />
      <table-guest
        ref="tableGuest"
        @ready="helper.isSearching = false"
        :is-searching="helper.isSearching"
        :filter="filter"
      />
    </div>
    <plain-modal
      id="FormGuest"
      @close="processCancelForm"
      v-model="modal.form"
      size="lg"
      test_id="modal-form-product"
    >
      <form-guest
        ref="FormGuest"
        @saved="processRefreshState"
        @cancel="processCancelForm"
      />
    </plain-modal>
  </Layout>
</template>
