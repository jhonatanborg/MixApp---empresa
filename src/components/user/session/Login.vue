<template>
  <div>
    <div class="py-1">
      <h2 class="px-2">
        Olá! Para continuar, faça o login ou cadastre-se
      </h2>
    </div>
    <div class="pa-1">
      <div class="pt-4">
        <v-text-field
          outlined
          autocomplete="new-password"
          v-model="user.email"
          :error="errorMail"
          :error-messages="
            errorMail ? 'Preencha esse campo com um e-mail válido' : ''
          "
          label="E-mail ou telefone"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          outlined
          autocomplete="new-password"
          :error="errorPass"
          :error-messages="errorPass ? 'Use sua senha padrão' : ''"
          v-model="user.pass"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          label="Senha"
        ></v-text-field>
        <div class="mb-4">
          <router-link :to="{ name: 'forgot-pass-tel' }">
            <b>Esqueceu sua senha?</b>
          </router-link>
        </div>
      </div>

      <div>
        <v-alert dense type="error" :value="error">
          {{ messageError }}
        </v-alert>
      </div>
      <div id="buttons-login">
        <div>
          <v-btn
            :loading="loading"
            dark
            x-large
            @click="login()"
            block
            color="#765eda"
            >Entrar</v-btn
          >
        </div>
        <div class="mt-3">
          <span>Ainda não possui uma conta </span>
          <br />
          <b
            ><router-link :to="{ name: 'register' }"
              >Crie uma conta agora</router-link
            ></b
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    loading: false,
    user: {
      email: "",
      pass: "",
    },
    isConnected: false,
    name: "",
    email: "",
    personalID: "",
    picture: "",
    FB: undefined,
    show: false,
    error: false,
    messageError: null,
    errorMail: false,
    errorPass: false,
  }),

  methods: {
    getUserData() {
      this.FB.api(
        "/me",
        "GET",
        {
          fields: "id,name,email,picture",
        },
        (user) => {
          this.personalID = user.id;
          this.email = user.email;
          this.name = user.name;
          this.picture = user.picture.data.url;
        }
      );
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
    },
    handleSdkInit({ FB, scope }) {
      this.FB = FB;

      this.scope = scope;
    },
    activate() {
      if (this.windowSize.x <= 700) {
        return "d-none";
      } else {
        return "col-sm-6 normal";
      }
    },
    onResize() {
      this.windowSize = {
        x: window.innerWidth,
        y: window.innerHeight,
      };
    },
    login() {
      this.loading = true;
      if (!this.user.email) {
        this.errorMail = true;
        this.loading = false;
      }

      if (!this.user.pass) {
        this.errorPass = true;
        this.loading = false;
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
            console.log("aqui");
            localStorage.setItem("acess-token", resp.data.token);
            this.$store.commit("user/setUser", resp.data);
            this.$store.commit("user/setUserName", resp.data.name);
            if (localStorage.getItem("company")) {
              let company = JSON.parse(localStorage.getItem("company"));
              console.log(company.object_id);
              this.$router.push({ name: "company", params: company.object_id });
            }
            this.loading = false;
          })
          .catch((err) => {
            if (err.response.data[0]) {
              this.error = true;
              this.messageError = err.response.data[0].message;
              this.loading = false;
            } else {
              this.error = true;
              this.messageError = err.response.data.message;
              this.loading = false;
            }
          });
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

.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  border-radius: 20px;
  /* display:inline-block; */
}

.login {
  width: 200px;
  margin: auto;
}

.list-item:first-child {
  margin: 0;
}

.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.button {
  margin: auto;
}
</style>
