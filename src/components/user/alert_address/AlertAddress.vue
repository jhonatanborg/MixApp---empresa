<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :value="$store.state.addressAlert"
    persistent
    scrollable
    max-width="550px"
  >
    <v-card>
      <v-toolbar flat dense>
        <v-toolbar-title
          ><small>{{ currentTitle }}</small></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn
          @click="
            $store.commit('alertAddress', { value: false, route: 'home' }),
              (error = false)
          "
          icon
          x-small
          class="ma-5"
          outlined
          color="error"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-window touchless class="pa-0 " v-model="addressStep">
        <v-window-item class="px-3 py-0" :value="1">
          <AlertStart @next-register="controlsTabs" />
        </v-window-item>
        <v-window-item class="px-3 py-0" :value="2">
          <MapAddress @confirm-address="controlsTabs" />
        </v-window-item>
        <v-window-item class="pa-0" :value="3">
          <AlertListAddress
            @new-address="controlsTabs"
            @error-address="controlsTabs"
          />
        </v-window-item>
        <v-window-item class=" py-0" :value="4">
          <AlertErrorAddress @return-list="controlsTabs" />
        </v-window-item>
        <v-window-item class=" py-0" :value="5">
          <AlertConfirmAddress @return-map="controlsTabs" />
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script>
import AlertStart from "@/components/user/alert_address/AlertStart.vue";
import MapAddress from "@/components/user/alert_address/MapAddress.vue";
import AlertListAddress from "@/components/user/alert_address/AlertListAddress.vue";
import AlertErrorAddress from "@/components/user/alert_address/AlertErrorAddress.vue";
import AlertConfirmAddress from "@/components/user/alert_address/AlertConfirmAddress.vue";

export default {
  components: {
    AlertStart,
    MapAddress,
    AlertListAddress,
    AlertErrorAddress,
    AlertConfirmAddress,
  },

  data: () => ({}),
  computed: {
    currentTitle() {
      switch (this.addressStep) {
        case 1:
          return "Informe sua localização";
        case 2:
          return "Entregar em:";
        case 3:
          return "Seus endereços";
        case 5:
          return "Confirme o endereço de entrega";
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
