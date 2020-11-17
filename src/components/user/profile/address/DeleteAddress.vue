<template>
  <v-layout row justify-center v-if="userAddress">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.xsOnly"
      v-model="viewDialogDelete"
      persistent
      max-width="600"
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
          <v-col cols="12">
            <v-alert color="#FFBA0A" outlined border="left">
              <small>
                <b>
                  {{ userAddress.title }}
                </b>
                <br />
                {{ userAddress.street }}, {{ userAddress.number }} -
                {{ userAddress.district }}, {{ userAddress.city }} -
                {{ userAddress.state }}</small
              >
            </v-alert>

            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn
                :loading="loading"
                large
                block
                color="#FFBA0A"
                @click="deleteAddress"
                dark
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
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    deleteAddress() {
      this.loading = true;
      axios({
        method: "DELETE",
        url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/address-client/${this.userAddress.id}`,
        headers: null || {
          Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
        },
        data: this.userAddress,
      })
        .then((resp) => {
          this.$store.commit("user/setUser", resp.data);
          this.$store.commit("user/setUser", resp.data);
          this.loading = false;
          this.$store.commit("user/setAddressEdit", {
            address: null,
            dialog: false,
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style></style>
