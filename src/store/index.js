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

        // Launch Data
        launches: [],
        activeLaunch: null,
        feedback: [],

        // UI Elements
        createLaunchModal: false,
        addFeedbackModal: false
    },
    mutations: {
        // SET STATE
        SET_LAUNCH_DATA: (state, launches) => {
            state.launches = launches;
        },
        SET_FEEDBACK_DATA: (state, feedback) => {
            state.feedback = feedback;
        },
        SET_ACTIVE_LAUNCH: (state, launch) => {
            state.activeLaunch = launch;
        },
        SET_ACTIVE_USER: (state, user) => {
            state.activeUser = user;
        },
        SET_PROFILE: (state, profile) => {
            state.profile = profile[0];
            state.organization = profile[0].organization_id;
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

            context.commit("SET_PROFILE", await profile);

            // Get data from supabase
            const { data: launch } = await supabase
                .from("launches")
                .select("*")
                .eq("organization_id", profile[0].organization_id);

            launch.forEach(launch => {
                launch.name_low = launch.name.toLowerCase();
            })

            // Sort launches
            launch.sort((a, b) => {
                if (a.name_low < b.name_low) { return -1; }
                if (a.name_low > b.name_low) { return 1; }
                return 0;
            })

            context.commit("SET_LAUNCH_DATA", await launch);
        },

        async getFeedback(context) {
            // Create variables
            const moment = require('moment')

            const { data: feedback } = await supabase
                .from("feedback")
                .select("*")
                .eq("launch_id", context.state.activeLaunch.launch.id);

            for (const fb of feedback) {
                fb._addedBy = context.state.profile.firstname + " " + context.state.profile.lastname;
                fb._initials = context.state.profile.firstname.charAt(0) + context.state.profile.lastname.charAt(0);
                fb._dateAdded = moment(fb.created_at).startOf('minute').fromNow();

                // Get images and add it to the feedback object

                if (fb.image) {
                    const { data: data } = await supabase.storage
                        .from("launches")
                        .download(`feedback/${fb.image}`)

                    // const image = new File([data], `${fb.image}`);
                    fb._image = data;

                }
                else {
                    fb._image = null;
                }
            }
            context.commit("SET_FEEDBACK_DATA", await feedback);

        },
        // SET ACTIONS
        setActiveUser(context, payload) {
            context.commit("SET_ACTIVE_USER", payload.session.user);
            context.commit("SET_APP_STATUS", true);
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
    }
});