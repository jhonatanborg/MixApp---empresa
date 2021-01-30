<template>
  <div>
    <v-row justify="center" align-sm="center" v-if="address">
      <v-col cols="12">
        <v-card flat max-width="700px">
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
                <v-alert color="#FFBA0A">
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
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-toolbar flat height="70px" bottom short>
        <v-row align="center">
          <v-col cols="4" sm="4">
            <v-btn
              @click="$emit('return-start', 1)"
              block
              large
              class="my-5"
              color="primary"
              outlined
              dark
              >Voltar</v-btn
            >
          </v-col>
          <v-col cols="8" sm="8">
            <v-btn
              block
              large
              class="my-5"
              depressed
              color="#FFBA0A"
              @click="updateLocalAddress()"
              >Confirmar</v-btn
            >
          </v-col>
        </v-row>
      </v-toolbar>
    </v-row>
  </div>
</template>

<script>
const icon = require("../assets/local-icon.svg");
import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Capacitor } from "@capacitor/core";
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
    sheet: true,
    coordsMaker: [0, 0],
    zoomIsUpdating: false,
    markerIcon: L.icon({
      iconUrl: icon,
      iconSize: [40, 37],
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
      return this.$store.state.user.address;
    },
    user() {
      return this.$store.state.user.userProfile;
    },
    coords() {
      return this.$store.state.user.address
        ? {
            lat: this.$store.state.user.address.latitude,
            lng: this.$store.state.user.address.longitude,
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
    updateLocalAddress() {
      this.$store.commit("user/request", {
        state: "address",
        data: this.address,
      });
      this.execRequest(
        "company/request",
        "companies",
        `/company/${this.address.latitude},${this.address.longitude}`,
        "GET",
        true
      );
      let location = {
        latitude: this.address.latitude,
        longitude: this.address.longitude,
      };
      localStorage.setItem("geolocation", JSON.stringify(location));
      this.$emit("confirm-address", 3);
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
    async getCoords() {
      const coordinates = await Capacitor.Plugins.Geolocation.getCurrentPosition();
      this.showPositionNavigator(coordinates);
      // navigator.geolocation.getCurrentPosition(this.showPositionNavigator);
    },
    showPosition(position) {
      if (position) {
        this.execRequest("user/request", "address", "/coord", "POST", true, {
          lat: position.lat,
          long: position.lng,
        });
        let location = {
          latitude: position.lat,
          longitude: position.lng,
        };
        localStorage.setItem("geolocation", JSON.stringify(location));
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
    height: 80vh;
  }
}
@media (max-width: 640px) {
  .map {
    height: 78vh;
  }
}
@media (max-width: 568px) {
  .map {
    height: 69vh;
  }
}
.leaflet-control-attribution.leaflet-control {
  display: none !important;
}
</style>
