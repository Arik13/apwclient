import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import * as personal from "../personal"

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: personal.darkModeEnabled,
    }
});
