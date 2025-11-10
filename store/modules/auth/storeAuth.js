import { authService } from '@/api/auth.service/authentication';

const state = () => ({});

const getters = {}

const actions = {
    async login({commit}, payload) {
        return await authService.login(payload.email, payload.password).then(async user => {
            return user
        }).catch(async (e) => {
            throw e
        })
    },

    async forgot({commit}, payload) {
        return await authService.forgot(payload.email).then(async data => {
            return data
        }).catch((e) => {
            throw e
        })
    },

    async checkToken({commit}, payload) {
        let id = payload.id
        let token = payload.token
        return await authService.checkToken(id, token).then(data => {
            return data
        }).catch((e) => {
            throw e
        })
    },

    async reset({commit}, payload) {
        return await authService.reset(payload).then(async data => {
            return data
        }).catch((e) => {
            throw e
        })
    },

    async refresh({commit}, payload) {
        return await authService.refresh(payload).then(async data => {
            return data
        }).catch((e) => {
            throw e
        })
    },
};

const mutations = {
    async logout() {
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

