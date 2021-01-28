import Vue from "vue";
import App from "./App.vue";
import "leaflet/dist/leaflet.css";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import vuetify from "@/plugins/vuetify";
import VueTheMask from "vue-the-mask";
import store from "./store";
import money from "v-money";
import wb from "./registerServiceWorker";
Vue.prototype.$workbox = wb;
import VueTelInputVuetify from "vue-tel-input-vuetify/lib";
import AnimateCSS from "animate.css";

Vue.use(AnimateCSS);

Vue.use(VueTelInputVuetify, {
  vuetify,
});
import { LMap, LTileLayer, LMarker, LControl } from "vue2-leaflet";
import "leaflet";
Vue.prototype.$bus = new Vue({});
Vue.use(VueTheMask);

Vue.use(money, { precision: 2 });
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-control", LControl);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
