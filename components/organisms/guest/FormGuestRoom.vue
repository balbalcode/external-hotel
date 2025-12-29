<template>
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
              <a :href="helper.sampleFile" target="_blank">
                <active-button
                  text="Pertinjau format file"
                  additional_class="font-size-10 px-3 py-1 mt-2"
                  icon="bx bx-link-external"
                />
              </a>
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
                v-model="form.ocrFile"
                :is_error="false"
                :error_message="[]"
                :is_submitted="form.isSubmitted"
                button_text="Unggah Informasi Kamar"
                :has_label_info="true"
                :module="`hotel/ocr-files/${$utility.getCorporateId()}`"
                id="form__ocrFile"
                data-testid="form__ocrFile"
                :key="helper.renderCounter"
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
              v-if="
                !helper.isOcrValid &&
                !helper.loading.ocrFile &&
                !helper.isUploadedOcr
              "
            >
              <i class="bx bx-error-circle"></i>
              Pastikan file yang diunggah sesuai dengan format yang ditentukan
              untuk hasil terbaik.
            </p>

            <p
              class="my-0 font-size-10 text-muted"
              v-else-if="
                !helper.isOcrValid &&
                !helper.loading.ocrFile &&
                helper.isUploadedOcr
              "
            >
              <i class="bx bx-x-circle text-danger"></i>
              File yang diunggah tidak sesuai dengan format yang ditentukan.
              Silakan unggah ulang file yang benar.
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
              :is_disabled="helper.loading.ocrFile || !form.ocrFile"
              @click="processReadOcrResult()"
            />
            <active-button text="Mengalihkan..." :is_disabled="true" v-else />
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
</template>

<script>
import { ocrMethods } from "@/store/helperActions";
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
        ocrFile: null,
        isSubmitted: false,
      },
      helper: {
        resultOcr: null,
        fieldsOcr: [],
        isOcrValid: false,
        sampleFile: "",
        isUploadedOcr: false,
        loading: {
          ocrFile: false,
        },
        renderCounter: 0,
      },
    };
  },
  mounted() {
    this.processGetFormatOcr();
  },
  methods: {
    readOCR: ocrMethods.readOCR,
    getFormatOCR: ocrMethods.getFormatOCR,

    setPayloadOcr() {
      return {
        url: `${this.$utility.getBaseAssetUrl()}/${this.form.ocrFile}`,
        layout: "vertical",
        fields: this.helper.fieldsOcr.map((field) => field.label),
      };
    },

    processChangeOcrFile(files) {
      this.form.ocrFile = files[0];
      this.helper.isOcrValid = false;
    },

    processSubmitOcr() {
      this.form.isSubmitted = true;
    },

    processMakeOcrResultMapped(values) {
      const mappedResult = {};
      this.helper.fieldsOcr.forEach((field) => {
        if (field.object) {
          mappedResult[field.object] = values[field.key];
        }
      });
      return mappedResult;
    },

    processValidateOcrResult(values) {
      const extractedFields = Object.keys(values);
      const isValid = this.helper.fieldsOcr
        .filter((field) => field.isPrimary)
        .every((field) => extractedFields.includes(field.key));
      if (isValid) {
        this.helper.isOcrValid = true;
        this.$emit("submit", {
          ocrFile: this.form.ocrFile,
          data: values,
        });
      } else {
        this.helper.isOcrValid = false;
        this.helper.isUploadedOcr = true;
        this.helper.renderCounter += 1;
        this.form = {
          ocrFile: null,
          isSubmitted: false,
        };
      }
    },

    async processGetFormatOcr() {
      try {
        this.helper.loading.ocrFile = true;
        const payload = {
          filter: [
            { key: "corporate_id", value: this.$utility.getCorporateId() },
          ],
        };
        const { values } = await this.getFormatOCR(payload);
        this.helper.fieldsOcr = JSON.parse(values[0].fields);
        this.helper.sampleFile = `${this.$utility.getBaseAssetUrl()}/${
          values[0].ocrFile
        }`;
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetFormatOcr in FormGuestRoom`
        );
        window.location.reload();
      } finally {
        this.helper.loading.ocrFile = false;
      }
    },

    async processReadOcrResult() {
      try {
        this.helper.loading.ocrFile = true;
        const PAYLOAD = this.setPayloadOcr();
        const { values } = await this.readOCR(PAYLOAD);
        this.processValidateOcrResult(values);
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processReadOcrResult in FormGuestRoom`
        );
        window.location.reload();
      } finally {
        this.helper.loading.ocrFile = false;
      }
    },
  },
};
</script>

<style></style>
