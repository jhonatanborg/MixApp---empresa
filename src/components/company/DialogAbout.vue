<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :value="$store.state.company.aboutCompany"
    persistent
    max-width="550px"
  >
    <v-card v-if="company.address">
      <v-toolbar flat>
        <v-toolbar-title>Sobre a empresa</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          @click="
            $store.commit('company/request', {
              state: 'aboutCompany',
              data: false,
            })
          "
          class="mr-3"
          outlined
          icon
          small
          color="error"
          ><v-icon size="20">mdi-close</v-icon></v-btn
        >
      </v-toolbar>
      <v-card-text>
        <div>
          <v-row>
            <v-col cols="auto"><v-icon>mdi-map-marker</v-icon></v-col>
            <v-col
              ><div>
                {{ company.address.street }}, {{ company.address.number }} -
                Bairro {{ company.address.district }},
                {{ company.address.city }} - {{ company.address.state }}
              </div></v-col
            >
          </v-row>
          <v-row>
            <v-col cols="auto"><v-icon>mdi-clock</v-icon></v-col>
            <v-col
              ><div>
                <div><span>Horário de Funcionamento</span></div>
                <div
                  class=""
                  v-for="(item, key) in company.openingHours"
                  :key="key"
                >
                  <span v-text="item.day"></span> <br />
                  <span> {{ item.start }} - {{ item.end }} </span>
                </div>
              </div></v-col
            >
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
  },
};
</script>

<style></style>
