<template>
  <div>
    <v-img
      height="150px"
      :aspect-ratio="16 / 9"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      src="https://images.pexels.com/photos/262947/pexels-photo-262947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <v-card
        tile
        flat
        class="transparent  white--text"
        max-width="100%"
        max-height="150px"
      >
        <v-list-item three-line>
          <v-list-item-avatar tile rounded="3" size="110">
            <v-img
              aspect-ratio="1.1"
              :src="$store.state.server + company.logo"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="white--text" v-text="company.name">
            </v-list-item-title>
            <v-list-item-subtitle
              class="white--text"
              v-text="company.primaryCategory.name"
            >
            </v-list-item-subtitle>
            <v-list-item-action left class="pa-0 ma-0">
              <v-list-item-action-text class="pa-0 ma-0 white--text">
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
                  <v-icon>mdi-moped</v-icon>
                  <b
                    class="mx-3 "
                    v-text="convertMoney(company.deliveryFee.value)"
                  ></b></v-chip
              ></v-list-item-action-text>
            </v-list-item-action>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-img>
    <v-container>
      <v-row justify-sm="center">
        <v-col sm="auto">
          <v-overflow-btn
            dense
            hide-details
            class="my-0 py-0"
            color="#765eda"
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
.title-company {
  font-weight: 800;
  font-size: 16px;
  text-align: left;
  color: white;
  text-transform: initial;
}
</style>
