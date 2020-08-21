<template>
  <div>
    <v-card flat class="pa-5">
      <div class="my-3">
        <h4>Cashback</h4>
        <v-row>
          <v-col>
            <v-card flat outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Tipo de cashback</v-list-item-title>
                  <v-list-item-subtitle>Pontos</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col>
            <v-card flat outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Conversão</v-list-item-title>
                  <v-list-item-subtitle>1 ponto - R$ 3,00</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div class="my-3">
        <h4>Sobre</h4>
        <p class="text-justify">
          A Bendita Bolaria chega ao mercado trazendo receitas de família, e
          deliciosos produtos que dão origem aos mais saborosos Bolos Caseiros
          da região de Guarulhos.
        </p>
      </div>
      <div class="my-3">
        <h4>Funcionamento</h4>
        <div>
          <v-menu allow-overflow class="pa-0" offset-y>
            <template class="pa-0 ma-0" v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                class=" ma-0"
                v-bind="attrs"
                v-on="on"
                text
                :ripple="false"
              >
                Terça-feira -
                <b> 14:00 - 17:00</b>
              </v-btn>
            </template>
            <v-list-item v-for="(item, index) in times" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ item.day }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.time }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-menu>
        </div>
      </div>
      <div class="my-3">
        <h4>Localização</h4>
        <v-card flat outlined max-height="200px">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1757.0717230660239!2d-52.39985926707955!3d-28.263666918798307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e2bf83f531673f%3A0xb30ccf99139f070!2sR.%20Cel.%20Pelegrini%2C%20158%20-%20Vila%20Rodrigues%2C%20Passo%20Fundo%20-%20RS%2C%2099070-010!5e0!3m2!1sen!2sbr!4v1594134960886!5m2!1sen!2sbr"
            width="100%"
            height="100%"
            rounded
            frameborder="0"
            style="border:0;"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe
        ></v-card>
      </div>

      <div class=""></div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      times: [
        {
          day: "Terça-feira",
          time: "14:00 - 17:00",
        },
        {
          day: "Terça-feira",
          time: "14:00 - 17:00",
        },
        {
          day: "Terça-feira",
          time: "14:00 - 17:00",
        },
        {
          day: "Terça-feira",
          time: "14:00 - 17:00",
        },
        {
          day: "Terça-feira",
          time: "14:00 - 17:00",
        },
        {
          day: "Terça-feira",
          time: "14:00 - 17:00",
        },
      ],
    };
  },
};
</script>

<style></style>
