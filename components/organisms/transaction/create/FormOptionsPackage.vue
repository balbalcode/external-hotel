<template>
  <div>
    <div class="">
      <p class="font-weight-bold font-size-16">Pilih Layanan</p>
      <!-- <tab-bar :tabs="options.tab" v-model="helper.tab" has_divider /> -->
      <div class="row py-3" v-if="helper.tab === 'BUNDLE'">
        <div
          v-for="(bundle, index) in options.bundle"
          class="col-12 col-lg-6 p-3 cursor-pointer"
          @click="processSetSelected('BUNDLE', bundle)"
          :key="`bundle-${index}`"
          :data-testid="`bundle-${index}`"
        >
          <!-- :class="`rounded-lg p-3 border ${
              bundle.id === selected.unit.id
                ? 'border-primary bg-primary-90'
                : ''
            }`" -->
          <div>
            <img
              v-for="(images, idx) in bundle.package_items"
              :src="`${$utility.getBaseAssetUrl()}/${images.image_path}`"
              class="rounded-lg"
              style="max-height: 128px"
              :key="`image-${index}__${idx}`"
            />
            <div class="d-flex justify-content-between my-2">
              <p class="my-1 font-size-14 font-weight-bold">
                {{ bundle.name }}
              </p>
              <p class="my-1 font-size-14">
                Rp{{ $utility.convertToRupiah(bundle.total_price) }}
              </p>
            </div>
            <div class="my-1">
              <p class="my-1 font-size-12">
                {{ bundle.package_items.map((opt) => opt.name).join("+") }}
              </p>
              <p class="my-1 font-size-1">
                {{ bundle.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-if="helper.tab === 'SINGLE'">
        <div
          v-for="(product, index) in options.product"
          class="col-12 col-lg-4 p-2 cursor-pointer"
          @click="processSetSelected('SINGLE', product)"
          :key="`product-${index}`"
          :data-testid="`product-${index}`"
        >
          <div
            :class="`h-100 rounded-lg p-3 border ${
              selected.includes(product)
                ? 'border-primary bg-primary-90 shadows'
                : ''
            }`"
          >
            <img
              :src="`${$utility.getBaseAssetUrl()}/${product.image_path}`"
              class="img-fluid rounded-lg"
            />
            <div class="d-flex justify-content-between my-2">
              <p class="my-1 font-size-14 font-weight-bold">
                {{ product.name }}
              </p>
              <p class="my-1 font-size-14">
                Rp{{ $utility.convertToRupiah(product.price) }}
              </p>
            </div>
            <div class="my-1">
              <p class="my-1 font-size-12">
                {{ product.alias }}
              </p>
              <p class="my-1 font-size-1">
                {{ product.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-3">
        <hr />
        <div class="d-flex justify-content-between w-100">
          <div>
            <p class="my-1 text-muted font-size-12">Layanan dipilih:</p>
            <p
              class="my-1 font-weight-bold font-size-14"
              v-if="selected.length > 1"
            >
              {{ selected.length }} Layanan
              <i
                v-b-tooltip
                class="bx bx-error-circle"
                :title="selected.map((opt) => opt.name).join(', ')"
              ></i>
            </p>
            <p
              class="my-1 font-weight-bold font-size-14"
              v-if="selected.length === 1"
            >
              {{ selected[0].name }}
            </p>
          </div>
          <div class="text-right mt-2">
            <active-button
              additional_class="px-5"
              text="Batal"
              type="outline"
              variant="secondary"
              @click="processCancelSelection"
            />
            <active-button
              additional_class="px-5"
              text="Pilih"
              :is_disabled="
                helper.isLoading ||
                (helper.isSubmitted && selected.length === 0)
              "
              @click="procesSubmitSelection"
            />
            <p
              class="font-size-12 text-danger mt-1"
              v-if="helper.isSubmitted && selected.length === 0"
            >
              Anda belum memilih layanan
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productMethods, packageMethods } from "@/store/helperActions";
export default {
  components: {
    TabBar: () => import("@utilities/molecules/tab-bar/TabBar"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
  },
  props: {
    indexContainer: { default: null },
    corporate: { defaul: () => ({}) },
  },
  data: () => ({
    selected: [],
    helper: {
      tab: "SINGLE",
      isSubmitted: false,
      isLoading: false,
    },
    options: {
      tab: [
        // { text: "Paket Layanan", value: "BUNDLE" },
        { text: "Layanan Satuan", value: "SINGLE" },
      ],
      product: [],
      bundle: [],
    },
  }),
  async mounted() {
    await this.processGetProduct();
    await this.processGetPackage();
  },

  methods: {
    getCorporatePackage: packageMethods.getCorporatePackage,
    getCorporateProduct: productMethods.getCorporateProduct,

    processCancelSelection() {
      this.selected = [];
      this.$emit("cancel");
    },

    procesSubmitSelection() {
      this.helper.isSubmitted = true;
      if (this.selected.length > 0) {
        this.$emit("submit", {
          data: this.selected,
          text: this.selected.map((opt) => opt.name).join(" + "),
        });
      }
    },

    processSetSelected(type, item) {
      if (this.selected.includes(item)) {
        this.selected.splice(
          this.selected.findIndex((opt) => opt.id === item.id),
          1
        );
      } else {
        this.selected.push(item);
      }
    },

    async processGetProduct() {
      try {
        this.helper.isLoading = true;
        const payload = {
          filter: [
            {
              key: "corporate_type",
              value: this.corporate.corporate_type,
            },
            { key: "spot_id", value: this.corporate.spot_id },
          ],
          pagination: {
            current_page: 1,
            per_page: 1000,
          },
        };
        const { values } = await this.getCorporateProduct(payload);
        this.options.product = values;
        this.helper.isLoading = false;
      } catch (error) {
        this.options.product = [];
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetProduct in FormOptionsPackage`
        );
        this.helper.isLoading = false;
      }
    },

    async processGetPackage() {
      try {
        this.helper.isLoading = true;
        const payload = {
          filter: [
            {
              key: "corporate_type",
              value: this.corporate.corporate_type,
            },
            { key: "spot_id", value: this.corporate.spot_id },
          ],
          pagination: {
            current_page: 1,
            per_page: 1000,
          },
        };
        const { values } = await this.getCorporatePackage(payload);
        this.options.bundle = values;
        this.helper.isLoading = false;
      } catch (error) {
        this.options.bundle = [];
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetPackage in FormOptionsPackage`
        );
        this.helper.isLoading = false;
      }
    },
  },
};
</script>

<style></style>
