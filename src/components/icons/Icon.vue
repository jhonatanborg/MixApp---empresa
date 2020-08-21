<template>
  <div>
    <v-btn :to="'/'" :ripple="false" x-large text dark
      ><v-icon>mdi-food</v-icon><b>Mix</b></v-btn
    >
  </div>
</template>

<script>
export default {
  props: {
    fill: String,
    width: String,
  },

  data: () => ({
    drawer: true,
  }),
};
</script>

<style></style>
