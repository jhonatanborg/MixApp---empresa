<template>
  <v-app-bar dark color="#765eda" app flat id="app-bar">
    <v-btn dense :to="'/'" :ripple="false" text
      ><v-icon>mdi-food</v-icon><b>Mix</b></v-btn
    >
    <v-spacer></v-spacer>

    <div class="hidden-sm-and-down" dense>
      <v-btn rounded text large v-if="address" @click="openDialogAddress()">
        <v-icon class="mr-3">mdi-map-marker-radius</v-icon>
        {{ address.street }}, {{ address.number }} - {{ address.city }}
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-btn
        rounded
        large
        text
        v-else
        @click="$store.commit('alertAddress', true)"
      >
        <v-icon class="mr-3">mdi-map-marker-radius</v-icon>
        Localização
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>

      <v-btn
        v-if="sale.length > 0"
        class="mr-3"
        rounded
        @click="$store.commit('cart/sidebar', true)"
      >
        <v-icon class="mr-2">mdi-basket-outline</v-icon>Sacola
        <b class="notify">{{ sale.length }}</b>
      </v-btn>
    </div>
    <div class="hidden-sm-and-down mr-3">
      <div v-if="LoginUser">
        <v-btn rounded large dense :to="{ name: 'session' }" text
          >Iniciar sessão
        </v-btn>
      </div>
      <div v-else>
        <MenuUser :user="user" />
      </div>
    </div>
    <div class="hidden-lg-and-up hidden-lg-only">
      <v-icon @click="$store.commit('mobile/mobileMenu')" color="white"
        >mdi-menu</v-icon
      >
    </div>
  </v-app-bar>
</template>

<script>
import { Bus } from "@/plugins/Bus";
import MenuUser from "@/components/MenuUser";

export default {
  name: "MenuBar",

  props: {
    widht: Number,
  },
  components: {
    MenuUser,
  },
  created() {
    this.getLocal();
    Bus.$on("success-login", () => {
      this.sessionUserVerify();
    });
  },
  mounted() {
    Bus.$on("success-login", () => {
      this.sessionUserVerify();
    });
    this.getLocal();

    this.sessionUserVerify();
  },
  data: () => ({
    shoppingCart: true,
    deliveryFee: 15.5,
    saleItemsLocal: null,
    qtditem: " 1",
    LoginUser: true,
    MenuUser: Boolean,
    menuMobile: false,
    login: true,
    active: false,
    messages: 3,
  }),
  computed: {
    address() {
      return this.$store.state.user.address;
    },
    user() {
      return this.$store.state.user.userProfile;
    },
    sale() {
      return this.$store.state.cart.saleIdb;
    },
  },
  watch: {
    user(value) {
      this.$store.commit("user/setUserName", value.name);
    },
  },
  methods: {
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
    execRequest(action, state, url, method, insert, data = null) {
      this.$store.dispatch(action, {
        state: state,
        method: method,
        url: url,
        insert,
        data,
      });
    },
    getLocal() {
      if (localStorage.getItem("geolocation")) {
        let coords = JSON.parse(localStorage.getItem("geolocation"));
        this.execRequest("user/request", "address", "/coord", "POST", true, {
          lat: coords.latitude,
          long: coords.longitude,
        });
      } else {
        this.$store.commit("alertAddress", true);
      }
    },
    openDialogAddress() {
      this.$store.commit("alertAddress", { value: true, route: "home" });
      if (localStorage.getItem("acess-token")) {
        this.$store.commit("user/request", { state: "addressTabs", data: 3 });
      } else {
        this.$store.commit("user/request", { state: "addressTabs", data: 1 });
      }
    },
  },
};
</script>

<style>
.input-name {
  width: 20px;
  height: 5px;
}
.active {
  width: 100% !important;
}
#menu {
  font-size: 14px;
}
#app-bar {
  height: 50px;
  font-family: Montserrat;
}
.subheader {
  font-size: 13px;
  color: grey;
}
.price-item {
  font-size: 18px;
  color: grey;
}
#cupom {
  font-size: 12px !important;
}
.notify {
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  width: 20px;
  height: 20px;
  background-color: #ff6b6b;
  font-size: 13px;
  line-height: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #fff;
  font-weight: 700;
}
</style>
