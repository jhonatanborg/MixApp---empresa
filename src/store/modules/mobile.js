import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";

const mobile = {
  namespaced: true,

  state: () => ({
    mobileMenu: false,
  }),
  mutations: {
    mobileMenu(state) {
      state.mobileMenu = !state.mobileMenu;
    },
    ...mutationsGlobal,
  },
  getters: {},
  actions: {
    ...actionsGlobal,
  },
};
export default mobile;
