import { corporateQRService } from "~/api/qr.service/container";

const state = () => ({});

const getters = {};

const actions = {
  async createQRParking({ dispatch }, payload) {
    return await corporateQRService
      .qr_parking(payload.id, payload)
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

  async createQRService({ dispatch }, payload) {
    return await corporateQRService
      .qr_service(payload.id, payload)
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
