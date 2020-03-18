import VueRouter from 'vue-router';
import Vue from 'vue';
import Home from "../components/Home.vue"
import Resume from "../components/Resume.vue"
import Projects from "../components/Projects.vue"
import Contact from "../components/Contact.vue"
import ProjectPage from "../components/ProjectPage.vue"
import ProjectForm from "../components/ProjectForm.vue"

Vue.use(VueRouter);

var routes = [
    {path: "/", components: {default: Home}},
    {path: "/contact", components: {default: Contact}},
    {path: "/resume", components: {default: Resume}},
    {path: "/projects", components: {default: Projects}},
    {path: "/projects/:project", components: {default: ProjectPage}},
    {path: "/projectform", components: {default: ProjectForm}},
    // {path: "", components: {default: }},
];

export default new VueRouter({
    routes,
})