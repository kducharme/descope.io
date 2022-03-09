import Vuex from 'vuex'
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";


export default new Vuex.Store({
    state: {
        appReady: true,

        // User Data
        activeUser: null,
        onboarded: null,
        profile: null,
        organization: null,
        members: null,

        // Team Data
        teams: [],
        teams_active: null,
        teams_active_feedback: [],
        teams_active_projects: null,
        teams_active_members: null,

        // Project Data
        // projects: [],
        projects_active: null,

        feedback: null,
        feedback_active: null,
        feedback_active_id: null,

        feedback_chart_debt: null,
        feedback_chart_requests: null,

        comments: [],

        // UI Elements
        createTeamModal: false,
        createProjectModal: false,
        createIssueModal: false,
        createRequestModal: false,
        createQuestionModal: false,
        createLaunchModal: false,
    },
    getters: {
        filterFeedback: state => (payload) => {
            console.log('hi')
            return state.teams_active_feedback.filter(fb =>
                // fb.category.toLowerCase().includes(payload.search.toLowerCase()) ||
                (fb.title.toLowerCase().includes(payload.search.toLowerCase()) ||
                    fb.description.toLowerCase().includes(payload.search.toLowerCase()) ||
                    fb.category.toLowerCase().includes(payload.search.toLowerCase()))
            );
        },
        searchProjects: state => (payload) => {
            let projects = [];

            if (state.teams_active_projects) {
                state.teams_active_projects.forEach(p => {
                    if (p.name.toLowerCase().includes(payload.toLowerCase()) || p.description.toLowerCase().includes(payload.toLowerCase())) {
                        projects.push(p)
                    }
                })
            }

            projects.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                return 0;
            })

            return projects;


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
            state.teams = [];
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
        SET_MEMBERS: (state, members) => {
            state.members = members;
        },
        SET_TEAMS: (state, teams) => {
            state.teams = teams;
        },
        SET_ACTIVE_TEAM: (state, id) => {
            state.teams_active = id;
        },
        SET_ACTIVE_TEAM_PROJECTS: (state, projects) => {
            state.teams_active_projects = projects;
        },
        SET_ACTIVE_TEAM_FEEDBACK: (state, feedback) => {
            state.teams_active_feedback = feedback;
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
            if (feedback.length > 0) {
                state.feedback = feedback;
            }
            else { state.feedback = null }
        },
        SET_FEEDBACK_CHART_DATA: (state, data) => {
            state.feedback_chart_debt = data.arrDebtReduced;
            state.feedback_chart_requests = data.arrRequestsReduced;
        },
        SET_ACTIVE_FEEDBACK: (state, feedback) => {
            state.feedback_active = feedback;
            console.log(state.feedback_active)
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
        SHOW_ADD_ISSUE_MODAL: (state) => {
            state.createIssueModal = true;
        },
        HIDE_ADD_ISSUE_MODAL: (state) => {
            state.createIssueModal = false;
        },
        SHOW_CREATE_TEAM_MODAL: (state) => {
            state.createTeamModal = true;
        },
        HIDE_CREATE_TEAM_MODAL: (state) => {
            state.createTeamModal = false;
        },
        SHOW_CREATE_REQUEST_MODAL: (state) => {
            state.createRequestModal = true;
        },
        HIDE_CREATE_REQUEST_MODAL: (state) => {
            state.createRequestModal = false;
        },
        SHOW_CREATE_QUESTION_MODAL: (state) => {
            state.createQuestionModal = true;
        },
        HIDE_CREATE_QUESTION_MODAL: (state) => {
            state.createQuestionModal = false;
        },
        SHOW_CREATE_LAUNCH_MODAL: (state) => {
            state.createLaunchModal = true;
        },
        HIDE_CREATE_LAUNCH_MODAL: (state) => {
            state.createLaunchModal = false;
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
                context.dispatch("setMembers")
            }
            context.dispatch("setTeams")
        },
        async setOrganization(context, payload) {
            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", payload.session.user.id);

            context.commit("SET_ORGANIZATION", profile[0].organization_id);
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

                    context.commit("SET_TEAMS", teams);
                }
            }
        },
        async setMembers(context) {
            const { data: members } = await supabase
                .from("profiles")
                .select("*")
                .eq("organization_id", context.state.organization);

            context.commit("SET_MEMBERS", members);
        },

        async setActiveTeamData(context) {
            const router = useRouter();

            // Get team id
            const team_id = window.location.pathname.split("/")[2];

            if (team_id) {
                const { data: teamData } = await supabase
                    .from('teams')
                    .select('*,feedback(*)')
                    .eq("id", team_id);

                const members = teamData[0].members
                context.commit("SET_ACTIVE_TEAM", teamData[0]);
                context.dispatch("setActiveTeamProjects")
                context.dispatch("setActiveTeamFeedback")
                context.dispatch("setActiveTeamMembers", { members })
            }
            else {
                const team_id_backup = router.currentRoute.value.fullPath.split("/")[2];
                const { data: teamData } = await supabase
                    .from('teams')
                    .select('*,feedback(*)')
                    .eq("id", team_id_backup);
                const members = teamData[0].members
                context.commit("SET_ACTIVE_TEAM", teamData[0]);
                context.dispatch("setActiveTeamProjects")
                context.dispatch("setActiveTeamFeedback")
                context.dispatch("setActiveTeamMembers", { members })

            }


        },

        async setActiveTeamFeedback(context) {
            const moment = require('moment')

            const { data: allFeedback } = await supabase
                .from('feedback')
                .select('*,profiles(id,*),projects(*)')
                .eq("team_id", context.state.teams_active.id);

            // Hydrate the feedback object

            for (const fb of allFeedback) {

                if (fb.votes_up) {
                    fb._votes_up_total = fb.votes_up.length;
                    if (fb.votes_up.includes(context.state.activeUser.id)) {
                        fb._vote_up = true;
                        fb._vote_down = null;
                    }
                    else {
                        fb._vote_up = null;
                    }
                }
                else {
                    fb._votes_up_total = 0;
                }
                if (fb.votes_down) {
                    fb._votes_down_total = fb.votes_down.length;
                    if (fb.votes_down.includes(context.state.activeUser.id)) {
                        fb._vote_up = null;
                        fb._vote_down = true;
                    }
                    else {
                        fb._vote_down = null;
                    }
                }
                else {
                    fb._votes_down_total = 0;
                }

                // Get images and add it to the feedback object
                if (fb.image) {
                    const { data: img } = await supabase.storage
                        .from("feedback")
                        .download(`post/${fb.image}`)

                    const url = URL.createObjectURL(img);
                    fb._image = url;
                }

                fb._votes_total = fb._votes_up_total - fb._votes_down_total;
                fb._addedBy = fb.profiles.firstname + " " + fb.profiles.lastname;
                fb._initials = fb.profiles.firstname.charAt(0) + fb.profiles.lastname.charAt(0);
                fb._date = moment(fb.created_at, "YYYMMDD").format("MM/DD");
                fb._dateAdded = moment(fb.created_at).startOf('minute').fromNow();
            }

            allFeedback.sort((a, b) => {
                if (a._votes_total > b._votes_total) { return -1; }
                if (a._votes_total < b._votes_total) { return 1; }
                if (a._priority < b._priority) { return 1; }
                if (a._priority > b._priority) { return -1; }
                return 0;
            })

            context.commit("SET_ACTIVE_TEAM_FEEDBACK", allFeedback)
        },


        async setActiveTeamMembers(context) {

            // const memberIds = payload.members;

            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", context.state.activeUser.id);

            const { data: allMembers } = await supabase
                .from("profiles")
                .select("*")
                .eq("organization_id", profile[0].organization_id);

            allMembers.forEach(p => {
                p._initials = p.firstname.charAt(0) + p.lastname.charAt(0);
            })

            const members = allMembers.filter(m => context.state.teams_active.members.includes(m.id));
            context.commit("SET_ACTIVE_TEAM_MEMBERS", members);
        },


        async setActiveTeamProjects(context) {

            const { data: projects } = await supabase
                .from("projects")
                .select("*", "feedback(*")
                .select('*,feedback(project_id, *)')
                .eq("team_id", context.state.teams_active.id);

            context.commit("SET_ACTIVE_TEAM_PROJECTS", projects);
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
        async setActiveProject(context, payload) {

            const { data: project } = await supabase
                .from("projects")
                .select("*")
                .eq("id", payload.id);

            context.commit("SET_ACTIVE_PROJECT", project[0]);
        },
        async setActiveFeedback(context, payload) {
            const moment = require('moment');

            // const { data: fb } = await supabase
            //     .from("feedback")
            //     .select("*", 'profiles(*)')
            //     .eq("id", payload.feedback_id);


            const { data: fb } = await supabase
                .from('feedback')
                .select('*,profiles(*),projects(id, *)')
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
        showCreateIssueModal(context) {
            context.commit("SHOW_ADD_ISSUE_MODAL")
        },
        hideCreateIssueModal(context) {
            context.commit("HIDE_ADD_ISSUE_MODAL")
        },
        showCreateTeamModal(context) {
            context.commit("SHOW_CREATE_TEAM_MODAL")
        },
        hideCreateTeamModal(context) {
            context.commit("HIDE_CREATE_TEAM_MODAL")
        },
        showCreateRequestModal(context) {
            context.commit("SHOW_CREATE_REQUEST_MODAL")
        },
        hideCreateRequestModal(context) {
            context.commit("HIDE_CREATE_REQUEST_MODAL")
        },
        showCreateQuestionModal(context) {
            context.commit("SHOW_CREATE_QUESTION_MODAL")
        },
        hideCreateQuestionModal(context) {
            context.commit("HIDE_CREATE_QUESTION_MODAL")
        },
        showCreateLaunchModal(context) {
            context.commit("SHOW_CREATE_LAUNCH_MODAL")
        },
        hideCreateLaunchModal(context) {
            context.commit("HIDE_CREATE_LAUNCH_MODAL")
        },
    }
});