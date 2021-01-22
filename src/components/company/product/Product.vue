<template>
  <div class="product">
    <v-card link flat class="pa-3">
      <div class="d-flex">
        <v-avatar tile size="120">
          <img
            :aspect-ratio="16 / 9"
            :src="$store.state.server + product.img"
            alt="alt"
          />
        </v-avatar>
        <div class="ml-3 ">
          <div>
            <span v-text="product.name"></span>
          </div>
          <div class="details-product my-3">
            <span v-text="product.description"></span>
          </div>
          <div class="mt-3 font-weight-bold">
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
}
</style>
