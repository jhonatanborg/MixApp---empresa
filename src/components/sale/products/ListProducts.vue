<template>
  <div>
    <div class="py-3 ">
      <span class="mx-3 title-item">Produtos</span>
    </div>
    <v-card class="overflow-y-auto barscroll mx-0" flat>
      <v-divider></v-divider>
      <v-list-item dense v-for="item in sale" :key="item.id" link class="my-2">
        <v-list-item-content>
          <v-list-item-title>
            {{ item.product_qtd }} x {{ item.product_name }}</v-list-item-title
          >
          <v-list-item-subtitle class="price-item">
            <b v-text="convertMoney(item.total)"> </b>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn @click="deleteItemSale(item.id)" icon color="error">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
    <div class="py-2">
      <span class="mx-3 item-title">
        Endereço para entrega:
      </span>
    </div>
    <div class="mx-3">
      <v-card flat color="grey lighten-4">
        <v-list-item dense @click="openDialogAddress()" link class="my-2">
          <v-list-item-content>
            <v-list-item-subtitle class="price-item">
              <span class="item-address">
                {{ address.street }}, {{ address.number }} -
                {{ address.district }}

                {{ address.complement }}</span
              >
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <div
                v-if="company.deliveryFee"
                class="item-value-address"
                v-text="convertMoney(company.deliveryFee.value)"
              ></div>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="primary">
              <v-icon size="20">mdi-pencil-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </div>
    <v-list-item>
      <span class="item-title">Subtotal</span>
      <v-spacer></v-spacer>
      <div class="black--text" v-text="convertMoney(subTotal)"></div>
    </v-list-item>

    <div class="mx-3" v-if="minPurchaseVerify">
      <v-btn depressed x-large @click="userVerify()" block color="#FFBA0A">
        <b>Selecione forma de pagamento </b>
      </v-btn>
    </div>
    <div v-else>
      <v-card class="pa-5 grey lighten-4 item-min-purchase" flat>
        O pedido mínimo para nessa empresa é de
        <b>{{ convertMoney(company.min_purchase_value) }}</b> , não inclusa a
        taxa de entrega. Selecione + itens!
      </v-card>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins.js";

export default {
  mixins: [mixins],
  computed: {
    sale() {
      return this.$store.state.cart.saleIdb;
    },
    address() {
      return this.$store.state.user.address;
    },
    subTotal() {
      let sum;
      if (this.sale) {
        sum = this.sale.reduce((sum, item) => sum + item.total, 0);
      }
      return sum;
    },
    minPurchaseVerify() {
      if (this.subTotal >= this.company.min_purchase_value) {
        return true;
      }
      return false;
    },
    company() {
      localStorage.setItem(
        "company",
        JSON.stringify(this.$store.getters["company/getCompany"])
      );
      return this.$store.getters["company/getCompany"] || {};
    },
  },
  methods: {
    openDialogAddress() {
      this.$store.commit("alertAddress", { value: true });
      if (localStorage.getItem("acess-token")) {
        this.$store.commit("user/request", { state: "addressTabs", data: 4 });
      } else {
        this.$store.commit("user/request", { state: "addressTabs", data: 1 });
      }
    },
    userVerify() {
      if (localStorage.getItem("acess-token")) {
        this.$store.commit("cart/sidebar", { open: true, step: 2 });
      } else this.$router.push({ name: "session" });
    },
    deleteItemSale(item) {
      const payload = {
        idb: {
          table: "sale",
          data: item,
        },
        method: "delete",
      };
      this.$store.dispatch("cart/request", payload);
      this.$store.dispatch("cart/request", {
        state: "saleIdb",
        method: "getAll",
        idb: {
          table: "sale",
        },
      });
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}

.barscroll::-webkit-scrollbar {
  width: 10px;
}

.barscroll::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 2px solid #dadada;
}

.barscroll::-webkit-scrollbar-thumb {
  background: #ef354e;
  border: solid 2px #e6e6e6;
  border-radius: 7px;
}

.barscroll::-webkit-scrollbar-thumb:hover {
  background: black;
}
.pay-subtitle {
  color: #707070;
  font-weight: 400;
}
.title-item {
  left: 22px;
  top: 101px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #2d2c2c;
}
@media (max-width: 14000px) {
  .barscroll {
    max-height: 30vh;
  }
}
.item-title {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  width: 100%;
}
.item-address {
  font-family: Montserrat;
  font-style: normal;
  font-size: 14px;
  line-height: 17px;
}
.item-value-address {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
}
.item-min-purchase {
  font-size: 14px;
}
</style>
