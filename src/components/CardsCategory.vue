<template>
  <div class="cards-category">
    <v-slide-group v-model="model">
      <v-slide-item>
        <v-row justify="start">
          <v-col
            cols="auto"
            v-for="item in categories"
            :key="item.id"
            class="d-flex flex-column justify-start"
          >
            <v-card
              @click="cardRedirectCategory(item.name)"
              :max-width="width"
              width="130px"
              class="pa-2 my-3 hvr-float"
              color="white"
              flat
            >
              <v-img
                height="120px"
                width="100%"
                aspect-ratio="1.1"
                :src="item.img"
              >
              </v-img>
            </v-card>
            <div>
              <span class=" my-3">
                <b>{{ item.name }} </b>
              </span>
            </div>
          </v-col>
        </v-row>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    width: String,
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    cardRedirectCategory(item) {
      this.$store.commit("company/categorieFilter", item);
      if (this.$route.fullPath === "/") {
        this.$router.push("/restaurants");
      }
    },
  },
};
</script>

<style>
/* Grow */
.hvr-float {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.7s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-float:hover,
.hvr-float:focus,
.hvr-float:active {
  -webkit-transform: translateY(-8px);
  transform: translateY(-8px);
}
</style>
