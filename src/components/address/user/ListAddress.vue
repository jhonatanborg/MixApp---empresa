<template>
  <div class="px-2" v-if="address.length > 0">
    <v-list
      class="overflow-y-auto barscroll px-0 mx-0"
      max-height="500px"
      two-line
    >
      <v-list-item-group class="mx-0" dense v-model="addressSelected">
        <template v-for="(item, i) in address">
          <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

          <v-list-item
            v-else
            :key="`item-${i}`"
            :value="item"
            class="mx-0"
            color="#5530E5"
            three-line
          >
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.street }}, {{ item.number }} - {{ item.district }}
                  <span
                    v-if="item.complement"
                    v-text="' - ' + item.complement"
                  ></span>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-checkbox :input-value="active" color="#5530E5"></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
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
          dense
          dark
          color="#5530E5"
          >Confirmar</v-btn
        >
      </v-col>
    </v-row>
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
</template>

<script>
export default {
  computed: {
    address() {
      return this.$store.getters["user/getListAddress"] || {};
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
      this.$store.commit("cart/setType", "online");
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
        url: `/company-show/${this.$store.state.domain},${this.addressSelected.latitude},${this.addressSelected.longitude}`,
        insert: true,
      };
      this.$store.dispatch("company/request", payload);
      localStorage.setItem("geolocation", JSON.stringify(location));
      this.$store.commit("alertAddress", { value: false, route: "home" });
    },
  },
};
</script>

<style></style>
