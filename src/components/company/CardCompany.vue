<template>
  <div>
    <v-card width="100%" class="elevation-0">
      <v-list-item @click="redirect(company)" three-line>
        <v-list-item-avatar tile size="80" color="grey darken-3">
          <v-img width="20%" :src="company.logo"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="mb-1">{{ company.name }}</v-list-item-title>
          <v-list-item-subtitle
            >Entrega
            {{ convertMoney(company.deliveryFee.value) }}</v-list-item-subtitle
          >
          <div class="d-flex align-center justify-end">
            <v-list-item-subtitle class="subtitle">{{
              company.primaryCategory.name
            }}</v-list-item-subtitle>
            <v-icon size="18" color="#FFBA0A">mdi-star</v-icon>

            <div class>
              <v-list-item-subtitle>4,5</v-list-item-subtitle>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    company: Object,
  },
  methods: {
    redirect(company) {
      this.$store.commit("company/insertCompany", company);
      this.$router.push({
        name: "company",
        params: { id: company.object_id },
      });
    },
    convertMoney(money) {
      if (money > 0) {
        const toCurrency = (n, curr, LanguageFormat = undefined) =>
          Intl.NumberFormat(LanguageFormat, {
            style: "currency",
            currency: curr,
          }).format(n);
        return toCurrency(money, "BRL");
      } else {
        return "grátis";
      }
    },
  },
};
</script>

<style></style>
