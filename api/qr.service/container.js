export const corporateQRService = {
  qr_parking,
  qr_service,
};

async function qr_parking(id, data) {
  let axios = window.$nuxt.$axios;
  return axios
    .post(`v1/external-transaction/${id}/generate-token/parking`, data, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function qr_service(id, data) {
  let axios = window.$nuxt.$axios;
  return axios
    .post(`v1/external-transaction/${id}/generate-token/service`, data, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
