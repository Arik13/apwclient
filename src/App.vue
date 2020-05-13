<template>
    <v-app style="font-family: Consolas,monaco,monospace;">
        <v-app-bar
            app
            dark
        >
            <v-container >
                <v-flex xs12 sm12 md12 lg12>
                    <v-row>
                        <v-toolbar-title  v-if="$vuetify.breakpoint.name != 'xs'" disabled>Arik Dicks</v-toolbar-title>
                        <v-toolbar-title  v-else disabled>AD</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <router-link
                            v-for="navItem in navItems"
                            :key="navItem.text"
                            :to="navItem.link"
                            style="text-decoration: none;"
                        >
                            <v-btn v-if="$vuetify.breakpoint.name != 'xs'" text>{{navItem.text}}</v-btn>
                            <v-btn v-else icon><v-icon>{{navItem.icon}}</v-icon></v-btn>
                        </router-link>
                    </v-row>
                </v-flex>
            </v-container>
        </v-app-bar>
        <v-content>
            <!-- <v-container> -->
                <v-card>
                <v-flex>
                    <v-card
                        elevation="12"
                        :style="'padding: 30px ' + hPad + 'px ;'"
                    >
                        <router-view />
                    </v-card>
                </v-flex>
                </v-card>
            <!-- </v-container> -->
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data: () => ({
        navItems: [
            {
                link: "/",
                text: "Home",
                icon: "mdi-home"
            },
            {
                link: "/contact",
                text: "Contact",
                icon: "mdi-email"
            },
            {
                link: "/resume",
                text: "Resume",
                icon: "mdi-clipboard"
            },
            {
                link: "/projects",
                text: "Projects",
                icon: "mdi-hammer"
            },
            {
                link: "/blog",
                text: "Blog",
                icon: "mdi-blogger"
            },
        ]
    }),
    computed: {
        hPad() {
            return (this.$vuetify.breakpoint.name == 'xs')? 10 : 60;
        }
    },
    methods: {
        download() {
            this.$store.dispatch("accessResource", {
                method: "GET",
                route: "/download/testImg.png",
                responseType: "blob",
                callback: (result) => {
                    var file = new Blob([result], {type: "image/png"});
                    var fileURL = window.URL.createObjectURL(file);
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'testImg.png');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                }
            });
        }
    }
};
</script>