<template>
  <div class="product">
    <v-card link flat color="white">
      <v-list-item three-line>
        <v-list-item-avatar tile size="150">
          <v-img
            width="50"
            aspect-ratio="1.1"
            src="https://static1.conquistesuavida.com.br/articles//8/10/47/8/@/28952-frutas-como-banana-morango-kiwi-e-mang-article_block_media_large-2.jpg"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="title-product"
            v-text="product.product.name"
          >
          </v-list-item-title>
          <v-list-item-subtitle v-text="product.product.description">
          </v-list-item-subtitle>
          <v-list-item-action left class="pa-0 ma-0">
            <v-list-item-action-text class="pa-0 ma-0">
              <v-chip color="#00c996" text-color="white" dark>
                <b
                  class=" mx-2"
                  v-text="convertMoney(product.product.sale_value)"
                >
                </b> </v-chip
            ></v-list-item-action-text>
          </v-list-item-action>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    product: Object,
  },
  computed: {
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
  },
  methods: {
    convertMoney(money) {
      const toCurrency = (n, curr, LanguageFormat = undefined) =>
        Intl.NumberFormat(LanguageFormat, {
          style: "currency",
          currency: curr,
        }).format(n);
      return toCurrency(money, "BRL");
    },
  },
};
</script>

<style>
.title-product {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 15px;
  text-align: left;
  text-transform: uppercase;
}
</style>
