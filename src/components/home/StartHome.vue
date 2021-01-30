<template>
  <div>
    <v-img
      width="100%"
      height="100%"
      max-height="500px"
      src="https://i.imgur.com/KaZLLsC.png"
    >
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-card color="transparent" outlined flat>
            <div>
              <div class="top-header text-center">
                <div class="title-intro">
                  <span> Fique em casa - peça delivery </span><br />
                </div>
                <span class="slogan "
                  >Seus restaurantes favoritos na sua casa</span
                >
              </div>

              <v-row class="col-sm-10 mx-auto" justify="center">
                <v-col cols="12" sm="12">
                  <v-btn
                    @click="
                      $store.commit('alertAddress', { value: true, route: '' })
                    "
                    x-large
                    rounded
                    block
                    color="white"
                  >
                    <v-icon class="mx-3">mdi-map-marker</v-icon>

                    Buscar minha localização</v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-row>
      </v-container>
    </v-img>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newAddress: null,
      isLoading: false,
    };
  },
  computed: {
    address() {
      return this.$store.state.user.address;
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

    getAddressByString() {
      axios({
        method: "POST",
        url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/coord-address`,
        data: {
          address: `${this.newAddress}`,
        },
      })
        .then((resp) => {
          if (resp.data.street && resp.data.number && resp.data.district) {
            this.address = resp.data;
            this.successEdit = true;
            this.address = resp.data;
          } else {
            this.error = true;
          }
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
};
</script>

<style>
.title-intro {
  font-weight: 600;
  font-size: 39px;
  text-align: left;
  color: #f5f5f5;
}
.slogan {
  font-weight: 500;
  font-size: 23px;
  text-align: center;
  color: #f5f5f5;
}
</style>
