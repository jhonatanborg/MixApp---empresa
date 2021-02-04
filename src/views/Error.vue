<template>
  <div
    class="container-error d-flex flex-collunm justify-center align-center fill-height"
  >
    <v-card max-width="500" color="transparent" class="pa-5" flat>
      <div class="pa-5">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <div class="animate__animated animate__pulse animate__infinite ">
              <v-img
                max-width="500"
                src="@/assets/images/error/error.svg"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="title-error white--text text-center">
              <span>Epa!</span>
            </div>
            <div class="details-notify white--text text-center">
              <span
                >Parece que você está sem internet. Tente se conectar a uma rede
                estável para fazer o seu pedido</span
              >
            </div>
          </v-col>
          <v-col cols="12">
            <v-btn x-large @click="verify" block depressed color="#fff"
              ><b>Atualizar</b></v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  mounted() {
    this.verify();
  },
  methods: {
    verify() {
      if (window.navigator.onLine) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
.container-error {
  background: linear-gradient(-45deg, #9300dc 20%, #4144e8 70%);
}
.title-error {
  font-size: 28px;
}
</style>
