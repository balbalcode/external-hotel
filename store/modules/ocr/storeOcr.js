import { ocrService } from "~/api/ocr.service/ocr";

const state = () => ({});

const getters = {};

const actions = {
  async getFormatOCR({ dispatch }, payload) {
    return await ocrService
      .format(payload.filter)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        dispatch(
          "modules/utility/storeUtility/setDefaultErrorAlert",
          {
            message: error.response.data.message,
            opener: payload.opener,
          },
          { root: true }
        );
        throw error;
      });
  },

  async readOCR({ dispatch }, payload) {
    return await ocrService
      .read(payload)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        dispatch(
          "modules/utility/storeUtility/setDefaultErrorAlert",
          {
            message: error.response.data.message,
            opener: payload.opener,
          },
          { root: true }
        );
        this.$sentry.captureException(error, `terjadi kesalahan: ${payload}`);
        throw error;
      });
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
