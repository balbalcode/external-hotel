<script>
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    Layout: () => import("@//layouts/main"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DetailInvoice: () => import("@/components/organisms/invoice/DetailInvoice"),
    TableInvoice: () => import("@/components/organisms/invoice/TableInvoice"),
  },
  data: () => {
    return {
      selectedInvoice: {},
      filter: {
        name: "",
        range: [],
        rfid: "",
      },
      helper: {
        isSearching: false,
      },
      modal: {
        detail: false,
      },
    };
  },
  methods: {
    processCloseDetail() {
      this.selectedInvoice = {};
      this.modal.detail = false;
    },
    processRefreshState() {
      this.$refs.tableInvoice.processGetData();
      this.processCloseDetail();
    },

    passUpdateSearch(data) {
      this.filter = data;
      this.helper.isSearching = true;
    },
    processDetailInvoice(transation) {
      this.modal.detail = true;
      this.selectedInvoice = transation;
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
          Daftar Tagihan
        </h5>
      </div>
      <div class=""></div>
    </div>
    <div class="bg-white rounded-lg shadow p-3 mt-3">
      <table-invoice
        ref="tableInvoice"
        @ready="helper.isSearching = false"
        @detail="processDetailInvoice"
        :is-searching="helper.isSearching"
        :filter="filter"
      />
    </div>
    <plain-modal
      id="DetailInvoice"
      @close="processCloseDetail"
      v-model="modal.detail"
      size="lg"
      test_id="modal-detail-invoice"
    >
      <detail-invoice ref="DetailInvoice" :data="selectedInvoice" @cancel="processCloseDetail" />
    </plain-modal>
  </Layout>
</template>
