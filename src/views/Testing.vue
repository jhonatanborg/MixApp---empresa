<template>
  <div class="grey lighten-5">
    <MenuBar />
    <div class="">
      <v-container class="grey lighten-5 col-md-10 mx-auto">
        <v-row>
          <v-col cols="12" sm="2"
            ><v-card flat>
              <v-img
                width="100%"
                aspect-ratio="1.1"
                src="https://thumbs.dreamstime.com/z/sushi-logo-fish-food-japan-restaurant-japanese-seafood-logo-asian-dinner-sushi-logo-fish-food-japan-restaurant-japanese-seafood-138271712.jpg"
              ></v-img></v-card
          ></v-col>
          <v-col>
            <div class="details">
              <div class="title-company">
                <span>Top Burguer</span>
              </div>
              <div class="category">
                <span
                  >Lanches & Pizzas
                  <v-icon x-small>mdi-circle</v-icon> 4km</span
                >
              </div>
              <v-row>
                <v-col cols="auto"
                  ><v-chip outlined color="dark">
                    Tempo de espera: <b class="mx-3">45 min</b>
                  </v-chip></v-col
                >
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
      </v-container>
    </div>
    <v-container class="grey lighten-5 col-md-10 mx-auto">
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <v-chip class="pa-5" large text-color="white" color="#FFBA0A">
            <span class="mr-4">Mix on |</span>
            <span>seu saldo:</span>
            <b class="mx-3">120 pontos</b></v-chip
          >
        </v-col>

        <v-col class="my-0 py-0" cols="auto" sm="3">
          <v-overflow-btn
            dense
            hide-details
            class="my-0 py-0"
            color="#FFBA0A"
            item-text="name"
            item-value="id"
            label="Relevância"
            target="#dropdown-example"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <div class="my-3">
        <div>
          <span class="title-category">Destaques</span>
        </div>
        <v-row>
          <v-col cols="auto" sm="6" v-for="n in 14" :key="n">
            <v-card flat>
              <v-list-item three-line>
                <v-list-item-avatar tile size="130">
                  <v-img
                    width="80"
                    aspect-ratio="1.1"
                    src="https://images.pexels.com/photos/105588/pexels-photo-105588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <b> Medalhão de frango</b>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Arroz, feijão, vinagrete, tropeiro, fritas e
                    medalhão</v-list-item-subtitle
                  >
                  <div>
                    <span> R$ 13,00 ou <b>120 pontos</b> </span>
                  </div>
                  <v-list-item-subtitle class="my-0 py-0">
                    <v-chip dense color="#A8FFB9" text-color="black" dark>
                      <b> Ganhe 15 pontos </b>
                    </v-chip></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import MenuBar from "@/components/shared/MenuBar";

export default {
  components: {
    MenuBar,
  },
};
</script>

<style>
.title-company {
  font-weight: normal;
  font-size: 34px;
  text-align: left;
  color: #111;
}
.category {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 15px;
  text-align: left;
  color: #000;
}
.address {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 15px;
  text-align: left;
  color: #000;
}

.mix {
  font-family: Montserrat;
  font-weight: bold;
  font-size: 23px;
  text-align: left;
  color: #fff;
}
</style>
