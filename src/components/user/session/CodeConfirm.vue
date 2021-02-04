<template>
  <v-card outlined :loading="loading">
    <div class="pa-5">
      <div class="py-4">
        <h3>Confirmação de conta</h3>
      </div>
      <span class="my-3 text-center">
        Forneça informações adicionais para auxiliar no processo de recuperação
        de conta.
      </span>
      <div class="my-2">
        <span>
          Um código de verificação acaba de ser enviado para
          <b>{{ this.user.login }}. </b>
        </span>
      </div>

      <div class="py-3">
        <v-text-field
          outlined
          v-model="code"
          autocomplete="new-password"
          :error="isActive"
          :error-messages="isActive ? msg : ''"
          label="Inserir código"
        ></v-text-field>
      </div>
      <div>
        <v-row>
          <v-col cols="auto" sm="6">
            <v-btn text color="primary" :to="{ name: 'login' }">Voltar</v-btn>
          </v-col>
          <v-col cols="auto" sm="6">
            <v-btn dark depressed @click="verifyCode()" block color="#5530E5"
              >Verificar
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$router.push({ name: "login" });
    }
  },
  data() {
    return {
      code: null,
      isActive: false,
      msg: null,
      user: null,
      loading: false,
    };
  },
  methods: {
    verifyCode() {
      this.loading = true;
      if (this.code) {
        axios({
          url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/confirm-register",
          method: "post",
          data: {
            token: this.code,
          },
        })
          .then((resp) => {
            this.$router.push({
              name: "login",
              params: { confirm: resp.data.message },
            });
            this.loading = false;
          })
          .catch(() => {
            this.msg = "Código Expirado";
            this.isActive = true;
            this.loading = false;
          });
      } else {
        this.msg = "Você precisa digitar um código para prosseguir";
        this.isActive = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
