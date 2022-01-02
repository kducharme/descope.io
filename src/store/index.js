
// import { reactive } from 'vue';



// const state = reactive({
//     // Core data
//     user: null,
//     launches: [],

// });

// const methods = {
//     setUser(payload) {
//         state.user = payload ? payload.user : null;
//     }
// }

// export default {
//     state,
//     methods
// }

// import Vue from 'vue'
import Vuex from 'vuex'
import { supabase } from "../supabase/init";

// Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        appReady: true,

        activeUser: null,
        organization: null,
        // organizationUsers: [],

        launches: []
    },
    mutations: {
        SET_ACTIVE_USER: (state, user) => {
            state.activeUser = user;
        },
        SET_LAUNCHES: (state, launches) => {
            state.launches = launches;
        },
        SET_APP_STATUS: (state, status) => {
            state.appReady = status;
        },
    },
    actions: {
        getActiveUser(context, payload) {
            // const user = supabase.auth.user();
            context.commit("SET_ACTIVE_USER", payload.session.user);
            context.commit("SET_APP_STATUS", true);
            
        },
        async getLaunches(context) {
            // Get data from supabase
            const { data: launch } = await supabase
            .from("launches")
            .select("*")
            
            context.commit("SET_LAUNCHES", launch);
        },
    }
});