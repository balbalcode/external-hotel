import { helper } from "~/api/config/helper";

export const transactionService = {
  create,
};


async function create(data) {
  let axios = window.$nuxt.$axios;
  axios.defaults.baseURL = process.env.TEMP_API;
  return (
    axios
      // .post(`/api/temp/event`, data, { timeout: 25500 })
      .post(`/ap${process.env.TEMP_API}i/temp/event`, data, { timeout: 25500 })
      .then((data) => {
        if (data.status === 200) return data.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  );
}