<template>
    <div>
        <h1>Projects</h1>
        <v-row v-if="projects">
            <v-col
                v-for="(project, index) in projects"
                :key=index
                :lg="3"
                :md="4"
                :sm="6"
                :xs="3"
            >
                <image-card
                    style="border: solid 2px grey"
                    :title="project.header"
                    :imageURL="project.imageURL"
                    :route="'/projects/' + project.name"
                    :text="project.synopsis"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ImageCard from "./ImageCard"

export default {
    components: {
        "image-card": ImageCard,
    },
    data: () => ({
        projects: null,
    }),
    mounted() {
        this.$store.dispatch("accessResource", {
            method: "GET",
            route: "/api/projects/",
            callback: (result) => {
                console.log("Result", result);
                this.projects = result;
            }
        });
    },
    computed: {
        horPad() {
            return (this.$vuetify.breakpoint.name == 'xs')? 20 : 60;
        },
    }
}
</script>