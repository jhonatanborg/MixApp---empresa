<template>
  <div>
    <div class="py-1">
      <h3>Recuperação de conta</h3>
    </div>
    <span
      >Escolha uma senha forte e não a reutilize em outras contas. Utilize no
      mínimo 8 caracteres!!</span
    >
    <div class="pa-1">
      <div>
        <v-text-field
          autocomplete="new-password"
          :rules="passRules"
          outlined
          v-model="newPassword"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          label="Nova senha"
          :error="errorPass"
          :error-messages="errorPass ? msgError : ''"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="newPassConfirm"
          autocomplete="new-password"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
          :error="errorPass"
          :error-messages="errorPass ? msgError : ''"
          :rules="passRules"
          label="Confirmar senha"
        ></v-text-field>
      </div>
      <v-alert dense type="error" :value="errorToken">
        O seu código de verificação foi expirado
      </v-alert>
      <div id="buttons-login">
        <v-row>
          <v-col>
            <v-btn class="pa-1" text to="/session" color="primary"
              >Cancelar</v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              @click="savePassword()"
              :loading="loader"
              depressed
              dark
              block
              color="#5530E5"
              >Confirmar
            </v-btn>
          </v-col>
        </v-row>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loader: false,
      show1: false,
      show2: false,
      passRules: [(v) => !!v || "Digite uma senha"],
      newPassword: null,
      newPassConfirm: null,
      errorPass: false,
      msgError: null,
      errorToken: false,
    };
  },
  methods: {
    savePassword() {
      this.loader = true;
      let next = true;
      if (!this.newPassword && !this.newPassConfirm) {
        this.errorPass = true;
        this.msgError = "Digite uma nova senha";
        next = false;
        this.loader = false;
      }
      if (this.newPassword !== this.newPassConfirm) {
        this.errorPass = true;
        this.msgError = "Senhas não coincidem";
        next = false;
        this.loader = false;
      }
      if (next) {
        axios({
          url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/reset",
          method: "post",
          data: {
            password: this.newPassConfirm,
            token: localStorage.getItem("token"),
          },
        })
          .then(() => {
            this.loader = false;
            localStorage.setItem("token", "");
            this.$router.push({ name: "success-forgot" });
          })
          .catch(() => {
            this.errorToken = true;
            this.loader = false;
          });
      }
    },
  },
};
</script>

<style></style>
