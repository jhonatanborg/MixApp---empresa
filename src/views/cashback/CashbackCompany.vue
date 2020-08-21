<template>
  <div class="grey lighten-5">
    <div>
      <v-row class="col-sm-12">
        <v-col cols="auto" sm="3">
          <v-card flat>
            <v-card-text>
              <v-img
                class="pa-5"
                width="100%"
                height="200"
                src="https://static-images.ifood.com.br/image/upload//logosgde/d694d639-1068-4123-bdfe-7f5052a112c7/202003212104_nuds_i.jpg"
              >
              </v-img>
            </v-card-text>

            <v-card-actions>
              <h4>
                Burger Rio
              </h4>
              <v-spacer></v-spacer>
              <v-chip class="ma-2" color="success lighten-4">
                <b class="green--text">250 pontos</b>
              </v-chip>
            </v-card-actions>
          </v-card>
          <v-list class="grey lighten-5" nav>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="{ name: item.route, params: { id: '1656546165' } }"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="auto" sm="7">
          <v-row>
            <v-col cols="auto " sm="4">
              <v-card color="warning lighten-2" class="pa-5 " flat>
                <div>
                  <h1>150</h1>
                  <h4>Pontos</h4>
                </div>
              </v-card>
            </v-col>
            <v-col cols="auto " sm="8">
              <v-card color="warning lighten-2" class="pa-5 " flat>
                <div>
                  <h1>2540</h1>
                  <h4>compras</h4>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <div>
            <v-row>
              <v-col cols="auto" sm="12">
                <router-view></router-view>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="auto" sm="2">
          <v-card height="400px" flat class="mx-auto">
            <v-img
              width="100%"
              height="100%"
              aspect-ratio="1.7"
              class="align-end"
              src="@/assets/images/intro.png"
            >
              <v-card-text>
                <v-chip title color="white">
                  <b>Mix</b>
                </v-chip>
                <div class="my-3">
                  <p>Seus restaurantes favoritos na sua casa</p>
                </div>
                <v-btn dark block depressed color="black">
                  Descubra
                </v-btn>
              </v-card-text>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <CashDetails @cash="openDetails" :cashbackDetails="cashDialog" />
    </div>
  </div>
</template>

<script>
import CashDetails from "@/components/cashback/CashbackDetails.vue";
export default {
  components: {
    CashDetails,
  },
  data: () => ({
    item: 0,

    cashDialog: false,
    items: [
      { text: "Home", icon: "mdi-folder", route: "wallet-intro" },
      {
        text: "Histórico",
        icon: "mdi-account-multiple",
        route: "historic-cash",
      },
      { text: "Cashbacks usados", icon: "mdi-star", route: "cash-used" },
      { text: "Sobre a empresa", icon: "mdi-star", route: "about" },
    ],
  }),
  methods: {
    openDetails() {
      console.log("coco");
    },
  },
};
</script>

<style>
.v-btn::before {
  background-color: transparent;
}
.v-btn i:hover {
  transform: scale(1.15);
}
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}

.repeating-gradient {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 196, 0, 0.25),
    rgb(255, 174, 0) 5px,
    rgb(0, 0, 255) 5px,
    rgba(0, 0, 255, 0.25) 10px
  );
}
</style>
