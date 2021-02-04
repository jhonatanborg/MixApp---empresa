<template>
  <div class="product">
    <v-card link flat color="white">
      <v-list-item three-line>
        <v-list-item-avatar tile size="100">
          <v-img
            aspect-ratio="1.1"
            :src="$store.state.server + product.product.img"
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
                  v-text="convertMoney(product.product.promo_value)"
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
import mixin from "@/mixins/mixins.js";

export default {
  mixins: [mixin],

  props: {
    product: Object,
  },
  computed: {
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
  },
};
</script>

<style>
.title-product {
  font-weight: 600;
  font-size: 12px;
  text-align: left;
  text-transform: uppercase;
}
</style>
