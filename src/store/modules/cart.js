import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";

const cart = {
  namespaced: true,
  state: {
    saleIdb: [],
    shoppingCart: false,
    saleEmpty: true,
    saleCompany: null,
    sidebar: {
      open: false,
      step: null,
    },
    quantitySale: null,
    saleMode: null,
    paySelect: null,
    changeFor: null,
    errorSale: {
      value: false,
      message: null,
    },
  },
  mutations: {
    addSale(state, data) {
      if (state.sale.length > 0) state.sale.push(data);
      else state.sale = [data];
    },
    getSaleIdb(state, data) {
      state.saleIdb = data;
    },
    saleQuantity(state) {
      state.quantitySale = state.saleIdb.length;
    },
    setSaleCompany(state, data) {
      state.saleCompany = data;
    },
    sidebar(state, data) {
      state.sidebar = data;
    },
    paySelect(state, data) {
      state.paySelect = data;
    },
    changeFor(state, data) {
      state.changeFor = data;
    },
    ...mutationsGlobal,
  },
  getters: {
    getStatusSale(state) {
      if (state.saleIdb.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  actions: {
    ...actionsGlobal,
  },
};
export default cart;
