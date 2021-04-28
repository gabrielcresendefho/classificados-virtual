import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "font-awesome/css/font-awesome.css";
import "./registerServiceWorker";
import "./config/bootstrap";
import "./config/msgs";
import "./config/axios";
import "./config/mq";

import store from "./config/store";
import router from "./config/router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
