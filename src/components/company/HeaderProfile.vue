<template>
  <div>
    <v-img
      class="d-flex align-center "
      :aspect-ratio="16 / 9"
      height="400px"
      :src="$store.state.server + company.capa"
    >
      <v-card
        tile
        flat
        class="white pa-1 "
        max-width="700px"
        max-height="250px"
      >
        <v-row justify="center" align="center">
          <v-col cols="12" sm="4"
            ><v-card flat>
              <v-img
                aspect-ratio="1.1"
                :src="$store.state.server + company.logo"
              >
              </v-img></v-card
          ></v-col>
          <v-col>
            <div class="details ">
              <div class="d-flex align-center">
                <div class="title-company-header">
                  <span v-text="company.name"></span>
                </div>
                <div class="mx-3 item-status">
                  <span
                    :class="
                      company.opened === 'S' ? 'green--text' : 'red--text'
                    "
                    v-text="company.opened === 'S' ? 'Aberto' : 'Fechado Agora'"
                  ></span>
                </div>
              </div>
              <div class="item-title-details-company d-flex">
                <div>
                  <span v-text="company.primaryCategory.name"> </span>
                </div>
                <div v-if="company.distance">
                  <v-icon x-small class="mx-3">mdi-circle</v-icon>
                  <span v-text="company.distance"></span> <span>KM</span>
                </div>
              </div>
              <v-row align="center" justify="start">
                <v-col
                  cols="auto"
                  v-if="company.deliveryFee && !company.deliveryFee.length"
                >
                  <div class="item-title-details-company">
                    <span>Tempo de Espera</span>
                  </div>
                  <div>
                    <span
                      v-text="company.deliveryFee.delivery_max_time + ' min'"
                    >
                    </span>
                  </div>
                </v-col>
                <v-col
                  v-if="company.deliveryFee && !company.deliveryFee.length"
                  cols="auto"
                >
                  <div class="item-title-details-company">
                    <span>Taxa de Entrega</span>
                  </div>
                  <div>
                    <span
                      class="green--text"
                      v-text="convertMoney(company.deliveryFee.value)"
                    >
                    </span>
                  </div>
                </v-col>
                <v-col v-if="company.min_purchase_value" cols="auto">
                  <div class="item-title-details-company">
                    <span>Pedido minimo</span>
                  </div>
                  <div>
                    <span v-text="convertMoney(company.min_purchase_value)">
                    </span></div
                ></v-col>
                <v-col cols="12"
                  ><v-chip @click="openAboutDialog()" outlined>
                    <v-icon size="20" class="mr-1  ">mdi-information</v-icon>
                    + informações</v-chip
                  ></v-col
                >
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-img>
  </div>
</template>

<script>
export default {
  props: {
    company: Object,
  },
  methods: {
    openAboutDialog() {
      this.$store.commit("company/request", {
        state: "aboutCompany",
        data: true,
      });
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
.title-company-header {
  font-weight: normal;
  font-size: 20px;
  text-align: left;
  color: #111;
  text-transform: initial;
}
.item-status {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
}
.item-title-details-company {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 27px;
  color: 35363a, 100%;
}
</style>
