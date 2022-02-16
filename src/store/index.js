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
        feedback_active: null,
        feedback_active_id: null,

        comments: [],

        // UI Elements
        createTeamModal: false,
        createProjectModal: false,
        createFeedbackModal: false,
    },
    getters: {
        searchFeedback: state => (payload) => {
            return state.feedback.filter(fb =>
                fb.title.toLowerCase().includes(payload.toLowerCase()) ||
                fb.description.toLowerCase().includes(payload.toLowerCase()) ||
                fb._project.name.toLowerCase().includes(payload.toLowerCase()) ||
                fb.category.toLowerCase().includes(payload.toLowerCase())
            );
        },
        getComments: state => () => {
            return state.comments.sort((a, b) => {
                return a._dateAdded - b._dateAdded;
            })
        }
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
        SET_ALL_FEEDBACK: (state, feedback) => {
            state.feedback = feedback;
        },
        SET_ACTIVE_FEEDBACK: (state, feedback) => {
            state.feedback_active = feedback;
        },
        SET_ACTIVE_COMMENTS: (state, comments) => {
            state.comments = comments;
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

        async setActiveFeedback(context, payload) {
            const moment = require('moment');

            const { data: fb } = await supabase
                .from("feedback")
                .select("*")
                .eq("id", payload.feedback_id);

            const activeFeedback = fb[0];

            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", activeFeedback.created_by);

            activeFeedback._addedBy = profile[0].firstname + " " + profile[0].lastname;
            activeFeedback._initials = profile[0].firstname.charAt(0) + profile[0].lastname.charAt(0);
            activeFeedback._dateAdded = moment(activeFeedback.created_at).startOf('minute').fromNow();
            if (activeFeedback.priority === "High") { activeFeedback._priority = 3; }
            if (activeFeedback.priority === "Med") { activeFeedback._priority = 2; }
            if (activeFeedback.priority === "Low") { activeFeedback._priority = 1; }

            if (activeFeedback.project_id) {
                const { data: project } = await supabase
                    .from("projects")
                    .select("*")
                    .eq("id", activeFeedback.project_id);

                activeFeedback._project = project[0];
            }

            // Get images and add it to the feedback object

            if (activeFeedback.image) {
                const { data: img } = await supabase.storage
                    .from("feedback")
                    .download(`post/${activeFeedback.image}`)

                const url = URL.createObjectURL(await img);
                activeFeedback._image = url;
            }

            context.commit("SET_ACTIVE_FEEDBACK", await activeFeedback)
        },

        async getComments(context, payload) {
            const moment = require('moment')

            const { data: allComments } = await supabase
                .from('feedback_comments')
                .select('*,profiles(*)')
                .eq("feedback_id", payload.feedback_id);

            allComments.map(comment => {
                comment._addedBy = comment.profiles.firstname + " " + comment.profiles.lastname;
                comment._initials = comment.profiles.firstname.charAt(0) + comment.profiles.lastname.charAt(0);
                comment._dateAdded = moment(comment.date_created).startOf('minute').fromNow();
            })

            allComments.sort((a, b) => {
                return new Date(b.date_created) - new Date(a.date_created);
            });

            context.commit("SET_ACTIVE_COMMENTS", allComments)
        },

        setActiveTeamData(context, payload) {
            payload.teams.forEach((team) => {
                if (team.id == context.state.teams_active_id) {
                    context.commit("SET_ACTIVE_TEAM_DATA", team);
                }
            })
            context.dispatch("setActiveTeamMembers")
            context.dispatch("setAllTeamProjects")
            context.dispatch("getAllTeamFeedback")
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
        async getAllTeamFeedback(context) {
            const moment = require('moment')

            const { data: allFeedback } = await supabase
                .from('feedback')
                .select('*,profiles(*),projects(*)')
                .eq("team_id", context.state.teams_active_data.id);

            allFeedback.map(async fb => {
                fb._addedBy = fb.profiles.firstname + " " + fb.profiles.lastname;
                fb._initials = fb.profiles.firstname.charAt(0) + fb.profiles.lastname.charAt(0);
                fb._dateAdded = moment(fb.date_created).startOf('minute').fromNow();

                // Set priority value
                if (fb.priority === "High") { fb._priority = 3; }
                if (fb.priority === "Med") { fb._priority = 2; }
                if (fb.priority === "Low") { fb._priority = 1; }

                // TODO - Get image from storage and add to feedback object

                // if (fb.image) {
                //     const { data: img } = await supabase.storage
                //         .from("feedback")
                //         .download(`post/${fb.image}`)

                //     console.log(img)

                //     const url = URL.createObjectURL(await img);
                //     fb._image = url;
                // }
            })
            
            allFeedback.sort((a, b) => {
                if (a.votes > b.votes) { return -1; }
                if (a.votes < b.votes) { return 1; }
                if (a._priority < b._priority) { return 1; }
                if (a._priority > b._priority) { return -1; }
                return 0;
            })

            context.commit("SET_ALL_FEEDBACK", allFeedback)
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