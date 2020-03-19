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
    {path: "/", components: {default: Home}, meta: {title: "Arik"}},
    {path: "/contact", components: {default: Contact}, meta: {title: "Contact"}},
    {path: "/resume", components: {default: Resume}, meta: {title: "Resume"}},
    {path: "/projects", components: {default: Projects}, meta: {title: "Projects"}},
    {path: "/projects/:project", components: {default: ProjectPage}, meta: {title: "Projects"}},
    {path: "/projectform", components: {default: ProjectForm}, meta: {title: "Project Updater"}},
    // {path: "", components: {default: }},
];

let router = new VueRouter({
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "Arik";
    next();
})

export default router;