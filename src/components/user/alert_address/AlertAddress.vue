<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :value="$store.state.addressAlert"
    persistent
    scrollable
    height="600px"
    max-width="550px"
  >
    <v-card>
      <v-row no-gutters align="center" justify="space-between">
        <v-col cols="auto">
          <span class="ma-5">{{ currentTitle }}</span>
        </v-col>

        <v-col cols="auto" v-if="addressStep != 4">
          <v-btn
            icon
            @click="
              $store.commit('alertAddress', { value: false, route: 'home' }),
                (error = false)
            "
            class="ma-5"
            outlined
            color="error"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-window class="pa-0 " v-model="addressStep">
        <v-window-item class="px-3 py-0" :value="1">
          <AlertStart @next-register="controlsTabs" />
        </v-window-item>
        <v-window-item class="px-3 py-0" :value="2">
          <RegisterAddress @return="controlsTabs" />
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
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script>
import AlertStart from "@/components/user/alert_address/AlertStart.vue";
import RegisterAddress from "@/components/user/alert_address/RegisterAddress.vue";
import AlertListAddress from "@/components/user/alert_address/AlertListAddress.vue";
import AlertErrorAddress from "@/components/user/alert_address/AlertErrorAddress.vue";

export default {
  components: {
    AlertStart,
    RegisterAddress,
    AlertListAddress,
    AlertErrorAddress,
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
