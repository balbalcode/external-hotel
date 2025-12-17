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
  axios.defaults.baseURL = process.env.TEMP_API;
  return (
    axios
      // .get(`/api/temp/event?${helper(filter)}`, { timeout: 25500 })
      .get(`${process.env.TEMP_API}/api/temp/event?${helper(filter)}`, {
        timeout: 25500,
      })
      .then((data) => {
        axios.defaults.baseURL = process.env.baseUrl;
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}

async function show(id) {
  let axios = window.$nuxt.$axios;
  axios.defaults.baseURL = process.env.TEMP_API;
  return (
    axios
      // .get(`/api/temp/event/${id}`, { timeout: 25500 })
      .get(`/ap${process.env.TEMP_API}i/temp/event/${id}`, { timeout: 25500 })
      .then((data) => {
        axios.defaults.baseURL = process.env.baseUrl;
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}

async function create(data) {
  let axios = window.$nuxt.$axios;
  axios.defaults.baseURL = process.env.TEMP_API;
  return (
    axios
      // .post(`/api/temp/event`, data, { timeout: 25500 })
      .post(`/ap${process.env.TEMP_API}i/temp/event`, data, { timeout: 25500 })
      .then((data) => {
        axios.defaults.baseURL = process.env.baseUrl;
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}

async function increase(data) {
  let axios = window.$nuxt.$axios;
  axios.defaults.baseURL = process.env.TEMP_API;
  return (
    axios
      // .post(`/api/temp/event`, data, { timeout: 25500 })
      .post(`/ap${process.env.TEMP_API}i/temp/event`, data, { timeout: 25500 })
      .then((data) => {
        axios.defaults.baseURL = process.env.baseUrl;
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}

async function update(id, data) {
  let axios = window.$nuxt.$axios;
  axios.defaults.baseURL = process.env.TEMP_API;
  delete data.id;
  return (
    axios
      // .put(`/ap${process.env.TEMP_API}i/temp/event/${id}`, data, { timeout: 25500 })
      .put(`/api/temp/event/${id}`, data, { timeout: 25500 })
      .then((data) => {
        axios.defaults.baseURL = process.env.baseUrl;
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}

async function remove(id) {
  let axios = window.$nuxt.$axios;
  axios.defaults.baseURL = process.env.TEMP_API;
  return (
    axios
      // .delete(`/api/temp/event/${id}`, { timeout: 25500 })
      .delete(`${process.env.TEMP_API}/api/temp/event/${id}`, {
        timeout: 25500,
      })
      .then((data) => {
        axios.defaults.baseURL = process.env.baseUrl;
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}
