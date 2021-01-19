<template>
  <v-footer width="100%" height="auto">
    <v-row justify="center" align="center" dense>
      <!-- <v-col cols="12" sm="12">
        <div>
          <router-link :to="{ name: 'Home' }">
            <v-img
              width="200px"
              :src="$store.state.server + company.logo"
            ></v-img>
          </router-link>
        </div>
      </v-col> -->
      <v-col cols="12" sm="12">
        <v-row>
          <v-col cols="12" sm="12">
            <div class="item-tel">
              <span>Formas de pagamento:</span>
            </div>
            <div class="item-details">
              <div class="overflow-x-hidden overflow-y-auto pay">
                <div class="px-2">
                  <v-row dense v-for="(item, i) in payments" :key="i">
                    <v-col cols="12" sm="12">
                      <span class="font-weight-bold">
                        <small>
                          {{ item.title }}
                        </small>
                      </span>
                    </v-col>
                    <v-col
                      v-for="(value, n) in item.payments"
                      :key="n"
                      cols="6"
                      sm="2"
                      xs="6"
                    >
                      <v-card
                        color="grey lighten-5"
                        flat
                        outlined
                        link
                        class="grey lighten-5"
                      >
                        <v-row justify="start" no-gutters align="center">
                          <v-col cols="auto">
                            <v-img
                              class="ma-2"
                              width="20px"
                              :src="$store.state.server + value.img"
                            ></v-img>
                          </v-col>
                          <v-col cols="auto">
                            <small class="text-capitalize ">
                              {{ value.title }}
                            </small>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="12">
            <div class="address">
              <span>Endereço:</span>
            </div>
            <div class="item-details">
              <span>
                {{ company.address.street }}, {{ company.address.number }} -
                Bairro {{ company.address.district }} <br />
                {{ company.address.city }} - {{ company.address.state }}
              </span>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="auto">
        <small>
          &copy;2020 —
          <a
            href="http://vedassistemas.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>vedassistemas.com.br</strong>
          </a>
        </small>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
    payments() {
      return this.$store.getters["company/getPayments"] || [];
    },
  },
};
</script>

<style>
ul li {
  list-style: none;
}
li {
  margin-top: 10px;
}
.category-footer a:hover {
  display: block !important;
  color: #ef354e;
  text-decoration: none;
  position: relative;
}
.category-footer a {
  color: grey !important;
  text-decoration: none;
}
</style>
