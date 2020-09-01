<template>
  <div>
    <v-row v-if="address">
      <v-col cols="12" class="map">
        <l-map
          ref="myMap"
          id="myMap"
          @ready="mapReady()"
          style="height: 100%; width: 100%;"
          :zoom="zoom"
          :center="coords"
        >
          <l-control position="bottomleft" tag="v-" name="map" class="pa-2">
            <v-sheet elevation="2" width="100%"
              ><v-alert color="success">
                <small>
                  {{ address.street }}, {{ address.number }} -
                  {{ address.district }}, {{ address.city }} -
                  {{ address.state }}</small
                >
              </v-alert></v-sheet
            >
          </l-control>
          <l-tile-layer :url="url" :attribution="attribution" />
          <l-marker
            class="marker"
            :draggable="false"
            :lat-lng="coordsMaker"
            :icon="markerIcon"
          ></l-marker>
        </l-map>
      </v-col>
      <v-col class="py-0" sm="4">
        <v-text-field
          hide-details
          clearable
          color="#765eda"
          outlined
          dense
          label="Número"
          v-model="address.number"
        ></v-text-field>
      </v-col>
      <v-col class="py-0" cols="6" sm="8">
        <v-text-field
          clearable
          hide-details
          color="#765eda"
          outlined
          dense
          :error="error"
          v-model="title"
          label="Título"
          placeholder="Ex: Casa"
        ></v-text-field>
      </v-col>
      <v-col class="pb-0" cols="12">
        <v-text-field
          clearable
          hide-details
          color="#765eda"
          outlined
          dense
          v-model="complement"
          label="Complemento"
          placeholder="Ex: Ao lado da mercearia do jão"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto" sm="4">
        <v-btn
          @click="$emit('return', 1)"
          block
          dense
          outlined
          color="error"
          dark
          >Voltar</v-btn
        >
      </v-col>
      <v-col sm="8">
        <v-btn dense block color="#765eda" @click="updateLocalAddress()" dark
          >Confirmar</v-btn
        >
      </v-col>
    </v-row>
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
    addressSave: {},
    error: false,
    sheet: true,

    complement: null,
    title: null,
    coordsMaker: [0, 0],
    zoomIsUpdating: false,
    markerIcon: L.icon({
      iconUrl:
        "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
      iconSize: [32, 37],
      iconAnchor: [16, 37],
    }),
    zoom: 17,
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
      this.address.complement = this.complement;
      if (this.title) {
        this.address.title = this.title;
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
        this.$store.commit("alertAddress", { value: false });

        if (localStorage.getItem("acess-token")) {
          this.registerAddress(this.address);
        }
      } else {
        this.error = true;
      }
    },
    registerAddress(address) {
      if (this.address.number) {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/address/`,
          headers: null || {
            Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
          },
          data: address,
        })
          .then((resp) => {
            this.$store.commit("user/setUser", resp.data);
          })
          .catch(() => {});
      } else {
        this.error = true;
      }
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
    getCoords() {
      navigator.geolocation.getCurrentPosition(this.showPositionNavigator);
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
  padding-right: 20px;
  height: 60vh;
}
@media (max-width: 770px) {
  .map {
    height: 70vh;
  }
}
.leaflet-control-attribution.leaflet-control {
  display: none !important;
}
</style>
