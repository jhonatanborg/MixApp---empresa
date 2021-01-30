<template>
  <div>
    <div class="py-2">
      <span class="mx-3 item-title">Adicionar cupom</span>
    </div>
    <div>
      <v-row
        v-if="!successCupom"
        justify="space-between"
        class="my-3 mx-3"
        no-gutters
      >
        <v-col cols="7" sm="4" md="7">
          <v-text-field
            label="Insira cupom"
            v-model="cupom"
            :error="errorCupom"
            :error-messages="errorMessage"
            outlined
            dense
            @input="
              cupom = cupom
                .split(' ')
                .join('')
                .toUpperCase()
            "
            :hide-details="!errorCupom"
          ></v-text-field
        ></v-col>
        <v-col cols="4" sm="2" md="4">
          <v-btn
            @click="verifyCupom()"
            dark
            depressed
            :loading="loadingCupom"
            block
            color="primary"
            >Validar</v-btn
          >
        </v-col>
      </v-row>
      <div class="mx-3">
        <v-alert
          :value="successCupom"
          transition="scale-transition"
          close-label
          type="success"
          dense
        >
          Cupom adicionado!
        </v-alert>
      </div>
    </div>
    <div class="py-2">
      <span class="mx-3 item-title">Tipo de pagamento</span>
    </div>
    <div>
      <div class=" mx-3">
        <v-card @click="paySelect()" link flat>
          <v-list-item>
            <v-list-item-content>
              <v-row>
                <v-col v-for="(item, key) in pay" :key="key" cols="auto">
                  <v-row no-gutters dense align="center" justify="center">
                    <v-col cols="auto">
                      <v-img
                        width="30px"
                        :src="$store.state.server + item.img"
                      ></v-img>
                    </v-col>
                    <v-col>
                      <div class="item-subtitle text-capitalize mx-3">
                        <span> {{ item.title }} </span>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon color="primary">
                <v-icon size="20">mdi-pencil-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </div>
    </div>
    <div v-if="$store.state.cart.type !== 'retirada'" class="mx-3">
      <div class="py-2">
        <span class="mx-3 item-title">
          Endereço para entrega:
        </span>
      </div>
      <div>
        <v-card flat color="grey lighten-4">
          <v-list-item dense @click="openDialogAddress()" link class="my-2">
            <v-list-item-content>
              <v-list-item-subtitle class="price-item">
                <span class="item-address">
                  {{ address.street }}, {{ address.number }} -
                  {{ address.district }}

                  {{ address.complement }}</span
                >
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <div
                  v-if="company.deliveryFee"
                  class="item-value-address"
                  v-text="convertMoney(company.deliveryFee.value)"
                ></div>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon color="primary">
                <v-icon size="20">mdi-pencil-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </div>
    </div>
    <div v-else>
      <div class="py-2">
        <span class="mx-3 item-title">
          Retire seu pedido em:
        </span>
      </div>
      <v-list-item dense @click="openDialogAddress()" link class="my-2">
        <v-list-item-content>
          <v-list-item-subtitle class="price-item">
            <span class="item-address">
              {{ company.address.street }}, {{ company.address.number }} -
              {{ company.address.district }}

              {{ company.address.complement }}</span
            >
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary">
            <v-icon size="20">mdi-pencil-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </div>

    <div class="py-2 ">
      <span class="mx-3 item-title">Resumo</span>
    </div>
    <v-list-item dense>
      <v-list-item-content>
        <v-list-item-subtitle>
          <span class="item-subtitle">Subtotal</span>
        </v-list-item-subtitle>
      </v-list-item-content>
      <div class="subtitle" v-text="convertMoney(subTotal)"></div>
    </v-list-item>

    <v-list-item v-if="successCupom == true">
      <v-list-item-content>
        <v-list-item-subtitle>
          <span class="item-subtitle">Desconto</span>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-chip
        class="pink--text pink lighten-5 font-weight-bold "
        close
        color="pink"
        @click:close="removeCupom()"
        ><span v-text="convertMoney(discount_value)"> </span
      ></v-chip>
    </v-list-item>
    <v-list-item dense v-if="$store.state.cart.type !== 'retirada'">
      <v-list-item-content>
        <v-list-item-subtitle>
          <span class="item-subtitle"> Taxa de entrega </span>
        </v-list-item-subtitle>
      </v-list-item-content>
      <div
        v-if="company.deliveryFee"
        class="subtitle"
        v-text="convertMoney(company.deliveryFee.value)"
      ></div>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>
          <span class="item-subtitle">Total</span>
        </v-list-item-subtitle>
      </v-list-item-content>
      <div class="subtitle" v-text="convertMoney(total)"></div>
    </v-list-item>
    <div>
      <div class="mx-3 my-5 ">
        <v-btn
          class="btn-send"
          @click="sendPurchase()"
          color="#FFBA0A"
          block
          x-large
          depressed
        >
          Fazer Pedido

          <span v-text="convertMoney(total)"> </span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import mixin from "@/mixins/mixins.js";
export default {
  mixins: [mixin],
  components: {},
  data: () => ({
    purchase: [],
    errorCupom: false,
    cupom: null,
    discount_value: null,
    successCupom: null,
    loadingCupom: false,
    errorMessage: null,
  }),

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
    editAddress() {
      this.$store.commit("alertAddress", {
        data: {
          value: true,
          route: "",
        },
      });
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
      this.$store.commit("showAlert", false, { root: true });
    },
    verifyCupom() {
      this.loadingCupom = true;
      if (this.cupom) {
        axios({
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
          },
          url:
            `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}/verify-cupom/` +
            this.cupom +
            "@" +
            this.company.id,
        })
          .then((resp) => {
            let cupom = resp.data;
            this.$store.commit("cart/request", {
              state: "cupom",
              data: resp.data,
            });

            if (cupom.type === "currency") {
              this.discount_value = cupom.discount_value;
              this.successCupom = true;
              this.loadingCupom = false;
            } else if (cupom.type === "percentage") {
              this.successCupom = true;
              this.discount_value =
                parseFloat(cupom.discount_value / 100) *
                parseFloat(this.subTotal);
              this.loadingCupom = false;
            }
          })
          .catch((err) => {
            this.cupom = "";
            this.errorMessage = err.response.data.message;
            this.successCupom = false;
            this.errorCupom = true;
            this.loadingCupom = false;
          });
      } else {
        this.errorCupom = true;
        this.cupom = "";
        this.successCupom = false;
        this.loadingCupom = false;
      }
    },
    paySelect() {
      this.$store.commit("cart/sidebar", { open: true, step: 2 });
    },
    clearPay() {
      this.$store.commit("cart/changeFor", null);
      this.$store.commit("cart/paySelect", null);
    },
    removeCupom() {
      this.successCupom = false;
      this.cupom = null;
      this.cupomValidate = false;
      this.discount_value = null;
    },
    eventSale(data) {
      this.$store.commit("cart/sidebar", { open: data, step: 1 });
    },
    openDialogAddress() {
      this.$store.commit("alertAddress", { value: true });
      if (localStorage.getItem("acess-token")) {
        this.$store.commit("user/request", { state: "addressTabs", data: 4 });
      } else {
        this.$store.commit("user/request", { state: "addressTabs", data: 1 });
      }
    },
  },
};
</script>

<style>
.btn-send {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
}
.item-subtitle {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
}
</style>
