import { corporateTransactionService } from "~/api/transaction.service/transaction";

const state = () => ({});

const getters = {};

const actions = {
  async getCorporateTransaction({ dispatch }, payload) {
    return await corporateTransactionService
      .get(payload.filter, payload.pagination, payload.order)
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
  async getCorporateTransactionDetail({ dispatch }, payload) {
    return await corporateTransactionService
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
          { root: true }
        );
        throw error;
      });
  },

  async createCorporateTransaction({ dispatch }, payload) {
    return await corporateTransactionService
      .create(payload)
      .then((data) => {
        dispatch(
          "modules/utility/storeUtility/setDefaultSuccessAlert",
          {
            message: data.message,
            opener: payload.opener,
          },
          { root: true }
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
          { root: true }
        );
        throw error;
      });
  },

  async chargeCorporateTransaction({ dispatch }, payload) {
    return await corporateTransactionService
      .charge(payload)
      .then((data) => {
        dispatch(
          "modules/utility/storeUtility/setDefaultSuccessAlert",
          {
            message: data.message,
            opener: payload.opener,
          },
          { root: true }
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
          { root: true }
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
