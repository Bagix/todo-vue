import Vue from 'vue'
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firestorePlugin} from 'vuefire'

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(firestorePlugin);

firebase.initializeApp({
  apiKey: "AIzaSyBjB2A3tBxZj_4A9zqnC45txntQ5qDpIfc",
  authDomain: "todo-app-a0fc8.firebaseapp.com",
  databaseURL: "https://todo-app-a0fc8.firebaseio.com",
  projectId: "todo-app-a0fc8",
  storageBucket: "todo-app-a0fc8.appspot.com",
  messagingSenderId: "883048410546",
  appId: "1:883048410546:web:1d7d682b8f323012"
})

export const db = firebase.firestore();

export const bus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
