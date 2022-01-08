// import Vue from 'vue'
import Vuex from 'vuex'
import { supabase } from "../supabase/init";
import ENUM from "@/enums";

// Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        appReady: true,
        database: ENUM.INIT,

        activeUser: null,
        onboarded: null,
        organization: null,
        launches: [],

        // UI Elements
        createModal: false
    },
    mutations: {
        // SET STATE
        SET_LAUNCH_DATA: (state, launches) => {
            state.launches = launches;
            state.database = ENUM.LOADED;
        },
        SET_DATABASE_STATE: (state, databaseState) => {
            state.database = databaseState;
        },

        SET_ACTIVE_USER: (state, user) => {
            state.activeUser = user;
        },
        SET_ORGANIZATION: (state, profile) => {
            state.organization = profile[0].organization;
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
            context.commit('SET_DATABASE_STATE', ENUM.LOADING);

            const user = supabase.auth.user();

            // Get the user's organization id
            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id);

            context.commit("SET_ORGANIZATION", await profile);


            // Get data from supabase
            const { data: launch } = await supabase
                .from("launches")
                .select("*")
                .eq("organization", profile[0].organization);

            launch.forEach(launch => {
                launch.name_low = launch.name.toLowerCase();
            })

            launch.sort((a,b) => {
                if (a.name_low < b.name_low) { return -1; }
                if (a.name_low > b.name_low) { return 1; }
                return 0;
            })

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