<template>
    <div v-if="projectData">
        <h1>{{projectData.header}}</h1>
        <v-row>
            <v-col
                :lg="7"
                :md="8"
                :sm="12"
                :xs="12"
            >
                <h3>Synopsis</h3>
                <v-card-text>
                    {{projectData.synopsis}}
                </v-card-text>
                <v-divider />
                <v-row dense>
                    <v-col
                        :cols="12"
                        :lg="8"
                        :md="8"
                        :sm="8"
                        :xs="12"
                    >
                        <h3>Instructions</h3>
                        <v-card-text>
                            <ol>
                                <li v-for="(instruction, index) in projectData.installInstructions" :key="index">{{instruction}}</li>
                            </ol>
                            <div v-if="projectData.altInstallInstructions.length > 0">
                                <br>
                                OR
                                <br><br>
                            </div>
                            <ol>
                                <li v-for="(instruction, index) in projectData.altInstallInstructions" :key="index">{{instruction}}</li>
                            </ol>
                        </v-card-text>
                    </v-col>

                    <v-col
                        :lg="4"
                        :md="4"
                        :sm="4"
                        :xs="12"
                    >
                        <h3>Download</h3>
                        <v-card-text>
                            <div
                                v-for="dl in projectData.downloadLinks"
                                :key="dl.title"
                            >
                                <a :href="dl.url">{{dl.title}}</a><br>
                            </div>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-divider v-if="$vuetify.breakpoint.name == 'xs' || $vuetify.breakpoint.name == 'sm'" />
            </v-col>

            <v-col
                :lg="5"
                :md="4"
                :sm="12"
                :xs="12"
            >
                <v-row>
                    <v-col
                        :cols="8"
                        :lg="12"
                        :md="12"
                        :sm="6"
                        :xs="8"
                    >
                        <h3>Technical Details</h3>
                        <v-card-text>
                            <ul>
                                <li v-for="(detail, index) in projectData.technicalDetails" :key="index">{{detail}}</li>
                            </ul>
                        </v-card-text>
                    </v-col>
                    <v-col
                        :cols="4"
                        :lg="6"
                        :md="12"
                        :sm="4"
                        :xs="4"
                    >
                        <v-img style="border: solid 2px grey" :src="projectData.imageURL"></v-img>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data: () => ({
        projectData: null,
    }),
    mounted() {
        this.$store.dispatch("accessResource", {
            method: "GET",
            route: "/api/projects/" + this.$route.params.project,
            callback: (result) => {
                console.log("Result", result);
                this.projectData = result;
            }
        });
    },
}
</script>
