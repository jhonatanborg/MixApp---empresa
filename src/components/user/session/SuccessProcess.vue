<template>
  <div class="">
    <v-row justify="center">
      <v-col cols="auto">
        <v-img class="image" src="https://i.imgur.com/ZDKxB5j.png"></v-img>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center">
      <v-col cols="auto">
        <div>
          <h2 class="title-message-success" v-text="$route.params.title"></h2>
          <div class="details-message-success">
            <span v-text="$route.params.message"> </span>
          </div>
        </div>
      </v-col>
      <v-col cols="8">
        <v-btn
          :to="{ name: 'session' }"
          color="#ffa602"
          dark
          large
          depressed
          block
          >Fazer Login</v-btn
        ></v-col
      >
    </v-row>
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
  font-family: Montserrat;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: #ffa602;
}
.details-message-success {
  font-family: Montserrat;
  font-size: 16px;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: center;
  color: #3c3a41;
}
</style>
