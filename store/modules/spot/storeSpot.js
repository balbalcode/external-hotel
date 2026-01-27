import { spotsService } from "~/api/spots.service/spots";

const state = () => ({
  currentSpot: {},
});

const getters = {
  getStateCurrentSpot(state) {
    return state.currentSpot ? state.currentSpot : {};
  },
};

const actions = {
  async getSpotDetail({ commit, dispatch }, payload) {
    return await spotsService
      .show(payload.id)
      .then((data) => {
        commit("toggleCurrentSpot", data.values);
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

const mutations = {
  toggleCurrentSpot(state, currentSpot) {
    state.currentSpot = currentSpot;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
