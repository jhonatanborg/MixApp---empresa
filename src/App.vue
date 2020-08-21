<template>
  <v-app id="App" class="app grey lighten-5 ">
    <!-- <MenuMobile /> -->

    <v-main class="bar">
      <AlertAdress @close-dialog="closeDialog" />
      <SaleError />

      <Sale />
      <router-view />

      <!-- <v-layout v-if="bagStatus" class="col-sm-12 sale">
        <v-btn
          @click="$store.commit('cart/sidebar', true)"
          class="elevation-7"
          block
          color="#765eda"
          dark
          rounded
        >
          Sacola ({{ sale.length }})
        </v-btn>
      </v-layout> -->
    </v-main>
  </v-app>
</template>
<script>
import Sale from "@/components/sale/Sale";
// import MenuMobile from "@/components/MenuMobile";
import AlertAdress from "@/components/user/alert_address/AlertAddress";
import SaleError from "@/components/sale/SaleError";

export default {
  name: "App",
  components: {
    Sale,
    AlertAdress,
    SaleError,
    // MenuMobile,
  },
  mounted() {
    this.getSaleIdb();
    this.execRequest(
      "company/request",
      "categories",
      "/company-category",
      "GET",
      true
    );

    this.execRequest("cart/request", "payments", "/payment", "GET");
  },
  data: () => ({
    dialogStep: null,
  }),
  computed: {
    sale() {
      return this.$store.state.cart.saleIdb;
    },
    bagStatus() {
      return this.$store.getters["cart/getStatusSale"];
    },
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

html ::-webkit-scrollbar {
  display: none;
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
