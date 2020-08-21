<template>
  <div id="purchase-details">
    <div class="d-flex justify-end">
      <v-btn color="error" :to="{ name: 'purchaseslist' }" outlined
        >Voltar</v-btn
      >
    </div>
    <v-card width="100%" class="elevation-0">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="title-company"
            >Emporio do caldo</v-list-item-title
          >
          <v-list-item-subtitle>
            Cashback:
          </v-list-item-subtitle>
          <span class="cash-return"
            >150 pontos
            <v-icon color="#00c996" size="10">mdi-circle</v-icon> pendente
          </span>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-card flat class="my-5">
      <v-alert class="ma-0" type="success"
        ><span class="white--text font-weight-bold"
          >Entregue com sucesso</span
        ></v-alert
      >
      <div class="px-3">
        <v-row justify="space-between">
          <v-col cols="auto">Pedido {{ purchaseDetails.id }}</v-col>
          <v-col cols="auto">Hoje 11:45</v-col>
        </v-row>
      </div>
      <div class="px-3">
        <v-row justify="space-between">
          <v-col cols="auto">Itens</v-col>
        </v-row>
      </div>
      <v-list>
        <div>
          <v-list-item
            v-for="(item, key) in purchaseDetails.itens"
            :key="key"
            class="px-3"
          >
            <v-list-item-content>
              <v-list-item-title
                ><span v-text="item.product_qtd + 'X '"></span>
                <span v-text="item.product.name"></span>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action
              class="value-product"
              v-text="convertMoney(item.product.sale_value)"
            ></v-list-item-action>
          </v-list-item>
          <v-divider class="px-3"></v-divider>
        </div>
      </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Subtotal</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action
            v-text="convertMoney(purchaseDetails.subtotal)"
            class="value-product"
          ></v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Taxa de entrega</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action
            v-text="convertMoney(purchaseDetails.delivery_value)"
            class="value-product"
          ></v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Total</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action
            v-text="convertMoney(purchaseDetails.total)"
            class="value-product"
          ></v-list-item-action>
        </v-list-item>
        <div class="px-4 grey lighten-5">
          <v-row justify="space-between">
            <v-col cols="auto">Forma de pagamento</v-col>
            <v-col cols="auto">Cartão de crédito</v-col>
          </v-row>
        </div>
        <div
          v-if="purchaseDetails.deliveryAddress"
          class="px-4 purchase-address"
        >
          <div>
            <span>Entregar em:</span>
          </div>
          <div>
            <span v-text="purchaseDetails.deliveryAddress.title">Casa</span>
          </div>
          <div>
            <span>
              {{ purchaseDetails.deliveryAddress.street }},
              {{ purchaseDetails.deliveryAddress.number }}
              <span
                v-if="purchaseDetails.deliveryAddress.complement"
                v-text="', ' + purchaseDetails.deliveryAddress.complement"
              ></span>
            </span>
          </div>
        </div>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getPurchases();
  },
  computed: {
    purchaseDetails() {
      return this.$store.state.user.purchaseDetails || {};
    },
  },
  methods: {
    convertDate(date) {
      return date
        .substr(0, 10)
        .split("-")
        .reverse()
        .join("/");
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
        return "Grátis";
      }
    },
    getPurchases() {
      this.$store.dispatch("user/request", {
        state: "purchaseDetails",
        method: "GET",
        url: `/sale/${this.$route.params.id}`,
      });
    },
  },
};
</script>

<style>
.complements {
  font-size: 13px;
  color: grey;
}

.subheader {
  font-size: 13px;
  color: grey;
}

.value-product {
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  color: #666;
}
.purchase-address {
  font-weight: 500;
  font-size: 16px;
  text-align: left;
  color: #666;
}
.title-company {
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  color: #666;
}
.cash-return {
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  color: #00c996;
}
</style>
