<template>
  <div>
    <span class="title-list"> Meus pedidos</span>
    <v-card
      v-for="(item, key) in purchase"
      :key="key"
      :to="{ name: 'purchase-details', params: { id: item.id } }"
      link
      class="pa-5 my-5 card-purchase"
      flat
      @click="setPurchase(item)"
    >
      <v-row justify="space-between" align="start">
        <v-col cols="auto"
          ><h4 class="number-purchase">Pedido {{ item.id }}</h4>
          <span class="title-company">Açai no quintal</span>
          <h4 class="value-purchase" v-text="convertMoney(item.total)"></h4>
        </v-col>
        <v-col cols="auto">
          <h4 class="data-purchase" v-text="convertDate(item.updated_at)"></h4>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-chip
            class="font-weight-bold"
            :color="statuspurchase(item.status) + ' lighten-5'"
            :text-color="statuspurchase(item.status)"
            >{{ item.status }}</v-chip
          >
        </v-col>
        <v-col cols="auto"> </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getPurchases();
  },
  computed: {
    purchase() {
      return this.$store.state.user.purchase;
    },
  },
  methods: {
    statuspurchase(status) {
      let statusColor;
      switch (status) {
        case "Pendente":
          statusColor = "warning";
          break;
        case "Confirmado":
          statusColor = "purple";
          break;
        case "Saiu para Entrega":
          statusColor = "primary";
          break;
        case "Entregue":
          statusColor = "green";
          break;
        case "Cancelado":
          statusColor = "red";
          break;
        case "Finalizado":
          statusColor = "light-green";
          break;
        default:
          break;
      }
      return statusColor;
    },
    execRequest(action, state, url, method, insert, data = null) {
      this.$store.dispatch(action, {
        state: state,
        method: method,
        url: url,
        insert,
        data,
      });
    },
    getPurchases() {
      this.execRequest("user/request", "purchase", "/sale", "GET", true);
    },
    setPurchase(purchase) {
      this.$store.commit("user/setPurchase", purchase);
    },
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
  },
};
</script>

<style>
.card-purchase {
  font-size: 15px;
  text-align: left;
  color: #293040 !important;
}
.card-purchase .title-company {
  font-size: 15px;
  text-align: left;
  color: #666;
}
.card-purchase .data-purchase {
  font-size: 15px;
  text-align: left;
  color: #666;
}
.title-list {
  font-weight: 600;
  font-size: 15px;
  margin: 15px;
  text-align: left;
  color: #666;
}
</style>
