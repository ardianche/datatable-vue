// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';
import firebase from 'firebase';

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false

let fbApp = null;
try{
  fbApp = firebase.initializeApp({
    apiKey: "AIzaSyC3OX60SG3v0a8YZpAzvEO_MiqHsJM5o9s",
    authDomain: "datatable-vue.firebaseapp.com",
    databaseURL: "https://datatable-vue.firebaseio.com/",
    projectId: "datatable-vue",
    messagingSenderId: "916972337219"
  })
}catch(err){
  console.log('error : ',err)
}


export default fbApp;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
