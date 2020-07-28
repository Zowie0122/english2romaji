import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { CardPlugin } from "bootstrap-vue";
import { LayoutPlugin } from "bootstrap-vue";
import { firebaseConfig } from "../firebase_config";

Vue.use(LayoutPlugin);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CardPlugin);

Vue.config.productionTip = false;

console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
