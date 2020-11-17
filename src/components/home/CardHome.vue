<template>
  <div id="card">
    <div>
      <div class=" mx-auto">
        <v-card
          tile
          color="#FFBA0A"
          flat
          class="pa-5  py-auto"
          min-height="250px"
        >
          <v-row>
            <v-col class="white--text" sm="8">
              <h3>Vocês está em:</h3>
              <h2>
                {{ address.street }}, {{ address.number }} - {{ address.city }}
              </h2>
            </v-col>
          </v-row>

          <v-row>
            <v-col sm="6">
              <v-text-field
                solo
                prepend-inner-icon="mdi-magnify"
                flat
                chips
                hide-details
                label="Buscar restaurante"
              ></v-text-field>
            </v-col>
            <v-col sm="2">
              <v-btn block large dark color="black">Buscar</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    companies: Array,
  },
  data: () => ({
    autoUpdate: true,
    isUpdating: false,
    name: "Midnight Crew",
    empresa: {},
  }),
  computed: {
    address() {
      return this.$store.state.user.address;
    },
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },
};
</script>

<style></style>
