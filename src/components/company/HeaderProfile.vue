<template>
  <div>
    <v-img
      height="300px"
      :aspect-ratio="16 / 9"
      src="https://images.pexels.com/photos/262947/pexels-photo-262947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <v-card
        tile
        flat
        class="white pa-6 my-7"
        max-width="750px"
        max-height="250px"
      >
        <v-row>
          <v-col cols="12" sm="3"
            ><v-card flat>
              <v-img
                aspect-ratio="1.1"
                width="400px"
                :src="$store.state.server + company.logo"
              >
                <!-- src="https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2f2019%2f02%2f28%2f17%2fLogo-253716_341712_173106804_1653267716.jpg" -->
              </v-img></v-card
            ></v-col
          >
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
                    Mais informações</v-chip
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
