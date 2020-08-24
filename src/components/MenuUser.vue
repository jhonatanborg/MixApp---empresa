<template>
  <div id="menu-login">
    <v-menu v-if="userName" flat min-width="300px" close-on-click offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          rounded
          text
          v-on="on"
          v-text="'Olá, ' + userName[0].toUpperCase() + userName.slice(1)"
        >
          <v-icon class="mr-2">mdi-account-outline</v-icon>
        </v-btn>
      </template>
      <v-card id="login-sucess">
        <div id="unplugged" class="">
          <div class="text-center">
            <v-list>
              <v-list-item>
                <div class="d-flex justify-space-between align-center">
                  <v-avatar size="60">
                    <v-img
                      width="100%"
                      src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    ></v-img>
                  </v-avatar>
                  <div class="ml-2">
                    Olá,
                    <b v-text="userName[0].toUpperCase() + userName.slice(1)">
                    </b>
                  </div>
                </div>
              </v-list-item>
              <v-list-item
                class="mt-3"
                color="#765eda"
                :to="{
                  name: 'profile',
                  params: { userRouter: user },
                }"
              >
                Informações de conta
              </v-list-item>
              <v-list-item color="#765eda" :to="{ name: 'cashback' }" link>
                Cashback
              </v-list-item>
              <v-list-item color="#765eda" :to="{ name: 'address' }" link>
                Meus Endereços
              </v-list-item>
              <v-list-item color="#765eda" :to="{ name: 'purchases' }" link>
                Meus Pedidos
              </v-list-item>
              <v-list-item link>
                Segurança
              </v-list-item>
              <v-list-item link>
                Ajuda
              </v-list-item>
              <v-list-item>
                <v-btn block @click="logout()" outlined color="error"
                  >Encerrar sessão
                </v-btn>
              </v-list-item>
            </v-list>
          </div>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  computed: {
    userName() {
      return this.$store.state.user.userName;
    },
  },
  methods: {
    logout() {
      const payload = {
        idb: {
          table: "sale",
        },
        method: "deleteAll",
      };
      this.$store.dispatch("cart/request", payload);
      this.$store.dispatch("cart/request", {
        state: "saleIdb",
        method: "getAll",
        idb: {
          table: "sale",
        },
      });
      localStorage.clear();
      this.$router.go();
    },
  },
};
</script>

<style></style>
