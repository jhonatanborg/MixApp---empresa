<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" sm="12" v-if="address">
        <v-alert outlined dense color="success ">
          {{ address.street }}, {{ address.number }} - {{ address.district }},
          {{ address.city }} -
          {{ address.state }}
        </v-alert>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              clearable
              color="#765eda"
              outlined
              dense
              :error="error"
              :error-messages="
                error ? 'Escreva um titulo para esse endereço' : ''
              "
              v-model="title"
              label="Título"
              placeholder="Ex: Casa"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="8">
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
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-between">
      <v-col cols="auto" sm="4">
        <v-btn
          @click="$emit('return', 1)"
          block
          dense
          outlined
          color="error"
          dark
          >Voltar</v-btn
        >
      </v-col>
      <v-col sm="8">
        <v-btn dense block color="#765eda" @click="updateLocalAddress()" dark
          >Confirmar</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {},
  data: () => ({
    error: false,
    complement: null,
    title: null,
  }),
  computed: {
    address() {
      return this.$store.state.user.addressEdit;
    },
  },
  methods: {
    execRequest(action, state, url, method, insert, data = null) {
      this.$store.dispatch(action, {
        state: state,
        method: method,
        url: url,
        insert,
        data,
      });
    },
    updateLocalAddress() {
      this.address.complement = this.complement;
      if (this.title) {
        this.address.title = this.title;
        this.$store.commit("user/request", {
          state: "address",
          data: this.address,
        });
        this.execRequest(
          "company/request",
          "companies",
          `/company/${this.address.latitude},${this.address.longitude}`,
          "GET",
          true
        );
        let location = {
          latitude: this.address.latitude,
          longitude: this.address.longitude,
        };

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
