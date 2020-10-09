import Vue from "vue";
import Vuex from "vuex";
import cart from "./modules/cart";
import company from "./modules/company";
import user from "./modules/user";
import mobile from "./modules/mobile";
import cashback from "./modules/cashback";

import actionsGlobal from "./actions";
import mutationsGlobal from "./mutations";

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
    server: process.env.VUE_APP_BASE_URL_SERVER_LOCAL,
    timezone: "America/Cuiaba",
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
