<template>
    <v-card
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :to="route"
    >
        <v-img
            :src = imageURL
            class="white--text align-end"
            :gradient="'to bottom, rgba(0,0,0,'+ lowGradient +'), rgba(0,0,0,' + hiGradient + ')'"

        >
            <v-card-title>{{title}}</v-card-title>
            <v-card-text v-if="hover || $vuetify.breakpoint.name == 'xs'">{{text}}</v-card-text>
        </v-img>
    </v-card>
</template>

<script>
export default {
    props: ["title", "imageURL", "text", "route"],
    data: () => {
        return {
            hover: false,
        }
    },
    computed: {
        hiGradient() {
            return (this.hover || this.$vuetify.breakpoint.name == 'xs')? 0.9 : 0.5;
        },
        lowGradient() {
            return (this.hover || this.$vuetify.breakpoint.name == 'xs')? 0.4 : 0.0;
        },
        compRoute() {
            return this.route;
        }
    },
}
</script>