<template>
  <div class="">
    <v-app-bar app id="app-bar" flat>
      <v-btn dense :to="'/'" :ripple="false" text
        ><b>{{ company.name }}</b></v-btn
      >
      <v-spacer></v-spacer>

      <div class="hidden-sm-and-down" dense>
        <v-btn rounded text large v-if="address" @click="openDialogAddress()">
          <v-icon class="mr-3">mdi-map-marker-radius</v-icon>
          {{ address.street }}, {{ address.number }} - {{ address.city }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
        <v-btn rounded large text v-else @click="openDialogAddress()">
          <v-icon class="mr-3">mdi-map-marker-radius</v-icon>
          Localização
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>

        <v-btn
          v-if="sale.length > 0"
          class="mr-3 animate__animated animate__pulse animate__infinite"
          rounded
          @click="openSale()"
          color="#FFBA0A"
        >
          <v-icon class="mr-2">mdi-basket-outline</v-icon>Sacola
          <b class="notify">{{ sale.length }}</b>
        </v-btn>
      </div>
      <div class="hidden-sm-and-down mr-3">
        <div v-if="!user">
          <v-btn rounded large dense :to="{ name: 'session' }" text
            >Iniciar sessão
          </v-btn>
        </div>
        <div v-else>
          <MenuUser :user="user" />
        </div>
      </div>
      <div v-if="$vuetify.breakpoint.smAndDown">
        <v-icon @click="openMenuMobile()" color="black">mdi-menu</v-icon>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import MenuUser from "@/components/shared/MenuUser";

export default {
  name: "MenuBar",
  props: {
    widht: Number,
  },
  components: {
    MenuUser,
  },

  mounted() {
    this.sessionUserVerify();

    this.getLocal();
  },
  data: () => ({
    shoppingCart: true,
    deliveryFee: 15.5,
    saleItemsLocal: null,
    qtditem: " 1",
    LoginUser: false,
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
    company() {
      localStorage.setItem(
        "company",
        JSON.stringify(this.$store.state.company)
      );
      return this.$store.getters["company/getCompany"] || {};
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
        const payload = {
          state: "userProfile",
          method: "get",
          url: "/my-profile-client",
          insert: true,
        };
        this.$store
          .dispatch("user/request", payload)
          .catch(() => localStorage.removeItem("acess-token"));
      }
    },
    openMenuMobile() {
      if (localStorage.getItem("acess-token")) {
        const payload = {
          state: "userProfile",
          method: "get",
          url: "/my-profile-client",
          insert: true,
        };
        this.$store
          .dispatch("user/request", payload)
          .then(() => this.$store.commit("mobile/mobileMenu", true))
          .catch(() => {
            localStorage.removeItem("acess-token");
            this.$router.push({ name: "session" });
          });
      } else this.$router.push({ name: "session" });
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
      this.$store.commit("alertAddress", { value: true });
      if (localStorage.getItem("acess-token")) {
        this.$store.commit("user/request", { state: "addressTabs", data: 4 });
      } else {
        this.$store.commit("user/request", { state: "addressTabs", data: 1 });
      }
    },
    openSale() {
      console.log("sale");
      this.$store.commit("cart/sidebar", { open: true, step: 2 });
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
  background-color: #1a0c0c;
  font-size: 13px;
  line-height: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #fff;
  font-weight: 700;
}
</style>
