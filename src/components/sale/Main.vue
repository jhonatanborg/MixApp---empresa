<template>
  <v-navigation-drawer
    right
    app
    temporary
    :width="$vuetify.breakpoint.xsOnly ? '100%' : '500px'"
    :value="$store.state.cart.sidebar.open"
    class="mx-0 px-0 "
    height="100vh"
    @input="eventSale"
  >
    <v-card flat class="mx-0 pa-0 my-0 " v-if="bagStatus && address && company">
      <div class="align-center">
        <v-list-item class="mx-0">
          <v-list-item-avatar tile>
            <v-img :src="$store.state.server + company.logo"> </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle>
              Pedidos em:
            </v-list-item-subtitle>
            <v-list-item-title>
              <router-link :to="{ name: 'company' }" dense>
                <b> {{ company.name }}</b></router-link
              >
            </v-list-item-title>
            <v-list-item-title>
              <a to="/home"> <b> </b></a>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action v-if="step == 2">
            <v-btn
              @click="$store.commit('cart/sidebar', { open: true, step: 1 })"
              outlined
              color="primary"
              >Voltar</v-btn
            >
          </v-list-item-action>
          <v-list-item-action v-else>
            <v-btn
              @click="$store.commit('cart/sidebar', { open: false, step: 1 })"
              outlined
              color="error"
              >Fechar</v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </div>
      <div>
        <div id="list-products">
          <v-window :value="step">
            <v-window-item :value="1">
              <ListProducts />
            </v-window-item>
            <v-window-item :value="2">
              <Payment />
            </v-window-item>
            <v-window-item :value="3">
              <Send />
            </v-window-item>
            <v-window-item :value="4">
              <ErrorSale />
            </v-window-item>
            <v-window-item :value="5">
              <Change />
            </v-window-item>
            <v-window-item :value="6">
              <Address />
            </v-window-item>
            <v-window-item :value="7">
              <AddressEdit />
            </v-window-item>
          </v-window>
        </div>
      </div>
    </v-card>
    <v-card flat class="mx-auto col-sm-12" v-else>
      <v-card class="d-flex" flat min-height="500">
        <div class="align-self-center mx-auto">
          <div class="text-center">
            <BagEmpty />
            <div>
              <h3>A sua sacola está vazia</h3>
            </div>
            <div class="my-3">
              <h4 color="grey lighten-5">
                Não sabe o que comer? Centenas de delicias esperam por você!
              </h4>
            </div>
            <v-btn large color="#FFBA0A" @click="close" dark
              >Veja o cardápio</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import BagEmpty from "@/components/icons/BagEmpty";
import ListProducts from "@/components/sale/products/ListProducts";
import Payment from "@/components/sale/payment/Payment";
import Send from "@/components/sale/send/SendPurchase";
import ErrorSale from "@/components/sale/error/ErrorSale";
import Change from "@/components/sale/payment/Change";
import Address from "@/components/sale/address/ConfirmAddress";
import AddressEdit from "@/components/sale/address/EditAddress";

export default {
  components: {
    BagEmpty,
    ListProducts,
    Payment,
    Send,
    ErrorSale,
    Change,
    Address,
    AddressEdit,
  },
  computed: {
    shoppingCart: {
      get() {
        return this.$store.state.sidebar;
      },
      set(val) {
        this.$store.commit("sidebar", val);
      },
    },

    company() {
      localStorage.setItem(
        "company",
        JSON.stringify(this.$store.getters["company/getCompany"])
      );
      return this.$store.getters["company/getCompany"] || {};
    },
    sale() {
      return this.$store.state.cart.saleIdb;
    },
    step() {
      return this.$store.state.cart.sidebar.step;
    },

    address() {
      return this.$store.state.user.address;
    },
    bagStatus() {
      return this.$store.state.cart.saleIdb.length > 0 ? true : false;
    },
  },
  methods: {
    eventSale(data) {
      this.$store.commit("cart/sidebar", { open: data, step: 1 });
    },
    close() {
      this.$store.commit("alertAddress", { value: false });
      this.$store.commit("cart/sidebar", { open: false, step: 1 });
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}

.pay-subtitle {
  color: #707070;
  font-weight: 400;
}
</style>
