<template>
  <div class="pa-5">
    <v-row>
      <v-col class="py-0" sm="4">
        <v-text-field
          hide-details
          clearable
          color="#765eda"
          outlined
          dense
          label="Número"
          v-model="address.number"
        ></v-text-field>
      </v-col>
      <v-col class="py-0" cols="6" sm="8">
        <v-text-field
          clearable
          hide-details
          color="#765eda"
          outlined
          dense
          :rules="ruleTitle"
          :error="error"
          v-model="title"
          label="Título"
          placeholder="Ex: Casa"
        ></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12">
        <v-text-field
          clearable
          hide-details
          color="#765eda"
          outlined
          dense
          v-model="complement"
          label="Complemento"
          placeholder="Ex: Ao lado da mercearia do jão"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn @click="$emit('return-map', 2)" outlined color="error"
          >Voltar</v-btn
        >
      </v-col>
      <v-col cols="12" sm="8">
        <v-btn @click="updateLocalAddress" dark block color="#765eda"
          >Confirmar</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      complement: null,
      title: null,
      error: false,
      ruleTitle: [(v) => !!v || "Digite um título"],
    };
  },
  computed: {
    address() {
      return this.$store.state.user.address;
    },
    user() {
      return this.$store.state.user.userProfile;
    },
    coords() {
      return this.$store.state.user.address
        ? {
            lat: this.$store.state.user.address.latitude,
            lng: this.$store.state.user.address.longitude,
          }
        : null;
    },
  },
  methods: {
    updateLocalAddress() {
      this.address.complement = this.complement;
      if (this.title) {
        this.address.title = this.title;
        this.$store.commit("user/request", {
          state: "address",
          data: this.address,
        });
        const payload = {
          state: "company",
          method: "get",
          url: `/company-show/${process.env.VUE_APP_DOMAIN},${this.address.latitude},${this.address.longitude}`,
          insert: true,
        };
        let location = {
          latitude: this.address.latitude,
          longitude: this.address.longitude,
        };
        this.$store.dispatch("company/request", payload);
        localStorage.setItem("geolocation", JSON.stringify(location));
        this.$store.commit("alertAddress", { value: false });
        if (localStorage.getItem("acess-token")) {
          this.registerAddress(this.address);
        }
      } else {
        this.error = true;
      }
    },
    registerAddress(address) {
      if (this.address.number) {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/address/`,
          headers: null || {
            Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
          },
          data: address,
        })
          .then((resp) => {
            this.$store.commit("user/setUser", resp.data);
          })
          .catch(() => {});
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style></style>
