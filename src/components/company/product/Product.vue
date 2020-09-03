<template>
  <div class="product">
    <v-card flat>
      <v-list-item three-line>
        <v-list-item-avatar tile size="100">
          <v-img
            width="50"
            aspect-ratio="1.1"
            :src="$store.state.server + product.img"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title-product" v-text="product.name">
          </v-list-item-title>
          <v-list-item-subtitle v-text="product.description">
          </v-list-item-subtitle>
          <span v-text="product.sale_value"> </span>

          <div v-if="company.cashback_type">
            <span v-if="product.cashback_cost > 0" class="mx-2"
              >ou <b class="mr-2" v-text="product.cashback_cost"></b
              >{{ company.cashback_type }}</span
            >
          </div>
          <v-list-item-subtitle
            v-if="product.cashbackReturn > 0"
            class="my-0 py-0"
          >
            <v-chip dense color="#00c996" text-color="white" dark>
              Ganhe
              <b class=" mx-2" v-text="product.cashback_return"> </b
              >{{ company.cashback_type }}
            </v-chip></v-list-item-subtitle
          >
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
};
</script>

<style>
.title-product {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 15px;
  text-align: left;
  color: #000;
  text-transform: uppercase;
}
</style>
