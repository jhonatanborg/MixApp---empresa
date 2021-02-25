<template>
  <div v-if="address">
    <div class="map">
      <l-map
        ref="myMap"
        id="myMap"
        @ready="mapReady()"
        style="height:100%; width:100%; position: relative"
        :zoom="zoom"
        :center="coords"
        :options="mapOptions"
      >
        <l-control position="topright" tag="v-" name="map">
          <v-alert dark color="#5530E5">
            <small>
              {{ address.street }}, {{ address.number }} -
              {{ address.district }}, {{ address.city }} -
              {{ address.state }}</small
            >
          </v-alert>
        </l-control>
        <l-control position="bottomright" tag="v-" name="map">
          <div class="d-flex align-center">
            <div class="mr-3 white">
              <v-btn
                @click="$emit('return-start', 1)"
                large
                block
                depressed
                outlined
                color="primary"
                >Voltar</v-btn
              >
            </div>
            <div>
              <v-btn
                large
                dark
                block
                class="my-5"
                depressed
                color="#5530E5"
                @click="updateLocalAddress()"
                >Confirmar</v-btn
              >
            </div>
          </div>
        </l-control>
        <!-- <l-control
          position="bottomright"
          tag="v-"
          name="map"
          class="d-flex red justify-center align-center"
        >
         <v-btn
              @click="$emit('return-start', 1)"
              large
              block
              color="primary"
              outlined
              dark
              >Voltar</v-btn
            >
            <v-btn
              large
              dark
              block
              class="my-5"
              depressed
              color="#5530E5"
              @click="updateLocalAddress()"
              >Confirmar</v-btn
            >
        </l-control> -->
        <l-tile-layer :url="url" :attribution="attribution" />

        <l-marker
          class="marker"
          :draggable="false"
          :lat-lng="coordsMaker"
          :icon="markerIcon"
        ></l-marker>
      </l-map>
    </div>
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
      scrollWheelZoom: false,
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
      const payload = {
        state: "company",
        method: "get",
        url: `/company-show/${this.$store.state.domain},${this.address.latitude},${this.address.longitude}`,
        insert: true,
      };
      this.$store.dispatch("company/request", payload);
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
@media (max-width: 780px) {
  .map {
    height: 100vh;
  }
}
@media (max-width: 640px) {
  .map {
    height: 100vh;
  }
}
@media (max-width: 568px) {
  .map {
    height: 100vh;
  }
}
@media (max-width: 1366px) {
  .map {
    height: 75vh;
  }
}
.leaflet-control-attribution.leaflet-control {
  display: none !important;
}
</style>
