<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :value="$store.state.addressAlert"
    persistent
    max-width="700px"
  >
    <v-card tile>
      <v-toolbar color="#765eda" height="80" flat>
        <v-flex class="white--text">
          <div>
            <span>
              {{ currentTitle }}
            </span>
          </div>
          <div>
            <small>Esse será o endereço de entrega</small>
          </div>
        </v-flex>

        <v-spacer></v-spacer>
        <v-btn
          v-if="addressStep != 5"
          @click.stop="
            $store.commit('alertAddress', { value: false, route: 'home' }),
              (error = false)
          "
          icon
          color="white"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-window class="py-5" v-model="addressStep">
        <v-window-item class="px-3 py-0" :value="1">
          <Search @next-register="controlsTabs" />
        </v-window-item>
        <v-window-item class="px-3 py-0" :value="2">
          <Map @return-start="controlsTabs" @confirm-address="controlsTabs" />
        </v-window-item>
        <v-window-item class="px-3 py-0" :value="3">
          <Register @return="controlsTabs" />
        </v-window-item>
        <v-window-item class="px-3 py-0" :value="4">
          <List @new-address="controlsTabs" @error-address="controlsTabs" />
        </v-window-item>
        <v-window-item class="px-3 py-0" :value="5">
          <Error @return-list="controlsTabs" />
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script>
import Search from "@/components/address/register/SearchAddress.vue";
import Map from "@/components/address/map/LocalMap.vue";
import Register from "@/components/address/register/RegisterAddress.vue";
import List from "@/components/address/user/ListAddress.vue";
import Error from "@/components/address/register/ErrorAddress.vue";
export default {
  components: {
    Search,
    Map,
    Register,
    List,
    Error,
  },
  computed: {
    currentTitle() {
      switch (this.addressStep) {
        case 1:
          return "Informe sua localização";
        case 2:
          return "Entregar em:";
        case 3:
          return "Confirmar endereço:";
        case 4:
          return "Seus endereços";
        default:
          return "";
      }
    },
    addressStep: {
      get() {
        return this.$store.state.user.addressTabs;
      },
      set() {},
    },
  },
  methods: {
    controlsTabs(value) {
      this.$store.commit("user/request", { state: "addressTabs", data: value });
    },
  },
};
</script>

<style></style>
