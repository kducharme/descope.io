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

        // Team Data
        teams_all: [],
        teams_active_id: null,
        teams_active_data: null,
        teams_active_members: [],

        // Project Data
        projects: [],
        feedback: [],

        // UI Elements
        createTeamModal: false,
        createProjectModal: false,
        createFeedbackModal: false,
    },
    mutations: {
        // RESET STATE — APP
        RESET_STATE: (state) => {
            state.activeUser = null;
            state.profile = null;
            state.organization = null;
            state.teams_all = [];
            state.teams_active_id = null;
            state.teams_active_data = null;
            state.teams_active_members = [];
            state.projects = [];
            state.activeProject = null;
            state.feedback = [];
        },

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
            state.teams_all = teams;
        },
        SET_ACTIVE_TEAM_ID: (state, team) => {
            state.teams_active_id = team;
        },
        SET_ACTIVE_TEAM_DATA: (state, team) => {
            state.teams_active_data = team;
        },
        SET_ACTIVE_TEAM_MEMBERS: (state, members) => {
            state.teams_active_members = members;
        },

        // SET STATE — PROJECT DATA
        SET_PROJECTS: (state, projects) => {
            state.projects = projects;
        },
        SET_FEEDBACK_DATA: (state, feedback) => {
            state.feedback = feedback;
        },

        // SET STATE — UI CONFIGRATUIONS
        SHOW_CREATE_PROJECT_MODAL: (state) => {
            state.createProjectModal = true;
        },
        HIDE_CREATE_PROJECT_MODAL: (state) => {
            state.createProjectModal = false;
        },
        SHOW_ADD_FEEDBACK_MODAL: (state) => {
            state.createFeedbackModal = true;
        },
        HIDE_ADD_FEEDBACK_MODAL: (state) => {
            state.createFeedbackModal = false;
        },
        SHOW_CREATE_TEAM_MODAL: (state) => {
            state.createTeamModal = true;
        },
        HIDE_CREATE_TEAM_MODAL: (state) => {
            state.createTeamModal = false;
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

            if (teams) {

                // Add 
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
                await context.dispatch("setActiveTeamData", { teams })
            }

        },
        setActiveTeamId(context, payload) {
            context.commit("SET_ACTIVE_TEAM_ID", payload.team_id);
        },
        setActiveTeamData(context, payload) {
            payload.teams.forEach((team) => {
                if (team.id == context.state.teams_active_id) {
                    context.commit("SET_ACTIVE_TEAM_DATA", team);
                }
            })
            context.dispatch("setActiveTeamMembers")
            context.dispatch("setActiveTeamProjects")
        },
        async setActiveTeamMembers(context) {
            const teamMemberIds = context.state.teams_active_data.members;

            const { data: profiles } = await supabase
                .from("profiles")
                .select("*")
                .eq("organization_id", context.state.organization);

            profiles.forEach(p => {
                p._initials = p.firstname.charAt(0) + p.lastname.charAt(0);
            })

            const members = profiles.filter(p => teamMemberIds.includes(p.id));

            context.commit("SET_ACTIVE_TEAM_MEMBERS", members);
        },
        async setActiveTeamProjects(context) {

            const { data: projects } = await supabase
                .from("projects")
                .select("*")
                .eq("team_id", context.state.teams_active_data.id);

            context.commit("SET_PROJECTS", projects);
        },

        // RESET ACTIONS
        resetState(context) {
            context.commit("RESET_STATE");
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
        showCreateProjectModal(context) {
            context.commit("SHOW_CREATE_PROJECT_MODAL")
        },

        hideCreateProjectModal(context) {
            context.commit("HIDE_CREATE_PROJECT_MODAL")
        },
        showCreateFeedbackModal(context) {
            context.commit("SHOW_ADD_FEEDBACK_MODAL")
        },

        hideCreateFeedbackModal(context) {
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