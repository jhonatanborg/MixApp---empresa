<template>
  <v-navigation-drawer width="100%" :value="$store.state.mobile.mobileMenu" app>
    <v-card flat>
      <v-list v-if="LoginUser">
        <v-list-item>
          <div class="d-flex justify-space-between align-center">
            <div class="ml-2">
              Olá, {{ userName }}
              <b> </b>
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
          Informações de conta </v-list-item
        >;
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
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      LoginUser: false,
    };
  },
  computed: {
    userName() {
      return this.$store.state.user.userName;
    },
    user() {
      return this.$store.state.user.userProfile;
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
  sessionUserVerify() {
    if (localStorage.getItem("acess-token")) {
      this.LoginUser = false;
      const payload = {
        state: "userProfile",
        method: "get",
        url: "/my-profile",
        insert: true,
      };
      this.$store.dispatch("user/request", payload);
    } else {
      this.LoginUser = true;
    }
  },
};
</script>

<style></style>
