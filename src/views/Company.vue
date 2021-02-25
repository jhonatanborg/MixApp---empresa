<template>
  <div class="grey lighten-5">
    <MenuBar />
    <div id="company" v-if="company.name">
      <div v-if="!$vuetify.breakpoint.xsOnly">
        <ProfileDetails :company="company" />
        <v-app-bar class="fixed-bar" dark flat color="#5530E5">
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
      <div class="promo-bar" v-if="promotions.length > 0" fluid>
        <PromoBar />
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
        @click="routeSale()"
        class="mr-3 animate__animated animate__pulse animate__infinite"
        rounded
        block
        dark
        x-large
        color="#5530E5"
      >
        <v-icon class="mr-2">mdi-basket-outline</v-icon> Sacola
        <b class="notify">{{ sale.length }}</b>
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
    routeSale() {
      this.$router.push({ name: "sale" });
      this.$store.commit("cart/mobileStep", 1);
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
.promo-bar {
  background: linear-gradient(-45deg, #9300dc 20%, #4144e8 70%);
}
</style>
