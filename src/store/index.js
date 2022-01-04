// import Vue from 'vue'
import Vuex from 'vuex'
import { supabase } from "../supabase/init";

// Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        appReady: true,

        activeUser: null,
        onboarded: true,
        organization: null,
        // organizationUsers: [],

        launches: []
    },
    mutations: {
        SET_ACTIVE_USER: (state, user) => {
            state.activeUser = user;
        },
        RESET_ACTIVE_USER: (state) => {
            state.activeUser = null;
        },
        SET_USER_ONBOARDED_STATUS: (state, status) => {
            state.onboarded = status;
        },
        SET_LAUNCHES: (state, launches) => {
            state.launches = launches;
        },
        SET_APP_STATUS: (state, status) => {
            state.appReady = status;
        },
    },
    actions: {
        setActiveUser(context, payload) {
            context.commit("SET_ACTIVE_USER", payload.session.user);
            context.commit("SET_APP_STATUS", true);

        },
        resetActiveUser(context) {
            context.commit("SET_ACTIVE_USER");
        },
        setUserOnboardedStatus(context, payload) {
            console.log(payload.profile.onboarded)
            if (payload.profile.onboarded) {
                context.commit("SET_USER_ONBOARDED_STATUS", true);
            }
            if (!payload.profile.onboarded) {
                context.commit("SET_USER_ONBOARDED_STATUS", false);
            }
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