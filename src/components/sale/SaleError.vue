<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :value="$store.state.cart.errorSale.value"
    persistent
    max-width="550px"
  >
    <v-card class="">
      <v-row justify="center">
        <v-col cols="auto">
          <v-img class="image" src="https://i.imgur.com/bpzSVXr.png"></v-img>
        </v-col>
      </v-row>
      <v-col cols="auto">
        <div class="col-sm-8 mx-auto">
          <h2 class="title-message-error">
            Ops! Temos um problema
          </h2>
          <div class="details-message-error ">
            <span> {{ $store.state.cart.errorSale.message }}</span>
          </div>
          <v-row>
            <v-col cols="12">
              <v-btn
                @click="deleteSale()"
                dark
                large
                depressed
                block
                color="#FFBA0A"
                >Tentar fazer outro pedido
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-card>
  </v-dialog>
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
  },
};
</script>

<style></style>
