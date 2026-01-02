import { helper } from "./../config/helper";

export const membershipService = {
  create,
  get
};

async function create(data) {
  let axios = window.$nuxt.$axios;
  return await axios
    .post(`/v1/membership`, data, { timeout: 25500 })
    .then(async (data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function get(filter, pagination, order) {
  let axios = window.$nuxt.$axios;
  return await axios
    .get(`v1/membership?${helper(filter, pagination, order)}`, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
