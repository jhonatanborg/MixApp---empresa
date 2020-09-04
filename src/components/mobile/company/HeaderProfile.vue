<template>
  <v-row class="col-sm-12" justify="center" v-if="company">
    <v-card color="grey lighten-5" flat>
      <v-row justify="start" align="content-center">
        <v-col cols="4">
          <v-img
            src="https://scontent.fops1-1.fna.fbcdn.net/v/t1.0-9/20799930_1574456292577856_3034606225261362567_n.png?_nc_cat=107&_nc_sid=09cbfe&_nc_ohc=NAMN85BwskwAX_q7XCT&_nc_ht=scontent.fops1-1.fna&oh=94380ef7bfc671bb22a96cc1ea0202d1&oe=5F775E09"
          ></v-img>
        </v-col>
        <v-col>
          <div class="title-company">
            <span v-text="company.name"> </span>
          </div>
          <div class="">
            <span v-text="company.primaryCategory.name"> </span>
          </div>
          <v-chip
            small
            class="mr-3 my-2"
            @click="
              $store.commit('company/request', {
                state: 'aboutCompany',
                data: true,
              })
            "
            outlined
          >
            <v-icon size="15" class="mr-1  ">mdi-information</v-icon>
            Sobre</v-chip
          >
          <v-chip
            small
            :color="company.opened === 'S' ? 'success' : 'error'"
            v-text="company.opened === 'S' ? ' Aberto' : 'Fechado agora'"
          >
          </v-chip>
        </v-col>
      </v-row>
    </v-card>
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
  font-weight: 800;
  font-size: 16px;
  text-align: left;
  color: #111;
  text-transform: initial;
}
</style>
