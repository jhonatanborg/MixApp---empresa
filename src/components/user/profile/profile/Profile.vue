<template>
  <div>
    <v-toolbar class="ma-0" flat color="white">
      <v-toolbar-title class="ma-0">
        Perfil
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="ma-0"
        text
        color="primary"
        outlined
        :to="{ name: 'change-user' }"
      >
        Editar
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row class="d-flex justify-space-between">
      <v-col cols="12" sm="12">
        <v-list three-line>
          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Nome</v-list-item-subtitle>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Login</v-list-item-subtitle>
              <v-list-item-title>{{ user.login }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Nº Telefone</v-list-item-subtitle>
              <v-list-item-title>{{ user.phone }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Senha</v-list-item-subtitle>
              <v-list-item-title>*********</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                :to="{ name: 'change-pass' }"
                class="ma-0"
                small
                text
                color="primary"
                outlined
              >
                Alterar
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    user() {
      return this.$store.state.user.userProfile || {};
    },
  },

  methods: {
    formatBirthday(date) {
      if (date) {
        return date
          .substr(0, 10)
          .split("-")
          .reverse()
          .join("/");
      }
    },
  },
};
</script>

<style>
.subtitle-large {
  font-size: 16px;
}

.price {
  font-size: 16px;
}

.description-product {
  font-size: 14px;
}

.edit-title {
  font-size: 14px;
}
</style>
