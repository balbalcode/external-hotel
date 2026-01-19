import { helper } from "~/api/config/helper";

export const configService = {
  get,
};

async function get(filter) {
  let axios = window.$nuxt.$axios;
  axios.defaults.baseURL = process.env.TEMP_API;
  return axios
    .get(`${process.env.TEMP_API}/api/temp/config?${helper(filter)}`, {
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
