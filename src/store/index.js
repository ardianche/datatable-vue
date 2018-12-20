import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    getters: {
        // Compute derived state based on the current state. More like computed property.
    },
})