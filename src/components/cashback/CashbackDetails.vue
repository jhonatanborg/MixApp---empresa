<template>
  <div>
    <v-dialog
      :value="$store.state.cashback.cashDetails"
      persistent
      max-width="400"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar flat dense color="transparent">
          Cashback #14758
          <v-spacer></v-spacer>
          <v-btn
            @click="$store.commit('cashback/cashDialog', false)"
            dense
            outlined
            color="error"
            >Fechar</v-btn
          ></v-toolbar
        >
        <div class="pa-5">
          <v-img
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            src="https://img.elo7.com.br/product/main/230573E/bolos-e-tortas-sabores-diversos-tortas.jpg"
            dropzone
          >
          </v-img>
        </div>
        <div class="col-sm-12">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Pedido em </v-list-item-title>
              <v-list-item-subtitle>Bendita Bolaria</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-chip>
                <b>
                  14/12/2020 - 14:33
                </b>
              </v-chip>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
          <v-list two-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Produto</v-list-item-title>
                <v-list-item-subtitle>Bolo de chocolate</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Cashback Recebido</v-list-item-title>
                <v-list-item-subtitle>120 pontos</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn block color="#FFBA0A" outlined>Ver produto</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // cashbackDetails: Boolean,
  },
};
</script>

<style></style>
