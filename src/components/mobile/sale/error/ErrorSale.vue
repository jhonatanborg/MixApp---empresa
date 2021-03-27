<template>
  <v-row align="center" justify="center" class="pa-5">
    <v-card flat class="pa-5">
      <v-row justify="center" align="center">
        <v-col cols="auto" sm="4">
          <v-img width="200px" src="@/assets/images/exclamation.svg"></v-img>
        </v-col>
        <v-col cols="12">
          <div>
            <h2 class="title-message-error">
              Ops! Temos um problema
            </h2>
            <div class="details-message-error ">
              <span> {{ $store.state.cart.sidebar.message }}</span>
            </div>

            <v-row v-if="company.withdraw">
              <v-col cols="12">
                <v-btn
                  depressed
                  outlined
                  x-large
                  @click="withdrawalVerify()"
                  block
                  color="primary"
                >
                  <b>Quero retirar</b>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import axios from "axios";
import mixin from "@/mixins/mixins.js";
export default {
  mixins: [mixin],
  computed: {
    shoppingCart: {
      get() {
        return this.$store.state.sidebar;
      },
      set(val) {
        this.$store.commit("sidebar", val);
      },
    },
    companies() {
      return this.$store.state.company.companies;
    },
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
    sale() {
      return this.$store.state.cart.saleIdb;
    },
    step() {
      return this.$store.state.cart.sidebar;
    },
    pay() {
      return this.$store.state.cart.paySelect;
    },
    change() {
      return this.$store.state.cart.changeFor;
    },

    subTotal() {
      let sum;
      if (this.sale) {
        sum = this.sale.reduce((sum, item) => sum + item.total, 0);
      }
      return sum;
    },

    total() {
      let sum = this.subTotal;
      if (
        this.company.deliveryFee &&
        this.$store.state.cart.type !== "retirada"
      ) {
        sum = parseFloat(sum) + parseFloat(this.company.deliveryFee.value);
      }
      if (this.discount_value) {
        sum = parseFloat(sum) - parseFloat(this.discount_value);
      }
      return sum;
    },
    address() {
      return this.$store.state.user.address;
    },

    bagStatus() {
      return this.$store.state.cart.saleIdb.length > 0 ? true : false;
    },
  },
  methods: {
    deleteSale() {
      const payload = {
        idb: {
          table: "sale",
        },
        method: "deleteAll",
      };
      this.$store.dispatch("cart/request", payload);
      this.$store.dispatch("cart/request", {
        state: "saleIdb",
        method: "getAll",
        idb: {
          table: "sale",
        },
      });
      this.$store.commit("cart/request", {
        state: "errorSale",
        data: {
          value: false,
          message: null,
        },
      });
    },
    withdrawalVerify() {
      if (localStorage.getItem("acess-token")) {
        this.$store.commit("cart/setType", "retirada");
        this.sendPurchase();
      } else this.$router.push({ name: "session" });
    },
    openDialogAddress() {
      this.$store.commit("alertAddress", { value: true });
      if (localStorage.getItem("acess-token")) {
        this.$store.commit("user/request", { state: "addressTabs", data: 4 });
      } else {
        this.$store.commit("user/request", { state: "addressTabs", data: 1 });
      }
    },
    sendPurchase() {
      if (localStorage.getItem("acess-token")) {
        let paymentsArray = [];
        this.pay.forEach((element) => {
          paymentsArray.push(element.id);
        });
        if (paymentsArray.length > 0) {
          let sale = {
            address: this.address,
            saleItems: this.sale,
            type:
              this.$store.state.cart.type === "retirada"
                ? "retirada"
                : "online",
            change_for: this.change ? this.change : null,
            cupom: this.cupom ? this.cupom + "@" + this.company.id : "",
            payment_available_id: paymentsArray,
            company_id: this.company.id,
            ispromotion: localStorage.getItem("promo") ? true : false,
          };
          axios({
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
            },
            url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/sale`,
            data: sale,
          })
            .then((resp) => {
              localStorage.removeItem("promo");
              this.$store.commit("user/request", {
                state: "purchaseDetails",
                data: resp.data[0],
              });
              this.cupom = "";
              this.successCupom = null;
              this.$router.push({
                name: "purchase-details",
                params: { id: resp.data[0].id },
              });
              this.deleteSale();
            })
            .catch((err) => {
              localStorage.removeItem("promo");

              this.cupom = "";
              this.successCupom = null;

              if (err.response.data.message) {
                this.$store.commit("cart/sidebar", {
                  open: true,
                  step: 4,
                  message: err.response.data.message,
                  status: err.response.data.status,
                });
              }
            });
        }
      } else {
        this.$router.push({ name: "session" });
      }
    },
  },
};
</script>

<style></style>
