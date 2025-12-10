<template>
  <div class="p-2">
    <div class="d-flex">
      <div class="mt-1">
        <i
          class="ic-user-plus-02 font-size-20 text-info rounded-circle"
          style="
            background-color: #a6cdfe;
            border: 6px solid #cfe4ff;
            padding: 6px;
          "
        >
        </i>
      </div>
      <div class="ml-2">
        <h5 class="font-weight-bold my-0">Buat Tamu Baru</h5>
        <p class="my-0 font-size-12 text-secondary">
          Isi data tamu dengan benar dan lengkap
        </p>
      </div>
    </div>
    <div>
      <div class="my-4">
        <div class="row">
          <div class="col-12 col-lg-4">
            <div
              class="rounded-lg border p-3 h-100 d-flex flex-column justify-content-between"
            >
              <div>
                <p class="my-1 font-weight-bold font-size-12">
                  Upload Informasi Kamar
                </p>
                <p class="my-1 text-muted font-size-10">
                  Unggah informasi kamar tamu dengan mengunggah file screenshoot
                  yang sesuai dengan format yang ditentukan.
                </p>
              </div>
              <div>
                <active-button
                  text="Pertinjau format file"
                  additional_class="font-size-10 px-3 py-1 mt-2"
                  icon="bx bx-link-external"
                />
                <p class="my-1 text-muted font-size-8 mt-1 mb-0">
                  *Hubungi pengelola untuk merubah format file
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-8">
            <div
              class="rounded-lg border p-3 h-100 d-flex flex-column justify-content-between"
            >
              <div class="w-50 mx-auto">
                <input-image-group
                  v-model="form.stepOne.ocrFile"
                  :is_error="false"
                  :error_message="[]"
                  :is_submitted="form.stepOne.isSubmitted"
                  button_text="Unggah Informasi Kamar"
                  :has_label_info="true"
                  :module="`hotel/ocr-files/${$utility.getCorporateId()}`"
                  id="form-stepOne__ocrFile"
                  ref="form-stepOne__ocrFile"
                  @files="processChangeOcrFile"
                />
              </div>
            </div>
          </div>

          <div class="row w-100 m-0">
            <div
              class="col-12 col-lg-6 mt-2 px-2 h-100 d-flex flex-column justify-content-center"
            >
              <p
                class="my-0 font-size-10 text-muted"
                v-if="!helper.isOcrValid && !helper.loading.ocrFile"
              >
                <span v-if="!helper.isUploadedOcr">
                  <i class="bx bx-error-circle"></i>
                  Pastikan file yang diunggah sesuai dengan format yang
                  ditentukan untuk hasil terbaik.
                </span>

                <span v-else>
                  <i class="bx bx-x-circle text-danger"></i>
                  File yang diunggah tidak sesuai dengan format yang ditentukan.
                  Silakan unggah ulang file yang benar.
                </span>
              </p>
              <p
                class="my-0 font-size-10 text-muted"
                v-else-if="helper.loading.ocrFile"
              >
                <i class="bx bx-spinner bx-spin"></i>
                Memproses file, mohon tunggu...
              </p>
              <p class="my-0 font-size-10 text-muted font-weight-bold" v-else>
                <i class="bx bx-check-circle text-success"></i>
                Berhasil memproses file. Silakan lanjut ke langkah berikutnya.
              </p>
            </div>
            <div class="col-12 col-lg-6 text-right mt-2 px-2">
              <active-button
                text="Proses"
                v-if="!helper.isOcrValid"
                :is_disabled="helper.loading.ocrFile || !form.stepOne.ocrFile"
                @click="processReadOcrResult()"
              />
              <active-button
                text="Berikutnya"
                @click="
                  $emit('submit', {
                    ocrFile: form.stepOne.ocrFile,
                    ocrResult: resultOcr,
                  })
                "
                v-else
              />
              <active-button
                text="Batal"
                type="outline"
                @click="$emit('cancel')"
                additional_class="mr-1 px-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { guestMethods } from "@/store/helperActions";
export default {
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    InputImageGroup: () =>
      import("@utilities/molecules/input-group/InputImageGroup"),
  },
  data: () => {
    return {
      form: {
        stepOne: {
          ocrFile: null,
          isSubmitted: false,
        },
      },
      helper: {
        resultOcr: null,
        fieldsOcr: [
          { key: "Room Number", isPrimary: true },
          { key: "Guest Name", isPrimary: false },
          { key: "Card Type", isPrimary: false },
          { key: "Arrival Date", isPrimary: true },
          { key: "Departure Date", isPrimary: true },
          { key: "Arrival Time", isPrimary: false },
          { key: "Departure Time", isPrimary: false },
        ],
        isOcrValid: false,
        isUploadedOcr: false,
        loading: {
          ocrFile: false,
        },
      },
    };
  },
  methods: {
    readOcr: guestMethods.readOcr,

    setPayloadOcr() {
      return {
        url: `${this.$utility.getBaseAssetUrl()}/${this.form.stepOne.ocrFile}`,
        layout: "vertical",
        fields: this.helper.fieldsOcr.map((field) => field.key),
      };
    },

    processChangeOcrFile(files) {
      this.form.stepOne.ocrFile = files[0];
      this.helper.isOcrValid = false;
    },

    processSubmitOcr() {
      this.form.stepOne.isSubmitted = true;
    },

    processValidateOcrResult(values) {
      const extractedFields = Object.keys(values);
      const isValid = this.helper.fieldsOcr
        .filter((field) => field.isPrimary)
        .every((field) => extractedFields.includes(field.key));
      if (isValid) {
        this.helper.isOcrValid = true;
        this.resultOcr = values;
      } else {
        this.helper.isOcrValid = false;
        this.helper.isUploadedOcr = true;
        this.form.stepOne = {
          ocrFile: null,
          isSubmitted: false,
        };
      }
    },

    async processReadOcrResult() {
      try {
        this.helper.loading.ocrFile = true;
        const PAYLOAD = this.setPayloadOcr();
        const { values } = await this.readOcr(PAYLOAD);
        this.processValidateOcrResult(values);
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processReadOcrResult in FormGuestRoom`
        );
        // window.location.reload();
      } finally {
        this.helper.loading.ocrFile = false;
      }
    },
  },
};
</script>

<style></style>
