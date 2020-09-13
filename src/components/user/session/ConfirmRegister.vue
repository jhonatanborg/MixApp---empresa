<template>
  <v-card :loading="loading" outlined flat>
    <div class="pa-5">
      <div class="py-4">
        <h3>Confirme o código</h3>
      </div>
      <span class="my-3">
        Enviamos um codigo para seu o <b>{{ typeConfirm }}</b> Insira o código
        abaixo:
      </span>
      <div class="py-3">
        <v-text-field
          outlined
          v-model="code"
          :error="msg ? true : false"
          :error-messages="msg ? msg : ''"
          autocomplete="new-password"
          label="Código de verificação"
        ></v-text-field>
      </div>
      <div>
        <v-row>
          <v-col cols="auto" sm="6">
            <v-btn text color="primary" :to="{ name: 'register' }"
              >Voltar</v-btn
            >
          </v-col>
          <v-col cols="auto" sm="6">
            <v-btn
              :loading="loading"
              dark
              depressed
              @click="verifyCode()"
              block
              color="#765eda"
              >Verificar
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
  mounted() {
    this.typeConfirm = this.$route.params.typeConfirm;
  },
  data() {
    return {
      code: null,
      loading: false,
      msg: null,
      typeConfirm: null,
    };
  },
  methods: {
    verifyCode() {
      this.loading = true;
      axios({
        url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/confirm-register",
        method: "post",
        data: {
          token: this.code,
        },
      })
        .then((resp) => {
          this.loading = false;
          console.log(resp);
        })
        .catch((err) => {
          this.loading = false;
          this.msg = err.response.data.message;
        });
    },
    ContinueLogin() {
      axios({
        url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/session",
        method: "post",
        data: {
          email: this.user.email,
          password: this.user.pass,
        },
      }).then((resp) => {
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
      });
    },
  },
};
</script>

<style></style>
