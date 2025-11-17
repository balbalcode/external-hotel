import { helper } from "~/api/config/helper";

export const eventService = {
  get,
  show,
  create,
  update,
  remove,
  increase,
};

async function get(filter) {
  let axios = window.$nuxt.$axios;
  axios.setBaseURL(process.env.API_TEMP_URL);
  return (
    axios
      // .get(`/api/temp/event?${helper(filter)}`, { timeout: 25500 })
      .get(`/api/temp/event?${helper(filter)}`, { timeout: 25500 })
      .then((data) => {
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}

async function show(id) {
  let axios = window.$nuxt.$axios;
  axios.setBaseURL(process.env.API_TEMP_URL);
  return (
    axios
      // .get(`/api/temp/event/${id}`, { timeout: 25500 })
      .get(`/api/temp/event/${id}`, { timeout: 25500 })
      .then((data) => {
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}

async function create(data) {
  let axios = window.$nuxt.$axios;
  axios.setBaseURL(process.env.API_TEMP_URL);
  return (
    axios
      // .post(`/api/temp/event`, data, { timeout: 25500 })
      .post(`/api/temp/event`, data, { timeout: 25500 })
      .then((data) => {
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}

async function increase(data) {
  let axios = window.$nuxt.$axios;
  axios.setBaseURL(process.env.API_TEMP_URL);
  return (
    axios
      // .post(`/api/temp/event`, data, { timeout: 25500 })
      .post(`/api/temp/event`, data, { timeout: 25500 })
      .then((data) => {
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}

async function update(id, data) {
  let axios = window.$nuxt.$axios;
  axios.setBaseURL(process.env.API_TEMP_URL);
  delete data.id;
  return (
    axios
      // .put(`/api/temp/event/${id}`, data, { timeout: 25500 })
      .put(`/api/temp/event/${id}`, data, { timeout: 25500 })
      .then((data) => {
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}

async function remove(id) {
  let axios = window.$nuxt.$axios;
  axios.setBaseURL(process.env.API_TEMP_URL);
  return (
    axios
      // .delete(`/api/temp/event/${id}`, { timeout: 25500 })
      .delete(`/api/temp/event/${id}`, { timeout: 25500 })
      .then((data) => {
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}
