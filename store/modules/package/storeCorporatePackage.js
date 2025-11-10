import { corporatePackageService } from "~/api/package.service/package";

const state = () => ({});

const getters = {};

const actions = {
  async getCorporatePackage({ dispatch }, payload) {
    return await corporatePackageService
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
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
