import { corporateSubscriptionService } from "~/api/corporate.service/subscription";

const state = () => ({});

const getters = {};

const actions = {
  async getCorporateDetail({ dispatch }, payload) {
    return await corporateSubscriptionService
      .show(payload.spot_id, payload.id)
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
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
