import { helper } from "./../config/helper";
export const employeeService = {
  get,
  create,
};

async function get(company_id, payload) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(`/v1/company/${company_id}/employee?${helper(payload)}`, {
      timeout: 25500,
    })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
async function create(company_id, data) {
  let axios = window.$nuxt.$axios;
  return axios
    .post(`/v1/company/${company_id}/employee`, data, { timeout: 25500 })
    .then((data) => {
      if (data.status === 200) return data.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
