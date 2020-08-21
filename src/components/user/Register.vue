<template>
  <v-card color="transparent" outlined flat>
    <div class="py-1">
      <h4 class="px-2">
        Olá! Crie uma conta para ter todos os nossos serviços
      </h4>
    </div>

    <v-tabs v-model="activeTab" grow>
      <v-tab active-class="tabs__item--active ">Dados Pessoais</v-tab>
      <v-tab active-class="tabs__item--active" :disabled="twoTab"
        >Endereço</v-tab
      >
      <v-tab active-class="tabs__item--active " :disabled="threeTab"
        >Confirmação</v-tab
      >
      <v-tabs-items class="card-login" v-model="activeTab">
        <v-tab-item>
          <div>
            <div class="pt-4">
              <v-text-field
                color="#765eda"
                v-model="user.name"
                dense
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
                dense
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
                dense
                :rules="passRules"
                outlined
                label="Senha"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
              ></v-text-field>
            </div>
            <div :class="{ 'mb-3': errorPass }">
              <v-text-field
                color="#765eda"
                v-model="user.confirmated_password"
                dense
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
            </div>

            <div>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="290px"
                origin="center center"
                color="#765eda"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    dense
                    v-model="dateFormat"
                    label="Data de nascimento"
                    readonly
                    v-on="on"
                    color="#765eda"
                    outlined
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="#765eda"
                  ref="picker"
                  locale="pt-br"
                  v-model="user.birthday"
                  :max="maxDate"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </div>
            <v-alert
              :class="{
                'd-none ': formErrorTab1,
              }"
              color="error"
              icon="mdi-alert"
              dismissible
              outlined
              dense
            >
              Preencha todos os campos obrigatórios
            </v-alert>
            <div>
              <v-btn block x-large color="#765eda" @click="nextAddress()" large
                >Avançar</v-btn
              >
            </div>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div v-if="!successEdit">
            <div class="text-center my-3">
              <h4>
                <b>
                  Informe sua localização
                </b>
              </h4>
            </div>
            <v-row>
              <v-col cols="12" sm="9">
                <v-text-field
                  clearable
                  color="#765eda"
                  outlined
                  dense
                  hide-details
                  v-model="user.address.street"
                  label="Rua"
                  placeholder="Ex: Rua dos papiros"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  clearable
                  hide-details
                  color="#765eda"
                  outlined
                  dense
                  v-model="user.address.number"
                  label="Nº"
                  placeholder="Ex: 36"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  clearable
                  color="#765eda"
                  outlined
                  dense
                  hide-details
                  v-model="user.address.district"
                  label="Bairro"
                  placeholder="Ex: Residencial Sul"
                ></v-text-field>
              </v-col>
              <div v-if="error" class="">
                <v-col cols="12" sm="12">
                  <v-text-field
                    clearable
                    color="#765eda"
                    outlined
                    dense
                    hide-details
                    v-model="user.address.cep"
                    label="Cep"
                    placeholder="Ex: 78550-041"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="py-0">
                  <v-alert close type="error" dense>
                    Endereço não encontrado, informe o cep e cidade para
                    aumentar a precisão
                  </v-alert>
                </v-col>
              </div>

              <v-col cols="12" sm="12">
                <v-btn
                  x-large
                  @click="getAddressByString()"
                  block
                  color="#765eda"
                >
                  Confirmar
                </v-btn>
              </v-col>

              <v-col cols="12" sm="12">
                <v-btn
                  x-large
                  @click="backProfile()"
                  block
                  outlined
                  color="error"
                >
                  Voltar
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div v-if="successEdit">
            <div class="my-3">
              <h4>
                <b>
                  Confirmar Localização
                </b>
              </h4>
            </div>
            <div v-if="successEdit">
              <v-row>
                <v-col class="py-0">
                  <v-alert
                    class="my-3"
                    :type="numberVerify ? 'success' : 'error'"
                    dense
                  >
                    {{ user.address.street }}, {{ user.address.number }} -
                    {{ user.address.district }} {{ user.address.city }},
                    {{ user.address.state }}
                  </v-alert>
                </v-col></v-row
              >
              <v-row class="my-5">
                <v-col class="py-0" cols="12" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details
                    v-model="user.address.title"
                    label="Titulo"
                    placeholder="Casa"
                    color="#765eda"
                  ></v-text-field>
                </v-col>
                <v-col class="py-0">
                  <v-text-field
                    outlined
                    dense
                    hide-details
                    v-model="user.address.complement"
                    label="Complemento"
                    placeholder="Ex: Esquina com a mercearia"
                    color="#765eda"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-btn x-large block color="#765eda" @click="nextTel()"
                    >Confirmar</v-btn
                  >
                </v-col>
                <v-col cols="12" sm="12">
                  <v-btn
                    large
                    block
                    outlined
                    color="error"
                    @click="successEdit = !successEdit"
                    dark
                    >Voltar</v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="py-5">
            <div v-if="!sendSMS">
              <div class=" my-5">
                <h4>
                  Informe um telefone válido. Enviaremos um código de
                  verificação
                </h4>
              </div>
              <div>
                <v-text-field
                  :rules="numberRules"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                  v-model="user.phone"
                  :value="user.phone"
                  min-widht="100px"
                  dense
                  :error-messages="errorTelMessage"
                  :error="errorTel"
                  color="#765eda"
                  outlined
                  label="Telefone"
                ></v-text-field>
              </div>
              <div>
                <v-btn color="#765eda" block @click="sendSms()" x-large
                  >Enviar</v-btn
                >
              </div>
            </div>
            <div v-else>
              <div>
                <div class="my-5">
                  <span>Seu telefone:</span>
                  <h3>{{ user.phone }}</h3>
                  <h4>
                    <v-btn block text @click="sendSMS = false"
                      >Editar o número de telefone</v-btn
                    >
                  </h4>
                </div>
                <div>
                  <h5>
                    Enviamos o código sms em seu dispositivo. Por favor, insira
                    o código abaixo.
                  </h5>
                  <v-text-field
                    v-model="code_sms"
                    min-widht="100px"
                    dense
                    color="#765eda"
                    outlined
                    label="Insira o código"
                  ></v-text-field>
                </div>
              </div>
              <v-btn dense block color="#765eda" @click="confirmSms()" dark
                >Verificar Código</v-btn
              >
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
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
    emailRules: [
      (v) => !!v || "Digite seu e-mail",
      (v) => /.+@.+/.test(v) || "E-mail inválido",
    ],
    msgError: "",
    nameRules: [(v) => !!v || "Digite seu nome"],
    passRules: [(v) => !!v || "Digite uma senha"],
    passConfirmRules: [(v) => !!v || "Confirme sua senha"],
    numberRules: [(v) => !!v || "Digite telefone"],
    sendRegister: false,
    sendSMS: false,
    code_sms: "",
    user: {
      name: "Jorge",
      email: "jorge@gmail.com",
      password: "0101",
      confirmated_password: "0101",
      phone: "66999769452",
      birthday: null,
      address: {
        cep: "",
        district: "Residencial Sul",
        city: "",
        state: " ",
        street: "Rua papiros",
        number: "36",
        title: "",
        complement: "",
      },
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

    getAddressByString() {
      if (
        this.user.address.street &&
        this.user.address.number &&
        this.user.address.district
      ) {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/coord-address`,
          data: {
            address: `${this.user.address.street}, ${this.user.address.number},${this.user.address.district}, ${this.user.address.cep}`,
          },
        })
          .then((resp) => {
            if (resp.data.street && resp.data.number && resp.data.district) {
              this.user.address = resp.data;

              this.successEdit = true;
            } else {
              this.error = true;
            }
          })
          .catch(() => {
            this.error = true;
          });
      } else {
        this.error = true;
      }
    },
    register() {
      axios({
        url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/user",
        method: "post",
        data: this.user,
      }).then((response) => {
        localStorage.setItem("acess-token", response.data.user.token);
        this.$router.go(-1);
      });
    },
    sendSms() {
      if (!this.user.phone) {
        this.errorTel = true;
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
          })
          .catch((error) => {
            if (error.response.data[0]) {
              this.errorTelMessage = error.response.data[0].message;
              this.errorTel = true;
            } else {
              this.errorTelMessage = error.response.data.message;
              this.errorTel = true;
            }
          });
      }
    },
    confirmSms() {
      let phone = this.user.phone.replace(/[&\\#,+()$~%.'":*?<>{}-]/g, "");
      phone = phone.split(" ").join("");
      axios({
        url: process.env.VUE_APP_BASE_URL_SERVER_LOCAL + "/sms-verify",
        method: "post",
        data: {
          phone: phone,
          code_sms: this.code_sms,
        },
      }).then(() => {
        this.sendSMS = false;
        this.sendRegister = true;
        this.register();
      });
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
    nextTel() {
      let next = true;
      if (
        !this.user.address.cep ||
        !this.user.address.district ||
        !this.user.address.city ||
        !this.user.address.street ||
        !this.user.address.title
      ) {
        next = false;
      }
      if (!this.user.address.number) {
        next = false;
        this.isActive = true;
      }

      if (next) {
        this.activeTab = 2;
      } else {
        this.formErrorTab2 = false;
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
