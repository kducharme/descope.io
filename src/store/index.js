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
        projects_active: null,
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
        SET_ACTIVE_PROJECT: (state, project) => {
            state.projects_active = project;
        },
        SET_ACTIVE_PROJECT_FEEDBACK: (state, feedback) => {
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
            if (context.state.organization) {
                const { data: teams } = await supabase
                    .from("teams")
                    .select("*")
                    .eq("organization_id", context.state.organization);

                if (teams) {

                    // Add lowercase property for sorting
                    teams.forEach(t => {
                        t.name_low = t.name.toLowerCase();
                    })

                    // Sort teams alphabetically
                    teams.sort((a, b) => {
                        if (a.name_low < b.name_low) { return -1; }
                        if (a.name_low > b.name_low) { return 1; }
                        return 0;
                    })

                    context.commit("SET_TEAMS", await teams);
                    await context.dispatch("setActiveTeamData", { teams })
                }
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
            context.dispatch("setAllTeamProjects")
            context.dispatch("setAllTeamFeedback")
        },
        async setActiveTeamMembers(context) {
            if (context.state.teams_active_data) {

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
            }
        },
        async setAllTeamProjects(context) {
            if (context.state.teams_active_data) {

                const { data: projects } = await supabase
                    .from("projects")
                    .select("*")
                    .eq("team_id", context.state.teams_active_data.id);

                context.commit("SET_PROJECTS", projects);
            }
        },
        async setAllTeamFeedback(context) {
            // Create variables
            const moment = require('moment')

            const { data: feedback } = await supabase
                .from("feedback")
                .select("*")
                .eq("team_id", context.state.teams_active_data.id);

            for (const fb of feedback) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", fb.created_by);

                fb._addedBy = profile[0].firstname + " " + profile[0].lastname;
                fb._initials = profile[0].firstname.charAt(0) + profile[0].lastname.charAt(0);
                fb._dateAdded = moment(fb.created_at).startOf('minute').fromNow();
                if (fb.priority === "High") { fb._priority = 3; }
                if (fb.priority === "Med") { fb._priority = 2; }
                if (fb.priority === "Low") { fb._priority = 1; }

                if (fb.project_id) {
                    const { data: project } = await supabase
                        .from("projects")
                        .select("*")
                        .eq("id", fb.project_id);

                    fb._project = project[0];

                }



                // Get images and add it to the feedback object

                if (fb.image) {
                    const { data: img } = await supabase.storage
                        .from("feedback")
                        .download(`post/${fb.image}`)

                    const url = URL.createObjectURL(await img);
                    fb._image = url;

                }


            }


            // TODO — sort based on votes then priority
            feedback.sort((a, b) => {
                if (a.votes > b.votes) { return -1; }
                if (a.votes < b.votes) { return 1; }
                if (a._priority < b._priority) { return 1; }
                if (a._priority > b._priority) { return -1; }
                return 0;
            })

            context.commit("SET_ACTIVE_PROJECT_FEEDBACK", await feedback);
        },
        async setActiveProject(context, payload) {

            const { data: project } = await supabase
                .from("projects")
                .select("*")
                .eq("id", payload.id);

            context.commit("SET_ACTIVE_PROJECT", project[0]);
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