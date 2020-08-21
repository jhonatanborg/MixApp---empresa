<template>
  <div class="col-sm-6 mx-auto"><Address :user="user" /> <MenuBar /></div>
</template>

<script>
import Address from "@/components/user/Address";
import MenuBar from "@/components/MenuBar";

export default {
  components: {
    Address,
    MenuBar,
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
  },
};
</script>

<style></style>
