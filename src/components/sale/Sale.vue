<template>
  <div id="sale">
    <v-navigation-drawer
      right
      app
      @input="eventSale"
      temporary
      clipped
      height="100%"
      :width="$vuetify.breakpoint.xsOnly ? '100%' : '370px'"
      :value="$store.state.cart.sidebar.open"
    >
      <v-card
        flat
        class="mx-0 pa-0 my-0 "
        v-if="bagStatus && address && company"
      >
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
            <v-list-item-action v-if="step.step == 2">
              <v-btn
                @click="$store.commit('cart/sidebar', { open: true, step: 1 })"
                outlined
                color="primary"
                >Voltar</v-btn
              >
            </v-list-item-action>
            <v-list-item-action v-else>
              <v-btn
                @click="$store.commit('cart/sidebar', { open: false, step: 1 })"
                outlined
                color="error"
                >Fechar</v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </div>
        <div>
          <div id="list-products">
            <v-window :value="step.step">
              <v-window-item :value="1">
                <div class="py-2 grey lighten-4">
                  <span class="mx-3">Entregar em:</span>
                </div>
                <v-list-item @click="openDialogAddress()" link dense>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      {{ address.street }}, {{ address.number }} -
                      {{ address.district }}

                      {{ address.complement }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-btn small icon color="#765eda">
                    <v-icon size="20">mdi-pencil-outline</v-icon>
                  </v-btn>
                </v-list-item>
                <v-card
                  class="overflow-y-auto barscroll "
                  style="max-height: 320px;"
                  flat
                >
                  <div class="py-3 grey lighten-4">
                    <span class="mx-3">Produtos</span>
                  </div>
                  <v-list-item
                    dense
                    v-for="item in sale"
                    :key="item.id"
                    link
                    class="my-0"
                  >
                    <v-list-item-content>
                      <div class=""></div>
                      <v-list-item-title>
                        <b> {{ item.product_qtd }}x</b>
                        {{ item.product_name }}</v-list-item-title
                      >
                      <v-list-item-subtitle
                        v-if="item.cashback_return"
                        class="green--text"
                      >
                        + {{ parseInt(item.cashback_return) }} pontos
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <div class="price-item">
                        <small>
                          <b v-text="convertMoney(item.total)"> </b>
                        </small>
                      </div>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-btn
                        @click="deleteItemSale(item.id)"
                        icon
                        color="error"
                      >
                        <v-icon>mdi-close-circle-outline</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-card>

                <v-list-item class=" grey lighten-4">
                  <span class="pay-subtitle">Subtotal</span>
                  <v-spacer></v-spacer>
                  <div
                    class="font-weight-bold black--text"
                    v-text="convertMoney(subTotal)"
                  ></div>
                </v-list-item>
                <div class="col-sm-12">
                  <v-btn dense @click="userVerify()" block color="#765eda" dark
                    >Confirmar</v-btn
                  >
                </div>
              </v-window-item>
              <v-window-item :value="2">
                <v-card flat>
                  <div class="py-2 grey lighten-4">
                    <span class="mx-3">Adicionar cupom</span>
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
                          :error-messages="errorCupom ? 'Cupom inválido' : ''"
                          outlined
                          dense
                          :hide-details="!errorCupom"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4" sm="2" md="4">
                        <v-btn
                          hide-details
                          @click="verifyCupom()"
                          dark
                          :loading="loadingCupom"
                          block
                          color="#765eda"
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

                  <div class="py-2 grey lighten-4">
                    <span class="mx-3">Resumo</span>
                  </div>
                  <v-list-item dense>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        Subtotal
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <div class="subtitle" v-text="convertMoney(subTotal)"></div>
                  </v-list-item>

                  <v-list-item dense v-if="successCupom == true">
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        Desconto
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
                  <v-list-item dense>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        Taxa de entrega
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <div
                      v-if="company.deliveryFee"
                      class="subtitle"
                      v-text="convertMoney(company.deliveryFee.value)"
                    ></div>
                  </v-list-item>
                  <v-list-item dense>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        Total
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <div class="subtitle" v-text="convertMoney(total)"></div>
                  </v-list-item>
                  <div>
                    <div class="py-2 grey lighten-4">
                      <span class="mx-3">Tipo de pagamento</span>
                    </div>
                    <div>
                      <div v-if="!verifyPay" class="mx-3 my-3">
                        <v-btn
                          @click="paySelect()"
                          dense
                          outlined
                          color="#765eda"
                          dark
                          block
                        >
                          Seleciona a forma de pagamento
                        </v-btn>
                      </div>
                      <div v-else>
                        <v-list-item @click="paySelect()" link dense>
                          <v-list-item-content>
                            <v-list-item-subtitle>
                              <span
                                class="text-capitalize"
                                v-for="(item, key) in pay"
                                :key="key"
                              >
                                {{ item.title }}
                              </span>
                            </v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn icon small color="#765eda">
                              <v-icon size="20">mdi-pencil-outline</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </div>

                      <div class="mx-3 ">
                        <v-btn
                          @click="sendPurchase()"
                          dense
                          color="#765eda"
                          :disabled="!verifyPay"
                          block
                          class="white--text"
                        >
                          Confirmar Pedido
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-window-item>
            </v-window>
          </div>
        </div>
      </v-card>
      <v-card flat class="mx-auto col-sm-12" v-else>
        <div class="d-flex justify-space-bettwen my-3 align-center">
          <v-list-item two-line>
            <v-list-item-content> </v-list-item-content>
          </v-list-item>
        </div>
        <v-card class="d-flex" flat min-height="500">
          <div class="align-self-center mx-auto">
            <div class="text-center">
              <BagEmpty />
              <div>
                <h3>A sua sacola está vazia</h3>
              </div>
              <div class="my-3">
                <h4 color="grey lighten-5">
                  Não sabe o que comer? Centenas de delicias esperam por você!
                </h4>
              </div>
              <v-btn large color="#765eda" to="/" dark>Veja o cardápio</v-btn>
            </div>
          </div>
        </v-card>
      </v-card>
      <Pay :total="total" :payDialog="dialogPay" @close-pay="closepay" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import BagEmpty from "@/components/icons/BagEmpty";
import Pay from "@/components/sale/DialogPay";
import axios from "axios";

export default {
  components: {
    BagEmpty,
    Pay,
  },
  data: () => ({
    dialogPay: false,
    purchase: [],
    errorCupom: false,
    cupom: null,
    discount_value: null,
    successCupom: null,
    loadingCupom: false,
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
      localStorage.setItem(
        "company",
        JSON.stringify(this.$store.getters["company/getCompany"])
      );
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
      if (this.company.deliveryFee) {
        if (this.discount_value) {
          sum = parseFloat(sum) - parseFloat(this.discount_value);
        }
        sum = parseFloat(sum) + parseFloat(this.company.deliveryFee.value);
      }
      return sum;
    },
    address() {
      return this.$store.state.user.address;
    },

    verifyPay() {
      let success;
      if (this.pay) {
        success = true;
      } else {
        success = false;
      }
      return success;
    },

    bagStatus() {
      return this.$store.state.cart.saleIdb.length > 0 ? true : false;
    },
  },
  methods: {
    userVerify() {
      if (localStorage.getItem("acess-token")) {
        this.$store.commit("cart/sidebar", { open: true, step: 2 });
      } else this.$router.push({ name: "session" });
    },
    closepay() {
      this.dialogPay = !this.dialogPay;
    },
    convertMoney(money) {
      if (money > 0) {
        const toCurrency = (n, curr, LanguageFormat = undefined) =>
          Intl.NumberFormat(LanguageFormat, {
            style: "currency",
            currency: curr,
          }).format(n);
        return toCurrency(money, "BRL");
      } else {
        return "0.00";
      }
    },
    next() {
      this.activeTab = 1;
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      if (this.windowSize <= 500) {
        this.isActive = true;
      }
    },
    deleteItemSale(item) {
      const payload = {
        idb: {
          table: "sale",
          data: item,
        },
        method: "delete",
      };
      this.$store.dispatch("cart/request", payload);
      this.$store.dispatch("cart/request", {
        state: "saleIdb",
        method: "getAll",
        idb: {
          table: "sale",
        },
      });
    },

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
        console.log(this.pay);
        if (paymentsArray.length > 0) {
          delete this.address.type;
          console.log(this.address);
          let sale = {
            address: this.address,
            saleItems: this.sale,
            change_for: this.change ? this.change : null,
            cupom: this.cupom ? this.cupom + "@" + this.company.id : "",
            payment_available_id: paymentsArray,
            company_id: this.company.id,
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
              this.cupom = "";
              this.successCupom = null;

              console.log(err.response.data);
              if (err.response.data.message) {
                this.$store.commit("cart/request", {
                  state: "errorSale",
                  data: {
                    value: true,
                    message: err.response.data.message,
                    status: err.response.data.status,
                  },
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
          .catch(() => {
            this.cupom = "";

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
      this.dialogPay = !this.dialogPay;
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
      console.log(data);
      this.$store.commit("cart/sidebar", { open: data, step: 1 });
    },
    openDialogAddress() {
      this.$store.commit("alertAddress", { value: true });
      if (localStorage.getItem("acess-token")) {
        this.$store.commit("user/request", { state: "addressTabs", data: 3 });
      } else {
        this.$store.commit("user/request", { state: "addressTabs", data: 1 });
      }
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}

.barscroll::-webkit-scrollbar {
  width: 15px;
}

.barscroll::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.barscroll::-webkit-scrollbar-thumb {
  background: #ef354e;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.barscroll::-webkit-scrollbar-thumb:hover {
  background: black;
}
.pay-subtitle {
  color: #707070;
  font-weight: 400;
}
</style>
