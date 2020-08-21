<template>
  <div>
    <v-card flat class="py-5">
      <v-row class="col-sm-12 mx-auto">
        <v-col cols="10" sm="4">
          <div>
            <span class="display-2">
              <b>Mix</b>
            </span>
            <h3>comida boa em casa</h3>
          </div>
          <v-row class="align-center">
            <v-col cols="auto">
              <div>
                <h3>Disponivel em:</h3>
                <div>
                  <GooglePlay />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="8">
          <v-row justify="start">
            <v-col sm="6" v-for="item in about" :key="item.id">
              <router-link :to="{ params: { type: item.name } }">
                {{ item.name }}
              </router-link>
            </v-col>

            <v-col sm="6" v-for="item in helps" :key="item.id">
              <router-link :to="{ params: { type: item.name } }">
                {{ item.name }}
              </router-link>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="col-sm-12 my-0 py-0 mx-auto">
        <v-divider></v-divider>
      </div>
      <v-layout column align-content-center>
        <v-col cols="auto" sm="2">
          <span> &copy;Vedas Sistemas - 2020</span>
        </v-col>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import GooglePlay from "@/components/images/GooglePlay";

export default {
  name: "Footer",
  props: {
    categories: Array,
  },
  components: {
    GooglePlay,
  },
  data() {
    return {
      about: [
        {
          id: 5,
          name: "Fale Conosco",
          route: "/",
        },
        {
          id: 6,
          name: "Cashbacks",
          route: "/",
        },
        {
          id: 7,
          name: "Nosso blog",
          route: "/",
        },
        {
          id: 9,
          name: "Adicione sua empresa",
          route: "/",
        },
      ],
      helps: [
        {
          id: 1,
          name: "Perguntas frequentes",
          route: "/",
        },
        {
          id: 2,
          name: "Todas as cidades",
          route: "/",
        },
        {
          id: 3,
          name: "Restaurantes perto de mim",
          route: "/",
        },
        {
          id: 4,
          name: "Termos e condições",
          route: "/",
        },
      ],
    };
  },
};
</script>

<style>
ul li {
  list-style: none;
}
li {
  margin-top: 10px;
}
.category-footer a:hover {
  display: block !important;
  color: #ef354e;
  text-decoration: none;
  position: relative;
}
.category-footer a {
  color: grey !important;
  text-decoration: none;
}
</style>
