import Vue from 'vue';
export default {
    SET_CSV_DATA(state,payload){
        Vue.set(state,'data',payload);
    }
}