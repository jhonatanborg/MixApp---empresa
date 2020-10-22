<template>
  <v-app>
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
        <!-- <v-bottom-sheet eager v-model="sheet">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="purple" dark v-bind="attrs" v-on="on">
              Open In
            </v-btn>
          </template>
          <v-list>
            <v-subheader>Open in</v-subheader>
            <v-list-item
              v-for="tile in tiles"
              :key="tile.title"
              @click="sheet = false"
            >
              <v-list-item-avatar>
                <v-avatar size="32px" tile>
                  <img
                    :src="
                      `https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`
                    "
                    :alt="tile.title"
                  />
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-title>{{ tile.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-bottom-sheet> -->
        <ChangeDialog :changeDialog="changeDialog" />
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import ChangeDialog from "@/components/sale/ChangeDialog.vue";
export default {
  components: {
    ChangeDialog,
  },
  props: {
    payDialog: Boolean,
    total: Number,
  },

  data: () => ({
    sheet: false,
    changeDialog: {
      dialog: false,
      total: null,
    },
    tiles: [
      { img: "keep.png", title: "Keep" },
      { img: "inbox.png", title: "Inbox" },
      { img: "hangouts.png", title: "Hangouts" },
      { img: "messenger.png", title: "Messenger" },
      { img: "google.png", title: "Google+" },
    ],
    step: 1,
    payment: [],
  }),
  computed: {
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
    payments() {
      return this.$store.getters["cart/getPayments"] || [];
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
        this.payment.find((item) => item.title === "dinheiro");
        this.changeDialog.dialog = true;
        this.changeDialog.total = this.total;
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
