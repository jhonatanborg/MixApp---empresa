<template>
  <div>
    <v-row outlined row wrap>
      <v-col v-for="n in 3" :key="n" cols="12" sm="4">
        <a> <ProductPromo class="ma-2" :product="product" /> </a>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductPromo from "@/components/company/product/ProductPromo";

export default {
  components: {
    ProductPromo,
  },
  data() {
    return {
      model: null,
      product: {
        cashback_cost: "0.00",
        cashback_return: "0.00",
        code_bar_box: null,
        description:
          "Acompanha pão caseiro, queijo ralado e uma sobremesa de canjica doce.\n",
        height: null,
        id: 22,
        img: "/default.png",
        mount: "S",
        name: "CALDO 500ML",
        object_id: "caldo-500ml-1600087299553",
        parent_product: null,
        pdv: null,
        print_token: "N",
        prod_category_id: 2,
        prod_subcategory_id: null,
        promo_product: "N",
        promo_value: null,
        sale_value: "15.00",
        status: "Ativo",
        status_availability: "Disponível",
        unity_buy_id: null,
        weight: null,
        width: null,
      },
    };
  },
};
</script>

<style></style>
