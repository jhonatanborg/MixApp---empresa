<template>
  <div>
    <div class="py-1">
      <div class="py-4">
        <h3>Recuperação de conta</h3>
      </div>
      <span class="my-3">
        Insira o código abaixo:
      </span>
      <div class="py-3">
        <v-text-field
          outlined
          v-model="code"
          autocomplete="new-password"
          :error="isActive"
          :error-messages="isActive ? msg : ''"
          label="Código de verificação"
        ></v-text-field>
      </div>
      <div>
        <v-row>
          <v-col cols="auto" sm="6">
            <v-btn text color="primary" :to="{ name: 'forgot-pass' }"
              >Voltar</v-btn
            >
          </v-col>
          <v-col cols="auto" sm="6">
            <v-btn dark depressed @click="verifyCode()" block color="#765eda"
              >Verificar
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
      code: null,
      isActive: false,
      msg: null,
    };
  },
  methods: {
    verifyCode() {
      axios({
        url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/verify-code-forgot",
        method: "post",
        data: {
          token: this.code,
        },
      })
        .then((resp) => {
          if (resp.data.next) {
            localStorage.setItem("token", this.code);
            this.$router.replace({ name: "new-password" });
          } else {
            this.msg = "Código inválido";
            this.isActive = true;
          }
        })
        .catch(() => {
          this.msg = "Código Expirado";
          this.isActive = true;
        });
    },
  },
};
</script>

<style></style>
