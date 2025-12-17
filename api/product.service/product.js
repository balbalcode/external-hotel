import { helper } from "~/api/config/helper";

export const productService = {
  dictionary,
  get,
};

async function dictionary(spot_id, filter, pagination, order) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(
      `/v1/spot/${spot_id}/membership?${helper(filter, pagination, order)}`,
      { timeout: 25500 }
    )
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function get(filter) {
  let axios = window.$nuxt.$axios;
  axios.defaults.baseURL = process.env.TEMP_API;
  return (
    axios
      // .get(`/api/temp/event?${helper(filter)}`, { timeout: 25500 })
      .get(`${process.env.TEMP_API}/api/temp/product?${helper(filter)}`, {
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
