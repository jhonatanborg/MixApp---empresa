<template>
  <div class="product">
    <v-card link flat class="pa-3">
      <div class="d-flex">
        <v-avatar tile size="100">
          <img
            aspect-ratio="1.1"
            :src="$store.state.server + product.img"
            alt="Imagem do produto"
          />
        </v-avatar>
        <div class="ml-3 ">
          <div class="title-product">
            <span v-text="product.name"></span>
          </div>
          <div class="details-product">
            <span v-text="product.description"></span>
          </div>
          <div class="mt-1 font-weight-bold">
            <span v-text="convertMoney(product.sale_value)"> </span>
          </div>
        </div>
      </div>
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
        return "";
      }
    },
  },
};
</script>

<style>
.details-product {
  font-size: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
