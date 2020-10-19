<template>
  <v-card outlined :loading="loading" flat>
    <div class="pa-5">
      <div class="py-1">
        <h3 class="px-2">
          Olá! Crie uma conta para ter todos os nossos serviços
        </h3>
      </div>
      <div class="pt-4">
        <v-text-field
          color="#ffa602"
          v-model="user.name"
          outlined
          :rules="nameRules"
          label="Nome"
          :error="errors.name"
          :error-messages="errors.name ? 'O nome é obrigatório.' : ''"
        ></v-text-field>
      </div>

      <div>
        <v-text-field
          color="#ffa602"
          v-model="user.login"
          outlined
          :rules="nameRules"
          label="E-mail"
          :error="errors.login"
          :error-messages="errors.login ? 'O e-mail é obrigatório.' : ''"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          outlined
          :error="errors.phone"
          :placeholder="''"
          :label="'Digite seu telefone'"
          :rules="telRules"
          v-mask="['(##) ####-####', '(##) #####-####']"
          :error-messages="errors.phone ? 'O telefone é obrigatório.' : ''"
          v-model="user.phone"
        ></v-text-field>
      </div>
      <div class>
        <v-text-field
          color="#ffa602"
          v-model="user.password"
          :rules="passRules"
          outlined
          :error="errors.password"
          label="Senha"
          :error-messages="errors.password ? 'A senha é obrigatória.' : ''"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
        ></v-text-field>
      </div>

      <v-alert dark color="error" :value="error">
        {{ msg }}
      </v-alert>
      <div>
        <v-btn
          :loading="loading"
          block
          large
          color="#ffa602"
          dark
          @click="register()"
          >Confirmar</v-btn
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
    telRules: [(v) => !!v || "Digite seu telefone"],
    passConfirmRules: [(v) => !!v || "Confirme sua senha"],
    user: {
      name: null,
      login: null,
      phone: null,
      password: null,
    },
    errors: {
      name: false,
      login: false,
      password: false,
    },
    confirmated_password: "",
    successEdit: false,
    error: false,
    menu: false,
    errorPass: false,
    msg: null,
  }),
  watch: {},
  methods: {
    validForm() {
      let valid;
      if (
        this.user.name &&
        this.user.login &&
        this.user.password &&
        this.user.phone
      ) {
        valid = true;
      }
      if (!this.user.name) {
        this.errors.name = true;
        valid = false;
      }
      if (!this.user.phone) {
        this.errors.phone = true;
        valid = false;
      }
      if (!this.user.login) {
        this.errors.login = true;
        valid = false;
      }
      if (!this.user.password) {
        this.errors.password = true;
        valid = false;
      }

      return valid;
    },
    register() {
      this.loading = true;

      if (this.validForm()) {
        axios({
          url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/user-client",
          method: "post",
          data: this.user,
        })
          .then((resp) => {
            localStorage.setItem("user-register", JSON.stringify(this.user));
            this.loading = false;
            console.log(resp);
            localStorage.setItem("message-register", JSON.stringify(resp.data));
            this.$router.push({
              name: "confirm-register",
            });
          })
          .catch((err) => {
            this.msg = err.response.data.message;
            this.error = true;
            this.loading = false;
          });
      } else {
        this.msg = "Prencha todos os campos para realizar o cadastro";
        this.error = true;
        this.loading = false;
      }
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
