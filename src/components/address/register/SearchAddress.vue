<template>
  <div class="">
    <v-row justify="start">
      <v-col cols="12" sm="9">
        <v-text-field
          color="primary"
          outlined
          dense
          hide-details
          v-model="newAddress.street"
          label="Logradouro"
          placeholder="Ex: Rua dos papiros"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          hide-details
          color="primary"
          outlined
          dense
          v-model="newAddress.number"
          label="Nº"
          placeholder="Ex: 36"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          color="primary"
          outlined
          dense
          hide-details
          v-model="newAddress.district"
          label="Bairro"
          placeholder="Ex: Residencial Sul"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          color="primary"
          outlined
          dense
          hide-details
          v-model="newAddress.cep"
          label="CEP"
          placeholder="Digite o Cep"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" class="py-0" v-if="error">
        <v-alert close type="error" dense>
          Endereço não encontrado, insira os dados corretamente
        </v-alert>
      </v-col>
    </v-row>
    <v-row dense justify="center">
      <v-col cols="12" sm="12">
        <v-btn
          @click="getAddressByString()"
          depressed
          block
          color="#FFBA0A"
          large
        >
          <v-icon>mdi-magnify</v-icon> Buscar endereço
        </v-btn>
      </v-col>
      <v-col cols="12" xs="12" sm="2" class="text-center">
        <span>
          ou
        </span>
      </v-col>
      <v-col cols="12" sm="12">
        <v-btn
          :loading="isLoading"
          @click="searchLocal()"
          block
          color="primary"
          outlined
          large
        >
          <v-icon class="mx-1">mdi-crosshairs-gps</v-icon>

          Usar localização atual</v-btn
        ></v-col
      >
    </v-row>
  </div>
</template>

<script>
import mixin from "@/mixins/mixins.js";
// import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";
import axios from "axios";
export default {
  mixins: [mixin],

  mounted() {},
  data: () => ({
    lat: "",
    long: "",
    newAddress: {
      street: null,
      number: null,
      district: null,
      cep: null,
    },
    error: false,
    isLoading: false,
  }),
  computed: {
    dialogValue() {
      return this.$store.state.addressAlert;
    },
  },
  methods: {
    async execRequest(action, state, url, method, insert, data = null) {
      await this.$store.dispatch(action, {
        state: state,
        method: method,
        url: url,
        insert,
        data,
      });
      this.isLoading = false;
    },
    getAddressByString() {
      if (
        this.newAddress.street &&
        this.newAddress.number &&
        this.newAddress.district
      ) {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/coord-address`,
          data: {
            address: `${this.characterRemove(this.newAddress.street)}, ${
              this.newAddress.number
            },${this.characterRemove(this.newAddress.district)}, ${
              this.newAddress.cep
            }`,
          },
        })
          .then((resp) => {
            if (resp.data.street && resp.data.number && resp.data.district) {
              let location = {
                latitude: resp.data.latitude,
                longitude: resp.data.longitude,
              };
              const payload = {
                state: "company",
                method: "get",
                url: `/company-show/${process.env.VUE_APP_DOMAIN},${location.latitude},${location.longitude}`,
                insert: true,
              };
              this.$store.dispatch("company/request", payload);
              this.$store.commit("user/setAddress", resp.data);
              this.$emit("next-register", 2);
              localStorage.setItem("geolocation", JSON.stringify(location));
            } else {
              this.error = true;
            }
          })
          .catch(() => {
            this.error = true;
          });
      } else {
        this.error = true;
      }
    },
    async searchLocal() {
      const coordinates = await Capacitor.Plugins.Geolocation.getCurrentPosition();

      this.isLoading = true;
      if ("geolocation" in navigator) {
        this.showPosition(coordinates);
      } else {
        this.$store.commit("alertAddress", true);
        this.isLoading = false;
      }
    },
    showPosition(position) {
      if (position) {
        this.execRequest(
          "company/request",
          "companies",
          `/company/${position.coords.latitude},${position.coords.longitude}`,
          "GET",
          true
        );
        this.execRequest("user/request", "address", "/coord", "POST", true, {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        let location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.$emit("next-register", 2);
        localStorage.setItem("geolocation", JSON.stringify(location));
      } else {
        this.$store.commit("alertAddress", true);
      }
    },
  },
};
</script>

<style></style>
