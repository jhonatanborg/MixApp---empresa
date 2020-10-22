<template>
  <div>
    <v-img
      class="d-flex align-center "
      height="300px"
      :aspect-ratio="16 / 9"
      :src="$store.state.server + company.capa"
    >
      <v-card
        tile
        flat
        class="white pa-1 "
        max-width="600px"
        max-height="250px"
      >
        <v-row>
          <v-col cols="12" sm="3"
            ><v-card flat>
              <v-img
                aspect-ratio="1.1"
                :src="$store.state.server + company.logo"
              >
              </v-img></v-card
          ></v-col>
          <v-col>
            <div class="details">
              <div class="title-company-header">
                <span v-text="company.name"></span>
              </div>
              <div class="category">
                <span v-text="company.primaryCategory.name"> </span>
                <v-icon x-small class="mx-3">mdi-circle</v-icon>
                <span
                  v-if="company.deliveryFee && !company.deliveryFee.length"
                  v-text="company.deliveryFee.delivery_max_time + ' min'"
                >
                </span>

                <div v-if="company.distance">
                  <span v-text="company.distance"></span> <span>KM</span>
                </div>
              </div>
              <v-row>
                <v-col cols="auto"
                  ><v-chip
                    v-text="company.opened === 'S' ? 'Aberto' : 'Fechado Agora'"
                    :color="company.opened === 'S' ? 'success' : 'error'"
                  >
                  </v-chip
                ></v-col>
                <v-col
                  v-if="company.deliveryFee && !company.deliveryFee.length"
                  cols="auto"
                  ><v-chip outlined color="green"
                    >Entrega:
                    <b
                      class="mx-3 green--text"
                      v-text="convertMoney(company.deliveryFee.value)"
                    ></b></v-chip
                ></v-col>
                <v-col cols="auto"
                  ><v-chip @click="openAboutDialog()" outlined>
                    <v-icon size="20" class="mr-1  ">mdi-information</v-icon>
                    Sobre</v-chip
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
</style>
