<template>
  <div class="grey lighten-5">
    <MenuBar />
    <div id="company" v-if="company.name">
      <div v-if="!$vuetify.breakpoint.xsOnly">
        <ProfileDetails :company="company" />
        <v-app-bar class="fixed-bar" flat color="#FFBA0A">
          <div v-for="(item, key) in categories" :key="key">
            <v-btn text @click="filterScroll(item)">
              <b>
                {{ item.name }}
              </b>
            </v-btn>
          </div>
        </v-app-bar>
      </div>
      <div v-else><ProfileMobile :company="company" /></div>
      <div
        class="grey darken-4
"
      >
        <v-container v-if="promotions.length > 0" fluid>
          <PromoBar />
        </v-container>
      </div>
      <v-container fluid>
        <v-row align="center" justify="space-between">
          <v-col cols="auto " sm="12">
            <ProductBar :company="company" :products="company.prodCategories" />
          </v-col>
        </v-row>
      </v-container>
      <Footer />
    </div>
    <DialogAbout />
    <v-dialog
      v-model="dialogPay"
      scrollable
      max-width="400px"
      transition="dialog-transition"
    >
      <Brands @close-dialog="dialogPay = false" />
    </v-dialog>
    <v-layout
      v-if="bagStatus && $vuetify.breakpoint.xsOnly"
      class="col-sm-12 sale"
    >
      <v-btn
        @click="$store.commit('cart/sidebar', { open: true, step: 1 })"
        class="elevation-7"
        block
        large
        color="#FFBA0A"
        dark
        rounded
      >
        Sacola ({{ sale.length }})
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
import ProductBar from "@/components/company/ProductBar";
import PromoBar from "@/components/company/PromoBar";
import Brands from "@/components/company/BrandsPay.vue";
import Footer from "@/components/shared/Footer.vue";
import MenuBar from "@/components/shared/MenuBar";
import ProfileDetails from "@/components/company/HeaderProfile";
import ProfileMobile from "@/components/mobile/company/HeaderProfile";
import DialogAbout from "@/components/company/DialogAbout.vue";
export default {
  name: "Company",
  components: {
    ProductBar,
    PromoBar,
    Brands,
    MenuBar,
    ProfileDetails,
    ProfileMobile,
    DialogAbout,
    Footer,
  },
  beforeMount() {
    this.listDataCompany();
  },
  data: () => ({
    dialogPay: false,
    statusLogin: true,
    selector: null,
    filterItem: null,
    category_id: null,
    categorieSelect: null,
    selection: 2,
    items: [
      { text: "Home", icon: "mdi-folder", route: "wallet-intro" },
      {
        text: "Histórico",
        icon: "mdi-account-multiple",
        route: "historic-cash",
      },
      { text: "Cashbacks usados", icon: "mdi-star", route: "cash-used" },
      { text: "Sobre a empresa", icon: "mdi-star", route: "about" },
    ],
  }),
  computed: {
    company() {
      localStorage.setItem(
        "company",
        JSON.stringify(this.$store.state.company)
      );
      return this.$store.getters["company/getCompany"] || {};
    },
    bagStatus() {
      return this.$store.getters["cart/getStatusSale"];
    },
    sale() {
      return this.$store.state.cart.saleIdb;
    },
    categories() {
      return this.$store.getters["company/getCategories"];
    },
    products() {
      return this.$store.getters["company/getProducts"];
    },
    address() {
      return this.$store.state.user.address;
    },
    alertAddress() {
      return this.$store.state.addressAlert;
    },
    addressVerify() {
      return this.$store.state.company.addressVerify;
    },
    promotions() {
      return this.$store.getters["company/getPromo"] || {};
    },
  },
  watch: {},
  methods: {
    execRequest(action, state, url, method, insert, data = null) {
      this.$store.dispatch(action, {
        state: state,
        method: method,
        url: url,
        insert,
        data,
      });
    },
    filterScroll(item) {
      this.$vuetify.goTo((this.selector = "#go" + item.id));
    },
    idGroupSelector(item) {
      item = item.replace(" ", "");
      return item;
    },
    listDataCompany() {
      if (localStorage.getItem("geolocation")) {
        let coords = JSON.parse(localStorage.getItem("geolocation"));
        const payload = {
          state: "company",
          method: "get",
          url: `/company-show/${process.env.VUE_APP_DOMAIN},${coords.latitude},${coords.longitude}`,
          insert: true,
        };
        this.execRequest("user/request", "address", "/coord", "POST", true, {
          lat: coords.latitude,
          long: coords.longitude,
        });
        this.$store.dispatch("company/request", payload);
      } else {
        const payload = {
          state: "company",
          method: "get",
          url: `/company-show-one/${process.env.VUE_APP_DOMAIN}`,
          insert: true,
        };
        this.$store.dispatch("company/request", payload);
      }
    },
    convertMoney(money) {
      if (money > 0) {
        const toCurrency = (n, curr, LanguageFormat = undefined) =>
          Intl.NumberFormat(LanguageFormat, {
            style: "currency",
            currency: curr,
          }).format(n);
        return toCurrency(money, "BRL");
      } else {
        return "grátis";
      }
    },
  },
};
</script>

<style>
.v-btn {
  text-transform: none !important;
}
.fixed-bar {
  position: sticky !important;
  position: -webkit-sticky !important; /* for Safari */
  top: 2em !important;
  z-index: 2 !important;
}
</style>
