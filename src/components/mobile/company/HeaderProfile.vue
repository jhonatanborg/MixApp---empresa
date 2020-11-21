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
    <div class="my-5">
      <div class="item-title-company my-3">
        <span v-text="company.name"></span>
      </div>

      <div class="d-flex justify-center align-center">
        <v-chip
          class="mr-3"
          v-text="company.opened === 'S' ? 'Aberto' : ' Fechado'"
          :color="company.opened === 'S' ? 'success' : 'error'"
        >
        </v-chip>
        <v-chip
          v-if="company.deliveryFee && !company.deliveryFee.length"
          color="white"
        >
          <b
            class="mx-3 "
            v-text="'Entrega: ' + convertMoney(company.deliveryFee.value)"
          ></b
        ></v-chip>
      </div>
    </div>

    <v-container>
      <v-row justify-sm="center">
        <v-col sm="auto">
          <v-overflow-btn
            dense
            hide-details
            class="my-0 py-0"
            color="#FFBA0A"
            @change="filterScroll()"
            v-model="filterItem"
            :items="categories"
            item-text="name"
            item-value="id"
            label="Relevância"
            target="#dropdown-example"
          ></v-overflow-btn>
        </v-col>
      </v-row>
    </v-container>
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
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  text-align: center;

  color: #2d2c2c;
}
</style>
