<script>
import { resolutionMethods } from "~/store/helperActions";
import resolution_center_constants from "~/constants/resolution-center";

export default {
  props: {
    finder: { default: () => ({}) },
  },
  components: {
    ContentTableView: () =>
      import("@utilities/molecules/content-view/ContentTableView"),
    CardPaginationView: () =>
      import("@utilities/molecules/card-view/CardPaginationView"),
    PriceLabel: () => import("@utilities/atoms/label/PriceLabel"),
    PlainLabel: () => import("@utilities/atoms/label/PlainLabel"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DropdownButton: () => import("@utilities/atoms/button/DropdownButton"),
    OverviewLabel: () => import("@utilities/atoms/label/OverviewLabel"),
  },
  data: () => ({
    data: [],
    pagination: {
      per_page: 10,
      current_page: 1,
      total_data: 10,
    },
    selected_data: {},
    helper: {
      userType: "",
      white_list_words: ["mayapada", "head"],
      is_loading: false,
      is_error: false,
      is_member: false,
    },
    modal: {
      close_transaction: false,
      close_finder: false,
      delete_transaction: false,
      delete_finder: false,
      edit_membership: false,
      edit_transaction: false,
      flag_transaction: false,
      refund_transaction: false,
    },
    transaction_status: resolution_center_constants.transaction_status,
  }),
  watch: {
    finder: {
      deep: true,
      handler() {
        this.passUpdatePagination(1);
      },
    },
  },
  
  mounted() {
    this.helper.userType = this.$utility.getUserRole();
  },

  methods: {
    ...resolutionMethods,

    passErrorToParent(error) {
      this.$emit("error", { state: true, message: error });
    },

    passDetailToParent(data) {
      this.selected_data = data ?? {};
      this.$emit("detail", this.selected_data);
    },

    async passUpdatePagination(page) {
      this.pagination.current_page = page;
      await this.processGetData();
    },

    setPayloadGet() {
      return {
        filter: [
          { key: "values", value: this.finder.value },
          { key: "type", value: this.finder.type },
          { key: "spot_id", value: this.$utility.getSpotId() },
          { key: "page", value: this.pagination.current_page },
          { key: "per_page", value: this.pagination.per_page },
        ],
      };
    },

    // TODO: improve this checker soon
    processWhiteListSpot() {
      let selected_spot = this.$utility.getSelectedSpot().text;
      selected_spot = selected_spot.toLowerCase();
      selected_spot = selected_spot.split(" ");
      const intersection = selected_spot.filter((element) =>
        this.helper.white_list_words.includes(element)
      );
      return intersection.length > 0;
    },

    async processGetData() {
      this.helper.is_loading = true;
      try {
        this.helper.is_member = this.finder.type === "rfid";
        let payload = this.setPayloadGet();
        let data = await this.getDataResolution(payload);
        this.data = data.values;
        this.pagination.total_data = data.total_values;
        this.passDetailToParent();
        this.helper.is_error = false;
      } catch (error) {
        this.data = [];
        this.pagination.total_data = 0;
        this.helper.is_error = true;
        this.passErrorToParent(error);
      }
      this.helper.is_loading = false;
    },
  },
};
</script>

<template>
  <div>
    <!-- Table Resolution -->
    <content-table-view
      :length="data.length"
      :is_loading="helper.is_loading"
      :is_error="helper.is_error"
    >
      <div class="table-responsive rounded-top mb-0">
        <table class="table table-striped table-borderless mb-0 custom-tbl">
          <thead class="thead-freeze bg-gray-70">
            <tr class="border-bottom-table">
              <th rowspan="2" v-if="!finder.finder">
                {{ helper.is_member ? "RF ID" : "Transaksi" }}
              </th>
              <th rowspan="2" v-if="!helper.is_member">Finder</th>
              <th rowspan="2">Status</th>
              <th colspan="6" class="text-center">Manless</th>
              <th rowspan="2" v-if="!finder.finder">Waktu Masuk Transaksi</th>
              <th rowspan="2" v-if="!helper.is_member">Waktu Masuk FINDER</th>
              <th rowspan="2" v-if="!finder.finder">Waktu Keluar Transaksi</th>
              <th rowspan="2" v-if="!helper.is_member">Waktu Keluar FINDER</th>
              <th rowspan="2" v-if="!finder.finder">Waktu Bayar</th>
              <th rowspan="2" v-if="!finder.finder" class="text-right">
                Tarif
              </th>
              <th rowspan="2" v-if="!finder.finder">Kendaraan</th>
              <th rowspan="2">Opsi</th>
            </tr>
            <tr>
              <th>Plat Prediction (In)</th>
              <th>Brand (In)</th>
              <th>Vehicle Prediction (In)</th>
              <th>Plat Prediction (Out)</th>
              <th>Brand (Out)</th>
              <th>Vehicle Prediction (Out)</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(trx, index) in data"
              class="cursor-pointer"
              :key="`default-resolution-${index}`"
              :class="{ 'selected-row': trx.id === selected_data.id }"
              @click="passDetailToParent(trx)"
            >
              <td v-if="!finder.finder">
                <overview-label
                  :has_space="false"
                  :value="helper.is_member ? trx.rf_id : trx.id"
                  limit_text="12"
                  :is_italic="false"
                />
              </td>
              <td v-if="!helper.is_member">
                <overview-label
                  v-if="trx.ref_id"
                  :has_space="false"
                  :value="trx.ref_id"
                  limit_text="8"
                  :is_italic="false"
                />
                <plain-label v-else value="-" />
              </td>
              <td>
                <plain-label :value="transaction_status(trx.status)" />
              </td>
              <td>
                <span :data-testid="`tr-${index}__td-lpr_in__license_plate`">
                  {{
                    trx.prediction.lpr_in.license_plate
                      ? trx.prediction.lpr_in.license_plate
                      : "-"
                  }}
                </span>
              </td>
              <td>
                <span :data-testid="`tr-${index}__td-lpr_in__brand_name`">
                  {{
                    trx.prediction.lpr_in.brand_name
                      ? trx.prediction.lpr_in.brand_name
                      : "-"
                  }}
                </span>
              </td>
              <td>
                <span :data-testid="`tr-${index}__td-lpr_in__vehicle`">
                  {{
                    trx.prediction.lpr_in.vehicle
                      ? trx.prediction.lpr_in.vehicle
                      : "-"
                  }}
                </span>
              </td>
              <td>
                <span :data-testid="`tr-${index}__td-lpr_out__license_plate`">
                  {{
                    trx.prediction.lpr_out.license_plate
                      ? trx.prediction.lpr_out.license_plate
                      : "-"
                  }}
                </span>
              </td>
              <td>
                <span :data-testid="`tr-${index}__td-lpr_out__brand_name`">
                  {{
                    trx.prediction.lpr_out.brand_name
                      ? trx.prediction.lpr_out.brand_name
                      : "-"
                  }}
                </span>
              </td>
              <td>
                <span :data-testid="`tr-${index}__td-lpr_out__vehicle`">
                  {{
                    trx.prediction.lpr_out.vehicle
                      ? trx.prediction.lpr_out.vehicle
                      : "-"
                  }}
                </span>
              </td>
              <td v-if="!finder.finder">
                <plain-label
                  :value="
                    $utility.formatLocalTimezone(
                      trx.time_in,
                      'DD/MM/YYYY HH:mm:ss',
                      trx.spot_detail.timezone
                    )
                  "
                />
              </td>
              <td v-if="!helper.is_member">
                <plain-label
                  v-if="trx.ref_id && trx.ref_type === 'FINDER'"
                  :value="
                    $utility.formatLocalTimezone(
                      trx.ref_detail.values.time_in,
                      'DD/MM/YYYY HH:mm:ss',
                      trx.spot_detail.timezone
                    )
                  "
                />
                <plain-label v-else value="-" />
              </td>
              <td v-if="!finder.finder">
                <plain-label
                  v-if="trx.time_out"
                  :value="
                    $utility.formatLocalTimezone(
                      trx.time_out,
                      'DD/MM/YYYY HH:mm:ss',
                      trx.spot_detail.timezone
                    )
                  "
                />
                <plain-label v-else value="-" />
              </td>
              <td v-if="!helper.is_member">
                <plain-label
                  v-if="trx.ref_id && trx.ref_type === 'FINDER'"
                  :value="
                    $utility.formatLocalTimezone(
                      trx.ref_detail.values.time_out,
                      'DD/MM/YYYY HH:mm:ss',
                      trx.spot_detail.timezone
                    )
                  "
                />
                <plain-label v-else value="-" />
              </td>
              <td v-if="!finder.finder">
                <plain-label
                  v-if="trx.paid_at"
                  :value="
                    $utility.dateUTCToLocal(
                      trx.paid_at,
                      'DD/MM/YYYY HH:mm:ss',
                      trx.spot_detail.timezone
                    )
                  "
                />
                <plain-label v-else value="-" />
              </td>
              <td v-if="!finder.finder" class="text-right">
                <price-label :has_label="true" :value="trx.total_amount" />
              </td>
              <td v-if="!finder.finder">
                <plain-label
                  :value="trx.vehicle_code ? trx.vehicle_code : '-'"
                />
              </td>
              <td>
                pilih
              </td>
            </tr>
            <!-- Additional row to make action buttons reachable -->
            <tr v-if="data.length == 1 && !finder.finder">
              <td colspan="20" style="color: #fff9ed">Soul Parking</td>
            </tr>
          </tbody>
        </table>
      </div>
    </content-table-view>

    <!-- Pagination -->
    <div class="row">
      <div class="col-12 text-right">
        <card-pagination-view
          :per_page="pagination.per_page"
          :total_data="pagination.total_data"
          additional_class="mt-3 "
          :current_page="pagination.current_page"
          @update="passUpdatePagination"
        />
      </div>
    </div>
  </div>
</template>
