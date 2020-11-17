<template>
  <div>
    <v-toolbar class="ma-0" flat color="white">
      <v-toolbar-title class="ma-0">
        Perfil
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row class="d-flex justify-space-between ">
      <v-col cols="12" sm="12">
        <div class="subtitle-large">
          <v-text-field
            label="Nome"
            outlined
            dense
            v-model="user.name"
          ></v-text-field>
        </div>
        <div class="subtitle-large">
          <v-text-field
            label="Login"
            outlined
            dense
            disabled
            v-model="user.login"
          ></v-text-field>
        </div>

        <div class="subtitle-large">
          <v-text-field
            label="Telefone"
            outlined
            v-mask="['(##) ####-####', '(##) #####-####']"
            dense
            v-model="user.phone"
          ></v-text-field>
        </div>
        <v-row>
          <v-col>
            <v-btn :to="{ name: 'profile' }" large color="error" outlined
              >Cancelar</v-btn
            ></v-col
          >
          <v-col>
            <v-btn @click="changeUser()" large block color="#FFBA0A" dark
              >Salvar
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.userProfile || {};
    },
  },
  methods: {
    changeUser() {
      const payload = {
        state: "user",
        method: "PUT",
        url: "/user/" + this.user.id,
        insert: true,
        data: this.user,
      };
      this.$store.commit("user/setUserName", this.user.name);
      this.$store.dispatch("user/request", payload);
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
