<template>
  <div v-if="company">
    <div class="py-1 ">
      <v-list-item class="mx-0">
        <v-list-item-content>
          <v-list-item-title>
            <span class="item-title">
              Pague na entrega
            </span>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon color="#ffa602">mdi-help-circle-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
    </div>
    <div class="overflow-x-hidden overflow-y-auto pay">
      <div class="px-5 ">
        <v-row cols="6" v-for="(item, i) in payments" :key="i">
          <v-col cols="12">
            <span class="font-weight-bold">
              <small>
                {{ item.title }}
              </small>
            </span>
          </v-col>
          <v-col v-for="(value, n) in item.payments" :key="n" cols="6">
            <v-card
              @click="selectPay(value)"
              :color="
                payment.filter((item) => item.id === value.id).length > 0
                  ? 'purple darken-5 white--text'
                  : 'grey lighten-5'
              "
              flat
              outlined
              link
              class="px-2"
            >
              <v-row justify="center">
                <v-col cols="auto">
                  <v-img :src="$store.state.server + value.img"></v-img>
                </v-col>
                <v-col>
                  <small class="text-capitalize"> {{ value.title }} </small>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="mx-3 my-5">
      <v-btn
        :disabled="payVerify"
        block
        @click="payConfirm()"
        x-large
        color="#ffa602"
      >
        <b>Confirmar</b>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data: () => ({
    sheet: false,
    changeDialog: {
      dialog: false,
      total: null,
    },
    step: 1,
    payment: [],
  }),
  computed: {
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
    payments() {
      return this.$store.getters["company/getPayments"] || [];
    },
    payVerify() {
      if (this.payment.length > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    selectPay(value) {
      if (
        this.payment.length > 0 &&
        this.payment.filter((item) => item.id === value.id).length === 0
      ) {
        this.payment.push(value);
      } else if (this.payment.length === 0) {
        this.payment.push(value);
      } else if (
        this.payment.length > 0 &&
        this.payment.filter((item) => item.id === value.id).length > 0
      ) {
        this.payment.forEach((item, index) => {
          if (item.id === value.id) {
            this.payment.splice(index, 1);
          }
        });
      }
      if (this.payment.length > 2) {
        this.payment.splice(1, 1);
      }
    },
    payConfirm() {
      this.$store.commit("cart/paySelect", this.payment);
      if (
        this.payment &&
        this.payment.find((item) => item.title === "dinheiro")
      ) {
        this.$store.commit("cart/sidebar", { open: true, step: 5 });
      } else if (this.payment) {
        this.$store.commit("cart/sidebar", { open: true, step: 3 });
      }
    },
  },
};
</script>

<style>
.pay {
  max-height: 70vh;
}
</style>
