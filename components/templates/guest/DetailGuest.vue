<template>
  <div>
    <div class="row m-0">
      <div class="col-12 col-lg-3">
        <detail-guest-overview
          :data="data"
          @duplicateRequest="modal.duplicate = true"
          @checkoutRequest="modal.checkout = true"
          :transaction-out="data"
          :transaction-in="data"
        />
      </div>
      <div class="col-12 col-lg-9">
        <detail-guest-information :data="data" />
        <div class="bg-white py-3 pb-3 px-3 mt-3 rounded border">
          <detail-logs-transaction
            @refresh="helper.refresh = true"
            :data="data"
            @update="
              (updatedData) => {
                transactionData = updatedData;
              }
            "
            @selected="handleSelected"
          />
          <detail-guest-logs :data="data" @selected="handleSelected" :refresh="helper.refresh"  @ready="helper.refresh = false" />
        </div>
      </div>
    </div>

    <plain-modal size="lg" v-model="modal.detail" @close="modal.detail = false">
      <template v-if="selectedTransaction">
        <table-detail-resolution :data="selectedTransaction" />
        <table-log
          :id="selectedTransaction.id"
          :get_logs="getTransactionLog"
          log_name="Transaksi"
        />
      </template>
    </plain-modal>

    <form-duplicate-card
      :is-open="modal.duplicate"
      @close="modal.duplicate = false"
    />

    <form-checkout-confirmation
      :is-open="modal.checkout"
      :data="data"
      @close="modal.checkout = false"
    />
  </div>
</template>
<script>
import { guestMethods, transactionMethods } from "@/store/helperActions";
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    DetailGuestInformation: () =>
      import("@/components/organisms/guest/detail/DetailGuestInformation"),
    DetailLogsTransaction: () =>
      import("@/components/organisms/guest/detail/DetailLogsTransaction"),
    DetailGuestLogs: () =>
      import("@/components/organisms/guest/detail/DetailGuestLogs"),
    DetailGuestOverview: () =>
      import("@/components/organisms/guest/detail/DetailGuestOverview"),
    FormDuplicateCard: () =>
      import("@/components/organisms/guest/duplicate/FormDuplicateCard"),
    FormCheckoutConfirmation: () =>
      import("@/components/organisms/guest/checkout/FormCheckoutConfirmation"),
    TableDetailResolution: () =>
      import("@/components/organisms/resolution-center/TableDetailResolution"),
    TableLog: () => import("@/components/organisms/resolution-center/TableLog"),
  },
  data() {
    return {
      data: {},
      selectedTransaction: null,
      helper: {
        loading: true,
        refresh: false,
      },
      transactionData: {
        transactionIn: {},
        transactionOut: {},
      },
      modal: {
        duplicate: false,
        checkout: false,
        detail: false,
      },
    };
  },
  mounted() {
    this.processGetGuestDetail();
  },
  methods: {
    getGuestDetail: guestMethods.getGuestDetail,
    getTransactionLog: transactionMethods.getTransactionLog,

    setPayloadGuestDetail() {
      const guestId = this.$route.query.id;
      return {
        id: guestId,
      };
    },

    handleSelected(selected = null) {
      this.modal.detail = false;
      if (selected !== null) {
        this.selectedTransaction = selected;
        this.modal.detail = true;
      }
    },

    async processGetGuestDetail() {
      try {
        const response = await this.getGuestDetail(
          this.setPayloadGuestDetail(),
        );
        this.data = response[0];
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetGuestDetail in DetailGuest`,
        );
      } finally {
        this.helper.loading = false;
      }
    },
  },
};
</script>

<style></style>
