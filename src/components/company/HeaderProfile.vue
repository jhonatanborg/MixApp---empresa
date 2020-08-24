<template>
  <v-row v-if="company">
    <v-col cols="12" sm="2"
      ><v-card flat>
        <v-img
          width="100%"
          aspect-ratio="1.1"
          :src="company.logo"
        ></v-img></v-card
    ></v-col>
    <v-col>
      <div class="details">
        <div class="title-company">
          <span v-text="company.name"></span>
        </div>
        <div class="category">
          <span> Massas</span>
          <v-icon x-small class="mx-3">mdi-circle</v-icon>
          <span v-text="company.distance"></span> <span>KM</span>
        </div>
        <v-row>
          <v-col cols="auto"
            ><v-chip outlined color="dark">
              Tempo de espera:
              <b class="mx-3"></b> </v-chip
          ></v-col>
          <v-col cols="auto"
            ><v-chip outlined color="green"
              >Entrega: <b class="mx-3 green--text">Grátis</b></v-chip
            ></v-col
          >
          <v-col cols="auto"
            ><v-chip outlined>
              <v-icon size="20" class="mr-1  ">mdi-information</v-icon>
              Sobre</v-chip
            ></v-col
          >
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
    },
  },
  methods: {
    // convertDistance(value) {
    //   let distance;
    //   if (value >= 1000) {
    //     distance = value / 1000;
    //   } else {
    //     distance = value;
    //   }
    //   return distance;
    // },
  },
};
</script>

<style>
.title-company {
  font-weight: normal;
  font-size: 34px;
  text-align: left;
  color: #111;
  text-transform: capitalize;
}
</style>
