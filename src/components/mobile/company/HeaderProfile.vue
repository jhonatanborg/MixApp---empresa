<template>
  <div>
    <v-img
      height="200px"
      :aspect-ratio="16 / 9"
      :src="$store.state.server + company.capa"
    >
      <v-row justify="center" align="center">
        <v-card tile flat class="white mt-9 pa-2 fill-height">
          <v-avatar size="120px">
            <v-img
              rounded="3"
              aspect-ratio="1.1"
              :src="$store.state.server + company.logo"
            ></v-img>
          </v-avatar>
        </v-card>
      </v-row>
    </v-img>
    <div class="my-5 px-5">
      <div class=" my-3 ">
        <div class="item-title-company">
          <span v-text="company.name"></span>
        </div>
        <div>
          <span
            :class="company.opened === 'S' ? 'green--text' : 'red--text'"
            v-text="company.opened === 'S' ? 'Aberto' : 'Fechado Agora'"
          ></span>
        </div>
      </div>
      <v-row justify="start" dense>
        <v-col cols="auto" sm="6">
          <v-chip
            v-if="company.deliveryFee && !company.deliveryFee.length"
            color="white"
          >
            <b
              class="mx-3 "
              v-text="'Entrega: ' + convertMoney(company.deliveryFee.value)"
            ></b
          ></v-chip>
        </v-col>
        <v-col cols="auto" sm="6">
          <div class="text-center">
            <v-chip @click="openAboutDialog()" outlined>
              <v-icon size="20" class="mr-1  ">mdi-information</v-icon>
              Horário de atendimento</v-chip
            >
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
    },
  },
  data() {
    return {
      filterItem: null,
    };
  },
  computed: {
    categories() {
      return this.$store.getters["company/getCategories"] || {};
    },
  },
  methods: {
    filterScroll() {
      if (this.filterItem) {
        this.$vuetify.goTo((this.selector = "#go" + this.filterItem));
      }
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

    openAboutDialog() {
      this.$store.commit("company/request", {
        state: "aboutCompany",
        data: true,
      });
    },
  },
};
</script>

<style>
.item-title-company {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  text-align: left;

  color: #2d2c2c;
}
</style>
