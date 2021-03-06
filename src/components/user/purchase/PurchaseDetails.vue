<template>
  <div v-if="purchaseDetails">
    <Notify />

    <v-card
      :loading="
        purchaseDetails.status !== 'Cancelado' &&
        purchaseDetails.status !== 'Entregue'
          ? true
          : false
      "
      class=" card-purchase-details"
      tile
      outlined
    >
      <v-alert :color="statusPurchase.status" class="ma-0">
        <v-flex class="white--text">
          <div>
            <span class="white--text font-weight-bold">{{
              purchaseDetails.status
            }}</span>
          </div>

          <div>
            <small v-text="statusPurchase.details"></small>
          </div>
        </v-flex>
      </v-alert>
      <div class="d-flex justify-space-between pa-5 ">
        <div>
          <div>
            <b> Pedido {{ purchaseDetails.id }} </b>
          </div>
        </div>
        <div>
          <div class="complements">
            Previsto para ser entregue:
            <div>
              <span v-text="timeDelivery"></span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="items  px-5"
        v-for="(item, i) in purchaseDetails.itens"
        :key="i"
      >
        <div>
          <div class="mt-2 d-flex justify-space-between">
            <div>
              <span class="mr-3">{{ item.product_qtd }}x</span>
              {{ item.product.name }}
            </div>
            <div>R$ {{ item.total }}</div>
          </div>
          <div v-if="item.comment"><span>obs: </span>{{ item.comment }}</div>
          <div v-if="item.childItem.length > 0">
            <v-expansion-panels class="pa-0" flat tile>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-row dense>
                    <v-btn small color="primary" class="pa-0 " text>
                      Detalhes
                    </v-btn>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  v-for="(subcategory, i) in subcategories"
                  :key="i"
                  class="complements  "
                >
                  <div v-if="item.id === subcategory.sale_item_id">
                    <div>
                      <h3>{{ subcategory.name }}</h3>
                    </div>
                    <div
                      v-for="child in subcategory.products"
                      class="d-flex justify-space-between pa-0"
                      :key="child.id"
                    >
                      <div>{{ child.qtd }}x {{ child.name }}</div>
                      <div>
                        R$
                        {{
                          parseFloat(child.sale_value * child.qtd).toFixed(2)
                        }}
                      </div>
                    </div>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <div
        v-if="purchaseDetails.type === 'online'"
        class="my-5 pa-5"
        id="address"
      >
        <div>
          <div class="font-weight-bold">Entregar em</div>
        </div>
        <div>
          <v-list-item-title>
            {{ purchaseDetails.deliveryAddress.title }}</v-list-item-title
          >
          <div class="subheader ">
            {{ purchaseDetails.deliveryAddress.district }},
            {{ purchaseDetails.deliveryAddress.street }}, nº
            {{ purchaseDetails.deliveryAddress.number }}
            <span v-if="purchaseDetails.deliveryAddress.complement"
              >, {{ purchaseDetails.deliveryAddress.complement }}</span
            >
          </div>
        </div>
      </div>
      <div class="my-5 px-3" v-else>
        <v-chip
          v-if="purchaseDetails.type === 'retirada'"
          color="#9c27b0"
          class="white--text text-capitalize"
          v-text="purchaseDetails.type"
        >
        </v-chip>
      </div>
      <div class="font-weight-bold my-5 pa-5">
        <v-divider></v-divider>
        <div class="no-focus">
          <div class="my-5 d-flex justify-space-between">
            <div>Subtotal</div>
            <v-chip>
              R$
              {{ parseFloat(purchaseDetails.subtotal).toFixed(2) }}
            </v-chip>
          </div>
          <v-divider></v-divider>
          <div
            v-if="purchaseDetails.userCupom"
            class="my-5 d-flex justify-space-between"
          >
            <div>
              Cupom: {{ purchaseDetails.userCupom.cupom.name.split("@")[0] }}
            </div>
            <v-chip color="red" class="white--text">
              - R$
              {{
                purchaseDetails.userCupom.cupom.type === "percentage"
                  ? (
                      parseFloat(purchaseDetails.subtotal) *
                      parseFloat(
                        purchaseDetails.userCupom.cupom.discount_value / 100
                      ).toFixed(2)
                    ).toFixed(2)
                  : purchaseDetails.userCupom.cupom.discount_value
              }}
            </v-chip>
          </div>
          <v-divider v-if="purchaseDetails.cupom"></v-divider>
          <div
            v-if="purchaseDetails.type === 'online'"
            class="my-5 d-flex justify-space-between"
          >
            <div>Taxa de entrega</div>
            <v-chip color="green" class="white--text">
              + R$ {{ purchaseDetails.delivery_value }}
            </v-chip>
          </div>
          <v-divider></v-divider>

          <div class="my-5 d-flex justify-space-between">
            <div>Total</div>
            <v-chip color="primary">R$ {{ purchaseDetails.total }}</v-chip>
          </div>
          <v-divider></v-divider>
          <div class="my-5">
            <div class="no-focus">Pagamento em</div>
            <v-row
              no-gutters
              v-for="payments in purchaseDetails.payments"
              :key="payments.id"
            >
              <v-col class="text-capitalize" cols="auto">
                <div>
                  {{ payments.payment.group.title }} -
                  {{ payments.payment.title }}
                </div>
              </v-col>
            </v-row>
            <div v-if="purchaseDetails.change_for > 0" class="no-focus">
              <div>troco para: R$ {{ purchaseDetails.change_for }}</div>
              <div>troco: R$ {{ purchaseDetails.change }}</div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import mixin from "@/mixins/mixins.js";
