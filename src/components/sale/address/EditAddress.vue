<template>
  <div class="pa-5">
    <v-flex>
      <div>
        <span>Confirmar endereço: </span>
      </div>
      <div class="mb-2">
        <small>Esse será o endereço de entrega</small>
      </div>
    </v-flex>
    <v-form ref="address">
      <v-row no-gutters>
        <v-col cols="12" sm="12">
          <v-text-field
            color="primary"
            outlined
            dense
            :rules="[(v, i) => !!v || 'Campo obrigatório']"
            v-model="newAddress.street"
            label="Logradouro"
            placeholder="Digite a rua"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5" class="mr-3">
          <v-text-field
            color="primary"
            outlined
            dense
            v-model="newAddress.number"
            :rules="[(v, i) => !!v || 'Campo obrigatório']"
            label="Nº"
            placeholder="Digite o nº"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            color="primary"
            outlined
            dense
            :rules="[(v, i) => !!v || 'Campo obrigatório']"
            v-model="newAddress.district"
            label="Bairro"
            placeholder="Digite o bairro"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-text-field
            color="primary"
            outlined
            dense
            v-model="newAddress.cep"
            v-mask="['#####-###']"
            label="CEP"
            :rules="[(v, i) => !!v || 'Campo obrigatório']"
            placeholder="Digite o CEP"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-text-field
            color="primary"
            outlined
            dense
            v-model="newAddress.complement"
            label="Observação"
            placeholder="Digite um complemento"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" class="py-0" v-if="error">
          <v-alert close type="error" dense>
            Endereço não encontrado, insira os dados corretamente
          </v-alert>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col cols="12" sm="12">
        <v-btn
          x-large
          @click="getAddressByString()"
          block
          dark
          depressed
          color="#5530E5"
          :loading="isLoading"
        >
          <v-icon>mdi-magnify</v-icon> Buscar endereço
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import mixin from "@/mixins/mixins.js";

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
      complement: null,
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
    getAddressByString() {
      this.isLoading = true;
      if (this.$refs.address.validate()) {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/coord-address`,
          data: {
            address: `${this.characterRemove(this.newAddress.street)}, ${
              this.newAddress.number
            },${this.characterRemove(this.newAddress.district)}, ${
              this.newAddress.cep
            },  ${this.newAddress.complement}`,
          },
        })
          .then((resp) => {
            console.log(this.characterRemove(this.newAddress.street));

            resp.data.complement = this.newAddress.complement;
            if (resp.data.street && resp.data.number && resp.data.district) {
              let location = {
                latitude: resp.data.latitude,
                longitude: resp.data.longitude,
              };
              this.$store.commit("user/setAddress", resp.data);
              this.$store.commit("cart/sidebar", { open: true, step: 3 });
              localStorage.setItem("geolocation", JSON.stringify(location));
              this.isLoading = false;
            } else {
              this.error = true;
              this.isLoading = false;
            }
          })
          .catch(() => {
            console.log(this.characterRemove(this.newAddress.street));

            this.error = true;
            this.isLoading = false;
          });
      } else {
        this.error = true;
        this.isLoading = false;
      }
    },
  },
};
</script>

<style></style>
