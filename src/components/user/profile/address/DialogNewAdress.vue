<template>
  <div id="editPerfil">
    <v-dialog persistent v-model="dialogAddress" max-width="500">
      <v-card class="pa-3">
        <v-toolbar dense flat color="white">
          <v-toolbar-title>Novo Endereço </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="closeDialog" outlined class>
            <v-icon>mdi-close</v-icon>Fechar
          </v-btn>
        </v-toolbar>

        <div class="col-sm-12">
          <div v-if="!successEdit">
            <v-row>
              <v-col cols="12" sm="9">
                <v-text-field
                  clearable
                  color="#765eda"
                  outlined
                  dense
                  hide-details
                  v-model="newAddress.street"
                  label="Rua"
                  placeholder="Ex: Rua dos papiros"
                  prepend-inner-icon="mdi-magnify"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  clearable
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
                  clearable
                  color="#765eda"
                  outlined
                  dense
                  hide-details
                  v-model="newAddress.district"
                  label="Bairro"
                  placeholder="Ex: Residencial Sul"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" v-if="error">
                <v-alert type="error" dense>
                  Endereço não encontrado, insira os dados corretamente
                </v-alert>
              </v-col>
              <v-col>
                <v-btn @click="getAddressByString()" block dark color="primary">
                  <v-icon>mdi-magnify</v-icon> Buscar endereço
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div v-if="successEdit">
            <v-row>
              {{ address }}
              <v-col class="py-0" v-if="successEdit">
                <v-alert :type="numberVerify ? 'success' : 'error'" dense>
                  {{ address.street }}, {{ address.number }} -
                  {{ address.city }},
                  {{ address.state }}
                </v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0" cols="12" sm="4">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  v-model="address.title"
                  label="Titulo"
                  color="#765eda"
                ></v-text-field>
              </v-col>
              <v-col class="py-0">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  v-model="address.complement"
                  label="Complemento"
                  color="#765eda"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-end">
              <v-col>
                <v-btn
                  large
                  block
                  outlined
                  color="error"
                  @click="successEdit = !successEdit"
                  dark
                  >Voltar</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  large
                  block
                  color="#765eda"
                  @click="registerAddress()"
                  dark
                  >Confirmar</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    closeDialog: {
      type: Function,
    },
    dialogAddress: Boolean,
  },
  data: () => ({
    address: {
      title: null,
      complement: null,
    },
    lat: "",
    long: "",
    newAddress: {
      street: null,
      number: null,
      district: null,
    },
    successEdit: false,
    error: false,
    numberVerify: Boolean,
  }),
  computed: {},
  methods: {
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
            if (resp.data.street && resp.data.number) {
              this.address = resp.data;
              this.successEdit = true;
            } else {
              this.successEdit = false;
            }
          })
          .catch(() => {
            this.error = true;
          });
      } else {
        this.error = true;
      }
    },
    registerAddress() {
      if (this.address.number) {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/address/`,
          headers: null || {
            Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
          },
          data: this.address,
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
