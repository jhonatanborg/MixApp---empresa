<template>
  <div>
    <v-card>
      <v-toolbar flat dense color="transparent">
        <span class="grey--text ">
          <b>Formas de pagamento</b>
        </span>
        <v-spacer></v-spacer>
        <v-btn dense @click="$emit('close-dialog')" outlined color="error"
          >Fechar</v-btn
        ></v-toolbar
      >
      <div class="px-5">
        <v-row justify="space-between">
          <v-col cols="12" sm="12">
            <span class="title-pays">
              <b>Dinheiro</b>
            </span>
            <v-img
              height="31"
              width="31"
              src="https://i.imgur.com/Ovt1v9Y.png"
            ></v-img>
          </v-col>
        </v-row>

        <span class="font-weight-bold title-pays">
          <b> Cartão de crédito</b>
        </span>
        <v-row justify="start" align="center">
          <v-col cols="auto">
            <v-img
              height="31"
              width="31"
              src="https://i.imgur.com/EeE1JB5.png"
            ></v-img>
          </v-col>
          <v-col cols="auto">
            <v-img
              height="31"
              width="31"
              src="https://i.imgur.com/fa5dtrF.png"
            ></v-img>
          </v-col>

          <v-col cols="auto">
            <v-img
              height="31"
              width="31"
              src="https://i.imgur.com/f6BG8CF.png"
            ></v-img>
          </v-col>
          <v-col cols="auto">
            <v-img
              height="31"
              width="31"
              src="https://i.imgur.com/4mYK5TA.png"
            ></v-img>
          </v-col>
        </v-row>

        <span class="font-weight-bold title-pays ">
          <b>Cartão de Débito</b>
        </span>
        <v-row justify="start" align="center">
          <v-col cols="auto">
            <v-img
              height="31"
              width="31"
              src="https://i.imgur.com/EeE1JB5.png"
            ></v-img>
          </v-col>
          <v-col cols="auto">
            <v-img
              height="31"
              width="31"
              src="https://i.imgur.com/fa5dtrF.png"
            ></v-img>
          </v-col>

          <v-col cols="auto">
            <v-img
              height="31"
              width="31"
              src="https://i.imgur.com/f6BG8CF.png"
            ></v-img>
          </v-col>
          <v-col cols="auto">
            <v-img
              height="31"
              width="31"
              src="https://i.imgur.com/4mYK5TA.png"
            ></v-img>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>
<style>
.title-pays {
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1rem;
}
</style>
