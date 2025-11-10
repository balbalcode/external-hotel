import { helper } from "~/api/config/helper";

export const corporateDriverService = {
  get,
  show,
  create,
  update,
  remove,
};

async function get(filter, pagination, order) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(`/v1/external-identity?${helper(filter, pagination, order)}`, {
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
    .get(`/v1/external-identity/${id}`, {
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
    .post(`/v1/external-identity`, data, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function update(id, data) {
  let axios = window.$nuxt.$axios;
  delete data.id;
  return axios
    .put(`/v1/external-identity/${id}`, data, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function remove(id) {
  let axios = window.$nuxt.$axios;
  return axios
    .delete(`/v1/external-identity/${id}`, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
