<template>
  <div>
    <div class="py-1">
      <h3>Recuperação de conta</h3>
      <span class="">
        Digite seu <b>e-mail</b> para recuperar sua senha. Você receberá um
        e-mail com um codigo para recuperação de conta.
      </span>
    </div>
    <div class="pa-1">
      <div>
        <v-text-field
          outlined
          v-model="email"
          autocomplete="new-password"
          label="E-mail"
          :rules="emailRules"
          :error="isActive"
          :error-messages="isActive ? 'E-mail não encontrado ' : ''"
        ></v-text-field>
      </div>
      <div>
        <router-link
          :to="{
            name: 'code-verify',
          }"
        >
          <b>
            Já possui o código de verificação?
          </b>
        </router-link>
      </div>
      <div id="buttons-login">
        <v-row>
          <v-col>
            <v-btn
              class="pa-1"
              text
              :to="{ name: 'forgot-pass-tel' }"
              color="primary"
              >Tente com seu telefone</v-btn
            >
          </v-col>
          <v-col>
            <v-btn @click="verifyEmail()" depressed block color="#ffa602"
              >Avançar
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: null,
      isActive: false,
      emailRules: [
        (v) => !!v || "Digite seu e-mail",
        (v) => /.+@.+/.test(v) || "E-mail inválido",
      ],
    };
  },
  methods: {
    verifyEmail() {
      axios({
        url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/verify-forgot",
        method: "post",
        data: {
          login: this.email,
        },
      }).then((resp) => {
        if (resp.data.message) {
          this.$router.push({ name: "code-verify" });
        } else {
          this.isActive = true;
        }
      });
    },
  },
};
</script>

<style></style>
