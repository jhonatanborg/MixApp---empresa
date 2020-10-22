<template>
  <v-dialog v-model="changeDialog.dialog" width="500">
    <v-card class="pa-5">
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
          <v-list-item dense>
            <v-list-item-content>
              <v-list-item-subtitle>
                Total
              </v-list-item-subtitle>
            </v-list-item-content>
            <div
              class="subtitle"
              v-text="convertMoney(changeDialog.total)"
            ></div>
          </v-list-item>
        </v-col>
        <v-col cols="12">
          <div class="animate__animated animate__zoomIn">
            <v-text-field
              label="Troco para"
              outlined
              dense
              :error="changeError"
              :error-messages="changeError ? 'Valor inválido' : ''"
              v-model.lazy="valueChange"
              v-money="money"
              name="name"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12">
          <v-btn block color="success">Confirmar</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import mixin from "@/mixins/mixins.js";

export default {
  mixins: [mixin],

  props: {
    changeDialog: Object,
  },
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
};
</script>

<style></style>
