// import Vue from 'vue'
import Vuex from 'vuex'
import { supabase } from "../supabase/init";

// Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        appReady: true,

        activeUser: null,
        onboarded: null,
        organization: null,
        // organizationUsers: [],

        launches: [],

        // UI Elements
        createModal: false
    },
    mutations: {
        // SET STATE
        SET_LAUNCH_DATA: (state, launches) => {
            state.launches = launches;
        },
        SET_ACTIVE_USER: (state, user) => {
            state.activeUser = user;
        },
        SET_USER_ONBOARDED_STATUS: (state, status) => {
            state.onboarded = status;
        },
        SET_APP_STATUS: (state, status) => {
            state.appReady = status;
        },

        // RESET STATE
        RESET_ACTIVE_USER: (state) => {
            state.activeUser = null;
        },

        // UI CONFIGRATUIONS
        SHOW_CREATE_LAUNCH_MODAL: (state) => {
            state.createModal = true;
        },

        HIDE_CREATE_LAUNCH_MODAL: (state) => {
            state.createModal = false;
        },

    },
    actions: {
        // GET ACTIONS
        async getLaunches(context) {

            const user = supabase.auth.user();

            // Get the user's organization id
            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id);

            // Get data from supabase
            const { data: launch } = await supabase
                .from("launches")
                .select("*")
                .eq("organization", profile[0].organization)
                
                context.commit("SET_LAUNCH_DATA", await launch);
        },

        // SET ACTIONS
        setActiveUser(context, payload) {
            context.commit("SET_ACTIVE_USER", payload.session.user);
            context.commit("SET_APP_STATUS", true);
        },

        // RESET ACTIONS
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

        // UI CONFIG ACTIONS
        showCreateLaunchModal(context) {
            context.commit("SHOW_CREATE_LAUNCH_MODAL")
        },

        hideCreateLaunchModal(context) {
            context.commit("HIDE_CREATE_LAUNCH_MODAL")
        },
    }
});