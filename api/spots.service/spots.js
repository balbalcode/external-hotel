export const spotsService = {
  show,
};

function show(id) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(`/v1/spot/${id}`, { timeout: 25500 })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
