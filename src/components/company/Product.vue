<template>
  <div class="product">
    <v-card flat>
      <v-list-item three-line>
        <v-list-item-avatar tile size="100">
          <v-img
            width="50"
            aspect-ratio="1.1"
            :src="'http://192.168.0.2:3333' + img"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title-product" v-text="title">
          </v-list-item-title>
          <v-list-item-subtitle v-text="details"> </v-list-item-subtitle>
          <div>
            <span v-text="value"> </span>
            <span v-if="cashback_cost > 0" class="mx-2"
              >ou <b class="mr-2" v-text="cashback_cost"></b>pontos</span
            >
          </div>
          <v-list-item-subtitle v-if="cashbackReturn > 0" class="my-0 py-0">
            <v-chip dense color="#00c996" text-color="white" dark>
              Ganhe <b class=" mx-2" v-text="cashbackReturn"> </b>pontos
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
    title: String,
    details: String,
    value: String,
    img: String,
    item: String,
    gridSize: String,
    action: {
      type: Function,
    },
    cashbackReturn: Number,
    cashback_cost: Number,
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
