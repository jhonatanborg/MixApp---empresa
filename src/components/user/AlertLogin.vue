<template>
  <div>
    <v-dialog v-model="loginAlert" persistent max-width="380px">
      <v-card class="pa-5">
        <div color="white">
          <div class="py-1">
            <h2 class="px-2">
              Olá! Para continuar, faça o login ou cadastre-se
            </h2>
          </div>
          <div class="pa-1">
            <div class="pt-4">
              <v-text-field
                outlined
                dense
                v-model="user.email"
                :error="errorMail"
                :error-messages="
                  errorMail ? 'Preencha esse campo com um e-mail válido' : ''
                "
                label="E-mail"
              ></v-text-field>
            </div>
            <div>
              <v-text-field
                outlined
                dense
                :error="errorPass"
                :error-messages="errorPass ? 'Use sua senha padrão' : ''"
                v-model="user.pass"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                label="Senha"
              ></v-text-field>
            </div>
            <div>
              <v-alert v-text="messageError" dense type="error" :value="error">
              </v-alert>
            </div>
            <div id="buttons-login">
              <div>
                <v-btn @click="login()" block color="#765eda">Entrar</v-btn>
              </div>
              <div class="mt-3">
                <v-btn outlined block color="#765eda " to="/register"
                  >Cadastre-se</v-btn
                >
              </div>
            </div>
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
    loginAlert: Boolean,
  },
  data: () => ({
    user: {
      email: "",
      pass: "",
    },
    error: false,
    messageError: null,
    errorMail: false,
    errorPass: false,
    show: false,
  }),
  methods: {
    login() {
      if (!this.user.email) {
        this.errorMail = true;
      }

      if (!this.user.pass) {
        this.errorPass = true;
      } else {
        axios({
          url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/session",
          method: "post",
          data: {
            email: this.user.email,
            password: this.user.pass,
          },
        })
          .then((resp) => {
            localStorage.setItem("acess-token", resp.data.token);
            this.$store.commit("user/setUser", resp.data);
            this.$store.commit("user/setUserName", resp.data.name);
            this.$router.go(-1);
          })
          .catch((err) => {
            if (err.response.data[0]) {
              this.error = true;
              this.messageError = err.response.data[0].message;
            } else {
              this.error = true;
              this.messageError = err.response.data.message;
            }
          });
      }
    },
  },
};
</script>

<style></style>
