<template>
  <v-dialog
    v-model="payDialog"
    scrollable
    :fullscreen="$vuetify.breakpoint.xsOnly"
    right
    persistent
    :overlay="false"
    max-width="500"
    transition="dialog-transition"
  >
    <v-card v-if="company">
      <div class="align-center">
        <v-list-item class="mx-0">
          <v-list-item-avatar tile>
            <v-img :src="company.logo"> </v-img>
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
            <v-icon @click="step++" color="#765eda"
              >mdi-help-circle-outline</v-icon
            >
          </v-list-item-action>
        </v-list-item>
      </div>
      <div>
        <div>
          <v-list-item-group
            v-for="(item, i) in payments"
            :key="i"
            multiple
            color="#765eda"
            rounded
            max="2"
            v-model="payment"
          >
            <div>
              <div class="py-3 grey lighten-4">
                <span class="mx-3 text-capitalize">{{ item.title }}</span>
              </div>

              <v-list-item
                v-for="(pay, key) in item.payments"
                :key="key"
                :value="pay"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title class="text-capitalize">
                      {{ pay.title }}
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      :true-value="pay.id"
                      color="#765eda"
                      @click="toggle"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </div>
          </v-list-item-group>
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
        <div class="pa-5">
          <!-- <div class="py-3 grey lighten-4">
            <span class="mx-3">Usar cashback</span>
          </div>
          <v-list-item>
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title>
                  Seu saldo |
                  <b> <span class="green--text">140 pontos</span> </b>
                </v-list-item-title>
              </v-list-item-content>
              <v-chip color="red lighten-5" dense
                ><b class="red--text">-30 pontos</b></v-chip
              >
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  color="#765eda"
                  @click="toggle"
                ></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item> -->

          <v-btn @click="payConfirm()" x-large color="#765eda" dark block>
            Confirmar
          </v-btn>
        </div>
      </div>
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
        if (this.payment.title === "dinheiro") {
          change = true;
        } else {
          change = false;
        }
      }
      return change;
    },
  },
  methods: {
    payConfirm() {
      console.log(this.payment);
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
