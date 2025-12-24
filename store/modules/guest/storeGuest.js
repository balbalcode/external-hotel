import { guestService } from "~/api/guest.service/guest";
import { employeeService } from "~/api/employee.service/employee";
import { membershipService } from "~/api/membership.service/membership";
const state = () => ({});

const getters = {};

const actions = {
  async getGuest({ dispatch }, payload) {
    return await guestService
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
          { root: true }
        );
        throw error;
      });
  },

  async getGuestDetail({ dispatch }, payload) {
    return await guestService
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
        this.$sentry.captureException(error, `terjadi kesalahan: ${payload}`);
        throw error;
      });
  },

  async createGuest({ dispatch }, payload) {
    return await guestService
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
        this.$sentry.captureException(error, `terjadi kesalahan: ${payload}`);
        throw error;
      });
  },

  async readOcr({ dispatch }, payload) {
    return await guestService
      .ocr(payload)
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
        this.$sentry.captureException(error, `terjadi kesalahan: ${payload}`);
        throw error;
      });
  },

  async updateGuest({ dispatch }, payload) {
    return await guestService
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
        this.$sentry.captureException(error, `terjadi kesalahan: ${payload}`);
        throw error;
      });
  },

  async deleteGuest({ dispatch }, payload) {
    return await guestService
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
        this.$sentry.captureException(error, `terjadi kesalahan: ${payload}`);
        throw error;
      });
  },

  async createMembership({ dispatch }, payload) {
    return await membershipService
      .create(payload)
      .then(async (data) => {
        return await data;
      })
      .catch((error) => {
        throw {
          step: "createMembership",
          data: error,
        };
      });
  },

  async getEmployee({ commit, dispatch }, payload) {
    if (!payload.filter) payload.filter = [];
    if (!payload.pagination) payload.pagination = {};
    if (!payload.order) payload.order = {};
    return await employeeService
      .get(payload.company_id, payload)
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

  async createEmployee({ dispatch }, payload) {
    return await employeeService
      .create(payload.company_id, payload)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw {
          step: "createEmployee",
          data: error,
        };
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
