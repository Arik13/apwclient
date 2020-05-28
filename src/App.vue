<template>
    <v-app >
        <v-app-bar
            app
            :style="'padding: 0px ' + hPad + 'px ;'"
        >
            <!-- <v-container > -->
                <v-flex xs12 sm12 md12 lg12>
                    <v-row>
                        <v-toolbar-title v-if="$vuetify.breakpoint.name != 'xs' && $vuetify.breakpoint.name != 'sm'" disabled>{{ toolbarTitle }}</v-toolbar-title>
                        <v-toolbar-title v-else disabled>{{ toolbarTitleAlt }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <router-link
                            v-for="navItem in navItems"
                            :key="navItem.text"
                            :to="navItem.link"
                            style="text-decoration: none;"
                        >
                            <v-btn v-if="$vuetify.breakpoint.name != 'xs' && $vuetify.breakpoint.name != 'sm'" text>{{navItem.text}}</v-btn>
                            <v-btn v-else icon><v-icon>{{navItem.icon}}</v-icon></v-btn>
                        </router-link>
                    </v-row>
                </v-flex>
            <!-- </v-container> -->
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
import * as personal from "./personal";
export default {
    name: 'App',
    data: () => ({
        toolbarTitle: personal.fullName,
        toolbarTitleAlt: personal.initials,
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
};
</script>

<style>
    * {
        font-family: Consolas, monaco, monospace;
    }
</style>>