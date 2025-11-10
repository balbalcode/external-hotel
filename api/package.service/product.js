import { helper } from "~/api/config/helper";

export const corporateProductService = {
  get,
};

async function get(filter, pagination, order) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(`/v1/external-products?${helper(filter, pagination, order)}`, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
