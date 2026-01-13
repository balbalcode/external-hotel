import { helper } from "~/api/config/helper";

export const guestService = {
  get,
  show,
  create,
  update,
  remove,
  ocr,
};

async function get(filter) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(`${process.env.TEMP_API}/api/temp/logs?${helper(filter)}`, {
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
    .get(`${process.env.TEMP_API}/api/temp/logs/${id}`, { timeout: 25500 })
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
    .post(`${process.env.TEMP_API}/api/temp/logs`, payload, {
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
    .post(`${process.env.TEMP_API}/api/temp/logs`, data, { timeout: 25500 })
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
    .patch(`${process.env.TEMP_API}/api/temp/logs/${id}`, data, {
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
    .delete(`${process.env.TEMP_API}/api/temp/logs/${id}`, {
      timeout: 25500,
    })
    .then((data) => {
      if ([200, 201].indexOf(data.status) >= 0) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function ocr(data) {
  let axios = window.$nuxt.$axios;
  axios.defaults.baseURL = process.env.OCR_URL;
  return axios
    .post(`${process.env.OCR_URL}/read`, data, { timeout: 25500 })
    .then((data) => {
      if ([200, 201].indexOf(data.status) >= 0) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
