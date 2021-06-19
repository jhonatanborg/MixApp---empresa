<template>
  <v-card :loading="loading" outlined>
    <div class="pa-5">
      <div class="headline">
        <h5>
          Olá! Para continuar faça o login ou cadastre-se
        </h5>
      </div>
      <v-alert dense v-if="confirm" border="left" type="success">
        {{ confirm }}
      </v-alert>
      <div class="pa-1">
        <div class="pt-4">
          <v-text-field
            outlined
            autocomplete="new-password"
            v-model="user.login"
            :error="errorMail"
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
              <b class="black--text">Esqueceu sua senha?</b>
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
              color="#5530E5"
              >Entrar</v-btn
            >
            <v-btn
              class="my-5"
              block
              @click="fetchFacebook"
              color="primary"
              dark
              x-large
            >
              Entrar com o Facebook
              <v-icon dark right>
                mdi-facebook
              </v-icon>
            </v-btn>
          </div>
          <div class="mt-3">
            <span>Ainda não possui uma conta </span>
            <br />
            <b
              ><router-link :to="{ name: 'register-email' }" class="black--text"
                >Crie uma conta agora</router-link
              ></b
            >
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    if (this.$route.params.confirm) {
      this.confirm = this.$route.params.confirm;
    }
  },
  data: () => ({
    loading: false,
    user: {
      login: "",
      pass: "",
    },
    show: false,
    error: false,
    messageError: null,
    errorMail: false,
    errorPass: false,
    confirm: null,
  }),
  computed: {
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
  },
  methods: {
    login() {
      this.loading = true;
      if (!this.user.login) {
        this.login = true;
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
            login: this.user.login,
            password: this.user.pass,
          },
        })
          .then((resp) => {
            localStorage.setItem("acess-token", resp.data.token);
            localStorage.setItem("id-user", resp.data.id);
            this.$store.commit("user/setUser", resp.data);
            console.log(resp.data);
            this.$store.commit("user/setUserName", resp.data.name);
            this.$router.push("/");
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
              if (err.response.data.confirm) {
                this.$router.push({
                  name: "code-confirm",
                });
                localStorage.setItem("user", JSON.stringify(this.user));
              }
            }
          });
      }
    },
    async fetchFacebook() {
      try {
        const response = await axios({
          url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/facebook",
          method: "post",
          params: {
            company_id: this.company.id,
          },
        });
        window.location.href = response.data.facebookLoginUrl;
      } catch (error) {
        console.log(error.message);
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
