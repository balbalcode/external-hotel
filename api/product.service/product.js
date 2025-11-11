import { helper } from "~/api/config/helper";

export const productService = {
  get,
};

async function get(spot_id, filter, pagination, order) {
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
