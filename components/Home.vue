<template>
    <div>
        <v-row>
            <v-avatar
                size="100"
                style="margin: 10px;"
            >
                <v-img
                    :src="headshotURL"
                />
            </v-avatar>
            <v-col>
                <div
                >
                    {{ preNameBlurb }}
                    <h1>{{ name }}</h1>
                    {{ postNameBlurb }}
                    <br>
                </div>
            </v-col>
        </v-row>
        <br>
        <v-divider />
        <br>

        <p v-for="(paragraph, index) in paragraphs" :key="index">
            {{paragraph}}
        </p>
    </div>
</template>

<script>

import * as personal from "../src/personal"

export default {
    data: () => ({
        headshotURL: personal.headshotURL,
        name: personal.fullName,
        preNameBlurb: personal.preNameBlurb,
        postNameBlurb: personal.postNameBlurb,
        paragraphs: personal.homeParagraphs
    })
}
</script>

<style scoped>

</style>