export const corporateSubscriptionService = {
  show,
};

async function show(spot_id, id) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(`/v1/mgmt/spots/${spot_id}/corporate-company/${id}`, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
