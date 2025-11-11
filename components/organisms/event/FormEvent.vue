<template>
  <div class="p-2">
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
        <h5 class="font-weight-bold my-0">Buat Event Baru</h5>
        <p class="my-0 font-size-12 text-secondary">
          Isi data event dengan benar dan lengkap
        </p>
      </div>
    </div>
    <div>
      <div class="mt-4 d-flex">
        <div class="badge badge-pill pt-1 badge-primary">1</div>
        <div class="font-size-12 ml-2 font-weight-bold">Informasi Event</div>
      </div>
      <div class="mt-2 mb-4">
        <input-text-group
          v-model="form.name"
          :is_error="$v.form.name.$error"
          additional_class_group="my-2"
          additional_class_label="mb-1"
          label_info="Nama event akan dilampirkan pada QR tiket masuk, mohon masukkan nama event dengan benar."
          id="txt_name"
          label="Nama Event"
          :is_submitted="form.isSubmitted"
          placeholder="Contoh: Event Meeting SPN 2024"
          :error_message="[
            {
              state: $v.form.name.required,
              message: 'Nama Event tidak boleh kosong',
            },
          ]"
          :test_id="`${id}__name`"
          :ref="`${id}__name`"
        />
      </div>

      <div class="my-4">
        <input-date-group
          v-model="form.start"
          :is_error="$v.form.start.$error"
          additional_class_label="mb-1"
          additional_class_group="my-2"
          id="txt_start"
          label="Tanggal Mulai"
          :is_submitted="form.isSubmitted"
          placeholder="Masukkan Tanggal Mulai"
          label_info="Tanggal mulai event akan digunakan sebagai acuan awal berlakunya tiket masuk."
          :error_message="[
            {
              state: $v.form.start.required,
              message: 'Tanggal Mulai tidak boleh kosong',
            },
          ]"
          :test_id="`${id}__start`"
          :ref="`${id}__start`"
        />
      </div>

      <div class="my-4">
        <p class="font-weight-bold my-0">Durasi Event</p>
        <p class="text-secondary font-size-11 mt-0 mb-1">
          Pilih durasi event untuk memudahkan pengaturan tanggal berakhir event
        </p>
        <div class="d-flex">
          <active-button
            text="1 Hari"
            type="outline"
            additional_class="px-5 mt-1"
          />
          <active-button
            text="2 Hari"
            type="outline"
            additional_class="px-5 mt-1 ml-1"
          />
          <active-button
            text="3 Hari"
            type="outline"
            additional_class="px-5 mt-1 ml-1"
          />
          <active-button
            text="1 Minggu"
            type="outline"
            additional_class="px-5 mt-1 ml-1"
          />
          <active-button
            text="Atur Manual"
            type=""
            additional_class="px-5 mt-1 ml-1"
          />
        </div>
        <input-date-group
          v-model="form.end"
          :is_error="$v.form.end.$error"
          additional_class_group="mt-3 mb-0"
          additional_class_label="mb-1"
          id="txt_end"
          label="Tanggal Berakhir"
          :is_submitted="form.isSubmitted"
          placeholder="Masukkan Tanggal Berakhir"
          :error_message="[
            {
              state: $v.form.end.required,
              message: 'Tanggal Berakhir tidak boleh kosong',
            },
          ]"
          :test_id="`${id}__end`"
          :ref="`${id}__end`"
        />
        <p class="text-muted font-size-12 mt-2">
          *Tanggal berakhir event digunakan sebagai acuan akhir berlakunya tiket
          masuk.
        </p>
      </div>

      <div class="my-4">
        <input-textarea-group
          v-model="form.description"
          :is_error="$v.form.description.$error"
          additional_class_group="my-2"
          additional_class_label="mb-1"
          label_info="Deskripsi event akan ditampilkan pada halaman detail event."
          id="txt_description"
          label="Deskripsi Event"
          :is_submitted="form.isSubmitted"
          placeholder="Masukkan Deskripsi Event"
          :error_message="[
            {
              state: $v.form.description.required,
              message: 'Deskripsi Event tidak boleh kosong',
            },
          ]"
          :test_id="`${id}__description`"
          :ref="`${id}__description`"
        />
      </div>
    </div>

    <div>
      <div class="mt-4 d-flex">
        <div class="badge badge-pill pt-1 badge-primary">2</div>
        <div class="font-size-12 ml-2 font-weight-bold">Jumlah Tamu Event</div>
      </div>
      <div class="my-4">
        <div class="row">
          <div class="col-12 col-lg-6 my-1">
            <div class="rounded-lg border shadow p-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex items-center">
                  <div class="mt-1">
                    <i class="ic-car-01 font-size-22 mt-2"></i>
                  </div>
                  <div class="ml-2 mt-1">
                    <p class="font-weight-bold font-size-12 my-0">Mobil</p>
                    <p class="text-muted font-size-10 my-0">
                      Aktifkan jika menyediakan kendaraan mobil
                    </p>
                  </div>
                </div>
                <div class="mr-n4">
                  <checkbox-input
                    :id="`chk_car`"
                    :options="[{ text: '', value: true }]"
                  />
                </div>
              </div>
              <div class="my-3">
                <input-text-group
                  v-model="form.quota.car"
                  :is_error="$v.form.quota.car.$error"
                  additional_class_group="my-2"
                  additional_class_label="mb-1"
                  id="txt_quota.car"
                  label="Kuota"
                  format="number"
                  :is_submitted="form.isSubmitted"
                  placeholder="Masukkan Kuota"
                  label_info=""
                  :error_message="[
                    {
                      state: $v.form.quota.car.required,
                      message: 'Kuota tidak boleh kosong',
                    },
                  ]"
                  :test_id="`${id}__quota.car`"
                  :ref="`${id}__quota.car`"
                />
              </div>
              <div class="my-3">
                <input-select-group
                  v-model="form.product.car"
                  :is_error="$v.form.product.car.$error"
                  additional_class_group="my-2"
                  additional_class_label="mb-1"
                  id="sel_product.car"
                  label="Member"
                  :options="options.product.car"
                  option_label="name"
                  option_value="id"
                  search_by="name"
                  :is_submitted="form.isSubmitted"
                  placeholder="Pilih Member"
                  :error_message="[
                    {
                      state: $v.form.product.car.required,
                      message: 'Member tidak boleh kosong',
                    },
                  ]"
                  :test_id="`${id}__product.car`"
                  :ref="`${id}__product.car`"
                />
              </div>

              <div>
                <p class="text-muted font-size-9 mt-2 mb-1 text-justify">
                  *Pastikan Anda menambahkan member kendaraan sesuai dengan
                  kuota yang telah ditentukan, karena kuota dan produk akan
                  berpengaruh pada tagihan Anda nanti.
                </p>
                <p class="text-muted font-size-9 mt-1 text-justify">
                  Perkiraan Tagihan:
                  <strong
                    >{{ form.quota.car || 0 }}
                    x
                    {{
                      form.product.car.price
                        ? $utility.convertToRupiah(form.product.car.price)
                        : "0"
                    }}</strong
                  >
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 my-1">
            <div class="rounded-lg border shadow p-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex items-center">
                  <div class="mt-1">
                    <i class="ic-motorcycle font-size-22 mt-2"></i>
                  </div>
                  <div class="ml-2 mt-1">
                    <p class="font-weight-bold font-size-12 my-0">Motor</p>
                    <p class="text-muted font-size-10 my-0">
                      Aktifkan jika menyediakan kendaraan motor
                    </p>
                  </div>
                </div>
                <div class="mr-n4">
                  <checkbox-input
                    :id="`chk_motorcycle`"
                    :options="[{ text: '', value: true }]"
                  />
                </div>
              </div>
              <div class="my-3">
                <input-text-group
                  v-model="form.quota.motorcycle"
                  :is_error="$v.form.quota.motorcycle.$error"
                  additional_class_group="my-2"
                  additional_class_label="mb-1"
                  id="txt_quota.motorcycle"
                  label="Kuota"
                  format="number"
                  :is_submitted="form.isSubmitted"
                  placeholder="Masukkan Kuota"
                  label_info=""
                  :error_message="[
                    {
                      state: $v.form.quota.motorcycle.required,
                      message: 'Kuota tidak boleh kosong',
                    },
                  ]"
                  :test_id="`${id}__quota.motorcycle`"
                  :ref="`${id}__quota.motorcycle`"
                />
              </div>
              <div class="my-3">
                <input-select-group
                  v-model="form.product.motorcycle"
                  :is_error="$v.form.product.motorcycle.$error"
                  additional_class_group="my-2"
                  additional_class_label="mb-1"
                  id="sel_product.motorcycle"
                  label="Member"
                  :options="options.product.motorcycle"
                  option_label="name"
                  option_value="id"
                  search_by="name"
                  :is_submitted="form.isSubmitted"
                  placeholder="Pilih Member"
                  :error_message="[
                    {
                      state: $v.form.product.motorcycle.required,
                      message: 'Member tidak boleh kosong',
                    },
                  ]"
                  :test_id="`${id}__product.motorcycle`"
                  :ref="`${id}__product.motorcycle`"
                />
              </div>

              <div>
                <p class="text-muted font-size-9 mt-2 mb-1 text-justify">
                  *Pastikan Anda menambahkan member kendaraan sesuai dengan
                  kuota yang telah ditentukan, karena kuota dan produk akan
                  berpengaruh pada tagihan Anda nanti.
                </p>
                <p class="text-muted font-size-9 mt-1 text-justify">
                  Perkiraan Tagihan:
                  <strong
                    >{{ form.quota.motorcycle || 0 }}
                    x
                    {{
                      form.product.motorcycle.price
                        ? $utility.convertToRupiah(form.product.motorcycle.price)
                        : "0"
                    }}</strong
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="true">
      <div class="mt-4 d-flex">
        <div class="badge badge-pill pt-1 badge-primary">3</div>
        <div class="font-size-12 ml-2 font-weight-bold">
          Informasi Kendaraan
        </div>
      </div>
      <div class="my-4">
        <div class="row">
          <div class="col-12 col-lg-6 my-1">
            <div class="rounded-lg border shadow p-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex items-center">
                  <div class="mt-1">
                    <i class="ic-car-01 font-size-22 mt-2"></i>
                  </div>
                  <div class="ml-2 mt-1">
                    <p class="font-weight-bold font-size-12 my-0">
                      Daftar Plat Mobil
                    </p>
                    <p class="text-muted font-size-10 my-0">
                      Kuota: {{ form.quota.car }} Plat Nomor
                    </p>
                  </div>
                </div>
              </div>
              <input-tag-group
                v-model="form.licensePlate.car"
                additional_class_group="my-2"
                :limit="form.quota.car"
                :is_error="false"
                id="licensePlate.car"
                :error_message="false"
                additional_class_label="d-none"
                tag_separator=","
                placeholder="Masukkan Plat Nomor Mobil dan tekan enter"
                :is_submitted="form.isSubmitted"
              />
              <p class="font-size-9 text-muted">
                *Anda dapat mengisi sebagian atau mengosongkan apabila tidak
                mengetahui semua plat kendaraan yang akan hadir
              </p>
            </div>
          </div>
          <div class="col-12 col-lg-6 my-1">
            <div class="rounded-lg border shadow p-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex items-center">
                  <div class="mt-1">
                    <i class="ic-motorcycle font-size-22 mt-2"></i>
                  </div>
                  <div class="ml-2 mt-1">
                    <p class="font-weight-bold font-size-12 my-0">
                      Daftar Plat Motor
                    </p>
                    <p class="text-muted font-size-10 my-0">
                      Kuota: {{ form.quota.motorcycle }} Plat Nomor
                    </p>
                  </div>
                </div>
              </div>
              <input-tag-group
                v-model="form.licensePlate.motorcycle"
                additional_class_group="my-2"
                :limit="form.quota.motorcycle"
                :is_error="false"
                id="licensePlate.motorcycle"
                :error_message="false"
                additional_class_label="d-none"
                tag_separator=","
                placeholder="Masukkan Plat Nomor Mobil dan tekan enter"
                :is_submitted="form.isSubmitted"
              />
              <p class="font-size-9 text-muted">
                *Anda dapat mengisi sebagian atau mengosongkan apabila tidak
                mengetahui semua plat kendaraan yang akan hadir
              </p>
            </div>
          </div>
          <div class="col-12 col-lg-12 my-3">
            <div class="rounded-lg border shadow overflow-hidden">
              <div class="d-flex">
                <div class="p-3">
                  <img src="~/static/vip-sign.png" style="height: 128px" />
                </div>
                <div class="py-3">
                  <p class="my-0 font-weight-bold">
                    Akktifkan fitur VIP Pass untuk memberikan akses khusus
                  </p>
                  <p class="my-0 text-muted font-size-12">
                    Dengan mengaktifkan fitur VIP Pass, Anda dapat memberikan
                    akses khusus kepada tamu undangan tertentu untuk masuk ke
                    parkiran event tanpa perlu melalui proses validasi.
                  </p>
                  <input-text-group
                    :is_error="false"
                    additional_class_group="my-2"
                    additional_class_label="mb-1"
                    id="txt_vip_pass_code"
                    label="Jumlah VIP Pass"
                    :is_submitted="form.isSubmitted"
                    placeholder="Masukkan Jumlah VIP Pass"
                    label_info=""
                    :error_message="[]"
                    :test_id="`${id}__vip_pass_code`"
                    :ref="`${id}__vip_pass_code`"
                  />
                </div>
                <div class="p-3">
                  <switch-input
                    :id="`swc_vip_pass`"
                    :options="[{ text: '', value: true }]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productMethods } from "@/store/helperActions";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    InputDateGroup: () =>
      import("@utilities/molecules/input-group/InputDateGroup"),
    InputTextareaGroup: () =>
      import("@utilities/molecules/input-group/InputTextareaGroup"),
    InputSelectGroup: () =>
      import("@utilities/molecules/input-group/InputSelectGroup"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    CheckboxInput: () => import("@utilities/atoms/input/CheckboxInput"),
    SwitchInput: () => import("@utilities/atoms/input/SwitchInput"),
    InputTagGroup: () =>
      import("@utilities/molecules/input-group/InputTagGroup"),
  },
  data: () => ({
    id: "form_event",
    form: {
      name: "",
      description: "",
      start: "",
      end: "",
      product: {
        car: {},
        motorcycle: {},
      },
      quota: {
        car: 0,
        motorcycle: 0,
      },
      licensePlate: {
        car: [],
        motorcycle: [],
      },
      isSubmitted: false,
    },
    options: {
      product: {
        car: [],
        motorcycle: [],
      },
    },
    quota: {
      car: [],
      motorcycle: [],
    },
    helper: {
      isLoading: false,
      steps: 1,
    },
  }),
  validations: {
    form: {
      name: { required },
      description: { required },
      start: { required },
      end: { required },
      product: {
        car: { required },
        motorcycle: { required },
      },
      quota: {
        car: { required },
        motorcycle: { required },
      },
    },
  },
  watch: {
    "form.quota.car"(newVal) {
      if (newVal === "" || newVal === null || newVal === undefined) {
        this.form.quota.car = 0;
      }
    },
    "form.quota.motorcycle"(newVal) {
      if (newVal === "" || newVal === null || newVal === undefined) {
        this.form.quota.motorcycle = 0;
      }
    },
  },
  async mounted() {
    await this.processGetProductList();
  },
  methods: {
    getMembershipProduct: productMethods.getMembershipProduct,
    processNextStep() {
      this.form;
    },

    async processSubmitForm() {
      this.toggleButtonSubmit();
      this.form.isSubmitted = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        await this.processCreateData();
      }
      this.toggleButtonSubmit();
    },

    toggleButtonSubmit() {
      this.helper.isLoading = !this.helper.isLoading;
    },

    processDivideProductByType(options) {
      const carProducts = options.filter((item) =>
        item.vehicle_code.includes("MB")
      );
      const motorcycleProducts = options.filter((item) =>
        item.vehicle_code.includes("MT")
      );
      this.options.product = {
        car: carProducts,
        motorcycle: motorcycleProducts,
      };
    },

    async processGetProductList() {
      try {
        this.helper.isLoading = true;
        const PAYLOAD = {
          spot_id: this.$utility.getSpotId(),
          filter: [
            { key: "type", value: "NOT_CASHIER" },
            { key: "status", value: true },
          ],
          pagination: {
            current_page: 1,
            per_page: 1000,
          },
          order: {},
        };
        const { values } = await this.getMembershipProduct(PAYLOAD);
        this.processDivideProductByType(values);
      } catch (error) {
        this.options.product = {
          car: [],
          motorcycle: [],
        };
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetProductList in FormEvent`
        );
      } finally {
        this.helper.isLoading = false;
      }
    },
  },
};
</script>

<style></style>
