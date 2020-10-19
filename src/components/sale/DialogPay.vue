<template>
  <v-dialog
    v-model="payDialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    right
    persistent
    :overlay="false"
    max-width="500"
    transition="dialog-transition"
    scrollable
  >
    <v-card v-if="company">
      <div class="align-center">
        <v-list-item class="mx-0">
          <v-list-item-avatar tile>
            <v-img :src="$store.state.server + company.logo"> </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle>
              Pedidos em:
            </v-list-item-subtitle>
            <v-list-item-title>
              <router-link :to="{ name: 'company' }" dense>
                <b> {{ company.name }}</b></router-link
              >
            </v-list-item-title>
            <v-list-item-title>
              <a to="/home"> <b> </b></a>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="$emit('close-pay')" outlined color="error"
              >Fechar</v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </div>

      <div class="py-1 ">
        <v-list-item class="mx-0">
          <v-list-item-content>
            <v-list-item-title>
              Pague na entrega
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon color="#ffa602">mdi-help-circle-outline</v-icon>
          </v-list-item-action>
        </v-list-item>
      </div>
      <div class="overflow-x-hidden">
        <div class="px-5 ">
          <v-row cols="6" v-for="(item, i) in payments" :key="i">
            <v-col cols="12">
              <small>
                {{ item.title }}
              </small>
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
              </v-card></v-col
            >
          </v-row>
          <div
            v-if="returnMoney"
            class="my-2 col-sm-12 animate__animated animate__zoomIn"
          >
            <v-text-field
              label="Troco para"
              outlined
              dense
              :error="changeError"
              :error-messages="changeError ? 'Valor inválido' : ''"
              v-model.lazy="valueChange"
              v-money="money"
              name="name"
            ></v-text-field>
          </div>
        </div>
      </div>
      <v-toolbar height="80px" bottom>
        <v-row>
          <v-col cols="12">
            <v-btn
              :disabled="payVerify"
              block
              :dark="payVerify ? false : true"
              @click="payConfirm()"
              x-large
              color="#ffa602"
            >
              Confirmar
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    payDialog: Boolean,
    total: Number,
  },

  data: () => ({
    step: 1,
    payment: [],
    valueChange: 0.0,
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      precision: 2,
      masked: true,
    },
    changeError: false,
  }),
  computed: {
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
    payments() {
      return this.$store.getters["cart/getPayments"] || [];
    },
    returnMoney() {
      let change;
      if (this.payment) {
        const found = this.payment.find((item) => item.title === "dinheiro");
        if (found) {
          change = true;
        } else {
          change = false;
        }
      }
      return change;
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
    },
    payConfirm() {
      let change;
      if (this.payment) {
        if (this.valueChange) {
          change = parseFloat(
            this.valueChange
              .slice(2)
              .replace(".", "")
              .replace(",", ".")
          );
        }
      }
      if (change <= this.total && change > 0) {
        this.changeError = true;
      } else {
        this.changeError = false;
        this.$store.commit("cart/changeFor", change);
        this.$store.commit("cart/paySelect", this.payment);
        this.$emit("close-pay");
      }
    },
  },
};
</script>

<style></style>
