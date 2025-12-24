export const membershipService = {
  create,
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


