<template>
  <div>
    <MenuBar />
    <div class="col-md-6 mx-auto">
      <v-card flat outlined class="pa-5">
        <router-view />
      </v-card>
    </div>
  </div>
</template>
<script>
import MenuBar from "@/components/shared/MenuBar";

export default {
  components: {
    MenuBar,
  },
};
</script>

<style></style>
