import { resolutionCenterService } from "@/api/resolution-center.service/resolution-center";

const state = () => ({});

const getters = {};

const actions = {
  async getDataResolution({ commit, dispatch }, payload) {
    return await resolutionCenterService
      .show(payload.filter, payload.pagination, payload.order)
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

  async updateDataResolution({ commit, dispatch }, payload) {
    return await resolutionCenterService
      .actions(payload)
      .then((data) => {
        dispatch(
          "modules/utility/storeUtility/setDefaultSuccessAlert",
          {
            message: `${data.message}`,
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
