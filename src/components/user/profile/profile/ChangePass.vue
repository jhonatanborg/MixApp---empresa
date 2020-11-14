<template>
  <div>
    <div class="py-1">
      <h3>Alterar senha</h3>
    </div>
    <div class="pa-1">
      <div>
        <v-text-field
          autocomplete="new-password"
          :rules="passRules"
          outlined
          v-model="oldPassword"
          :error="errorPassOld"
          :error-messages="errorPassOld ? msgErrorOldPass : ''"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          label="Digite sua senha antiga"
        ></v-text-field>
        <span
          >Escolha uma senha forte e não a reutilize em outras contas. Utilize
          no mínimo 8 caracteres</span
        >
        <v-text-field
          v-model="newPassword"
          autocomplete="new-password"
          :rules="passRules"
          outlined
          :error="errorPass"
          :error-messages="errorPass ? msgError : ''"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
          label="Nova senha"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="newPassConfirm"
          :error="errorPass"
          :error-messages="errorPass ? msgError : ''"
          autocomplete="new-password"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
          :single-line="errorPass"
          :hide-details="errorPass"
          :rules="passRules"
          label="Confirmar senha"
        ></v-text-field>
      </div>

      <div id="buttons-login">
        <v-row>
          <v-col>
            <v-btn class="pa-1" text @click="$router.go(-1)" color="primary"
              >Cancelar</v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              dark
              :loading="loader"
              @click="save()"
              depressed
              block
              color="#ffa602"
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
      oldPassword: null,
      newPassword: null,
      newPassConfirm: null,
      errorPass: false,
      msgError: null,
      msgErrorOldPass: null,
      errorPassOld: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user.userProfile || {};
    },
  },
  methods: {
    save() {
      this.loader = true;
      let next = true;
      if (!this.newPassword && !this.newPassConfirm) {
        this.errorPass = true;
        this.msgError = "Digite uma nova senha";
        next = false;
        this.loader = false;
      }
      if (!this.oldPassword) {
        this.errorPassOld = true;
        this.msgErrorOldPass = "Digite sua senha antiga";
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
          url:
            process.env.VUE_APP_BASE_URL_SERVER_LOCAL +
            "/user-client/" +
            this.user.id,
          method: "PUT",
          headers: null || {
            Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
          },
          data: {
            oldPassword: this.oldPassword,
            password: this.newPassword,
          },
        })
          .then(() => {
            this.$router.go(-1);
          })
          .catch((err) => {
            if (err.response.data[0]) {
              this.errorPassOld = true;
              this.msgErrorOldPass = err.response.data[0].message;
              this.loader = false;
            } else {
              this.errorPassOld = true;
              this.msgErrorOldPass = err.response.data.message;
              this.loader = false;
            }
          });
      }
    },
  },
};
</script>

<style></style>
