import { configService } from "~/api/config.service/config";

const state = () => ({});

const getters = {};

const actions = {
  async getConfig({ dispatch }, payload) {
    return await configService
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
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
