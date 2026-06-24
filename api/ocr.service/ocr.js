import { helper } from "~/api/config/helper";

export const ocrService = {
  format,
  read,
};

async function format(filter) {
  let axios = window.$nuxt.$axios;
  axios.defaults.baseURL = process.env.TEMP_API;
  return axios
    .get(`${process.env.TEMP_API}/api/temp/ocr?${helper(filter)}`, {
      timeout: 25500,
    })
    .then((data) => {
      axios.defaults.baseURL = process.env.baseUrl;
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function read(data) {
  let axios = window.$nuxt.$axios;
  axios.defaults.baseURL = process.env.OCR_URL;
  return axios
    .post(`${process.env.OCR_URL}/read`, data, { timeout: 25500 })
    .then((data) => {
      axios.defaults.baseURL = process.env.baseUrl;
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
