<template>
  <div v-if="promotions" class="grey darken-4 pa-5">
    <v-row dense v-for="(promo, key) in promotions" :key="key">
      <v-col cols="12">
        <div>
          <span class="white--text">{{ promo.title }}</span>
        </div>
        <div>
          <small class="white--text">{{ promo.description }}</small>
        </div>
        <v-row dense>
          <v-col
            v-for="(product, key) in promo.productsPromotion"
            :key="key"
            cols="12"
            sm="4"
          >
            <div @click="modal(product.product)">
              <ProductPromo class="ma-2" :product="product" />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div id="dialog-product">
      <v-dialog
        :fullscreen="$vuetify.breakpoint.xsOnly"
        max-width="500px"
        transition="dialog-transition"
        v-model="viewDialog"
        persistent
        scrollable
      >
        <v-card>
          <v-img
            :aspect-ratio="16 / 9"
            width="100%"
            :src="$store.state.server + productSelected.img"
          >
            <v-row justify="end">
              <v-col cols="auto">
                <v-btn
                  class="mr-3"
                  x-small
                  color="white"
                  fab
                  @click="closeDialog"
                >
                  <v-icon size="20">mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-img>

          <v-card-title>
            <v-row justify="space-between" align="center">
              <v-col cols="auto">
                <div class="title-product mr-3">
                  <span>{{ productSelected.name }}</span>
                </div>
              </v-col>
              <v-col cols="auto">
                <v-chip
                  v-if="productSelected.cashback_return > 0"
                  dense
                  color="#00c996"
                  text-color="white"
                  dark
                >
                  Ganhe
                  <b
                    class=" mx-2"
                    v-text="parseInt(productSelected.cashback_return)"
                  >
                  </b
                  >pontos
                </v-chip></v-col
              >
            </v-row>
          </v-card-title>
          <v-card-text class="px-0 ma-0">
            <div class="px-6 description">
              <span>
                {{ productSelected.description }}
              </span>
            </div>
            <div class="cashback-value px-6 my-4">
              <span v-if="productSelected.cashback_cost > 0">
                Compre por
                <span v-text="parseInt(productSelected.cashback_cost)"></span>
                pontos</span
              >
            </div>

            <div class="my-3 px-5 mb-10 pb-10">
              <v-textarea
                outlined
                dense
                rows="2"
                v-model="comment"
                placeholder="Ex. sem pimenta, sem molho verde"
                label="Personalize seu pedido"
                id="id"
              ></v-textarea>
            </div>
          </v-card-text>
          <v-toolbar absolute bottom>
            <v-row align="center">
              <v-col cols="4" sm="4">
                <v-select
                  hide-details
                  :items="items"
                  v-model="quantity"
                  solo
                  :item-text="items.text"
                  :item-value="items.value"
                  :menu-props="{ top: true, offsetY: true }"
                ></v-select>
              </v-col>
              <v-col cols="8" sm="8">
                <v-btn
                  x-large
                  block
                  type="submit"
                  depressed
                  dark
                  color="#FFBA0A"
                  @click="AddPurchase"
                >
                  <div>
                    Adicionar
                    <span v-text="convertMoney(Total)">
                      R$
                    </span>
                  </div>
                </v-btn>
              </v-col>
            </v-row>
          </v-toolbar>
        </v-card>
      </v-dialog>
    </div>
    <div id="dialog-mount">
      <v-dialog
        :fullscreen="$vuetify.breakpoint.xsOnly"
        v-model="viewDialogMount"
        transition="dialog-transition"
        max-width="500px"
        persistent
        scrollable
      >
        <v-card>
          <v-img
            width="100%"
            height="25%"
            aspect-ratio="1.1"
            :src="$store.state.server + productSelected.img"
          >
            <v-row justify="end">
              <v-col cols="auto">
                <v-btn
                  class="mr-3"
                  x-small
                  color="white"
                  fab
                  @click="closeDialogMount"
                >
                  <v-icon size="20">mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-img>

          <v-card-title>
            <v-row justify="space-between">
              <v-col cols="auto">
                <div class="title-product mr-3">
                  <span>{{ productSelected.name }}</span>
                </div>
              </v-col>
              <v-col cols="auto">
                <v-chip
                  v-if="productSelected.cashback_return > 0"
                  dense
                  color="#00c996"
                  text-color="white"
                  dark
                >
                  Ganhe
                  <b
                    class=" mx-2"
                    v-text="parseInt(productSelected.cashback_return)"
                  >
                  </b
                  >pontos
                </v-chip></v-col
              >
            </v-row>
          </v-card-title>
          <v-card-text class="px-0">
            <div class="px-6 description">
              <span>
                {{ productSelected.description }}
              </span>
            </div>
            <div class="cashback-value px-6 my-4">
              <span v-if="productSelected.cashback_cost > 0">
                Compre por
                <span v-text="parseInt(productSelected.cashback_cost)"></span>
                pontos</span
              >
            </div>

            <div v-for="item in complements" :key="item.id">
              <v-row
                class="grey lighten-4 px-6"
                justify="space-between"
                align="center"
              >
                <v-col cols="auto">
                  <span class="font-weight-bold title-subcategory">
                    {{ item.name }}
                  </span>
                </v-col>
                <v-col cols="auto">
                  <v-chip small v-text="convertMandatory(item.mandatory)">
                  </v-chip>
                </v-col>
              </v-row>

              <v-list-item-group
                dense
                v-for="item2 in item.products"
                v-model="lista[item.name]"
                :key="item2.id"
                color="#FFBA0A"
                multiple
                :max="item.limit > 0 ? item.limit : 1000"
              >
                <v-list-item dense :value="item2">
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item2.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="font-weight-bold">
                        + {{ convertMoney(item2.sale_value) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        :true-value="item2"
                        color="#FFBA0A"
                        @click="toggle"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </div>
            <div class="my-3 px-5">
              <v-textarea
                outlined
                dense
                rows="2"
                v-model="comment"
                placeholder="Ex. sem pimenta, sem molho verde"
                label="Personalize seu pedido"
                id="id"
              ></v-textarea>
            </div>
          </v-card-text>
          <v-toolbar height="80px" floating bottom>
            <v-row align="center">
              <v-col cols="4" sm="4">
                <v-select
                  :items="items"
                  v-model="quantity"
                  hide-details
                  :item-text="items.text"
                  :item-value="items.value"
                  solo
                  :menu-props="{ top: true, offsetY: true }"
                ></v-select>
              </v-col>
              <v-col cols="8" sm="8">
                <v-btn
                  :dark="!verifyMandatory"
                  type="submit"
                  block
                  x-large
                  depressed
                  color="#FFBA0A"
                  @click="AddPurchaseMount"
                  :disabled="verifyMandatory"
                >
                  <div>
                    Adicionar
                    <span v-text="convertMoney(Total)">
                      R$
                    </span>
                  </div>
                </v-btn>
              </v-col>
            </v-row>
          </v-toolbar>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import ProductPromo from "@/components/company/product/ProductPromo";
import axios from "axios";

export default {
  props: {
    products: Array,
  },
  components: {
    ProductPromo,
  },
  computed: {
    company() {
      return this.$store.getters["company/getCompany"] || {};
    },
    promotions() {
      return this.$store.getters["company/getPromo"] || {};
    },
    verifyMandatory() {
      let disabled = false;

      if (this.complements.length > 0) {
        this.complements.forEach((item) => {
          if (
            this.lista[item.name] &&
            item.mandatory === "S" &&
            this.lista[item.name].length <= 0
          ) {
            disabled = true;
          } else if (!this.lista[item.name] && item.mandatory === "S") {
            disabled = true;
          }
        });
      }

      return disabled;
    },

    Total() {
      let total = 0;
      if (this.complements.length > 0) {
        this.complements.forEach((item) => {
          if (this.lista[item.name]) {
            this.lista[item.name].forEach((item) => {
              total += item.sale_value * parseFloat(this.quantity);
            });
          }
        });
      }
      return (
        parseFloat(total) +
        parseFloat(this.productSelected.promo_value) * parseFloat(this.quantity)
      );
    },
    error() {
      return this.$store.state.error;
    },
  },
  data() {
    return {
      model: null,
      lista: [],
      comment: "",
      alertSale: true,
      items: [
        {
          text: "1 item",
          value: 1,
        },
        {
          text: "2 items",
          value: 2,
        },
        {
          text: "3 itens",
          value: 3,
        },
        {
          text: "4 itens",
          value: 4,
        },
        {
          text: "5 itens",
          value: 5,
        },
        {
          text: "6 itens",
          value: 6,
        },
        {
          text: "7 itens",
          value: 7,
        },
        {
          text: "8 itens",
          value: 8,
        },
        {
          text: "9 itens",
          value: 9,
        },
      ],
      total: Number,
      quantity: 1,
      productSelected: Object,
      viewDialogMount: false,
      viewDialog: false,
      complements: [],
      sale: null,
    };
  },
  methods: {
    modal(item) {
      if (item.mount == "S") {
        axios({
          url:
            process.env.VUE_APP_BASE_URL_SERVER_LOCAL +
            "/product/" +
            item.object_id,
          method: "get",
        }).then((response) => {
          if (response.data.childs && response.data.childs.length > 0) {
            this.productSelected = item;
            this.complements = response.data.childs.sort(
              (a, b) => a.order - b.order
            );
            this.viewDialogMount = true;
            this.total = item.sale_value;
          } else {
            this.viewDialog = true;
            this.productSelected = item;
          }
        });
      } else {
        this.viewDialog = true;
        this.productSelected = item;
      }
    },

    closeDialogMount() {
      this.viewDialogMount = false;
      this.lista = [];
    },
    closeDialog() {
      this.viewDialog = false;
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
        return "Grátis";
      }
    },
    convertMandatory(item) {
      if (item == "S") {
        return "Obrigatório";
      }
      return "Opcional";
    },
    AddPurchase() {
      localStorage.setItem("promo", "ispromo");
      localStorage.setItem("company", JSON.stringify(this.company));
      let sale = {
        product_id: this.productSelected.id,
        product_qtd: this.quantity,
        comment: this.comment,
        product_name: this.productSelected.name,
        total: this.Total,
        sale_type_id: 1,
        company_id: this.company.id,
        cashback_return: this.productSelected.cashback_return,
      };
      if (localStorage.getItem("geolocation")) {
        this.insertIdb(sale);
        this.viewDialog = false;
      } else {
        this.$store.commit("alertAddress", { value: true });
        if (localStorage.getItem("acess-token")) {
          this.$store.commit("user/request", {
            state: "addressTabs",
            data: 3,
          });
        } else {
          this.$store.commit("user/request", {
            state: "addressTabs",
            data: 1,
          });
        }
      }
    },
    AddPurchaseMount() {
      localStorage.setItem("promo", "ispromo");

      let objectChilds = [];
      if (this.complements.length > 0) {
        this.complements.forEach((item) => {
          if (this.lista[item.name]) {
            this.lista[item.name].forEach((item) => {
              objectChilds.push({
                product_id: item.id,
                product_qtd: this.qtd,
                cashback_return: item.cashback_return,
                product_name: item.name,
                total: item.sale_value,
                sale_type_id: 1,
                company_id: this.company.id,
              });
            });
          }
        });
      }
      let sale = {
        product_id: this.productSelected.id,
        product_qtd: this.quantity,
        product_name: this.productSelected.name,
        total: parseFloat(this.Total),
        cashback_return: this.productSelected.cashback_return,

        sale_type_id: 1,
        company_id: this.company.id,
        childs: objectChilds,
        comment: this.comment,
      };

      if (localStorage.getItem("geolocation")) {
        this.insertIdb(sale);
        this.viewDialogMount = false;
      } else {
        this.$store.commit("alertAddress", { value: true });
        if (localStorage.getItem("acess-token")) {
          this.$store.commit("user/request", {
            state: "addressTabs",
            data: 3,
          });
        } else {
          this.$store.commit("user/request", {
            state: "addressTabs",
            data: 1,
          });
        }
      }
    },

    insertIdb(item) {
      const payload = {
        idb: {
          table: "sale",
          data: item,
          purchase: true,
        },
        state: "saleIdb",
        method: "post",
        company: this.company,
      };
      this.$store.dispatch("cart/request", payload);
      this.$store.dispatch("cart/request", {
        state: "saleIdb",
        method: "getAll",
        idb: {
          table: "sale",
        },
      });
      this.$store.commit("cart/sidebar", true);

      this.lista = [];
    },
  },
};
</script>

<style></style>
