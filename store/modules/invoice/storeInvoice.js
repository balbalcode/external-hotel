import { invoiceService } from "~/api/invoice.service/invoice";

const state = () => ({});

const getters = {};

const actions = {
  async getInvoice({ dispatch }, payload) {
    return await invoiceService
      .get(payload.filter)
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
          { root: true },
        );
        throw error;
      });
  },

  async getInvoiceDetail({ dispatch }, payload) {
    return await invoiceService
      .show(payload.id)
      .then((data) => {
        return data.values;
      })
      .catch((error) => {
        dispatch(
          "modules/utility/storeUtility/setDefaultErrorAlert",
          {
            message: error.response.data.message,
            opener: payload.opener,
          },
          { root: true },
        );
        this.$sentry.captureException(error, `terjadi kesalahan: ${payload}`);
        throw error;
      });
  },

  async createInvoice({ dispatch }, payload) {
    return await invoiceService
      .create(payload)
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
          { root: true },
        );
        this.$sentry.captureException(error, `terjadi kesalahan: ${payload}`);
        throw error;
      });
  },

  async updateInvoice({ dispatch }, payload) {
    return await invoiceService
      .update(payload.id, payload)
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
          { root: true },
        );
        this.$sentry.captureException(error, `terjadi kesalahan: ${payload}`);
        throw error;
      });
  },

  async deleteInvoice({ dispatch }, payload) {
    return await invoiceService
      .remove(payload.id)
      .then((data) => {
        dispatch(
          "modules/utility/storeUtility/setDefaultSuccessAlert",
          {
            message: data.message,
            opener: payload.opener,
          },
          { root: true },
        );
        return data.values;
      })
      .catch((error) => {
        dispatch(
          "modules/utility/storeUtility/setDefaultErrorAlert",
          {
            message: error.response.data.message,
            opener: payload.opener,
          },
          { root: true },
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
