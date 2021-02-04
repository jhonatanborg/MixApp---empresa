<template>
  <div>
    <v-alert dark color="#5530E5" border="left">
      <small>
        {{ address.street }}, {{ address.number }} - {{ address.district }},
        {{ address.city }} - {{ address.state }}</small
      >
    </v-alert>
    <v-form ref="address">
      <v-row>
        <v-col class="py-0" sm="4">
          <v-text-field
            clearable
            color="#5530E5"
            outlined
            hide-details
            dense
            :rules="[(v, i) => !!v || 'obrigatório']"
            label="Número"
            v-model="address.number"
          ></v-text-field>
        </v-col>
        <v-col class="py-0" cols="6" sm="8">
          <v-text-field
            clearable
            color="#5530E5"
            outlined
            dense
            hide-details
            :rules="[(v, i) => !!v || 'obrigatório']"
            :error="error"
            v-model="title"
            label="Título"
            placeholder="Ex: Casa"
          ></v-text-field>
        </v-col>
        <v-col class="pb-0" cols="12">
          <v-text-field
            clearable
            color="#5530E5"
            outlined
            dense
            v-model="complement"
            label="Observação"
            placeholder="Ex: Ao lado da mercearia do jão"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <v-btn
            block
            @click="$emit('return', 2)"
            large
            outlined
            color="primary"
            >Voltar</v-btn
          >
        </v-col>
        <v-col cols="12" sm="8">
          <v-btn
            @click="updateLocalAddress"
            large
            depressed
            block
            dark
            color="#5530E5"
            >Confirmar</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
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
      return this.$store.state.user.address;
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
      if (this.$refs.address.validate()) {
        this.address.complement = this.complement;
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
      }
    },
    registerAddress(address) {
      if (this.address.number) {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/address-client/`,
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
