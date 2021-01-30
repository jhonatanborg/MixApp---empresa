<template>
  <div class="">
    <v-row>
      <v-col>
        <v-btn to="/cashback" depressed outlined color="error"> Voltar</v-btn>
      </v-col>
    </v-row>
    <v-card class="pa-5">
      <v-row justify="space-between">
        <v-col cols="auto">
          <div class="details">
            <div class="title-company">
              <span class="font-weight-bold" v-text="company.name"> </span>
            </div>
            <div class="category">
              <span v-text="company.category"></span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <v-alert dense border="left" color="#FF5291" dark>
            <small>Seu saldo:</small>
            <h2 v-text="company.cashback.saldo + ' pontos'"></h2>
          </v-alert>
        </v-col>
        <v-col>
          <v-alert dense border="left" color="#FFBA0A" outlined dark>
            <small>Você usou:</small>
            <h2>50 <b>pontos</b></h2>
          </v-alert>
        </v-col>
      </v-row>
    </v-card>

    <div class="my-3">
      <span class="cashs">Seus cashbacks</span>
    </div>
    <div>
      <v-list two-line>
        <v-list-item
          @click="$store.commit('cashback/cashDialog', true)"
          v-for="n in 10"
          :key="n"
          link
        >
          <v-list-item-avatar>
            <v-icon size="30">mdi-home-currency-usd</v-icon>
          </v-list-item-avatar>

          <v-list-item-content class="mix-points">
            <v-list-item-title>16 pontos</v-list-item-title>
            <v-list-item-subtitle class="status">
              Cashback Recebido
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>
              <b class="blue--text">16/AGO</b>
            </v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
    <DialogCashDetails />
  </div>
</template>

<script>
import DialogCashDetails from "@/components/cashback/CashbackDetails.vue";
export default {
  components: {
    DialogCashDetails,
  },
  data() {
    return {
      company: {
        name: "emporio do caldo",
        category: "massas",
        cashback: {
          saldo: 500,
          cashback_type: "pontos",
          receiveds: [
            {
              id: 50,
              total: "150 pontos",
              status: "Recebido",
              data: "16/Ago",
            },
            {
              id: 51,
              total: "150 pontos",
              status: "Recebido",
              data: "16/Ago",
            },
            {
              id: 52,
              total: "150 pontos",
              status: "Recebido",
              data: "16/Ago",
            },
            {
              id: 53,
              total: "150 pontos",
              status: "Recebido",
              data: "16/Ago",
            },
            {
              id: 54,
              total: "150 pontos",
              status: "Recebido",
              data: "16/Ago",
            },
          ],
        },
      },
    };
  },
};
</script>

<style>
.cashs {
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  color: #ffba0a;
}
.mix-status {
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;
  text-align: left;
  color: #00c996;
}
.mix-points {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: left;
  color: #00c996;
}
.title-company {
  font-weight: normal;
  font-size: 20px;
  line-height: 20px;
  text-align: left;
  color: #3c3a41;
  text-transform: capitalize;
}
</style>
