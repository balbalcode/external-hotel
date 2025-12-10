export const employeeService = {
  show,
  create,
};

async function show(company_id, employee_id) {
  let axios = window.$nuxt.$axios;
  return axios
    .get(`/v1/company/${company_id}/employee/${employee_id}`, {
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
