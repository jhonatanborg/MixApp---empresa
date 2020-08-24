<template>
  <div>
    <v-list max-height="500px" class="overflow-y-auto" two-line>
      <v-list-item-group v-model="addressSelected">
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
                  {{ item.street }}, {{ item.number }},
                  {{ item.complement }}</v-list-item-title
                >
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
      <v-row align="justify-space-between">
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
            color="#765eda"
            class="font-weight-bold"
            >Confirmar</v-btn
          >
        </v-col>
      </v-row>
    </v-toolbar>
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
      let VerifyCompanyAvailable;
      if (this.sale.length > 0) {
        VerifyCompanyAvailable = this.companies.find(
          (element) => element.id === this.companySale.id
        );
        if (!VerifyCompanyAvailable) {
          this.$emit("error-address", 4);
        } else {
          this.$store.commit("alertAddress", { value: false });
        }
      } else {
        this.$store.commit("alertAddress", { value: false });
      }

      let location = {
        latitude: this.addressSelected.latitude,
        longitude: this.addressSelected.longitude,
      };
      localStorage.setItem("geolocation", JSON.stringify(location));

      // this.$router.push("/restaurants");
    },
  },
};
</script>

<style></style>
