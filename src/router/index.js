import Vue from "vue";
import VueRouter from "vue-router";

import goTo from "vuetify/es5/services/goto";
Vue.use(VueRouter);
const routes = [
  {
    path: "*",
    name: "error",
    component: () => import("../views/Error.vue"),
  },
  {
    path: "/",
    name: "company",
    component: () => import("../views/Company.vue"),
  },

  {
    path: "/minha-conta/",
    name: "profile",
    props: true,
    component: () => import("../views/Profile.vue"),

    children: [
      {
        path: "/",
        name: "profile",
        component: () =>
          import("../components/user/profile/profile/Profile.vue"),
      },
      {
        path: "minha-conta/alterar-perfil/",
        name: "change-user",
        component: () =>
          import("../components/user/profile/profile/ChangeUser.vue"),
      },
      {
        path: "/minha-conta/alterar-senha/",
        name: "change-pass",
        component: () =>
          import("../components/user/profile/profile/ChangePass.vue"),
      },
    ],
  },
  {
    path: "/address",
    name: "address",
    component: () => import("../views/Address.vue"),
  },
  {
    path: "/login",
    name: "session",
    redirect: { name: "login" },

    component: () => import("../views/Session.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("../components/user/session/Login.vue"),
      },
      {
        path: "/cadastro",
        name: "register",
        component: () => import("../components/user/session/Register.vue"),
      },
      {
        path: "/resetar-senha",
        name: "forgot-pass",
        component: () => import("../components/user/session/ForgotPass.vue"),
      },
      {
        path: "/reseta-senha/tel",
        name: "forgot-pass-tel",
        component: () => import("../components/user/session/ForgotPassTel.vue"),
      },
      {
        path: "/confimarcao/",
        name: "code-verify",
        component: () => import("../components/user/session/CodeVerify.vue"),
      },
      {
        path: "/nova-senha",
        name: "new-password",
        component: () => import("../components/user/session/NewPassword.vue"),
      },
      {
        path: "/senha-alterada",
        name: "success-forgot",
        component: () => import("../components/user/session/SuccessForgot.vue"),
      },
      {
        path: "/confirmado",
        name: "success-process",
        component: () =>
          import("../components/user/session/SuccessProcess.vue"),
      },
    ],
  },
  {
    path: "/meus-pedidos",
    name: "purchases",
    redirect: { name: "purchaseslist" },
    component: () => import("../views/Purchases.vue"),
    children: [
      {
        path: "/",
        name: "purchaseslist",
        component: () =>
          import("../components/user/purchase/PurchasesList.vue"),
      },
      {
        path: "/meus-pedidos/pedido/:id",
        name: "purchase-details",
        component: () =>
          import("../components/user/purchase/PurchaseDetails.vue"),
      },
    ],
  },

  {
    path: "/cashback",
    name: "cashback",
    component: () => import("../views/cashback/Cashback.vue"),
    redirect: { name: "cashback-list" },

    children: [
      {
        path: "/",
        name: "cashback-list",
        component: () =>
          import("../components/cashback/CashbackListCompany.vue"),
      },
      {
        path: "cashback-company/:id",
        name: "cashback-company-profile",
        component: () =>
          import("../components/cashback/CashbackCompanyProfile.vue"),
      },

      {
        path: "sobre-a-empresa",
        name: "about",
        component: () => import("../components/cashback/CompanyDetails.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;
    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }
    return goTo(scrollTo);
  },

  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [
    "/login",
    "/",
    "/resetar-senha",
    "/cadastro",
    "/restaurants",
    "/restaurante/:id",
    "/reseta-senha/tel",
    "/nova-senha",
    "/senha-alterada",
    "/confimarcao/",
    "/alert-start",
    "/register-address",
    "/alert-address",
    "",
  ];
  const authRequired = !publicPages.includes(to.matched[0].path);
  const loggedIn = localStorage.getItem("acess-token");

  if (authRequired && !loggedIn) {
    return next({
      path: "/",
    });
  }

  next();
});
export default router;
