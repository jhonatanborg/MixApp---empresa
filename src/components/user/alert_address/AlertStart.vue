<template>
  <div class="">
    <v-row>
      <v-col cols="12" sm="9">
        <v-text-field
          color="#765eda"
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
          color="#765eda"
          outlined
          dense
          v-model="newAddress.number"
          label="Nº"
          placeholder="Ex: 36"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <v-text-field
          color="#765eda"
          outlined
          dense
          hide-details
          v-model="newAddress.district"
          label="Bairro"
          placeholder="Ex: Residencial Sul"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" class="py-0" v-if="error">
        <v-alert close type="error" dense>
          Endereço não encontrado, insira os dados corretamente
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-btn
          :loading="isLoading"
          @click="searchLocal()"
          block
          color="primary"
          dark
          outlined
        >
          <v-icon class="mx-1">mdi-crosshairs-gps</v-icon>

          Usar localização atual</v-btn
        ></v-col
      >
      <v-col cols="12" sm="6">
        <v-btn @click="getAddressByString()" block dark color="#765eda">
          <v-icon>mdi-magnify</v-icon> Buscar endereço
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {},
  data: () => ({
    lat: "",
    long: "",
    newAddress: {
      street: "",
      number: "",
      district: "",
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
            address: `${this.newAddress.street}, ${this.newAddress.number},${this.newAddress.district}`,
          },
        })
          .then((resp) => {
            if (resp.data.street && resp.data.number && resp.data.district) {
              let location = {
                latitude: resp.data.latitude,
                longitude: resp.data.longitude,
              };
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

    searchLocal() {
      this.isLoading = true;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
        // this.$store.commit("alertAddress", { value: false });
      } else {
        this.$store.commit("alertAddress", true);
        this.isLoading = false;
      }
    },
    showPosition(position) {
      if (position) {
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
      }
    },
  },
};
</script>

<style></style>
