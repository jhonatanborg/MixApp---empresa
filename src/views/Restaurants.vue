<template>
  <div id="restaurants">
    <MenuBar />
    <v-card color="transparent" flat outlined>
      <v-container>
        <div class="col-sm-12 mx-auto">
          <CardsCategory :width="'120'" :categories="categories" />
        </div>
        <v-row>
          <v-col cols="12" sm="3">
            <p>Tipo de Pedido {{ filterItem }}</p>

            <v-overflow-btn
              dense
              color="#765eda"
              :items="dropdown_font"
              label="Entrega"
              target="#dropdown-example"
            ></v-overflow-btn>
          </v-col>
          <v-spacer></v-spacer>

          <v-col cols="12" sm="3">
            <p>Ordenar por</p>

            <v-overflow-btn
              dense
              color="#765eda"
              class="my-2"
              chips
              filled
              v-model="filterItem"
              deletable-chips
              :items="dropdown_icon"
              label="Relevância"
              target="#dropdown-example"
            ></v-overflow-btn>
          </v-col>
        </v-row>

        <div class="">
          <v-row justify="start">
            <v-col cols="auto">
              <h3>
                Restaurantes na região
                <v-icon size="12">mdi-circle</v-icon>
              </h3>
            </v-col>
            <v-col>
              <div v-if="$store.state.company.categorySelected !== 'Todos'">
                <v-chip small close @click:close="close" color="primary">
                  {{ $store.state.company.categorySelected }}</v-chip
                >
              </div>
              <div v-else>
                <v-chip @click="searchCompanies()" small outlined>
                  Todos
                </v-chip>
              </div>
            </v-col>
          </v-row>
          <ListRestaurants :companies="companies" />
        </div>
      </v-container>
      <Footer />
    </v-card>
  </div>
</template>

<script>
import CardsCategory from "@/components/CardsCategory";
import ListRestaurants from "@/components/ListRestaurants";
import Footer from "@/components/Footer";
import MenuBar from "@/components/MenuBar";

export default {
  components: {
    CardsCategory,
    ListRestaurants,
    Footer,
    MenuBar,
  },
  mounted() {
    this.searchCompanies();
  },
  data: () => ({
    dropdown_font: ["Entrega", "Retirada no local"],
    dropdown_icon: [
      "Relevância",
      "Melhor Avaliação",
      "Menor tempo de Entrega",
      "Menor Preço",
      "Menor Distancia",
      "Doces",
      "Sorvete",
      "Sushi",
    ],
    filterItem: "Lanches",
  }),
  computed: {
    addressVerify() {
      return this.$store.state.company.addressVerify;
    },
    alertAddress() {
      return this.$store.state.addressAlert;
    },
    categories() {
      return this.$store.getters["company/getAllCategories"] || [];
    },
    companies() {
      if (this.$store.state.company.categorySelected !== "Todos") {
        let result;

        result = this.$store.state.company.companies.filter((companies) => {
          return (
            companies.primaryCategory.name ==
            this.$store.state.company.categorySelected
          );
        });
        return result;
      }
      return this.$store.state.company.companies;
    },
    company() {
      return this.$store.state.company.company || {};
    },
  },
  methods: {
    close() {
      this.$store.commit("company/categorieFilter", "Todos");
    },
    execRequest(action, state, url, method, insert, data = null) {
      this.$store.dispatch(action, {
        state: state,
        method: method,
        url: url,
        insert,
        data,
      });
    },
    searchCompanies() {
      if (localStorage.getItem("geolocation")) {
        let coords = JSON.parse(localStorage.getItem("geolocation"));
        this.execRequest(
          "company/request",
          "companies",
          `/company/${coords.latitude},${coords.longitude}`,
          "GET",
          true
        );
        this.execRequest("user/request", "address", "/coord", "POST", true, {
          lat: coords.latitude,
          long: coords.longitude,
        });
      } else {
        this.$store.commit("alertAddress", {
          value: true,
          route: "restaurants",
        });
      }
    },
  },
};
</script>

<style>
#restaurants {
  background-color: #f2f2f2;
}
</style>
