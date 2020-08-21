<template>
  <v-layout row justify-center v-if="userAddress">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.xsOnly"
      v-model="viewDialogDelete"
      persistent
      max-width="380"
    >
      <v-card fill-height flat class="pa-3">
        <v-toolbar flat color="white">
          <v-toolbar-title>Excluir endereço</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="closeDialog">
            <v-icon>mdi-close</v-icon>Fechar
          </v-btn>
        </v-toolbar>
        <v-row class="justify-center align-center">
          <v-col cols="12" sm="4">
            <v-card-text class="my-5">
              <v-list-item class="pa-0">
                <v-list-item-content class="my-2">
                  <v-list-item-subtitle> </v-list-item-subtitle>
                  <v-divider></v-divider>
                  <v-list-item-title>{{ userAddress.title }}</v-list-item-title>
                  <div>
                    {{ userAddress.street }}, {{ userAddress.number }},
                    {{ userAddress.complement }}
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn large block color="#765eda" @click="deleteAddress" dark
                >Confirmar</v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  props: {
    viewDialogDelete: Boolean,
    userAddress: Object,
    closeDialog: {
      type: Function,
    },
  },
  methods: {
    deleteAddress() {
      axios({
        method: "DELETE",
        url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/address/${this.userAddress.id}`,
        headers: null || {
          Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
        },
        data: this.userAddress,
      })
        .then((resp) => {
          this.$store.commit("user/setUser", resp.data);
        })
        .catch(() => {});
    },
  },
};
</script>

<style></style>
