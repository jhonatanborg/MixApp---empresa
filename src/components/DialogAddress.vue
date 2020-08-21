<template>
  <div id="editPerfil" v-if="address && idAddress">
    <v-dialog persistent v-model="viewDialogAddress" max-width="600">
      <v-card class="pa-3">
        <v-toolbar dense flat color="white">
          <v-toolbar-title>Alterar {{ idAddress }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="closeDialog" outlined class>
            <v-icon>mdi-close</v-icon>Fechar
          </v-btn>
        </v-toolbar>

        <div class="col-sm-12">
          <v-list-item class="pa-0" outlined>
            <v-list-item-content class="my-2">
              <v-list-item-title>{{ address.title }}</v-list-item-title>
              <div>
                {{ address.street }}, {{ address.number }}
                {{ address.complement }}
              </div>
            </v-list-item-content>
          </v-list-item>

          <v-row>
            <v-col cols="12" sm="9">
              <v-text-field
                color="#765eda"
                clearable
                outlined
                dense
                v-model="newAddress"
                fullscreen
                aria-errormessage="cuxao"
                :error="error"
                :error-messages="
                  error ? 'Endereço inválido ou não encontrado' : ''
                "
                label="Alterar endereço"
                placeholder="Ex: Rua dos papiros, 36, Setor Residencial Sul"
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn @click="getAddressByString()" block dark color="primary">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <div class="my-5" v-if="successEdit">
            <v-alert outlined color="#765eda">
              {{ addressUpdate.street }}, {{ addressUpdate.number }} -
              {{ addressUpdate.city }}, {{ addressUpdate.state }}
            </v-alert>
          </div>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                dense
                hide-details
                v-model="address.title"
                label="Titulo"
                color="#765eda"
              ></v-text-field>
            </v-col>
            <v-col>
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
              <v-btn large block color="#765eda" @click="updateAddress()" dark
                >Confirmar</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    viewDialogAddress: Boolean,
    address: Object,
    closeDialog: {
      type: Function,
    },
    idAddress: Number,
  },
  data: () => ({
    addressUpdate: "",
    lat: "",
    long: "",
    newAddress: "",
    successEdit: false,
    error: false,
  }),
  methods: {
    getAddressByString() {
      axios({
        method: "POST",
        url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/coord-address`,
        data: {
          address: this.newAddress,
        },
      })
        .then((resp) => {
          this.successEdit = true;
          const id = this.idAddress;
          this.addressUpdate = resp.data;
          this.addressUpdate.id = id;
        })
        .catch(() => {
          this.error = true;
        });
    },
    updateAddress() {
      if (this.addressUpdate) {
        this.addressUpdate.title = this.address.title;
        this.addressUpdate.complement = this.address.complement;

        axios({
          method: "PUT",
          url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/address/${this.addressUpdate.id}`,
          headers: null || {
            Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
          },
          data: this.addressUpdate,
        })
          .then((resp) => {
            this.$store.commit("user/setUser", resp.data);
          })
          .catch(() => {});
      } else {
        axios({
          method: "PUT",
          url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/address/${this.address.id}`,
          headers: null || {
            Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
          },
          data: this.address,
        })
          .then((resp) => {
            this.$store.commit("user/setUser", resp.data);
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style></style>
