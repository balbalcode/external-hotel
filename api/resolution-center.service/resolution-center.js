import {helper} from "~/api/config/helper";

export const resolutionCenterService = {
    show,
    actions
};

async function show(filter,pagination,order) {
    let axios = window.$nuxt.$axios
    return axios.get(`/v1/mgmt/resolution-center?${helper(filter, pagination, order)}`, {timeout: 25500}).then((data) => {
        if (data.status === 200) return data.data
    }).catch(error => {
        return Promise.reject(error);
    });
}

async function actions(data) {
    let axios = window.$nuxt.$axios
    return axios.post(`/v1/mgmt/resolution-center`, data, {timeout: 25500}).then((data) => {
        if (data.status === 200) return data.data
    }).catch(error => {
        return Promise.reject(error);
    });
}
