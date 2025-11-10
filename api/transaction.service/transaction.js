import { helper } from "~/api/config/helper";

export const corporateTransactionService = {
  get,
  show,
  create,
  charge,
};

async function get(filter, pagination, order) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(`/v1/external-transaction/invoice?${helper(filter, pagination, order)}`, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function show(id) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(`/v1/external-transaction/invoice/${id}`, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function create(data) {
  let axios = window.$nuxt.$axios;
  return axios
    .post(`/v1/external-transaction`, data, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function charge(data) {
  let axios = window.$nuxt.$axios;
  return axios
    .post(`/v2/charge`, data, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
