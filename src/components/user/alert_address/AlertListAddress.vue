<template>
  <div>
    <div v-if="user.address.length > 0">
      <v-list class="overflow-y-auto barscroll" max-height="500px" two-line>
        <v-list-item-group dense v-model="addressSelected">
          <template v-for="(item, i) in user.address">
            <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

            <v-list-item
              v-else
              :key="`item-${i}`"
              :value="item"
              active-class="deep-purple--text text--accent-4"
            >
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-title>
                    {{ item.street }}, {{ item.number }} - {{ item.district }}
                    <span
                      v-if="item.complement"
                      v-text="' - ' + item.complement"
                    ></span>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    color="deep-purple accent-4"
                  ></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <v-toolbar width="100%" flat height="80px">
        <v-row>
          <v-col cols="12" sm="6">
            <v-btn
              @click="$emit('new-address', 1)"
              depressed
              dense
              block
              color="primary"
              >Novo endereço?</v-btn
            >
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn
              @click="updateLocalAddress()"
              depressed
              block
              dark
              dense
              color="#5530E5"
              class="font-weight-bold"
              >Confirmar</v-btn
            >
          </v-col>
        </v-row>
      </v-toolbar>
    </div>
    <div v-else>
      <div class=" mx-auto">
        <div class=" col-sm--6 text-center">
          <h2 class="title-message-error ">
            Cadastre aonde você quer receber seu pedido!
          </h2>
        </div>

        <v-row justify="center">
          <v-col cols="12" sm="6">
            <v-btn
              @click="$emit('new-address', 1)"
              dark
              large
              depressed
              block
              color="#5530E5"
            >
              Cadastrar endereço
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["user/getUser"] || {};
    },
    sale() {
      return this.$store.state.cart.saleIdb;
    },
    companies() {
      return this.$store.state.company.companies;
    },
    companySale() {
      return this.$store.state.cart.saleCompany || [];
    },
  },
  data() {
    return {
      addressSelected: null,
      complement: null,
      error: false,
    };
  },
  methods: {
    async execRequest(action, state, url, method, insert, data = null) {
      await this.$store.dispatch(action, {
        state: state,
        method: method,
        url: url,
        insert,
        data,
      });
    },
    async updateLocalAddress() {
      this.$store.commit("user/request", {
        state: "address",
        data: this.addressSelected,
      });

      let location = {
        latitude: this.addressSelected.latitude,
        longitude: this.addressSelected.longitude,
      };
      const payload = {
        state: "company",
        method: "get",
        url: `/company-show/${process.env.VUE_APP_DOMAIN},${this.addressSelected.latitude},${this.addressSelected.longitude}`,
        insert: true,
      };
      this.$store.dispatch("company/request", payload);

      localStorage.setItem("geolocation", JSON.stringify(location));
      this.$store.commit("alertAddress", { value: false });
    },
  },
};
</script>

<style>
.barscroll::-webkit-scrollbar {
  width: 15px;
}

.barscroll::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.barscroll::-webkit-scrollbar-thumb {
  background: #ef354e;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.barscroll::-webkit-scrollbar-thumb:hover {
  background: black;
  -webkit-overflow-scrolling: touch;
}
.fixed-item {
  max-height: 300px;
}
</style>
