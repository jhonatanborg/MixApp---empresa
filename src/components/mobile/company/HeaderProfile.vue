<template>
  <v-row justify="center" v-if="company">
    <v-col>
      <v-card color="grey lighten-5" flat>
        <v-card width="100%" flat color="grey lighten-5">
          <v-img width="120%" aspect-ratio="1.1" :src="company.logo"></v-img>
        </v-card>
        <v-row justify="start">
          <v-col cols="auto" sm="7" lg="6">
            <div>
              <div class="title-company">
                <span v-text="company.name"> </span>
              </div>
              <div class="">
                <span v-text="company.primaryCategory.name"> </span>
              </div>
              <v-chip
                @click="
                  $store.commit('company/request', {
                    state: 'aboutCompany',
                    data: true,
                  })
                "
                outlined
              >
                <v-icon size="20" class="mr-1  ">mdi-information</v-icon>
                Mais informações</v-chip
              >

              <div class="my-4 d-flex">
                <div>
                  <v-chip
                    class="mr-3"
                    :color="company.opened === 'S' ? 'success' : 'error'"
                    v-text="
                      company.opened === 'S' ? ' Aberto' : 'Estamos Fechado'
                    "
                  >
                  </v-chip>
                </div>
                <div class="">
                  <v-chip>
                    Espera: 50 min
                  </v-chip>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
    },
  },
  methods: {
    // convertDistance(value) {
    //   let distance;
    //   if (value >= 1000) {
    //     distance = value / 1000;
    //   } else {
    //     distance = value;
    //   }
    //   return distance;
    // },
  },
};
</script>

<style>
.title-company {
  font-weight: normal;
  font-size: 22px;
  text-align: left;
  color: #111;
  text-transform: uppercase;
}
</style>
