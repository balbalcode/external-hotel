import { productService } from "@/api/product.service/product";

const state = () => ({
  PRODUCT_LIST: [],
});

const getters = {};

const actions = {
  async getMembershipProduct({ commit, dispatch }, payload) {
    return await productService
      .get(payload.spot_id, payload.filter, payload.pagination, payload.order)
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

const mutations = {
  SET_PRODUCT(state, data) {
    state.PRODUCT_LIST = data;
  },
  CLEAR_PRODUCT(state) {
    state.PRODUCT_LIST = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
