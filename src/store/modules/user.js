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
    editAddress: "",
    dialogAddress: true,
    modalPhoneRequired: false,
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
        const childItems = [];

        state.purchaseDetails.itens.map((item) => {
          childItems.push(...item.childItem);
        });

        const subcategories = [];

        childItems.map((item) => {
          item.product.subcategory.sale_item_id = item.parent_sale_item;
          if (
            !subcategories.find(
              (item2) =>
                item.product.subcategory.id === item2.id &&
                item.parent_sale_item === item2.sale_item_id
            )
          ) {
            subcategories.push(item.product.subcategory);
          }
        });
        subcategories.map((sub) => {
          sub.products = [];
          childItems.map((item) => {
            if (
              item.product.subcategory.id === sub.id &&
              sub.sale_item_id === item.parent_sale_item
            ) {
              item.product.qtd = item.product_qtd;
              sub.products.push(item.product);
            }
          });
        });
        return subcategories;
      }
    },
    getListAddress(state) {
      let address = state.userProfile.address;
      if (state.userProfile) {
        return address;
      }
    },
  },

  mutations: {
    setUser(state, data) {
      state.userProfile = data;
    },
    setAddressEdit(state, data) {
      state.editAddress = data.address;
      state.dialogAddress = data.dialog;
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
    setModalPhoneRequired(state, data) {
      state.modalPhoneRequired = data;
    },
    ...mutationsGlobal,
  },
  actions: { ...actionsGlobal },
};

export default user;
