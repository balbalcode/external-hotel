<template>
  <div class="">
    <content-table-view
      :length="data.length"
      :is_loading="helper.loading.data"
      :is_error="helper.isError"
    >
      <div class="table-responsive rounded-top table-freeze mb-0">
        <table
          class="table table-striped table-borderless mb-0 custom-tbl"
          id="adminitrationTable"
        >
          <thead class="thead-freeze bg-gray-70">
            <tr class="border-bottom-table">
              <th class="text-dark">Nama</th>
              <th class="text-dark">Plat Nomor</th>
              <th class="text-dark">Produk</th>
              <th class="text-dark">Tanggal Pemberian Benefit</th>
              <th class="text-dark">Status</th>
              <th class="text-dark">Pembuat</th>
              <th class="text-dark text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(logs, index) in data" :key="index">
              <td>{{ logs.guestName }}</td>
              <td>
                <span class="border border-gray-70 rounded px-2 py-1">
                  {{ logs.licensePlate }}
                </span>
              </td>
              <td>{{ logs.product }}</td>
              <td>
                {{
                  $utility.formatDateMoment(
                    logs.created_at,
                    "DD-MM-YYYY HH:mm:ss",
                  )
                }}
              </td>
              <td>
                <p v-html="logs.status" class="my-0"></p>
              </td>
              <td>{{ logs.create_by }}</td>
              <td class="text-center">
                <dropdown-button
                  text=""
                  size="sm"
                  variant="gray"
                  type="outline"
                  additional_class="p-0"
                  caret="font-size-20 bx bx-dots-vertical-rounded"
                  :has_custom_action="true"
                >
                  <active-button
                    icon="ic-user-01"
                    icon_size="16"
                    text="Detail Pengunjung"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                    @click="
                      () => {
                        modal.detail = true;
                        processGetTransactionLog(logs.transactionId);
                      }
                    "
                    align="rtl"
                  />
                </dropdown-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 col-lg-12 text-right">
        <card-pagination-view
          :per_page="pagination.per_page"
          :total_data="pagination.total_data"
          additional_class="mt-3"
          :current_page="pagination.page"
          id="pagination_corporate"
          @update="passUpdatePagination"
          :test_id="`${id}__pagination`"
        />
      </div>
    </content-table-view>

    <plain-modal size="lg" v-model="modal.detail" @close="modal.detail = false">
      <template v-if="helper.loading.detail">
        <div class="my-5 py-5 mx-auto text-center">
          <b-spinner size="lg" primary />
        </div>
      </template>
      <template v-else>
        <table-detail-resolution :data="selectedTransaction" />
        <table-log
          :id="selectedTransaction.id"
          :get_logs="getTransactionLog"
          log_name="Transaksi"
        />
      </template>
    </plain-modal>
  </div>
</template>

