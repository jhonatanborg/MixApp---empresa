<template>
  <v-dialog
    max-width="400px"
    :value="$store.state.user.modalPhoneRequired"
    persistent
    transition="dialog-transition"
  >
    <v-card class="fill-height " height="100%">
      <div class="pa-5">
        <v-row justify="center" align="center">
          <v-col cols="auto">
            <div>
              <v-img
                width="100"
                src="@/assets/images/notify/ringing.png"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="title-notify text-center">
              <h3>Iforme um telefone</h3>
            </div>
            <div class="details-notify py-5 text-center">
              <span>Precisamos do seu telefone para facilitar a entrega!</span>
            </div>
            <div>
              <v-text-field
                label="Telefone"
                outlined
                v-mask="['(##) ####-####', '(##) #####-####']"
                dense
                v-model="phone"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="12">
            <v-btn
              x-large
              @click="changeUser"
              block
              depressed
              dark
              color="#5530E5"
              ><b>Confirmar</b></v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},

  data: () => ({
    phone: null,
  }),
  computed: {
    user() {
      return this.$store.state.user.userProfile || {};
    },
  },
  methods: {
    changeUser() {
      if (this.phone) {
        const payload = {
          state: "user",
          method: "PUT",
          url: "/user-client/" + this.user.id,
          insert: true,
          data: { phone: this.phone },
        };
        this.$store.commit("user/setUserName", this.user.name);
        this.$store.commit("user/setModalPhoneRequired", false);
        this.$store.dispatch("user/request", payload);
      }
    },
  },
};
</script>

<style></style>
