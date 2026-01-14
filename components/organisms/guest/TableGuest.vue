<template>
  <div class="bg-white rounded-lg shadow p-3 mt-3">
    <div class="d-flex justify-content-between mb-3">
      <div>
        <h5 class="font-weight-bold align-self-center font-size-16 mb-3">
          Kendaraan Tamu Hari Ini
        </h5>
      </div>
    </div>
    <content-table-view
      :length="data.length"
      :is_loading="helper.isLoading"
      :is_error="helper.isError"
    >
      <div class="table-responsive rounded-top table-freeze mb-0">
        <table
          class="table table-striped table-borderless mb-0 custom-tbl"
          id="adminitrationTable"
        >
          <thead class="thead-freeze bg-gray-70">
            <tr class="border-bottom-table">
              <th class="text-dark">Nomor Kamar</th>
              <th class="text-dark">Plat Nomor 1</th>
              <th class="text-dark">Nomor Kartu</th>
              <th class="text-dark">Produk</th>
              <th class="text-dark">Tanggal Checkin</th>
              <th class="text-dark">Durasi Stay</th>
              <th class="text-dark">Tanggal Checkout</th>
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
              <td>{{ logs.rfId }}</td>
              <td>{{ logs.product }}</td>
              <td>
                {{
                  $utility.formatDateMoment(
                    logs.guestCheckin,
                    "DD-MM-YYYY HH:mm:ss"
                  )
                }}
              </td>
              <td>
                {{ logs.durationStay }} Hari
                {{ parseInt(logs.durationStay) - 1 }} Malam
              </td>
              <td>
                <span v-if="logs.checkoutCreatedAt">
                  {{
                    $utility.formatDateMoment(
                      logs.checkoutCreatedAt,
                      "DD-MM-YYYY HH:mm:ss"
                    )
                  }}
                </span>
                <span v-else>
                  <span class="badge bg-primary-80 rounded px-2 py-1">
                    Belum Checkout
                  </span>
                </span>
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
                    text="Detail Tamu"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                    @click="$router.push(`/guest/detail?id=${logs.id}`)"
                    align="rtl"
                  />
                  <active-button
                    icon="ic-clock-fast-forward"
                    icon_size="16"
                    text="Eearly Check-Out"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                    align="rtl"
                  />
                  <!-- <active-button
                    icon="ic-dataflow-03"
                    icon_size="16"
                    text="Cetak Kartu Baru"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                    align="rtl"
                  /> -->
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
  </div>
</template>

<script>
import { guestMethods, productMethods } from "@/store/helperActions";
export default {
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DropdownButton: () => import("@utilities/atoms/button/DropdownButton"),
    ContentTableView: () =>
      import("@utilities/molecules/content-view/ContentTableView"),
    CardPaginationView: () =>
      import("@utilities/molecules/card-view/CardPaginationView"),
  },
  data() {
    return {
      data: [],
      helper: {
        loading: false,
      },
      options: {
        product: [],
      },
      pagination: {
        page: 1,
        per_page: 10,
        total: 0,
      },
    };
  },
  async mounted() {
    await this.processGetOptionsProduct();
    this.processGetData();
  },
  methods: {
    getGuest: guestMethods.getGuest,
    getMembershipProduct: productMethods.getMembershipProduct,

    setPayloadGuest() {
      return {
        filter: [{ key: "corporateId", value: this.$utility.getCorporateId() }],
        pagination: {
          page: this.pagination.page,
          per_page: this.pagination.per_page,
        },
      };
    },

    async passUpdatePagination(page) {
      this.pagination.current_page = page;
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

    processSetLabelStatus(data) {
      let statusLabel = "DATA BERMASALAH";
      let cssClass = "danger";
      if (data.status === "ACTIVE") {
        if (
          new Date().setHours(11, 59, 59, 0) >
          new Date(data.guestCheckout).setHours(11, 59, 59, 0)
        ) {
          statusLabel = "Kedaluwarsa";
        } else {
          statusLabel = "Aktif";
          cssClass = "dark";
        }
      } else if (data.status === "CHECKEDOUT") {
        statusLabel = "Sudah Checkout";
        cssClass = "success";
      }

      return `<span class="badge px-2 py-1 badge-${cssClass} font-size-11 font-weight-bold">${statusLabel}</span>`;
    },

    processsCountDateDifference(data) {
      const start = new Date(data.guestCheckin);
      const end = new Date(data.guestCheckout);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      return differenceInDays ?? 0;
    },

    processFormatData(data, step, key) {
      return data.map((item) => {
        return {
          ...item,
          licensePlate: this.processFindData(
            item.meta,
            "stepTwo",
            "licensePlate"
          ),
          rfId: this.processFindData(item.meta, "stepThree", "rfId"),
          product: this.processGetProduct(item.meta),
          status: this.processSetLabelStatus(item),
          durationStay: this.processsCountDateDifference(item),
        };
      });
    },

    async processGetOptionsProduct() {
      try {
        this.helper.loading = true;
        const { values } = await this.getMembershipProduct(
          this.setPayloadProduct()
        );
        this.options.productCompany = values;
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetOptionsProduct in TableGuest`
        );
      } finally {
        this.helper.loading = false;
      }
    },

    async processGetData() {
      try {
        this.helper.loading = true;
        const payload = this.setPayloadGuest();
        const { values, total_values } = await this.getGuest(payload);
        this.data = this.processFormatData(values);
        this.pagination.total = total_values;
      } catch (error) {
        console.log(error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetData in TableGuest`
        );
      } finally {
        this.helper.loading = false;
      }
    },
  },
};
</script>

<style></style>
