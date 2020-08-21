<template>
  <div>
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
          :error="isActive"
          :error-messages="isActive ? 'Telefone não encontrado ' : ''"
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
            <v-btn text color="primary" :to="{ name: 'forgot-pass' }"
              >Tente com seu e-mail</v-btn
            >
          </v-col>
          <v-col cols="auto" sm="6">
            <v-btn dark depressed @click="verifyTel()" block color="#765eda"
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
      tel: null,
      isActive: false,
    };
  },
  methods: {
    verifyTel() {
      axios({
        url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/verify-forgot",
        method: "post",
        data: {
          phone: this.tel,
        },
      })
        .then((resp) => {
          if (resp.data.next) {
            this.$router.replace({ name: "code-verify" });
          } else {
            this.isActive = true;
          }
        })
        .catch(() => {
          this.isActive = true;
        });
    },
  },
};
</script>

<style></style>
