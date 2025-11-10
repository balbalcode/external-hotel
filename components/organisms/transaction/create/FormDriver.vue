<template>
  <div>
    <p class="font-size-16 font-weight-bold">Pilih Driver & Truk</p>
    <div class="row" v-if="form.data[0].number">
      <div
        class="col-12 col-lg-6"
        v-for="(car, index) in form.data"
        :key="`items-${index}`"
      >
        <div class="rounded-lg border p-3">
          <div class="d-flex justify-content-between">
            <div class="">
              <p class="my-1 font-weight-bold">
                {{ car.number }}
              </p>
              <p class="my-1 font-size-12">
                {{ car.vehicleType.text }}
              </p>
            </div>
            <div class="">
              <p class="my-1 font-weight-bold">
                {{
                  car.selectedPackage.length > 1
                    ? $utility.convertToRupiah(
                        car.selectedPackage.reduce(
                          (sum, opt) => sum + opt.price,
                          0
                        )
                      )
                    : $utility.convertToRupiah(car.selectedPackage[0].price)
                }}
              </p>
            </div>
          </div>

          <div class="d-flex">
            <p class="mr-1">Estimasi Keluar: {{ car.exitEstimation }}</p>
            <p v-if="car.selectedPackage.hasOwnProperty('package_items')">
              <span
                v-for="(item, idx) in car.selectedPackage.package_items"
                :key="`product-${car}__${idx}`"
              >
                {{ item.name }}
                <i
                  :class="`${
                    idx < car.selectedPackage.package_items.length
                      ? 'bx bx-plus'
                      : ''
                  } `"
                ></i>
              </span>
            </p>
          </div>

          <div class="my-3">
            <input-select-group
              :options="options.driver"
              v-model="form.data[index].driver"
              :is_error="$v.form.data.$each[index].driver.$error"
              :error_message="[
                {
                  state:
                    !$v.form.data.$each[index].driver.driverSelected === false,
                  message: 'Driver tidak boleh kosong',
                },
              ]"
              search_by="name"
              label="Driver"
              :is_submitted="form.isSubmitted"
              :id="`form-driver__${index}`"
              :ref="`form-driver__${index}`"
            />
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-12 text-right mt-3">
        <active-button
          additional_class="px-3"
          text="Kembali"
          type="outline"
          @click="$emit('back')"
          variant="secondary"
        />
        <active-button
          additional_class="px-3"
          text="Selanjutnya"
          @click="processNextPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANT from "~/constants/corporate";
import { driverMethods } from "@/store/helperActions";
import { helpers } from "vuelidate/lib/validators";

const driverSelected = helpers.withParams(
  { type: "driverSelected" },
  (val) => val && typeof val === "object" && !!val.id
);
export default {
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    InputSelectGroup: () =>
      import("@utilities/molecules/input-group/InputSelectGroup"),
  },
  props: {
    corporate: { default: () => ({}) },
    data: { default: () => ({}) },
  },
  data: () => ({
    form: {
      data: [
        {
          driver: {},
        },
      ],
      isSubmitted: false,
    },
    options: {
      vehicleType: CONSTANT.VEHICLE_TYPE(),
      driver: [],
    },
    helper: {
      isLoading: false,
    },
  }),
  validations: {
    form: {
      data: {
        $each: {
          driver: { driverSelected },
        },
      },
    },
  },
  async mounted() {
    await this.processGetDriver();
    this.form.data = this.data;
  },
  methods: {
    getCorporateDriver: driverMethods.getCorporateDriver,

    processCheckDriver() {
      this.form.isSubmitted = true;
      this.$v.form.$touch();
      return !this.$v.form.$invalid;
    },

    async processGetDriver() {
      try {
        this.helper.isLoading = true;
        const payload = {
          filter: [
            {
              key: "corporate_id",
              value: this.corporate.id,
            },
          ],
          pagination: {
            current_page: 1,
            per_page: 1000,
          },
        };
        const { values } = await this.getCorporateDriver(payload);
        this.options.driver = values;
        this.helper.isLoading = false;
      } catch (error) {
        this.options.driver = [];
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at FormDriver in processGetDriver`
        );
        this.helper.isLoading = false;
      }
    },

    processNextPage() {
      if (this.processCheckDriver()) {
        this.$emit("saved", this.form.data);
      }
    },
  },
};
</script>

<style></style>
