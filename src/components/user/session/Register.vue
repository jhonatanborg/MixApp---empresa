<template>
  <v-card color="transparent" outlined flat>
    <div class="py-1">
      <h2 class="px-2">
        Olá! Crie uma conta para ter todos os nossos serviços
      </h2>
    </div>
    <div class="pt-4">
      <v-text-field
        color="#765eda"
        v-model="user.name"
        outlined
        :rules="nameRules"
        label="Nome"
      ></v-text-field>
    </div>
    <div :class="{ 'mb-3': isActive }">
      <v-text-field
        color="red"
        :rules="emailRules"
        v-model="user.email"
        outlined
        :single-line="isActive"
        :hide-details="isActive"
        label="E-mail"
        :error="isActive"
      ></v-text-field>
      <span
        class="error-msg"
        :class="{
          'd-none ': !isActive,
        }"
        >{{ msgError }}</span
      >
    </div>
    <div class>
      <v-text-field
        color="#765eda"
        v-model="user.password"
        :rules="passRules"
        outlined
        label="Senha"
        :type="show1 ? 'text' : 'password'"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show1 = !show1"
      ></v-text-field>
    </div>
    <v-text-field
      color="#765eda"
      v-model="user.confirmated_password"
      :type="show2 ? 'text' : 'password'"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show2 = !show2"
      outlined
      :single-line="errorPass"
      :hide-details="errorPass"
      :rules="passConfirmRules"
      label="Confirmar senha"
    ></v-text-field>
    <span
      class="error-msg"
      :class="{
        'd-none ': !errorPass,
      }"
      >As senhas não coincidem</span
    >

    <v-alert
      :class="{
        'd-none ': formErrorTab1,
      }"
      color="error"
      icon="mdi-alert"
      dismissible
      outlined
    >
      Preencha todos os campos obrigatórios
    </v-alert>
    <div>
      <v-btn
        :loading="loading"
        block
        large
        color="#765eda"
        dark
        @click="nextAddress()"
        >Confirmar</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  mounted() {
    this.onResize();
    if (localStorage.name) {
      this.user = localStorage.user;
    }
  },
  data: () => ({
    loading: false,
    msgError: "",
    nameRules: [(v) => !!v || "Digite seu nome"],
    passRules: [(v) => !!v || "Digite uma senha"],
    passConfirmRules: [(v) => !!v || "Confirme sua senha"],

    user: {
      name: "",
      login: "",
      password: "",
    },
    lat: "",
    long: "",
    address: "",
    successEdit: false,
    error: false,
    numberVerify: Boolean,
    menu: false,
    dateFormat: null,
    maxDate: new Date().toISOString().substr(0, 10),
    windowSize: {
      x: 0,
      y: 0,
    },
    isActive: false,
    activeTab: 0,
    errorPass: false,
    formErrorTab1: true,
    formErrorTab2: true,
    twoTab: true,
    threeTab: true,
    errorTel: false,
    promisse: null,
    errorTelMessage: "",
    show1: false,
    show2: false,
    loadingConfirmCell: false,
    loadingConfirmCode: false,
    errorCode: false,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    getCoords() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getAdressByCoords);
      }
    },

    register() {
      axios({
        url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/user",
        method: "post",
        data: this.user,
      }).then(() => {
        this.$router.push({
          name: "success-process",
          params: {
            title: "Cadastro realizado com sucesso",
            message:
              "Faça o login na sua nova conta para se conectar com o mix ",
          },
        });
      });
    },
    sendSms() {
      this.loadingConfirmCell = true;
      if (!this.user.phone) {
        this.errorTel = true;
        this.loadingConfirmCell = false;
      } else {
        axios({
          url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/sms",
          method: "post",
          data: {
            phone: this.user.phone,
          },
        })
          .then(() => {
            this.sendSMS = true;
            this.loadingConfirmCell = false;
          })
          .catch((error) => {
            if (error.response.data[0]) {
              this.errorTelMessage = error.response.data[0].message;
              this.errorTel = true;
              this.loadingConfirmCell = false;
            } else {
              this.errorTelMessage = error.response.data.message;
              this.errorTel = true;
              this.loadingConfirmCell = false;
            }
          });
      }
    },
    confirmSms() {
      this.loadingConfirmCode = true;
      let phone = this.user.phone.replace(/[&\\#,+()$~%.'":*?<>{}-]/g, "");
      phone = phone.split(" ").join("");
      axios({
        url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/sms-verify",
        method: "post",
        data: {
          phone: phone,
          code_sms: this.code_sms,
        },
      })
        .then(() => {
          this.loadingConfirmCode = false;
          this.register();
        })
        .catch(() => {
          this.errorCode = true;

          this.loadingConfirmCode = false;
        });
    },

    onResize() {
      this.windowSize = {
        x: window.innerWidth,
        y: window.innerHeight,
      };
    },
    save(date) {
      this.$refs.menu.save(date);
      const [year, day, month] = date.toLocaleString().split("-");
      this.dateFormat = new Date(`${day}/${month}/${year}`)
        .toLocaleString("pt-br")
        .substr(0, 10);
    },
    nextAddress() {
      let next = true;
      if (
        !this.user.name ||
        !this.user.password ||
        !this.user.email ||
        !this.user.birthday
      ) {
        next = false;
      }

      if (this.user.password !== this.user.confirmated_password) {
        this.errorPass = true;
        next = false;
      }

      if (next) {
        axios({
          url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/verify-email",
          method: "post",
          data: {
            email: this.user.email,
          },
        })
          .then(() => {
            this.activeTab = 1;
            this.twoTab = false;
          })
          .catch((error) => {
            if (error.response.data[0]) {
              this.msgError = error.response.data[0].message;
              this.isActive = true;
            } else {
              this.msgError = error.response.data.message;
              this.isActive = true;
            }
          });
      } else {
        this.formErrorTab1 = false;
      }
    },

    backProfile() {
      this.activeTab = 0;
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
