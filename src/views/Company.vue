<template>
  <div class="grey lighten-5">
    <MenuBar />
    {{ $store.state.cart.addressVerify }}
    <div id="company" v-if="company.name">
      <v-container>
        <div v-if="!$vuetify.breakpoint.xsOnly">
          <ProfileDetails :company="company" />
        </div>

        <div v-else><ProfileMobile :company="company" /></div>
        <v-row>
          <v-col cols="12" sm="12" lg="3">
            <!-- <v-overflow-btn
              dense
              hide-details
              class="my-0 py-0"
              color="#765eda"
              @change="filterScroll()"
              v-model="filterItem"
              deletable-chips
              :items="company.company.prodCategories"
              item-text="name"
              item-value="id"
              label="Relevância"
              target="#dropdown-example"
            ></v-overflow-btn> -->
          </v-col>
        </v-row>
        <v-row align="center" justify="space-between">
          <v-col cols="auto " sm="12">
            <ProductBar :company="company" :products="company.prodCategories" />
          </v-col>
        </v-row>
      </v-container>
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
  </div>
</template>

<script>
import ProductBar from "@/components/company/ProductBar";
import Brands from "@/components/company/BrandsPay.vue";
import MenuBar from "@/components/MenuBar";
import ProfileDetails from "@/components/company/HeaderProfile";
import ProfileMobile from "@/components/mobile/company/HeaderProfile";
import DialogAbout from "@/components/company/DialogAbout.vue";
export default {
  name: "Company",
  components: {
    ProductBar,
    Brands,
    MenuBar,
    ProfileDetails,
    ProfileMobile,
    DialogAbout,
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
    filterScroll() {
      if (this.filterItem) {
        this.$vuetify.goTo((this.selector = "#go" + this.filterItem));
      }
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
          url: `/company-show/${process.env.VUE_APP_COMPANY_OBJECT_ID},${coords.latitude},${coords.longitude}`,
          insert: true,
        };
        console.log(payload.url);
        this.execRequest("user/request", "address", "/coord", "POST", true, {
          lat: coords.latitude,
          long: coords.longitude,
        });
        this.$store.dispatch("company/request", payload);
      } else {
        const payload = {
          state: "company",
          method: "get",
          url: `/company-show-one/${process.env.VUE_APP_COMPANY_ID}`,
          insert: true,
        };
        console.log(payload.url);

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
</style>