<script>
import {
  guestMethods,
  productMethods,
  transactionMethods,
  resolutionMethods,
} from "@/store/helperActions";
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DropdownButton: () => import("@utilities/atoms/button/DropdownButton"),
    ContentTableView: () =>
      import("@utilities/molecules/content-view/ContentTableView"),
    CardPaginationView: () =>
      import("@utilities/molecules/card-view/CardPaginationView"),
    TableDetailResolution: () =>
      import("@/components/organisms/resolution-center/TableDetailResolution"),
    TableLog: () => import("@/components/organisms/resolution-center/TableLog"),
  },
  data() {
    return {
      id: "TableGuest",
      data: [],
      selectedTransaction: {},
      helper: {
        loading: {
          data: false,
          detail: false,
        },
      },
      options: {
        product: [],
      },
      modal: {
        detail: false,
      },
      pagination: {
        page: 1,
        per_page: 10,
        total: 0,
      },
    };
  },
  props: {
    isHavingAction: {
      type: Boolean,
      default: true,
    },
    isSearching: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Object,
      default: () => ({
        name: "",
        rfid: "",
        range: [],
      }),
    },
  },
  watch: {
    filter: {
      handler() {
        if (this.isSearching) {
          this.processGetData();
        }
      },
      deep: true,
    },
    isSearching(value) {
      if (value) {
        this.processGetData();
      }
    },
  },
  async mounted() {
    await this.processGetOptionsProduct();
    await this.processGetData();
  },
  methods: {
    getGuest: guestMethods.getGuest,
    getTransactionLog: transactionMethods.getTransactionLog,
    getDataResolution: resolutionMethods.getDataResolution,
    getMembershipProduct: productMethods.getMembershipProduct,

    setPayloadTransaction(transactionId) {
      let payload = {
        filter: [
          { key: "spot_id", value: this.$utility.getSpotId() },
          { key: "values", value: transactionId },
          { key: "type", value: "id" },
        ],
      };

      return payload;
    },

    setPayloadGuest() {
      let payload = {
        filter: [
          { key: "corporateId", value: this.$utility.getCorporateId() },
          { key: "type", value: "HOTEL_BENEFIT" },
        ],
        pagination: {
          page: this.pagination.page,
          per_page: this.pagination.per_page,
        },
      };

      if (this.filter.name !== "") {
        payload.filter.push({ key: "guestName", value: this.filter.name });
      }

      if (this.filter.rfid?.trim()) {
        payload.filter.push({ key: "rfid", value: this.filter.rfid.trim() });
      }

      if (this.filter.range.length === 2) {
        payload.filter.push({
          key: "created_at",
          value: this.filter.range.join("_"),
        });
      }

      return payload;
    },

    async passUpdatePagination(page) {
      this.pagination.page = page;
      await this.processGetData();
    },

    processFindData(data, step, key) {
      const DATA = JSON.parse(data);
      return DATA[step] ? DATA[step].data[key] : null;
    },

    processGetProduct(meta) {
      const finder = this.processFindData(meta, "stepTwo", "productId");
      return finder.name;
    },

    processSetLabelStatus(data, index) {
      let statusLabel = "DATA BERMASALAH";
      let cssClass = "danger";
      if (data.status === "GIFTED") {
        statusLabel = "Berhasil Diberikan";
        cssClass = "dark";
      } else if (data.status === "CLAIMED") {
        statusLabel = "Sudah Diklaim";
        cssClass = "success";
      }

      const status = {
        label: statusLabel,
        class: cssClass,
        component: `<span class="badge px-2 py-1 badge-${cssClass} font-size-11 font-weight-bold">${statusLabel}</span>`,
      };

      return status[`${index}`];
    },

    processFormatData(data, step, key) {
      return data.map((item) => {
        return {
          ...item,
          licensePlate: this.processFindData(
            item.meta,
            "stepOne",
            "licensePlate",
          ),
          product: this.processGetProduct(item.meta),
          status: this.processSetLabelStatus(item, "component"),
          statusLabel: this.processSetLabelStatus(item, "label"),
        };
      });
    },

    async processGetOptionsProduct() {
      try {
        this.helper.loading.data = true;
        const { values } = await this.getMembershipProduct(
          this.setPayloadProduct(),
        );
        this.options.productCompany = values;
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetOptionsProduct in TableGuest`,
        );
      } finally {
        this.helper.loading.data = false;
      }
    },

    async processGetData() {
      try {
        this.helper.loading.data = true;
        const payload = this.setPayloadGuest();
        const { values, total_values } = await this.getGuest(payload);
        this.data = this.processFormatData(values);
        this.pagination.total = total_values;
        this.$emit("ready");
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetData in TableGuest`,
        );
      } finally {
        this.helper.loading.data = false;
      }
    },

    async processGetTransactionLog(id) {
      try {
        this.helper.loading.detail = true;
        const payload = this.setPayloadTransaction(id);
        const { values } = await this.getDataResolution(payload);
        this.selectedTransaction = values[0];
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetTransactionLog in TableBenefit`,
        );
      } finally {
        this.helper.loading.detail = false;
      }
    },
  },
};
</script>

<style></style>
