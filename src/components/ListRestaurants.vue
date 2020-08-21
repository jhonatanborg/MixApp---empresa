<template>
  <div class="">
    <div id="list-restaurantes">
      <div>
        <v-layout class="">
          <div>
            <v-row>
              <v-col
                v-for="item in companies"
                :key="item.id"
                cols="12"
                :sm="sizeColuns"
              >
                <CardCompany :company="item" />
              </v-col>
            </v-row>
          </div>
        </v-layout>
        <!-- <Banner /> -->
      </div>
    </div>
  </div>
</template>
<script>
// import Banner from "@/components/Banner";
import CardCompany from "@/components/company/CardCompany";

export default {
  props: {
    companies: Array,
  },
  name: "ListRestaurants",

  components: {
    // Banner,
    CardCompany,
  },
  data: () => ({
    filter: false,
    item: false,
  }),
  methods: {
    getRouter() {},
  },
  computed: {
    sizeColuns() {
      let colum;
      switch (this.companies.length) {
        case 1:
          colum = "12";
          break;
        case 2:
          colum = "5";
          break;
        default:
          colum = "4";
          break;
      }
      return colum;
    },
  },
};
</script>

<style></style>
