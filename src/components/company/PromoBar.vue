<template>
  <div>
    <v-row v-for="(promo, key) in promotions" :key="key">
      <v-col cols="12">
        <div>
          <span class="white--text">{{ promo.title }}</span>
        </div>
        <div>
          <small class="white--text">{{ promo.description }}</small>
        </div>
        <v-row>
          <v-col
            v-for="(product, key) in promo.productsPromotion"
            :key="key"
            cols="12"
            sm="4"
          >
            <ProductPromo class="ma-2" :product="product" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductPromo from "@/components/company/product/ProductPromo";

export default {
  props: {
    products: Array,
  },
  components: {
    ProductPromo,
  },
  computed: {
    promotions() {
      return this.$store.getters["company/getCompany"].promotions || {};
    },
  },
  data() {
    return {
      model: null,
    };
  },
};
</script>

<style></style>