import Notify from "@/components/shared/NotifyPush.vue";
import { addHours, addMinutes, format } from "date-fns";
export default {
  mixins: [mixin],
  components: {
    Notify,
  },
  mounted() {
    this.getPurchase();
  },
  computed: {
    purchaseDetails() {
      return this.$store.state.user.purchaseDetails || {};
    },
    subcategories() {
      return this.$store.getters["user/getPurchase"];
    },
    timeDelivery() {
      let newTime = this.purchaseDetails.created_at.split(" ");
      newTime[0] = newTime[0]
        .split("/")
        .reverse()
        .join("-");
      newTime = new Date(`${newTime[0]} ${newTime[1]}`);

      const [hours, minutes] = this.purchaseDetails.delivery_max_time.split(
        ":"
      );

      newTime = addHours(newTime, Number(hours));
      newTime = addMinutes(newTime, Number(minutes));
      return format(newTime, "HH:mm:ss");
    },
    statusPurchase() {
      let status;
      let action;
      let statusUpdate;
      let details;
      switch (this.purchaseDetails.status) {
        case "Pendente":
          status = "warning";
          statusUpdate = "Confirmado";
          details = "Seu pedido foi enviado até a empresa";
          break;
        case "Confirmado":
          status = "purple";
          details = "Seu pedido está sendo preparado";
          statusUpdate = "Saiu para Entrega";
          break;
        case "Saiu para Entrega":
          status = "primary";
          details = "Atenção! seu pedido está indo até você";
          statusUpdate = "Entregue";
          break;
        case "Pronto":
          status = "primary";
          details = "Atenção! seu pedido está pronto";
          statusUpdate = "Entregue";
          break;
        case "Entregue":
          status = "green";
          details = "Seu pedido foi entregue";
          statusUpdate = "Finalizado";
          break;
        case "Cancelado":
          status = "red";
          action = "Pedido Cancelado";
          details = "Ops! seu pedido foi cancelado";
          break;
        case "Finalizado":
          status = "light-green";
          action = null;
          break;
        default:
          break;
      }
      return { status, action, details, statusUpdate };
    },
  },
  methods: {
    convertMoney(money) {
      if (money > 0) {
        const toCurrency = (n, curr, LanguageFormat = undefined) =>
          Intl.NumberFormat(LanguageFormat, {
            style: "currency",
            currency: curr,
          }).format(n);
        return toCurrency(money, "BRL");
      } else {
        return "Grátis";
      }
    },
    getPurchase() {
      this.$store.dispatch("user/request", {
        state: "purchaseDetails",
        method: "GET",
        url: `/sale/${this.$route.params.id}`,
      });
      setTimeout(() => {
        this.getPurchase();
      }, 20000);
    },
    // displayNotification() {
    //   Notification.requestPermission(function(result) {
    //     if (result === "granted") {
    //       navigator.serviceWorker.ready.then(function(registration) {
    //         registration.showNotification("Mix entregas", {
    //           body: "Seu pedido saiu para entrega!",
    //           icon: "../images/touch/chrome-touch-icon-192x192.png",
    //           vibrate: [200, 100, 200, 100, 200, 100, 200],
    //           tag: "vibration-sample",
    //         });
    //       });
    //     }
    //   });
    // },
  },
};
</script>

<style>
.v-expansion-panel-content__wrap {
  padding: 0px 16px !important;
}
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 24px !important;
}
.complements {
  font-size: 13px;
  color: grey;
  padding-bottom: 0px !important;
}

.subheader {
  font-size: 13px;
  color: grey;
}

.value-product {
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  color: #666;
}
.purchase-address {
  font-weight: 500;
  font-size: 16px;
  text-align: left;
  color: #666;
}
.title-company {
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  color: #666;
}
.cash-return {
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  color: #00c996;
}
</style>
