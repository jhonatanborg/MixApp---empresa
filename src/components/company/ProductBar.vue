<template>
  <div>
    <div id="ProductBar">
      <div>
        <v-expansion-panels
          class="pa-0"
          v-if="$vuetify.breakpoint.xsOnly"
          accordion
        >
          <v-expansion-panel
            class="pa-0"
            v-for="(item, index) in products"
            :key="index"
          >
            <v-expansion-panel-header>
              {{ item.name }}</v-expansion-panel-header
            >
            <v-expansion-panel-content class="pa-0">
              <v-row no-gutters outlined row wrap>
                <v-col
                  v-for="product in item.products"
                  :key="product.id"
                  cols="12"
                  md="4"
                  sm="6"
                  class="pa-0"
                >
                  <a @click="modal(product)">
                    <Product :product="product" />
                  </a>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div v-if="!$vuetify.breakpoint.xsOnly" class="">
          <div
            id="list-products text-uppercase"
            class="my-8"
            v-for="(item, index) in products"
            :key="index"
          >
            <div :id="'go' + item.id">
              <div class="">
                <h3 v-if="item.products.length > 0" class="title-category">
                  {{ item.name }}
                </h3>
              </div>
            </div>
            <div>
              <v-row outlined row wrap>
                <v-col
                  v-for="product in item.products"
                  :key="product.id"
                  cols="12"
                  md="4"
                  sm="6"
                >
                  <a @click="modal(product)">
                    <Product :product="product" />
                  </a>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
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
            <v-btn
              x-small
              color="white"
              fab
              absolute
              top
              class="mt-5"
              right
              @click="closeDialogMount"
            >
              <v-icon size="20">mdi-close</v-icon>
            </v-btn>

            <v-row no-gutters justify="center">
              <v-col :cols="$vuetify.breakpoint.xsOnly ? 10 : 6">
                <v-img
                  aspect-ratio="1.1"
                  :src="$store.state.server + productSelected.img"
                >
                </v-img>
              </v-col>
            </v-row>

            <div class="pa-5 ">
              <div>
                <div class="item-title-product">
                  <span>{{ productSelected.name }}</span>
                </div>
                <div class="description">
                  <span>
                    {{ productSelected.description }}
                  </span>
                </div>
              </div>
            </div>

            <v-card-text class="pa-0 ma-0  overflow-x-hidden">
              <div v-for="item in complements" :key="item.id">
                <v-row
                  class="grey lighten-4 px-6"
                  justify="space-between"
                  align="center"
                >
                  <v-col cols="auto">
                    <div>
                      <span class="font-weight-bold title-subcategory">
                        {{ item.name }}
                      </span>
                    </div>
                    <div class="limit-details">
                      <span><b v-text="limitOptions(item.limit)"></b></span>
                    </div>
                  </v-col>
                  <v-col cols="auto">
                    <v-chip small v-text="convertMandatory(item.mandatory)">
                    </v-chip>
                  </v-col>
                </v-row>
                <v-list>
                  <v-list-item
                    v-for="(item2, key) in item.products"
                    dense
                    :value="item2"
                    :key="key"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item2.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle
                        class="font-weight-bold color-theme"
                      >
                        + {{ convertMoney(item2.sale_value) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-row no-gutters dense align="center" justify="center">
                        <v-col v-if="item2.qtd >= 1" cols="auto"
                          ><v-btn
                            @click="
                              RemoveMountComplements({
                                category: item.name,
                                complement: item2,
                              })
                            "
                            icon
                            color="#5530E5"
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn></v-col
                        >
                        <v-col cols="auto" v-if="item2.qtd >= 1">
                          <!-- Aqui -->
                          {{ item2.qtd }}</v-col
                        >

                        <v-col cols="auto"
                          ><v-btn
                            @click="
                              AddMountComplements({
                                category: item.name,
                                complement: item2,
                                limit: item.limit,
                              })
                            "
                            :disabled="
                              listanova[item.name] &&
                              listanova[item.name].allQtd === item.limit
                                ? true
                                : false
                            "
                            icon
                            color="#5530E5"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn></v-col
                        >
                      </v-row>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
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

            <v-toolbar bottom floating height="80px">
              <v-btn
                @click="quantity > 1 ? quantity-- : (quantity = 1)"
                icon
                :disabled="quantity === 1"
                class="mx-0"
                color="#5530E5"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>

              <span v-text="quantity"></span>

              <v-btn class="mx-0" @click="quantity++" icon color="#5530E5">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-col sm="12">
                <v-btn
                  type="submit"
                  block
                  x-large
                  :dark="!verifyMandatory"
                  depressed
                  color="#5530E5"
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
            </v-toolbar>
          </v-card>
          <!-- </v-col> -->
          <!-- </v-row> -->
        </v-dialog>
      </div>
      <div id="dialog-product">
        <v-dialog
          :fullscreen="$vuetify.breakpoint.xsOnly"
          max-width="500px"
          transition="dialog-transition"
          v-model="viewDialog"
          persistent
          scrollable
        >
          <v-card width="100%">
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
                    <span>{{ productSelected.name }} </span>
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
            <v-toolbar bottom absolute floating height="80px">
              <v-btn
                @click="quantity > 1 ? quantity-- : (quantity = 1)"
                icon
                class="mx-0"
                color="#5530E5"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>

              <span v-text="quantity"></span>

              <v-btn class="mx-0" @click="quantity++" icon color="#5530E5">
                <v-icon>mdi-plus</v-icon>
              </v-btn>

              <v-col sm="12">
                <v-btn
                  x-large
                  block
                  dark
                  type="submit"
                  depressed
                  color="#5530E5"
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
            </v-toolbar>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <AlertSale />
  </div>
</template>

<script>
import Product from "@/components/company/product/Product";
import AlertSale from "@/components/sale/AlertSale";
// import ProductDialog from "@/components/ProductDialog";
import axios from "axios";
export default {
  name: "ProductBar",
  components: {
    Product,
    AlertSale,
  },
  props: {
    company: Object,
  },
  data: () => ({
    lista: [],
    comment: "",
    alertSale: true,
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    total: Number,
    quantity: 1,
    productSelected: Object,
    viewDialogMount: false,
    viewDialog: false,
    complements: [],
    sale: null,
    listanova: [],
    totalNovo: 0,
  }),
  computed: {
    verifyMandatory() {
      let disabled = false;
      if (this.complements.length > 0) {
        this.complements.forEach((category) => {
          if (
            this.listanova[category.name] &&
            category.mandatory === "S" &&
            this.listanova[category.name].allQtd <= 0
          ) {
            disabled = true;
          } else if (
            !this.listanova[category.name] &&
            category.mandatory === "S"
          ) {
            disabled = true;
          }
        });
      }
      return disabled;
    },
    Total() {
      return parseFloat(this.totalNovo) * parseFloat(this.quantity);
    },
    error() {
      return this.$store.state.error;
    },
    products() {
      return this.$store.getters["company/getProducts"];
    },
  },
  methods: {
    orderItems(products) {
      products.sort(function(a, b) {
        return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
      });
    },
    AddMountComplements({ category, complement, limit }) {
      let findedCategory = this.listanova[category];
      if (findedCategory) {
        const findexIndex = findedCategory.findIndex(
          (item) => item && item.id === complement.id
        );
        if (
          findexIndex >= 0 &&
          findedCategory.limite > 0 &&
          findedCategory.allQtd < findedCategory.limite
        ) {
          findedCategory[findexIndex].qtd++;
          findedCategory.allQtd++;
          this.totalNovo += Number(complement.sale_value);
        } else if (findedCategory.allQtd < findedCategory.limite) {
          complement.qtd = 1;
          this.totalNovo += Number(complement.sale_value);
          findedCategory.push(complement);

          findedCategory.allQtd++;
        }
      } else {
        complement.qtd = 1;
        findedCategory = [complement];
        findedCategory.limite = limit === 0 ? 9999 : limit;
        findedCategory.allQtd = 1;
        this.totalNovo = this.totalNovo + Number(complement.sale_value);
      }
      this.listanova[category] = findedCategory;
      // this.listanova = listanova;

      const newListaNova = [];
      Object.keys(this.listanova).forEach((key) => {
        if (this.listanova[key].allQtd > 0) {
          newListaNova[key] = this.listanova[key];
        }
      });
      this.listanova = newListaNova;
    },
    RemoveMountComplements({ category, complement }) {
      if (this.listanova[category]) {
        const findexIndex = this.listanova[category].findIndex(
          (item) => item && item.id === complement.id
        );
        if (findexIndex >= 0) {
          this.listanova[category][findexIndex].qtd--;
          this.listanova[category].allQtd--;

          this.totalNovo -= Number(
            this.listanova[category][findexIndex].sale_value
          );

          if (this.listanova[category][findexIndex].qtd <= 0) {
            this.listanova[category].splice(findexIndex, 1);
          }

          const newListaNova = [];
          if (this.listanova[category].allQtd <= 0) {
            Object.keys(this.listanova).forEach((key) => {
              if (this.listanova[key].allQtd > 0) {
                newListaNova[key] = this.listanova[key];
              }
            });
            this.listanova = newListaNova;
          }
        }
      }
    },
    limitOptions(limit) {
      if (!limit) {
        return "Escolha quantas opções você desejar";
      } else if (limit >= 1) {
        return limit == 1
          ? `Escolha até ${limit} opção`
          : `Escolha até ${limit} opções`;
      }
    },
    idGroupSelector(item) {
      item = item.replace(" ", "");
      return item;
    },
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
            response.data.childs.map((child) =>
              child.products.map((product) => (product.qtd = 0))
            );
            this.productSelected = item;
            let complements = response.data.childs.sort(
              (a, b) => a.order - b.order
            );
            let newArray = complements.map((item) => {
              item.products.sort((a, b) => (a.name > b.name) * 2 - 1);
              return item;
            });
            this.complements = newArray;
            console.log(newArray);

            this.viewDialogMount = true;
            this.totalNovo = Number(item.sale_value);
          } else {
            this.viewDialog = true;
            this.productSelected = item;
          }
        });
      } else {
        this.viewDialog = true;
        this.productSelected = item;
        this.totalNovo = Number(item.sale_value);
      }
    },
    closeDialogMount() {
      this.viewDialogMount = false;
      this.lista = [];
      this.listanova = [];
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
        return "R$ 0,00";
      }
    },
    convertMandatory(item) {
      if (item == "S") {
        return "Obrigatório";
      }
      return "Opcional";
    },
    AddPurchase() {
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
      this.insertIdb(sale);
      this.viewDialog = false;
    },

    AddPurchaseMount() {
      let objectChilds = [];
      if (this.complements.length > 0) {
        this.complements.forEach((item) => {
          if (this.listanova[item.name]) {
            this.listanova[item.name].forEach((item) => {
              objectChilds.push({
                product_id: item.id,
                product_qtd: item.qtd,
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
      this.insertIdb(sale);
      this.viewDialogMount = false;
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
      this.listanova = [];
    },
  },
  watch: {},
};
</script>

<style>
.title-category {
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
  color: #3c3a41;
}
.item-title-product {
  font-weight: 600;
  font-size: 15px;
  text-align: left;
  color: #000;
}
.title-subcategory {
  text-transform: uppercase;
  font-size: 12px;
}
.description {
  text-transform: initial;
  color: #3c3a41;
  font-size: 14px;
}
.cashback-value {
  color: #3c3a41;
  font-size: 15px;
  font-weight: bold;
}
.limit-details {
  font-size: 12px;
}
.color-theme {
  color: #5530e5 !important;
}
</style>
