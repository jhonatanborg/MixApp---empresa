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
  },
  mutations: {
    showAlert(state, data) {
      state.alertSale = data;
    },
    alertAddress(state, data) {
      if (data.route == "home") {
        state.addressAlert = data.value;
      } else {
        state.addressAlert = true;
      }
    },
    ...mutationsGlobal,
  },
  actions: { ...actionsGlobal },
});
