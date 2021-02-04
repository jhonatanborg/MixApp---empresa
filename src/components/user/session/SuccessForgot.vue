<template>
  <div>
    <div class="">
      <v-row justify="center">
        <v-col cols="auto">
          <v-img class="image" src="https://i.imgur.com/ZDKxB5j.png"></v-img>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="auto">
          <div>
            <h2 class="title-message-success">
              Senha alterada com sucesso
            </h2>
            <div class="details-message-success ">
              <span>
                Está tudo certo agora. Conecte-se novamente com sua senha nova.
              </span>
            </div>
          </div>
        </v-col>
        <v-col cols="8">
          <v-btn
            :to="{ name: 'session' }"
            color="#5530E5"
            dark
            large
            depressed
            block
            >Fazer Login</v-btn
          ></v-col
        >
      </v-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.image {
  width: 80px;
  height: 80px;
  background: transparent;
}
.title-message-success {
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: #5530e5;
}
.details-message-success {
  font-size: 16px;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: center;
  color: #3c3a41;
}
</style>
