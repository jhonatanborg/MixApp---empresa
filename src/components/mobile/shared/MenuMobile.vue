<template>
  <v-navigation-drawer
    @input="hiden"
    v-if="user && $vuetify.breakpoint.smAndDown"
    :value="$store.state.mobile.mobileMenu"
    app
  >
    <v-card flat>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <div class="ml-2">
              Olá, {{ userName }}
              <b> </b>
            </div>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              @click="$store.commit('mobile/mobileMenu', false)"
              icon
              small
              color="error"
            >
              <v-icon size="20">mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
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
        <!-- <v-list-item color="#765eda" :to="{ name: 'cashback' }" link>
          Cashback
        </v-list-item> -->
        <v-list-item color="#765eda" :to="{ name: 'address' }" link>
          Meus Endereços
        </v-list-item>
        <v-list-item color="#765eda" :to="{ name: 'purchases' }" link>
          Meus Pedidos
        </v-list-item>
        <!-- <v-list-item link>
          Segurança
        </v-list-item>
        <v-list-item link>
          Ajuda
        </v-list-item> -->
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
    hiden(event) {
      if (!event) {
        this.$store.commit("mobile/mobileMenu", false);
      } else this.$store.commit("mobile/mobileMenu", true);
    },
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
    sessionUserVerify() {
      if (localStorage.getItem("acess-token")) {
        const payload = {
          state: "userProfile",
          method: "get",
          url: "/my-profile-client",
          insert: true,
        };
        this.$store.dispatch("user/request", payload);
      } else {
        this.$router.push({ name: "session" });
      }
    },
  },
};
</script>

<style></style>
