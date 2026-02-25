import { helper } from "~/api/config/helper";

export const invoiceService = {
  get,
  show,
  create,
  update,
  remove,
};

async function get(filter) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(`${process.env.TEMP_API}/api/temp/invoice?${helper(filter)}`, {
      timeout: 25500,
    })
    .then((data) => {
      if ([200, 201].indexOf(data.status) >= 0) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function show(id) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(`${process.env.TEMP_API}/api/temp/invoice/${id}`, { timeout: 25500 })
    .then((data) => {
      if ([200, 201].indexOf(data.status) >= 0) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function create(payload) {
  let axios = window.$nuxt.$axios;
  return axios
    .post(`${process.env.TEMP_API}/api/temp/invoice`, payload, {
      timeout: 25500,
    })
    .then((data) => {
      if ([200, 201].indexOf(data.status) >= 0) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function increase(data) {
  let axios = window.$nuxt.$axios;
  return axios
    .post(`${process.env.TEMP_API}/api/temp/invoice`, data, { timeout: 25500 })
    .then((data) => {
      if ([200, 201].indexOf(data.status) >= 0) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function update(id, data) {
  let axios = window.$nuxt.$axios;
  delete data.id;
  return axios
    .patch(`${process.env.TEMP_API}/api/temp/invoice/${id}`, data, {
      timeout: 25500,
    })
    .then((data) => {
      if ([200, 201].indexOf(data.status) >= 0) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function remove(id) {
  let axios = window.$nuxt.$axios;
  return axios
    .delete(`${process.env.TEMP_API}/api/temp/invoice/${id}`, {
      timeout: 25500,
    })
    .then((data) => {
      if ([200, 201].indexOf(data.status) >= 0) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
