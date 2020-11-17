<template>
  <div id="editPerfil" v-if="address && coords">
    <v-dialog
      persistent
      scrollable
      :value="$store.state.user.dialogAddress"
      max-width="600"
    >
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card>
            <v-toolbar dense flat color="white">
              <v-toolbar-title>Alterar {{ address.title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                color="red"
                @click="
                  $store.commit('user/setAddressEdit', {
                    address: '',
                    dialog: true,
                  })
                "
                outlined
                class
              >
                <v-icon>mdi-close</v-icon>Fechar
              </v-btn>
            </v-toolbar>
            <div class="pa-3">
              <v-row justify="center">
                <v-col cols="12">
                  <v-card flat max-width="600px">
                    <div class="map">
                      <l-map
                        ref="myMap"
                        id="myMap"
                        @ready="mapReady()"
                        style="height:100%; position: relative"
                        :zoom="zoom"
                        :center="coords"
                      >
                        <l-control position="topright" tag="v-" name="map">
                          <v-alert dark color="#FFBA0A">
                            <small>
                              {{ address.street }}, {{ address.number }} -
                              {{ address.district }}, {{ address.city }} -
                              {{ address.state }}</small
                            >
                          </v-alert>
                        </l-control>

                        <l-tile-layer :url="url" :attribution="attribution" />

                        <l-marker
                          class="marker"
                          :draggable="false"
                          :lat-lng="coordsMaker"
                          :icon="markerIcon"
                        ></l-marker>
                      </l-map>
                    </div>
                    <v-btn
                      block
                      class="my-5"
                      color="#FFBA0A"
                      @click="confirm()"
                      dark
                      >Confirmar</v-btn
                    >
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-window-item>

        <v-window-item :value="2">
          <v-card>
            <v-toolbar flat dense>
              <v-toolbar-title
                ><small>Confirmar Alteração</small></v-toolbar-title
              >
              <v-spacer></v-spacer>
              <v-btn
                color="red"
                @click="
                  $store.commit('user/setAddressEdit', {
                    address: '',
                    dialog: true,
                  })
                "
                outlined
                class
              >
                <v-icon>mdi-close</v-icon>Fechar
              </v-btn>
            </v-toolbar>
            <div class="pa-5">
              <v-alert color="#FFBA0A" dark border="left">
                <small>
                  {{ address.street }}, {{ address.number }} -
                  {{ address.district }}, {{ address.city }} -
                  {{ address.state }}</small
                >
              </v-alert>
              <v-row class="overflow-x-hidden">
                <v-col sm="4">
                  <v-text-field
                    hide-details
                    clearable
                    color="#FFBA0A"
                    outlined
                    dense
                    label="Número"
                    v-model="address.number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field
                    clearable
                    hide-details
                    color="#FFBA0A"
                    outlined
                    dense
                    v-model="address.title"
                    label="Título"
                    placeholder="Ex: Casa"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    clearable
                    hide-details
                    color="#FFBA0A"
                    outlined
                    dense
                    v-model="address.complement"
                    label="Complemento"
                    placeholder="Ex: Ao lado da mercearia do jão"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-btn @click="step--" outlined color="error">Voltar</v-btn>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-btn
                    @click="updateAddress"
                    :loading="loading"
                    dark
                    block
                    color="#FFBA0A"
                    >Confirmar</v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-window-item>
      </v-window>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },

  mounted() {
    if (this.coords) {
      this.coordsMaker = this.coords;
    }
  },
  data: () => ({
    step: 1,
    loading: false,
    sheet: true,
    coordsMaker: [0, 0],
    zoomIsUpdating: false,
    markerIcon: L.icon({
      iconUrl: "https://i.imgur.com/CKRDqm1.png",
      iconSize: [32, 37],
      iconAnchor: [16, 37],
    }),
    zoom: 20,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    mapOptions: {
      zoomSnap: 0.5,
    },
  }),
  computed: {
    address() {
      return this.$store.state.user.editAddress;
    },
    user() {
      return this.$store.state.user.userProfile;
    },
    coords() {
      return this.$store.state.user.editAddress
        ? {
            lat: this.$store.state.user.editAddress.latitude,
            lng: this.$store.state.user.editAddress.longitude,
          }
        : null;
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
    mapReady() {
      const map = this.$refs.myMap.mapObject;
      document.getElementById("myMap").addEventListener("touchend", () => {
        this.makerUpdate(map.getCenter());
      });
      map.on("move", () => {
        this.makerUpdate(map.getCenter());
      });
      map.on("dragend", () => {
        this.showPosition(map.getCenter());
      });
    },
    makerUpdate(center) {
      this.coordsMaker = center;
    },
    confirm() {
      this.step++;
    },
    showPosition(position) {
      if (position) {
        this.execRequest(
          "user/request",
          "editAddress",
          "/coord",
          "POST",
          true,
          {
            lat: position.lat,
            long: position.lng,
          }
        );
      }
    },
    showPositionNavigator(position) {
      if (position) {
        this.execRequest("user/request", "address", "/coord", "POST", true, {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        let location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        localStorage.setItem("geolocation", JSON.stringify(location));
      }
    },
    updateAddress() {
      this.loading = true;
      if (this.address) {
        axios({
          method: "PUT",
          url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/address-client/${this.address.id}`,
          headers: null || {
            Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
          },
          data: this.address,
        })
          .then((resp) => {
            this.$store.commit("user/setUser", resp.data);
            this.loading = false;
            this.$store.commit("user/setAddressEdit", {
              address: null,
              dialog: false,
            });
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style>
.marker {
  position: absolute !important;
}
.map {
  height: 60vh;
}
@media (max-width: 780px) {
  .map {
    height: 75vh;
  }
}
.leaflet-control-attribution.leaflet-control {
  display: none !important;
}
</style>
