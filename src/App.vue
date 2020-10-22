<template>
  <v-app id="App" class="app grey lighten-5 ">
    <MenuMobile />
    <v-main class="bar">
      <AlertAdress @close-dialog="closeDialog" />
      <SaleError />

      <Sale />

      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import Sale from "@/components/sale/Sale";
import MenuMobile from "@/components/mobile/shared/MenuMobile";
import AlertAdress from "@/components/user/alert_address/AlertAddress";
import SaleError from "@/components/sale/SaleError";

export default {
  name: "App",
  components: {
    Sale,
    AlertAdress,
    SaleError,
    MenuMobile,
  },
  mounted() {
    this.getSaleIdb();
    this.listDataCompany();
  },
  data: () => ({
    dialogStep: null,
  }),
  computed: {
    addressAlert() {
      return this.$store.state.addressAlert;
    },
  },
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
    getSaleIdb() {
      this.$store.dispatch("cart/request", {
        state: "saleIdb",
        method: "getAll",
        idb: {
          table: "sale",
        },
      });
    },
    dialogView(item) {
      this.dialogStep = item;
    },
    closeDialog() {
      this.alertAddress = !this.alertAddress;
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
  },
};
</script>
<style>
#App {
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
  background-color: #fafafa;
  color: #293040 !important;
}

.bar ::-webkit-scrollbar {
  display: contents;
}
.v-btn {
  text-transform: none !important;
}
.sale {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
