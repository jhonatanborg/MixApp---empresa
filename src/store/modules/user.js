import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";

const user = {
  namespaced: true,
  state: () => ({
    address: null,
    userProfile: null,
    userName: null,
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
    getPurchase(state) {
      if (state.purchaseDetails) {
        const {
          itens: [{ childItem }],
        } = state.purchaseDetails;
        const subcategories = [];

        childItem.map((item) => {
          if (
            !subcategories.find(
              (item2) => item.product.subcategory.id === item2.id
            )
          ) {
            subcategories.push(item.product.subcategory);
          }
        });
        subcategories.map((sub) => {
          sub.products = [];
          childItem.map((item) => {
            if (item.product.subcategory.id === sub.id) {
              item.product.qtd = item.product_qtd;
              sub.products.push(item.product);
            }
          });
        });
        return subcategories;
      }
    },
  },

  mutations: {
    setUser(state, data) {
      state.userProfile = data;
    },
    setAddresEdit(state, data) {
      state.address = data;
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
