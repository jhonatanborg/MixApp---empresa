import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";

const mobile = {
  namespaced: true,

  state: () => ({
    mobileMenu: false,
  }),
  mutations: {
    mobileMenu(state, data) {
      state.mobileMenu = data;
    },
    ...mutationsGlobal,
  },
  getters: {},
  actions: {
    ...actionsGlobal,
  },
};
export default mobile;
