<template>
  <div class="bg-white rounded-lg shadow p-3 mt-3">
    <pre>
      {{ data }}
    </pre>
    <div class="d-flex justify-content-between mb-3">
      <div>
        <h5 class="font-weight-bold align-self-center font-size-16 mb-3">
          Kendaraan Tamu Hari Ini
        </h5>
      </div>
      <div class="">
        <active-button
          text="Buat Transaksi"
          additional_class=""
          @click="$router.push('/transaction/create')"
        />
      </div>
    </div>
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
            <th class="text-dark">Tanggal Masuk</th>
            <th class="text-dark">Tanggal Keluar</th>
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
            <td>{{ logs.rfid }}</td>
            <td></td>
            <td>
              {{
                $utility.formatDateMoment(
                  logs.guestCheckin,
                  "DD-MM-YYYY HH:mm:ss"
                )
              }}
            </td>
            <td>
              {{
                $utility.formatDateMoment(
                  logs.guestCheckout,
                  "DD-MM-YYYY HH:mm:ss"
                )
              }}
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
                  text="Perpanjang"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0"
                  align="rtl"
                />
                <active-button
                  icon="ic-clock-fast-forward"
                  icon_size="16"
                  text="Hentikan"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
                <active-button
                  icon="ic-dataflow-03"
                  icon_size="16"
                  text="Cetak Kartu Baru"
                  variant="light"
                  type="outline"
                  additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                  align="rtl"
                />
              </dropdown-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { guestMethods, productMethods } from "@/store/helperActions";
export default {
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DropdownButton: () => import("@utilities/atoms/button/DropdownButton"),
  },
  data() {
    return {
      data: [],
      helper: {
        loading: false,
      },
      options: {
        product: [],
        productCompany: [],
        productDictionary: [],
      },
      pagination: {
        page: 1,
        per_page: 10,
        total: 0,
      },
    };
  },
  async mounted() {
    await this.processGetOptionsDictionary();
    await this.processGetOptionsProduct();
    this.processFillingOptionsProduct();
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

    processFillingOptionsProduct() {
      this.options.product = this.options.productCompany.map((opt) => {
        const dictionary = this.options.productDictionary.find(
          (item) => item.id === opt.productId
        );
        return {
          ...opt,
          values: dictionary ? dictionary.values : "Unknown Product",
          period: dictionary ? dictionary.period : "day",
        };
      });
    },

    processFindData(data, step, key) {
      const DATA = JSON.parse(data);
      return DATA[step] ? DATA[step].data[key] : null;
    },

    processFormatData(data) {
      return data.map((item) => {
        return {
          ...item,
          licensePlate: this.processFindData(
            item.meta,
            "stepTwo",
            "licensePlate"
          ),
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

    async processGetOptionsDictionary() {
      try {
        this.helper.loading = true;
        this.options.productDictionary =
          await this.$utility.getOptionProductMembership();
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetOptionsDictionary in FormGuestInformation`
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
        console.log(values);
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
