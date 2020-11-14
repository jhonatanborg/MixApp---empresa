<template>
  <v-row align="center" justify="center">
    <v-card flat class="pa-5">
      <v-row justify="center" align="center">
        <v-col cols="auto" sm="4">
          <v-img width="200px" src="https://i.imgur.com/bpzSVXr.png"></v-img>
        </v-col>
        <v-col cols="12">
          <div>
            <h2 class="title-message-error">
              Ops! Temos um problema
            </h2>
            <div class="details-message-error ">
              <span> {{ $store.state.cart.sidebar.message }}</span>
            </div>
            <v-row>
              <v-col cols="12">
                <v-btn
                  @click="deleteSale()"
                  large
                  depressed
                  block
                  color="#ffa602"
                  >Tentar fazer outro pedido
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  @click="openDialogAddress()"
                  large
                  depressed
                  block
                  color="primary"
                  >Trocar meu endereço
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  methods: {
    deleteSale() {
      const payload = {
        idb: {
          table: "sale",
        },
        method: "deleteAll",
      };
      this.$store.dispatch("cart/request", payload);
      this.$store.dispatch("cart/request", {
        state: "saleIdb",
        method: "getAll",
        idb: {
          table: "sale",
        },
      });
      this.$store.commit("cart/request", {
        state: "errorSale",
        data: {
          value: false,
          message: null,
        },
      });
    },
    openDialogAddress() {
      this.$store.commit("alertAddress", { value: true });
      if (localStorage.getItem("acess-token")) {
        this.$store.commit("user/request", { state: "addressTabs", data: 4 });
      } else {
        this.$store.commit("user/request", { state: "addressTabs", data: 1 });
      }
    },
  },
};
</script>

<style></style>
