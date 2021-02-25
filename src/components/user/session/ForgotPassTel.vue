<template>
  <v-card outlined class="pa-5">
    <div class="py-1">
      <h3>Recuperação de conta</h3>
      <span class="">
        Digite seu <b>telefone</b> para recuperar sua senha. Você receberá um
        sms com um codigo para recuperação de conta.
      </span>
    </div>
    <div class="pa-1">
      <div>
        <v-text-field
          outlined
          v-mask="['(##) ####-####', '(##) #####-####']"
          autocomplete="new-password"
          label="Telefone"
          v-model="tel"
          :error="error"
          :error-messages="error ? message : ''"
        ></v-text-field>
      </div>
      <router-link :to="{ name: 'code-verify' }">
        <b>
          Já possui o código de verificação?
        </b>
      </router-link>
      <div id="buttons-login">
        <v-row>
          <v-col cols="auto" sm="6">
            <v-btn outlined text color="primary" :to="{ name: 'forgot-pass' }"
              >Tente com seu e-mail</v-btn
            >
          </v-col>
          <v-col cols="auto" sm="6">
            <v-btn dark depressed @click="verifyTel()" block color="#5530E5"
              >Avançar
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
  data() {
    return {
      tel: null,
      error: false,
      message: null,
    };
  },
  methods: {
    verifyTel() {
      axios({
        url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/verify-forgot",
        method: "post",
        data: {
          login: this.tel,
        },
      })
        .then(() => {
          this.$router.replace({ name: "code-verify" });
        })
        .catch((err) => {
          this.error = true;
          this.message = err.response.data.message;
        });
    },
  },
};
</script>

<style></style>
