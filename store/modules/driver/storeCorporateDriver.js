import { corporateDriverService } from "~/api/driver.service/driver";

const state = () => ({});

const getters = {};

const actions = {
  async getCorporateDriver({ dispatch }, payload) {
    return await corporateDriverService
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
  async getCorporateDriverDetail({ dispatch }, payload) {
    return await corporateDriverService
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

  async createCorporateDriver({ dispatch }, payload) {
    return await corporateDriverService
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

  async updateCorporateDriver({ dispatch }, payload) {
    return await corporateDriverService
      .update(payload.id, payload)
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

  async deleteCorporateDriver({ dispatch }, payload) {
    return await corporateDriverService
      .remove(payload.id)
      .then((data) => {
        dispatch(
          "modules/utility/storeUtility/setDefaultSuccessAlert",
          {
            message: data.message,
            opener: payload.opener,
          },
          { root: true }
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
