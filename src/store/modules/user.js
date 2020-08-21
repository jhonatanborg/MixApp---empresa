import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";

const user = {
  namespaced: true,
  state: () => ({
    address: null,
    userProfile: null,
    userName: null,
    addressEdit: null,
    addressTabs: 1,
    purchase: null,
    purchaseDetails: null,
  }),
  getters: {
    getUser(state) {
      if (state.userProfile && state.userProfile.name) {
        const dateFormated = new Date(state.userProfile.birthday);
        state.userProfile.birthday = dateFormated.toLocaleDateString();
        return state.userProfile;
      }
    },
  },

  mutations: {
    setUser(state, data) {
      state.userProfile = data;
    },
    setAddresEdit(state, data) {
      state.addressEdit = data;
    },
    setUserName(state, data) {
      state.userName = data;
    },
    setAddress(state, data) {
      state.address = data;
    },
    setPurchase(state, data) {
      state.purchaseDetails = data;
    },

    ...mutationsGlobal,
  },
  actions: { ...actionsGlobal },
};

export default user;
