import { corporateProductService } from "~/api/package.service/product";

const state = () => ({});

const getters = {};

const actions = {
  async getCorporateProduct({ dispatch }, payload) {
    return await corporateProductService
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
