import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";

const company = {
  namespaced: true,
  state: () => ({
    company: {},
    companies: [],
    categories: [],
    categorySelected: "Todos",
    addressVerify: false,
    aboutCompany: false,
  }),
  getters: {
    getProducts(state) {
      if (state.company) {
        return state.company.prodCategories.reverse();
      }
    },
    getAllCategories(state) {
      const all = [
        {
          id: 0,
          img:
            "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          name: "Todos",
        },
      ];
      all.push(...state.categories);
      return all;
    },
    getCategories(state) {
      let categories = [];
      Object.values(state.company.prodCategories).forEach((value) => {
        if (value.products.length > 0) {
          categories.push({
            id: value.id,
            name: value.name,
          });
        }
      });
      return categories;
    },
    getCompany(state) {
      if (state.company.message) return (state.company = state.company.company);
      return state.company;
    },
  },

  mutations: {
    categorieFilter(state, data) {
      state.categorySelected = data;
    },
    insertCompany(state, data) {
      state.company = data;
    },

    ...mutationsGlobal,
  },
  actions: { ...actionsGlobal },
};

export default company;
