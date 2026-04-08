<template>
  <div>
    <div class="bg-white mx-3">
      <div class="my-5 py-5 text-center" v-if="helper.isLoading">
        <b-spinner
          variant="primary"
          label="Loading..."
          class="my-5 text-center"
        />
      </div>
      <div class="row rounded p-3" v-else>
        <div class="col-12 col-lg-9">
          <div class="d-flex">
            <div class="mt-1">
              <i
                class="ic-calendar-date font-size-20 text-info rounded-circle"
                style="
                  background-color: #a6cdfe;
                  border: 6px solid #cfe4ff;
                  padding: 6px;
                "
              >
              </i>
            </div>
            <div class="ml-2">
              <h5 class="font-weight-bold my-0"></h5>
              <p class="my-0 font-size-12 text-secondary">
                Isi data event dengan benar dan lengkap
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventMethods } from "@/store/helperActions";
export default {
  data: () => {
    return {
      data: null,
      helper: {
        eventDetail: null,
        isLoading: false,
        isError: false,
      },
    };
  },
  async mounted() {
    await this.processGetEventDetail();
  },
  methods: {
    getEventDetail: eventMethods.getEventDetail,

    setPayloadEventDetail() {
      return {
        id: this.$route.query.id,
      };
    },

    async processGetEventDetail() {
      try {
        this.helper.isLoading = true;
        const payload = this.setPayloadEventDetail();
        const values = await this.getEventDetail(payload);
        this.data = values[0];
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetEventDetail in DetailEvent`,
        );
      } finally {
        this.helper.isLoading = false;
      }
    },
  },
};
</script>

<style></style>
