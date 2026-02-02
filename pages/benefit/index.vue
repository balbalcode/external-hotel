<script>
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    Layout: () => import("@//layouts/main"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    FormBenefitGuest: () =>
      import("@/components/organisms/guest/benefit/FormBenefitGuest"),
    TableBenefitGuest: () =>
      import("@/components/organisms/guest/benefit/TableBenefitGuest"),
    FilterGuest: () => import("@/components/organisms/guest/data/FilterGuest"),
  },
  data: () => {
    return {
      filter: {
        name: "",
        range: [],
        rfid: "",
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
      this.$refs.TableBenefitGuest.processGetData();
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
          Free Parkir
        </h5>
      </div>
      <div class="">
        <active-button
          text="Buat Free Parkir"
          additional_class=""
          @click="modal.form = true"
        />
      </div>
    </div>
    <div class="bg-white rounded-lg shadow p-3 mt-3">
      <filter-guest @update="passUpdateSearch" is-complex-filter />
      <table-benefit-guest
        ref="TableBenefitGuest"
        @ready="helper.isSearching = false"
        :is-searching="helper.isSearching"
        :filter="filter"
      />
    </div>
    <plain-modal
      id="FormBenefitGuest"
      @close="processCancelForm"
      v-model="modal.form"
      size="lg"
      test_id="modal-form-product"
    >
      <form-benefit-guest
        ref="FormBenefitGuest"
        @saved="processRefreshState"
        @cancel="processCancelForm"
      />
    </plain-modal>
  </Layout>
</template>
