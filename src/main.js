import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import vuetify from "@/plugins/vuetify";
import VueTheMask from "vue-the-mask";
import store from "./store";
import money from "v-money";
import "animate.css";
Vue.prototype.$bus = new Vue({});
Vue.use(VueTheMask);
Vue.use(money, { precision: 2 });

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
