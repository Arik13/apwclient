import Vue from 'vue';
import Vuex from 'vuex';
import ax from 'axios';
let axios = ax.create({baseURL: "https://gentle-citadel-33655.herokuapp.com"});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        accessResource({state}, payload) {
            state;
            axios({
                method: payload.method,
                url: payload.route,
                data: payload.data,
                responseType: payload.responseType,
            })
                .then(res => {
                    if (payload.callback) {
                        payload.callback(res.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
    }
});