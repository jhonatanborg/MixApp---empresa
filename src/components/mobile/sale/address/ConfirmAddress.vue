<template>
  <div class="fill-height">
    <div class="pa-5">
      <v-row justify="center" align="center">
        <v-col cols="auto">
          <div>
            <v-img width="100" src="../assets/images/info-address.svg"></v-img>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="title-info-address">
            <span>Acompanhe seu pedido</span>
          </div>
          <div class="details-info-address">
            <span>O seu endereço abaixo é o correto para entrega?</span>
          </div>
        </v-col>
        <v-col cols="auto">
          <div>
            <span class="info-address">
              {{ address.street }}, {{ address.number }} -
              {{ address.district }}

              {{ address.complement }}</span
            >
          </div>
        </v-col>
        <v-col cols="12">
          <v-btn
            x-large
            block
            @click="confirmAddress()"
            color="#5530E5"
            depressed
            dark
            ><b>Confirmar endereço</b></v-btn
          >
        </v-col>
        <v-col>
          <v-btn x-large block color="primary" @click="addressEdit" outlined
            ><b>Não é meu endereço!</b></v-btn
          >
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins.js";

export default {
  mixins: [mixins],
  computed: {
    address() {
      return this.$store.state.user.address;
    },
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
  },
  methods: {
    addressEdit() {
      this.$store.commit("cart/mobileStep", 7);
    },
    confirmAddress() {
      this.$store.commit("cart/setType", "online");
      this.$store.commit("cart/mobileStep", 3);
    },
  },
};
</script>

<style>
.title-info-address {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  /* identical to box height */
  text-align: center;
  margin: 15px;
  color: #2d2c2c;
}
.details-info-address {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 17px;
  text-align: center;
  color: #2d2c2c;
}
.info-address {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color: #2d2c2c;
}
</style>
