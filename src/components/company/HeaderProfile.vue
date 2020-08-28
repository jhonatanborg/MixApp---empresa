<template>
  <v-row class="white pa-5">
    <v-col cols="12" sm="2"
      ><v-card flat>
        <v-img
          sizes="109"
          width="100%"
          aspect-ratio="1.1"
          :src="company.logo"
        ></v-img></v-card
    ></v-col>
    <v-col>
      <div class="details">
        <div class="title-company">
          <span v-text="company.name"></span>
        </div>
        <div class="category">
          <span v-text="company.primaryCategory.name"> </span>
          <v-icon x-small class="mx-3">mdi-circle</v-icon>
          <div v-if="company.distance">
            <span v-text="company.distance"></span> <span>KM</span>
          </div>
        </div>
        <v-row>
          <v-col cols="auto"
            ><v-chip
              :color="company.opened === 'S' ? 'success' : 'error'"
              v-text="company.opened === 'S' ? ' Aberto' : 'Estamos Fechado '"
            >
            </v-chip
          ></v-col>
          <v-col v-if="company.deliveryFee" cols="auto"
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
              Mais informações</v-chip
            ></v-col
          >
        </v-row>
      </div>
    </v-col>
  </v-row>
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
.title-company {
  font-weight: normal;
  font-size: 34px;
  text-align: left;
  color: #111;
  text-transform: capitalize;
}
</style>
