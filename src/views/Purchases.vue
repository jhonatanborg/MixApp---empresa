<template>
  <div class="">
    <MenuBar />
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MenuBar from "@/components/shared/MenuBar.vue";

export default {
  components: {
    MenuBar,
  },
};
</script>

<style></style>
