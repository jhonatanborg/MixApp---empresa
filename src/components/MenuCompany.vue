<template>
  <v-col cols="12" sm="2">
    <div style="position: fixed">
      <v-alert class="px-5" color="white">
        Restaurantes > Massas
      </v-alert>
      <v-alert class="px-5" color="white">
        <b> {{ companyName }}</b>
      </v-alert>
      <v-card class="px-5 col-sm-12" flat>
        <v-list>
          <v-list-item v-for="item in categories" :key="item" color="#765eda">
            {{ item }}
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "MenuCompany",
  props: {
    companyName: String,
    categories: Array,
  },
};
</script>

<style></style>
