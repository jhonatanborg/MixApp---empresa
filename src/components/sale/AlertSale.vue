<template>
  <div>
    <v-dialog
      @click:outside="$store.commit('showAlert', false, { root: true })"
      v-model="alertSale"
      max-width="380px"
    >
      <v-card class="pa-5">
        <div class="text-center my-3">
          <h3 class="text-justify">
            Sua sacola já esta com produtos de outra empresa, esvazie para
            continuar
          </h3>
        </div>

        <v-btn large @click="deleteSale()" color="primary" block
          >Esvaziar sacola</v-btn
        >
        <v-btn
          large
          @click="$store.commit('showAlert', false, { root: true })"
          class="my-3"
          block
          color="error"
          outlined
          >Cancelar</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  computed: {
    alertSale() {
      return this.$store.state.alertSale;
    },
  },
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
      this.$store.commit("showAlert", false, { root: true });
    },
  },
};
</script>

<style></style>
