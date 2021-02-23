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
          <v-icon color="#5530E5">mdi-help-circle-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
    </div>
    <div class="overflow-x-hidden overflow-y-auto pay">
      <div class="px-2">
        <v-row cols="auto" v-for="(item, i) in payments" :key="i">
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
                  ? 'primary'
                  : 'grey lighten-5'
              "
              flat
              outlined
              link
              class="px-2"
              :class="
                payment.filter((item) => item.id === value.id).length > 0
                  ? 'white--text'
                  : 'grey lighten-5'
              "
            >
              <v-row justify="start" no-gutters align="center">
                <v-col cols="auto">
                  <v-img
                    class="ma-2"
                    width="25px"
                    :src="$store.state.server + value.img"
                  ></v-img>
                </v-col>
                <v-col cols="auto">
                  <small class="text-capitalize item-pay">
                    {{ value.title }}
                  </small>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div class="mx-3 mt-3">
        <v-btn
          :disabled="payVerify"
          block
          @click="payConfirm()"
          x-large
          :dark="!payVerify"
          color="#5530E5"
        >
          <b>Confirmar</b>
        </v-btn>
      </div>
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
        if (this.$store.state.cart.type === "retirada") {
          this.$store.commit("cart/sidebar", { open: true, step: 3 });
        } else {
          this.$store.commit("cart/sidebar", { open: true, step: 6 });
        }
      }
    },
  },
};
</script>

<style>
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  .pay {
    max-height: 65vh;
  }
  .item-pay {
    width: 60px;
  }
}
@media only screen and (min-device-width: 360px) and (max-device-width: 540px) and (-webkit-min-device-pixel-ratio: 2) {
  .pay {
    max-height: 70vh;
  }
  .item-pay {
    width: 70px;
  }
}
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) {
  .pay {
    max-height: 70vh;
  }
  .item-pay {
    width: 60px;
  }
}
@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
  .pay {
    max-height: 70vh;
  }
  .item-pay {
    width: 70px;
  }
}
.item-pay {
  display: block;
  overflow: hidden;
  min-width: 60px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
