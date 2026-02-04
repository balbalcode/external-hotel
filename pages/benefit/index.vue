<script>
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    Layout: () => import("@//layouts/main"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    FormBenefit: () => import("@/components/templates/benefit/FormBenefit"),
    TableBenefit: () => import("@/components/organisms/benefit/TableBenefit"),
    FilterBenefit: () => import("@/components/organisms/benefit/FilterBenefit"),
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
      this.$refs.TableBenefit.processGetData();
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
      <filter-benefit @update="passUpdateSearch" is-complex-filter />
      <table-benefit
        ref="TableBenefit"
        @ready="helper.isSearching = false"
        :is-searching="helper.isSearching"
        :filter="filter"
      />
    </div>
    <plain-modal
      id="FormBenefit"
      @close="processCancelForm"
      v-model="modal.form"
      size="lg"
      test_id="modal-form-product"
    >
      <form-benefit
        ref="FormBenefit"
        @saved="processRefreshState"
        @cancel="processCancelForm"
      />
    </plain-modal>
  </Layout>
</template>
