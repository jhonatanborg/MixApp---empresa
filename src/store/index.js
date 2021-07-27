import Vue from "vue";
import Vuex from "vuex";
import cart from "./modules/cart";
import company from "./modules/company";
import user from "./modules/user";
import mobile from "./modules/mobile";
import cashback from "./modules/cashback";

import actionsGlobal from "./actions";
import mutationsGlobal from "./mutations";

let domain;
if (
  window.location.host.indexOf("localhost") >= 0 ||
  window.location.host.indexOf("netlify") >= 0 ||
  window.location.host.indexOf("192.168") >= 0 ||
  window.location.host.indexOf("10.0.0") >= 0
) {
  domain = "emporiodocaldo.com.br";
} else if (window.location.host.indexOf("www") >= 0) {
  domain = window.location.host.split("www.")[1];
} else {
  domain = window.location.host;
}
// return "pastelariadopaulo.mixentregas.com.br";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    cart,
    company,
    user,
    mobile,
    cashback,
  },
  state: {
    error: null,
    message: null,
    next: true,
    alertSale: false,
    addressAlert: false,
    comission: 8,
    server: process.env.VUE_APP_BASE_URL_SERVER_LOCAL,
    timezone: "America/Cuiaba",
    domain,
  },
  mutations: {
    showAlert(state, data) {
      state.alertSale = data;
    },
    alertAddress(state, data) {
      state.addressAlert = data.value;
    },
    ...mutationsGlobal,
  },
  actions: { ...actionsGlobal },
});
