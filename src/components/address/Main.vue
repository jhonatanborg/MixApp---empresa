<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :value="$store.state.addressAlert"
    persistent
    class="pa-0"
    width="100%"
    max-width="700px"
  >
    <v-card width="100%">
      <v-toolbar flat height="80px" dark color="primary">
        <v-toolbar-title
          ><div>
            <span>
              {{ currentTitle }}
            </span>
          </div>
          <div>
            <small>Esse será o endereço de entrega</small>
          </div></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn
          dark
          v-if="addressStep != 5"
          @click.stop="
            $store.commit('alertAddress', { value: false, route: 'home' }),
              (error = false)
          "
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-window touchless v-model="addressStep">
        <v-window-item class="px-0 py-0" :value="1">
          <Search @next-register="controlsTabs" />
        </v-window-item>
        <v-window-item class="px-0 py-0" :value="2">
          <Map @return-start="controlsTabs" @confirm-address="controlsTabs" />
        </v-window-item>
        <v-window-item class="px-0 py-0" :value="3">
          <Register @return="controlsTabs" />
        </v-window-item>
        <v-window-item class="px-0 py-0" :value="4">
          <List @new-address="controlsTabs" @error-address="controlsTabs" />
        </v-window-item>
        <v-window-item class="px-0 py-0" :value="5">
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
          return "Arraste o mapa para ajustar";
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
