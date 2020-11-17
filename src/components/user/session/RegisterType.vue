<template>
  <v-card outlined>
    <div class="pa-5">
      <div>
        <h3>
          Escolha como se cadastrar
        </h3>
        <h4>
          Selecione o telefone ou e-mail
        </h4>
      </div>
      <div class="py-5">
        <v-btn large block dark color="#FFBA0A" :to="{ name: 'register' }"
          >Telefone</v-btn
        >
      </div>
      <div>
        <v-btn
          large
          dark
          outlined
          block
          color="#FFBA0A"
          :to="{ name: 'register-email' }"
          >E-mail</v-btn
        >
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  components: {},

  data: () => ({
    loading: false,
    show: false,
    nameRules: [(v) => !!v || "Digite seu nome"],
    passRules: [(v) => !!v || "Digite uma senha"],
    passConfirmRules: [(v) => !!v || "Confirme sua senha"],
    emailRules: [
      (v) => !!v || "Digite seu e-mail",
      (v) => /.+@.+/.test(v) || "E-mail inválido",
    ],
    user: {
      name: "",
      login: "",
      password: "",
    },
    login: "",
    confirmated_password: "",
    successEdit: false,
    error: false,
    loginTel: false,
    loginEmail: false,
    numberVerify: Boolean,
    menu: false,
    errorPass: false,
  }),
  watch: {},
  methods: {
    register() {
      this.loading = true;
      axios({
        url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/user-client",
        method: "post",
        data: this.user,
      })
        .then((resp) => {
          this.loading = false;
          this.$router.push({
            name: "confirm-register",
            params: {
              user: resp.data,
            },
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
.bg-app-grey {
  background-color: #fafaf8;
}

.v-btn {
  text-transform: none !important;
}

.background-login {
  background-image: linear-gradient(-60deg, #ff9b18 0%, #dd0a03 100%);
}

.banner-title {
  color: white;
}

.card-login {
  background-color: white !important;
  height: 50%;
  border-radius: 5px;
  text-transform: none !important;
}

.v-tab {
  text-transform: none !important;
}

#inspire {
  font-family: CircularStd !important;
}

.error-msg {
  color: #ff5252 !important;
  caret-color: #ff5252 !important;
  line-height: 12px;
  word-break: break-word;
  overflow-wrap: break-word;
  word-wrap: break-word;
  font-size: 12px;
  margin-left: 12px;
}
</style>
