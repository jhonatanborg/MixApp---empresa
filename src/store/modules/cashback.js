import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";

const cashback = {
  namespaced: true,
  state: {
    cashDetails: false,
  },
  mutations: {
    cashDialog(state) {
      state.cashDetails = !state.cashDetails;
    },
    ...mutationsGlobal,
  },
  getters: {},
  actions: {
    ...actionsGlobal,
  },
};
export default cashback;
