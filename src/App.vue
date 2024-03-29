<template>
  <v-app id="App" class="app grey lighten-3 ">
    <MenuMobile />
    <NotifyPhoneRequired />

    <v-main class="bar">
      <Address @close-dialog="closeDialog" />
      <SaleError />
      <Main />
      <router-view />
      <v-dialog
        max-width="400px"
        :value="updateExists"
        persistent
        transition="dialog-transition"
      >
        <v-card class="fill-height " height="100%">
          <div class="pa-5">
            <v-row justify="center" align="center">
              <v-col cols="auto">
                <div>
                  <v-img
                    width="100"
                    src="@/assets/images/notify/notification.svg"
                  ></v-img>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="title-notify text-center">
                  <h3>Nova versão</h3>
                </div>
                <div class="details-notify text-center">
                  <span
                    >Existe uma nova versão disponivel. <br />
                    Clique em atualizar</span
                  >
                </div>
              </v-col>
              <v-col cols="12">
                <v-btn
                  x-large
                  block
                  depressed
                  dark
                  color="#5530E5"
                  @click="refreshApp"
                  ><b>Atualizar</b></v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>
<script>
import Main from "@/components/sale/Main";
import MenuMobile from "@/components/mobile/shared/MenuMobile";
import Address from "@/components/address/Main.vue";
import SaleError from "@/components/sale/SaleError";
import NotifyPhoneRequired from "@/components/user/profile/notifyPhone/NotifyPhoneRequired";

export default {
  name: "App",
  components: {
    Address,
    SaleError,
    MenuMobile,
    Main,
    NotifyPhoneRequired,
  },
  mounted() {
    this.getSaleIdb();
    this.listDataCompany();
    if (!window.navigator.onLine) {
      this.$router.push({ name: "error" });
    }
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
      });
    }
  },
  data: () => ({
    dialogStep: null,
    updateExists: false,
    refreshing: false,
    registration: null,
  }),
  computed: {
    addressAlert() {
      return this.$store.state.addressAlert;
    },
    user() {
      return this.$store.state.user.userProfile;
    },
  },
  watch: {
    user(value) {
      if (value && !value.phone) {
        this.$store.commit("user/setModalPhoneRequired", true);
      }
    },
  },
  methods: {
    execRequest(action, state, url, method, insert, data = null) {
      this.$store.dispatch(action, {
        state: state,
        method: method,
        url: url,
        insert,
        data,
      });
    },
    getSaleIdb() {
      this.$store.dispatch("cart/request", {
        state: "saleIdb",
        method: "getAll",
        idb: {
          table: "sale",
        },
      });
    },
    dialogView(item) {
      this.dialogStep = item;
    },
    closeDialog() {
      this.alertAddress = !this.alertAddress;
    },
    listDataCompany() {
      if (localStorage.getItem("geolocation")) {
        let coords = JSON.parse(localStorage.getItem("geolocation"));
        const payload = {
          state: "company",
          method: "get",
          url: `/company-show/${this.$store.state.domain},${coords.latitude},${coords.longitude}`,
          insert: true,
        };
        this.execRequest("user/request", "address", "/coord", "POST", true, {
          lat: coords.latitude,
          long: coords.longitude,
        });
        this.$store
          .dispatch("company/request", payload)
          .then((resp) => {
            document.title = resp.data.name;
          })
          .catch(() => {
            console.log("erro com coord");
          });
      } else {
        const payload = {
          state: "company",
          method: "get",
          url: `/company-show-one/${this.$store.state.domain}`,
          insert: true,
        };
        this.$store
          .dispatch("company/request", payload)
          .then((resp) => {
            document.title = resp.data.name;
          })
          .catch(() => {
            console.log("erro sem coord");
          });
      }
    },
    showRefreshUI(e) {
      // Display a button inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.updateExists = true;
    },
    refreshApp() {
      // Handle a user tap on the update app button.
      this.updateExists = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    },
  },
};
</script>
<style>
#App {
  font-family: "Monda", sans-serif !important;
  overflow-x: hidden;
  background-color: #fafafa;
  color: #293040 !important;
}

/* body ::-webkit-scrollbar {
  display: contents;
  visibility: hidden !important;
} */
.v-btn {
  text-transform: none !important;
}
.sale {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
