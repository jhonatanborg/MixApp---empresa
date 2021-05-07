import actionsGlobal from "../actions";
import mutationsGlobal from "../mutations";
import getDay from "date-fns/getDay";
import mixins from "@/mixins/mixins.js";

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
      console.log(state.company);

      if (state.company) {
        let Allproducts = state.company.prodCategories;
        let categories = Allproducts.filter((item) => {
          item.products = item.products.sort((a, b) => {
            if (a.sale_value > b.sale_value) {
              return 1;
            }
            if (a.sale_value < b.sale_value) {
              return -1;
            }
          });
          return item.products.length > 0;
        });

        return categories;
      }
      return [];
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
    getPromo(state) {
      let products = [];
      if (state.company.promotions) {
        state.company.promotions.forEach((value) => {
          if (value.expires && !mixins.methods.compareDate(value.expires)) {
            return;
          }
          if (
            value.days.match(/[0-9]/g) &&
            !value.days.match(/[0-9]/g).includes(getDay(new Date()).toString())
          ) {
            return;
          }
          return products.push(value);
        });
        return products;
      }
    },
    getPayments(state) {
      if (state.company) {
        const groups = [];
        const payments = state.company.payments;
        payments.map((payment) => {
          if (!groups.find((item) => item.id === payment.payment.group.id)) {
            groups.push(payment.payment.group);
          }
          groups.map((group) => {
            group.payments = [];
          });
        });

        groups.map((group) => {
          payments.map((payment) => {
            if (group.id === payment.payment.payment_group_available_id) {
              group.payments.push({
                id: payment.payment.id,
                title: payment.payment.title,
                img: payment.payment.img,
              });
            }
          });
        });

        return groups;
      }
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

//  if (
//             (value.expires && mixins.methods.compareDate(value.expires)) ||
//             (value.days.match(/[0-9]/g) &&
//               value.days
//                 .match(/[0-9]/g)
//                 .includes(getDay(new Date()).toString()))
//           )

//  else if (!value.expires && !value.days.match(/[0-9]/g)) {
//             return products.push(value);
//           }
