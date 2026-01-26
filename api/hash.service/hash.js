import { helper } from "~/api/config/helper";

export const hashService = {
  crypto,
};

async function crypto(payload) {
  let axios = window.$nuxt.$axios;
  return axios
    .post(`${process.env.TEMP_API}/service/crypto/hash`, payload, {
      timeout: 25500,
    })
    .then((data) => {
      if ([200, 201].indexOf(data.status) >= 0) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
