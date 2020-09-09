<template class="white">
  <v-container class="overflow-y-hidden" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-row align="center" justify="space-between">
          <v-col cols="auto">
            <v-btn dense :to="'/'" :ripple="false" text>
              <v-icon>mdi-food</v-icon><b>{{ company.name }}</b>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn to="/" class="px-5" color="#765eda" outlined>
              Voltar
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-col cols="12" sm="6">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  computed: {
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
  },
};
</script>

<style>
#login {
  height: 100%;
}
</style>
