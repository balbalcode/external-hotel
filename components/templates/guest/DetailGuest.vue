<template>
  <div>
    <div class="row m-0">
      <div class="col-12 col-lg-3">
        <detail-guest-overview :data="data" />
      </div>
      <div class="col-12 col-lg-9">
        <div class="bg-white pt-2 pb-3 px-3 rounded border">
           <detail-guest-information :data="data" />
          <detail-logs-transaction
            :data="data"
            @update="
              (updatedData) => {
                transactionData = updatedData;
              }
            "
            @selected="handleSelected"
          /> 
          <detail-guest-logs :data="data" @selected="handleSelected" />
        </div>
      </div>
    </div>
    <
  </div>
</template>
<script>
import { guestMethods } from "@/store/helperActions";
export default {
  components: {
    DetailGuestInformation: () =>
      import("@/components/organisms/guest/detail/DetailGuestInformation"),
    DetailLogsTransaction: () =>
      import("@/components/organisms/guest/detail/DetailLogsTransaction"),
    DetailGuestLogs: () =>
      import("@/components/organisms/guest/detail/DetailGuestLogs"),
    DetailGuestOverview: () =>
      import("@/components/organisms/guest/detail/DetailGuestOverview"),
  },
  data() {
    return {
      data: {},
      helper: {
        loading: true,
      },
      transactionData: {
        transactionIn: {},
        transactionOut: {},
      },
    };
  },
  mounted() {
    this.processGetGuestDetail();
  },
  methods: {
    getGuestDetail: guestMethods.getGuestDetail,

    setPayloadGuestDetail() {
      const guestId = this.$route.query.id;
      return {
        id: guestId,
      };
    },

    handleSelected(selected) {
      console.log(selected);
    },

    async processGetGuestDetail() {
      try {
        const response = await this.getGuestDetail(
          this.setPayloadGuestDetail()
        );
        this.data = response[0];
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetGuestDetail in DetailGuest`
        );
      } finally {
        this.helper.loading = false;
      }
    },
  },
};
</script>

<style></style>
