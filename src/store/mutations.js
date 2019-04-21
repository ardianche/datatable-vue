import Vue from 'vue';
export default {
    SET_CSV_DATA(state,payload){
        Vue.set(state,'data',payload);
    },
    SET_SUBMIT_ACTION(state,payload){
        Vue.set(state,'submit_action',payload);
    },
    SET_LOADING(state,payload){
        Vue.set(state,'loading',payload);
    }
}