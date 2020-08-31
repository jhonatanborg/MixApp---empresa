<template class="white">
  <v-container class="overflow-y-hidden" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-row align="center" justify="space-between">
          <v-col cols="auto">
            <v-btn dense :to="'/'" :ripple="false" text>
              <v-icon>mdi-food</v-icon><b>Mix</b>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn to="/" class="px-5" color="#765eda" outlined>
              Voltar
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="space-between" align="center" no-gutters>
          <v-col cols="12" sm="6">
            <div class="d-flex justify-center align-center">
              <v-img src="https://i.imgur.com/xr56jrb.png"> </v-img>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <router-view class="col-sm-10 mx-auto"></router-view>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
};
</script>

<style>
#login {
  height: 100%;
}
</style>
