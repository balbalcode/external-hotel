export const transactionService = {
  auth,
  create,
};

async function auth(data) {
  let axios = window.$nuxt.$axios;
  return axios
    .post(`/v1/raspi/${data.spot_id}/auth`, data, { timeout: 25500 })
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
    .post(`/v1/transaction-manless`, data, { timeout: 25500 })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
