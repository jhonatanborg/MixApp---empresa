<template>
  <div>
    <v-row class="px-2" align="center" justify="space-between">
      <v-col cols="auto">
        <span>Recentes</span>
      </v-col>
      <v-col cols="auto">
        <v-btn class="font-weight-bold" depressed color="primary" text
          >Filtrar<v-icon>mdi-filter</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <div class="overflow-y-auto " height="500px">
      <v-card
        flat
        class="pa-5 my-3 mx-3"
        v-for="company in companies"
        :key="company.id"
        :to="{ name: 'cashback-company-profile', params: { id: company.id } }"
      >
        <div class="title-company-cash">
          <span v-text="company.name"> </span>
        </div>
        <div>
          <v-row>
            <v-col cols="auto">
              <div
                :class="
                  company.type == 'Pontos'
                    ? 'cash-label-point'
                    : 'cash-label-percentage'
                "
              >
                <span class="cash-value" v-text="company.saldo"></span>
              </div>
            </v-col>
            <v-col cols="auto">
              <div class="cash-label-return">
                <span class="cash-value-return"> CASHBACK <b> Até 65%</b></span>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      companies: [
        {
          id: 35552,
          name: " Emporio do caldo",
          category: "massas",
          img: "https://i.imgur.com/oMBHCqp.png",
          saldo: "R$ 220,00",
          type: "Dinheiro",
        },
        {
          id: 35553,
          name: "Dona Ana",
          category: "sorvete",
          img: "https://i.imgur.com/SLnN91L.jpg",
          saldo: "R$ 500,00",
          type: "Pontos",
        },
        {
          id: 35554,
          name: "Homer Lanches",
          category: "Lanches",
          img: "https://i.imgur.com/p29HQ6N.jpgg",
          saldo: "200 pontos",
          type: "Pontos",
        },
        {
          id: 35555,
          name: "Vegano Carmita",
          category: "vegano",
          img: "https://i.imgur.com/5DAYci2.jpg",
          saldo: "R$ 56,20",
          type: "Pontos",
        },
        {
          id: 35556,
          name: "Grego japan",
          category: "japan",
          img: "https://i.imgur.com/2at3nPH.jpg",
          saldo: "R$ 152,00",
          type: "Dinheiro",
        },
        {
          id: 35557,
          name: "yuri japan",
          category: "japan",
          img: "https://i.imgur.com/2at3nPH.jpg",
          saldo: "R$ 300,00",
          type: "Pontos",
        },
        {
          id: 35558,
          name: "yuri japan",
          category: "japan",
          img: "https://i.imgur.com/2at3nPH.jpg",
          saldo: "40000 pontos",
          type: "Pontos",
        },
        {
          id: 35558,
          name: "yuri japan",
          category: "japan",
          img: "https://i.imgur.com/2at3nPH.jpg",
          saldo: "R$ 512,00",
          type: "Dinheiro",
        },
      ],
    };
  },
};
</script>

<style>
.menu-item {
  color: white !important;
}
.mix-point {
  width: 100%;
  background: transparent;
  padding: 10px 15px;
  border-radius: 5px;
  background: #ff5291;
  font-family: Montserrat;
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  color: white;
}
.title-company-cash {
  font-family: Montserrat;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  text-align: left;
  color: #3c3a41;
}
.cash-label-point {
  width: 100%;
  height: 30px;
  border-radius: 5px;
  background: #ff5291;
  font-family: Montserrat;
}
.cash-label-percentage {
  width: 100%;
  height: 30px;
  border-radius: 5px;
  background: #00c996;
  font-family: Montserrat;
}
.cash-value {
  font-weight: bold;
  font-size: 14px;
  margin: auto 15px;
  color: #f5f5f5;
}

.cash-label-return {
  width: 100%;
  height: 30px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #ffa602;
}
.cash-value-return {
  font-size: 14px;
  margin: auto 15px;
  color: #ffa602;
}
</style>
