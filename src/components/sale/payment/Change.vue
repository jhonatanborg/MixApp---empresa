<template>
  <div class="pa-5">
    <v-row dense>
      <v-col cols="12">
        <div class="d-flex justify-space-between">
          <div>
            <span> Pague na entrega </span>
          </div>
          <div>
            <v-icon color="#ffa602">mdi-help-circle-outline</v-icon>
          </div>
        </div>
      </v-col>
      <v-col>
        <div
          class="subtitle my-3"
          v-text="'Total: ' + convertMoney(total)"
        ></div>
      </v-col>
      <v-col cols="12">
        <div class="animate__animated animate__zoomIn">
          <v-text-field
            label="Troco para"
            outlined
            :error="changeError"
            :error-messages="changeError ? 'Valor inválido' : ''"
            v-model.lazy="valueChange"
            v-money="money"
            name="name"
          ></v-text-field>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col
            ><v-btn @click="notChange" depressed block color="primary">
              <b>Não preciso de troco</b>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn depressed block @click="confirmChange" color="#ffa602">
              <b>Confirmar</b>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import mixin from "@/mixins/mixins.js";

export default {
  mixins: [mixin],
  data() {
    return {
      dialog: false,
      valueChange: 0.0,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: true,
      },
      changeError: false,
    };
  },
  computed: {
    sale() {
      return this.$store.state.cart.saleIdb;
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
    company() {
      localStorage.setItem(
        "company",
        JSON.stringify(this.$store.getters["company/getCompany"])
      );
      return this.$store.getters["company/getCompany"] || {};
    },
  },
  methods: {
    confirmChange() {
      let change;

      if (this.valueChange) {
        change = parseFloat(
          this.valueChange
            .slice(2)
            .replace(".", "")
            .replace(",", ".")
        );
      }
      if (change <= this.total && change > 0) {
        this.changeError = true;
      } else {
        this.changeError = false;
        this.$store.commit("cart/changeFor", change);
        this.$store.commit("cart/sidebar", { open: true, step: 3 });
      }
    },
    notChange() {
      this.$store.commit("cart/sidebar", { open: true, step: 3 });
    },
  },
};
</script>

<style>
.item-subtitle {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
}
</style>
