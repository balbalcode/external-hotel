import { hashService } from "~/api/hash.service/hash";
const state = () => ({});

const getters = {};

const actions = {
  async getCryptoHash({ dispatch }, payload) {
    return await hashService
      .crypto(payload)
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
        this.$sentry.captureException(error, `terjadi kesalahan: ${payload}`);
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
