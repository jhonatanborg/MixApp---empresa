<template>
  <div class="grey lighten-4 col-xl-8 mx-auto">
    <MenuBar />
    <v-container fluid>
      <v-row>
        <v-col sm="6">
          <router-view />
        </v-col>
        <v-col sm="6">
          <v-card class="pa-5 mb-3">
            <div>
              <v-row justify="space-between" align="center">
                <v-col cols="auto">
                  <span class="home-title">Seus cashcbacks</span>
                </v-col>
                <v-col cols="auto">
                  <v-btn outlined color="primary" dark>Como funciona?</v-btn>
                </v-col>
              </v-row>
            </div>
            <v-row>
              <v-col cols="auto" sm="6">
                <v-alert dense border="left" color="#FF5291" outlined dark>
                  <v-row>
                    <v-col cols="auto" sm="3">
                      <PointIcon :color="'#FF5291'" />
                    </v-col>
                    <v-col cols="auto">
                      <small>Pontuação geral</small> <br />
                      <h3>587852 <b>pontos</b></h3>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-col>
              <v-col cols="auto" sm="6">
                <v-alert dense border="left" color="#00c996" outlined dark>
                  <v-row>
                    <v-col cols="auto" sm="3">
                      <CoinIcon :color="'#00c996'" />
                    </v-col>
                    <v-col cols="auto">
                      <small>Pontuação geral</small> <br />
                      <h3>587852 <b>pontos</b></h3>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-col>
            </v-row>

            <v-row align="center" justify="space-between">
              <v-col cols="12" sm="8">
                <h3 class="title-cash-banner">
                  Pague suas compras com cashback Mix On
                </h3>
                <span class="details-cash-banner "
                  >O Mix On é o maior programa de cashback do Brasil. Te
                  devolvemos em dinheiro ou em pontos parte do valor das suas
                  compras
                </span>
                <div class="my-3">
                  <v-btn depressed dark color="#FF5291">Veja com ganhar</v-btn>
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <v-img
                  aspect-ratio="1.1"
                  src="https://i.imgur.com/veBrDhy.png"
                ></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MenuBar from "@/components/shared/MenuBar.vue";
import CoinIcon from "@/components/cashback/assets/CoinIcon.vue";
import PointIcon from "@/components/cashback/assets/PointIcon.vue";

export default {
  components: {
    MenuBar,
    CoinIcon,
    PointIcon,
  },
};
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
.home-title {
  font-family: Montserrat;
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  color: #3c3a41;
}
.details-cash-banner {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 12px;
  text-align: left;
  color: #808080;
}
.title-cash-banner {
  font-family: Montserrat;
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  color: #ffa602;
}
</style>
