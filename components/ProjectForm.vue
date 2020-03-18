<template>
    <v-form ref="form">
        <v-select
            label="Select Project"
            v-model="select"
            :items="options"
            @input="updateForm()"
        />
        <v-card style="border: solid 1px white">
            <v-card-title>General Info</v-card-title>
            <v-card-text>
                <v-text-field
                    label="Name"
                    v-model="pd.name"
                />
                <v-text-field
                    label="Header"
                    v-model="pd.header"
                />
                <v-textarea
                    label="Synopsis"
                    v-model="pd.synopsis"
                />
                <v-text-field
                    label="Image URL"
                    v-model="pd.imageURL"
                />
            </v-card-text>
        </v-card>

        <!-- Download Links -->
        <v-card style="border: solid 1px white">
            <v-card-title>Download Links</v-card-title>
            <v-card-text>
                <template v-for="(dl, i) in pd.downloadLinks">
                    <v-text-field
                        :key="'Header' + i"
                        :label="'Header ' + (i + 1)"
                        v-model="pd.downloadLinks[i].title"
                    />
                    <v-text-field
                        :key="'URL' + i"
                        :label="'URL ' + (i + 1)"
                        v-model="pd.downloadLinks[i].URL"
                    />
                    <v-divider :key="i" />
                </template>
                <v-btn @click="pd.downloadLinks.push({title: '', URL: ''})">Add</v-btn>
                <v-btn @click="pd.downloadLinks.pop()">Remove</v-btn><br>
            </v-card-text>
        </v-card>

        <!-- Installation Instructions -->
        <v-card style="border: solid 1px white">
            <v-card-title>Installation Instructions</v-card-title>
            <v-card-text>
                <v-text-field
                    v-for="(instruction, i) in pd.installInstructions"
                    :key="i"
                    :label="'Installation Instruction ' + (i + 1)"
                    v-model="pd.installInstructions[i]"
                />
                <v-btn @click="pd.installInstructions.push('')">Add</v-btn>
                <v-btn @click="pd.installInstructions.pop()">Remove</v-btn><br>
            </v-card-text>
        </v-card>

        <!-- Alt Installation Instructions -->
        <v-card style="border: solid 1px white">
            <v-card-title>Alternate Installation Instructions</v-card-title>
            <v-card-text>
                <v-text-field
                    v-for="(instruction, i) in pd.altInstallInstructions"
                    :key="i"
                    :label="'Alternate Installation Instruction ' + (i + 1)"
                    v-model="pd.altInstallInstructions[i]"
                />
                <v-btn @click="pd.altInstallInstructions.push('')">Add</v-btn>
                <v-btn @click="pd.altInstallInstructions.pop()">Remove</v-btn><br>
            </v-card-text>
        </v-card>

        <!-- Technical Details -->
        <v-card style="border: solid 1px white">
            <v-card-title>Technical Details</v-card-title>
            <v-card-text>
                <v-text-field
                    v-for="(detail, i) in pd.technicalDetails"
                    :key="i"
                    :label="'Alternate Installation Instruction ' + (i + 1)"
                    v-model="pd.technicalDetails[i]"
                />
                <v-btn @click="pd.technicalDetails.push('')">Add</v-btn>
                <v-btn @click="pd.technicalDetails.pop()">Remove</v-btn><br>
            </v-card-text>
        </v-card>
        <v-btn @click="submitForm()">Submit</v-btn>
    </v-form>
</template>

<script>
export default {
    data: () => ({
        options: ["New"],
        select: "New",
        projects: null,
        pd: {
            name: "",
            header: "",
            synopsis: "",
            imageURL: "",
            downloadLinks: [],
            installInstructions: [],
            altInstallInstructions: [],
            technicalDetails: [],
        }
    }),
    methods: {
        updateForm() {
            if (this.select == "New") {
                this.pd.name = "";
                this.pd.header = "";
                this.pd.synopsis = "";
                this.pd.imageURL = "";
                this.pd.downloadLinks = [];
                this.pd.installInstructions = [];
                this.pd.altInstallInstructions = [];
                this.pd.technicalDetails = [];
                return;
            }
            let i = 0;
            while (i < this.projects.length && this.projects[i].header != this.select) {
                i++;
            }
            this.pd = this.projects[i];
        },
        submitForm() {
            this.$store.dispatch("accessResource", {
                method: (this.select == "New")? "POST" : "PUT",
                route: "/api/projects",
                data: {
                    projectData: this.pd
                },
                callback: (result) => {
                    console.log("Result", result);
                }
            });
        }
    },
    mounted() {
        this.$store.dispatch("accessResource", {
            method: "GET",
            route: "/api/projects/",
            callback: (result) => {
                console.log("Result", result);
                this.projects = result;
                for (let i = 0; i < this.projects.length; i++) {
                    this.options.push(this.projects[i].header);
                }
            }
        });
    },
}
</script>