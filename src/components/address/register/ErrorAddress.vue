<template>
  <div class="">
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
          <span>
            <b>{{ company.name }}</b> não realiza entrega nesse endereço!
          </span>
        </div>
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="deleteSale()"
              dark
              large
              depressed
              block
              color="#765eda"
              >Limpar Sacola
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn
              @click="$emit('return-list', 3)"
              color="#765eda"
              text
              large
              depressed
              block
              >Alterar Endereço</v-btn
            ></v-col
          >
        </v-row>
      </div>
    </v-col>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    company() {
      return this.$store.state.cart.saleCompany;
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
      this.$store.commit("alertAddress", { value: false, route: "home" });
      this.$store.commit("showAlert", false, { root: true });
    },
  },
};
</script>

<style>
.image {
  width: 60.05px;
  height: 60.05px;
  background: transparent;
}
.title-message-error {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: #765eda;
}
.details-message-error {
  font-family: Montserrat;
  font-size: 16px;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: center;
  color: #3c3a41;
}
</style>
