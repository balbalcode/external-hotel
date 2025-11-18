<template>
  <div>
    <div class="bg-white rounded-lg shadow p-3 mt-3">
      <div class="d-flex justify-content-between">
        <div>
          <input-date-group
            format="DD-MM-YYYY"
            v-model="filter.dateRange"
            type="date"
            is_range
            label="Tampilkan berdasarkan:"
          />
        </div>
        <div class="d-flex">
          <input-text-group
            label="Nama Event"
            placeholder="Nama Event"
            v-model="filter.eventName"
            additional_class_label="invisible hidden"
            :error_message="[
              {
                state: $v.filter.eventName.minlength,
                message: 'Nama event tidak boleh kurang dari 3 karakter',
              },
            ]"
          />
          <div class="ml-2 pt-lg-1">
            <active-button
              text="Cari"
              additional_class="mt-4 px-3"
              @click="processSearchEvent"
            />
          </div>
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
                <th class="text-dark">No</th>
                <th class="text-dark">Event</th>
                <th class="text-dark">Tanggal</th>
                <th class="text-dark">Kuota Motor</th>
                <th class="text-dark">Kuota Mobil</th>
                <th class="text-dark">Pembuat</th>
                <th class="text-dark">Estimasi Tagihan</th>
                <th class="text-dark text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data" :key="index">
                <td>1</td>
                <td>{{ item.name }}</td>
                <td>
                  {{
                    $utility.formatDateMoment(item.start, "DD MMM YYYY HH:mm")
                  }}
                  -
                  {{ $utility.formatDateMoment(item.end, "DD MMM YYYY HH:mm") }}
                </td>
                <td>
                  {{ $utility.convertToRupiah(item.total_motorcycle) }} Motor
                </td>
                <td>{{ $utility.convertToRupiah(item.total_car) }} Mobil</td>
                <td>{{ $utility.convertToRupiah(0) }}</td>
                <td>{{ item.created_by }}</td>
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
                      icon="ic-file-06"
                      icon_size="16"
                      text="Daftar Tamu"
                      variant="light"
                      type="outline"
                      @click="$router.push(`/hotel/event/detail?id=${item.id}`)"
                      additional_class="border-0 w-100 text-left p-2 rounded-0"
                    />
                    <active-button
                      icon="ic-users-plus"
                      icon_size="16"
                      text="Tambah Kuota"
                      variant="light"
                      type="outline"
                      @click="$emit('addQuota', item)"
                      additional_class="border-0 w-100 text-left p-2 rounded-0"
                    />
                    <active-button
                      v-if="
                        new Date(item.start) >= new Date(Date.now() - 86400000)
                      "
                      icon="ic-trash-02"
                      icon_size="16"
                      text="Hapus Event"
                      variant="light"
                      type="outline"
                      additional_class="border-0 w-100 text-left p-2 rounded-0 text-nowrap"
                    />
                  </dropdown-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-12 text-right w-100">
          <card-pagination-view
            :perPage="pagination.perPage"
            :totalData="pagination.totalData"
            additional_class="mt-3 "
            :currentPage="pagination.currentPage"
            @update="passUpdatePagination"
          />
        </div>
      </content-table-view>
    </div>
  </div>
</template>

<script>
import { minLength } from "vuelidate/lib/validators";
import { eventMethods } from "@/store/helperActions";
export default {
  components: {
    InputDateGroup: () =>
      import("@utilities/molecules/input-group/InputDateGroup"),
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    ContentTableView: () =>
      import("@utilities/molecules/content-view/ContentTableView"),
    CardPaginationView: () =>
      import("@utilities/molecules/card-view/CardPaginationView"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DropdownButton: () => import("@utilities/atoms/button/DropdownButton"),
  },
  data: () => ({
    data: [],
    filter: {
      dateRange: [new Date(Date.now() - 86400000), new Date()],
      eventName: "",
    },
    helper: {
      selectedData: null,
      isLoading: false,
      isError: false,
    },
    pagination: {
      currentPage: 1,
      perPage: 10,
      totalData: 0,
    },
  }),
  validations: {
    filter: {
      eventName: {
        minLength: minLength(3),
      },
    },
  },
  mounted() {
    this.processGetDataEvent();
  },
  methods: {
    getEvent: eventMethods.getEvent,

    setPayloadGet() {
      let payload = {
        filter: [
          {
            key: "date",
            value: `${this.$utility.formatDateMoment(
              this.filter.dateRange[0],
              "YYYY-MM-DD"
            )}_${this.$utility.formatDateMoment(
              this.filter.dateRange[1],
              "YYYY-MM-DD"
            )}`,
          },
          { key: "page", value: this.pagination.currentPage },
          { key: "per_page", value: this.pagination.perPage },
        ],
        opener: this.$route.path,
      };

      if (this.filter.eventName) {
        payload.filter.push({
          key: "name",
          value: this.filter.eventName,
        });
      }

      return payload;
    },

    async passUpdatePagination(page) {
      this.pagination.currentPage = page;
      await this.processGetData();
    },

    processSearchEvent() {
      this.$v.filter.$touch();
      if (!this.$v.filter.$invalid) {
        this.passUpdatePagination(1);
      }
    },

    async processGetDataEvent() {
      try {
        this.helper.isLoading = true;
        this.helper.isError = false;
        const PAYLOAD = this.setPayloadGet();
        const { values, total_values } = await this.getEvent(PAYLOAD);
        this.data = values;
        this.pagination.totalData = total_values;
      } catch (error) {
        this.helper.isError = true;
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetDataEvent in TableEvent`
        );
        console.log(error);
      } finally {
        this.helper.isLoading = false;
      }
    },
  },
};
</script>

<style></style>
