<template>
  <v-navigation-drawer width="100%" :value="$store.state.mobile.mobileMenu" app>
    <v-card flat>
      <v-list>
        <v-list-item>
          <v-avatar size="50">
            <v-img
              src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            ></v-img>
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title class="ml-2">
              Olá, <b>Jhonatan</b></v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              @click="$store.commit('mobile/mobileMenu')"
              small
              outlined
              color="error"
            >
              Fechar <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          class="mt-3"
          color="#765eda"
          :to="{
            name: 'profile',
            params: { user: 1, userRouter: 1 },
          }"
        >
          Informações de conta
        </v-list-item>
        <v-list-item color="#765eda" :to="{ name: 'purchaseprofile' }" link>
          Minha Carteira
        </v-list-item>
        <v-list-item color="#765eda" :to="{ name: 'address' }" link>
          Meus endereços
        </v-list-item>

        <v-list-item color="#765eda" :to="{ name: 'purchaseprofile' }" link>
          Meus pedidos
        </v-list-item>
        <v-list-item :to="{ name: 'address' }" link>
          Segurança
        </v-list-item>
        <v-list-item link>
          Ajuda
        </v-list-item>
        <v-list-item>
          <v-btn block @click="logout()" outlined color="error"
            >Encerrar sessão</v-btn
          >
        </v-list-item>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" },
      ],
      right: null,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.go();
    },
  },
};
</script>

<style></style>
