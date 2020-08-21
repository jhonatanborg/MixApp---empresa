<template>
  <div class="">
    <v-row justify="space-between">
      <v-col
        v-for="n in 6"
        :key="n"
        class=" d-flex flex-column justify-start"
        cols="auto"
        sm="2"
        xl="2"
        ><v-card flat color="#FFB900">
          <v-img
            src=" https://scontent.fops1-1.fna.fbcdn.net/v/t1.0-9/52126794_786358021698360_5849858745504366592_n.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=_SNSLBqBKLsAX_kN-rV&_nc_ht=scontent.fops1-1.fna&oh=413a3f4cfaf37681a20b8f40380c94c2&oe=5F3F4353"
          >
          </v-img>
        </v-card>
        <span class="d-flex align center my-3">
          <v-icon color="#FFB900" class="mr-2" size="20">mdi-circle</v-icon>
          <b>Açai no quintal</b>
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
