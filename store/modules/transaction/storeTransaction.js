import { transactionService } from "~/api/transaction.service/transaction";

const state = () => ({});

const getters = {};

const actions = {
  async authTransaction({ dispatch }, payload) {
    return await transactionService
      .auth(payload)
      .then((data) => {
        dispatch(
          "modules/utility/storeUtility/setDefaultSuccessAlert",
          {
            message: data.message,
            opener: payload.opener,
          },
          { root: true },
        );
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

  async createTransaction({ dispatch }, payload) {
    return await transactionService
      .create(payload)
      .then((data) => {
        dispatch(
          "modules/utility/storeUtility/setDefaultSuccessAlert",
          {
            message: data.message,
            opener: payload.opener,
          },
          { root: true },
        );
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

  async getTransactionLog({ commit, dispatch }, payload) {
    return await transactionService
      .logs(payload.id)
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
