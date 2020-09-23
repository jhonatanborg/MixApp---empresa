<template>
  <div>
    <v-img
      height="300px"
      :aspect-ratio="16 / 9"
      src="http://www.shoppingbalneario.com.br/wp-content/uploads/2020/01/acai.jpg"
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
                src="https://scontent.fcgb1-1.fna.fbcdn.net/v/t1.0-9/20799930_1574456292577856_3034606225261362567_n.png?_nc_cat=107&_nc_sid=85a577&_nc_ohc=94JCmYb-6eIAX9OFD3X&_nc_ht=scontent.fcgb1-1.fna&oh=a7f22d34c9ae509badbf22f05b84ee8c&oe=5F930D89"
              >
                <!-- :src="$store.state.server + company.logo" -->
              </v-img></v-card
            ></v-col
          >
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
.title-company {
  font-weight: normal;
  font-size: 34px;
  text-align: left;
  color: #111;
  text-transform: capitalize;
}
</style>
