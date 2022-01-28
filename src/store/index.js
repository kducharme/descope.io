import Vuex from 'vuex'
import { supabase } from "../supabase/init";


export default new Vuex.Store({
    state: {
        appReady: true,

        // User Data
        activeUser: null,
        onboarded: null,
        profile: null,
        organization: null,
        teams: [],

        // Launch Data
        launches: [],
        activeLaunch: null,
        feedback: [],

        // UI Elements
        createLaunchModal: false,
        addFeedbackModal: false,
        createTeamModal: false
    },
    mutations: {
        // SET STATE — APP
        SET_APP_STATUS: (state, status) => {
            state.appReady = status;
        },

        SET_USER_ONBOARDED_STATUS: (state, status) => {
            state.onboarded = status;
        },

        // SET STATE — ORGANIZATION
        SET_ACTIVE_USER: (state, user) => {
            state.activeUser = user;
        },
        SET_PROFILE: (state, profile) => {
            state.profile = profile;
        },
        SET_ORGANIZATION: (state, organization) => {
            state.organization = organization;
        },
        SET_TEAMS: (state, teams) => {
            state.teams = teams;
        },

        // SET STATE — PROJECT DATA
        SET_LAUNCH_DATA: (state, launches) => {
            state.launches = launches;
        },
        SET_FEEDBACK_DATA: (state, feedback) => {
            state.feedback = feedback;
        },
        SET_ACTIVE_LAUNCH: (state, launch) => {
            state.activeLaunch = launch;
        },

        // SET STATE — UI CONFIGRATUIONS
        SHOW_CREATE_LAUNCH_MODAL: (state) => {
            state.createLaunchModal = true;
        },
        HIDE_CREATE_LAUNCH_MODAL: (state) => {
            state.createLaunchModal = false;
        },
        SHOW_ADD_FEEDBACK_MODAL: (state) => {
            state.addFeedbackModal = true;
        },
        HIDE_ADD_FEEDBACK_MODAL: (state) => {
            state.addFeedbackModal = false;
        },
        SHOW_CREATE_TEAM_MODAL: (state) => {
            state.createTeamModal = true;
        },
        HIDE_CREATE_TEAM_MODAL: (state) => {
            state.createTeamModal = false;
        },

        // RESET STATE
        RESET_ACTIVE_USER: (state) => {
            state.activeUser = null;
        },
    },
    actions: {
        // SET ACTIONS
        setActiveUser(context, payload) {
            context.commit("SET_ACTIVE_USER", payload.session.user);
            context.commit("SET_APP_STATUS", true);
        },
        async setActiveUserProfile(context, payload) {
            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", payload.session.user.id);

            if (profile[0]) {
                context.commit("SET_PROFILE", profile);
                context.commit("SET_ORGANIZATION", profile[0].organization_id);
            }
            context.dispatch("setTeams")
        },
        async setTeams(context) {

            const { data: teams } = await supabase
                .from("teams")
                .select("*")
                .eq("organization_id", context.state.organization);
                console.log(teams)

            if (teams) {


                teams.forEach(t => {
                    t.name_low = t.name.toLowerCase();
                })

                // Sort launches
                teams.sort((a, b) => {
                    if (a.name_low < b.name_low) { return -1; }
                    if (a.name_low > b.name_low) { return 1; }
                    return 0;
                })

                context.commit("SET_TEAMS", await teams);
            }
        },




        setActiveLaunch(context, payload) {
            if (payload.launch.id.length === 36) {
                context.commit("SET_ACTIVE_LAUNCH", payload);
            }
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
        showAddFeedbackModal(context) {
            context.commit("SHOW_ADD_FEEDBACK_MODAL")
        },

        hideAddFeedbackModal(context) {
            context.commit("HIDE_ADD_FEEDBACK_MODAL")
        },
        showCreateTeamModal(context) {
            context.commit("SHOW_CREATE_TEAM_MODAL")
        },

        hideCreateTeamModal(context) {
            context.commit("HIDE_CREATE_TEAM_MODAL")
        },
    }
});