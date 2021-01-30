<template>
  <v-dialog max-width="400px" transition="dialog-transition">
    <v-card class="fill-height " height="100%">
      <div class="mx-3">
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn x-small color="#FFE0E0" fab depressed>
              <v-icon color="#FF4141" size="20">mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <div class="pa-5">
        <v-row justify="center" align="center">
          <v-col cols="auto">
            <div>
              <v-img
                width="100"
                src="@/assets/images/notify/notification.svg"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="title-notify">
              <span>Nova versão</span>
            </div>
            <div class="details-notify">
              <span>Nova versão disponivel, clique em atualiazar</span>
            </div>
          </v-col>
          <v-col cols="12">
            <v-btn x-large block color="#FFBA0A" @click="notify"
              ><b>Aceitar</b></v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    update: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async notify() {
      this.update = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
  },
};
</script>

<style>
.title-notify {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 17px;
  margin: 10px;
  /* identical to box height */
  text-align: center;
  color: #2d2c2c;
}
.details-notify {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
}
</style>
