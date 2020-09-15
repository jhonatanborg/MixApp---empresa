<template>
  <div class="product">
    <v-card flat color="white">
      <v-list-item three-line>
        <v-list-item-avatar tile size="150">
          <v-img
            width="50"
            aspect-ratio="1.1"
            src="https://images.rappi.com.br/products/product-1597354596131.png?d=400x400&e=webp"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title-product" v-text="product.name">
          </v-list-item-title>
          <v-list-item-subtitle v-text="product.description">
          </v-list-item-subtitle>
          <v-btn depressed color="white darken-3">
            <span
              class="text--black"
              v-text="'Comprar ' + convertMoney(product.sale_value)"
            >
            </span>
          </v-btn>
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
.title-product {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 15px;
  text-align: left;
  text-transform: uppercase;
}
</style>
