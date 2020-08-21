<template>
  <div class="home">
    <MenuBar />
    <div fluid class="grey lighten-4 ">
      <div>
        <StartHome />
      </div>
      <v-container>
        <div class="col-xl-8 mx-auto my-9">
          <div class="text-center">
            <h2>Tudo que você procura está no Mix</h2>
            <span>Aqui estão as principais categorias</span>
          </div>
          <CardsCategory class="my-3" :width="'140'" :categories="categories" />
        </div>
        <!-- <div class="my-10 py-5 col-xl-8 mx-auto">
          <h2>Tendências na sua região</h2>
          <Trends />
        </div> -->
        <div class="my-10 col-xl-8 text-center mx-auto">
          <h2>Vamos crescer juntos.</h2>
          <span>Veja nossos serviços</span>

          <Services />
        </div>
        <div class="my-10 col-xl-8 mx-auto ">
          <CashBanner />
        </div>
        <div class="my-10 col-xl-8 mx-auto ">
          <MarkSection />
        </div>
      </v-container>
      <Footer :categories="categories" />
    </div>
  </div>
</template>
<script>
import StartHome from "@/components/home/StartHome";

// import Trends from "@/components/home/Trends";
import CashBanner from "@/components/home/CashBanner";
import Services from "@/components/home/Services";

import MarkSection from "@/components/home/MarketingSection";

import Footer from "@/components/Footer";
import CardsCategory from "@/components/CardsCategory";
import MenuBar from "@/components/MenuBar";

export default {
  name: "Home",
  components: {
    CardsCategory,
    MarkSection,
    Footer,
    StartHome,
    // Trends,
    CashBanner,
    Services,
    MenuBar,
  },

  data: () => ({
    login: false,
    isActive: false,
  }),
  computed: {
    db() {
      return this.$store.state.cart.saleIdb;
    },

    categories() {
      return this.$store.getters["company/getAllCategories"] || [];
    },
    user() {
      return this.$store.state.user.userProfile;
    },
    address() {
      return this.$store.state.user.address;
    },
  },
  methods: {
    closeDialog() {
      this.alertAddress = !this.alertAddress;
    },
  },
};
</script>
<style>
#home {
  background-color: #f2f2f2;
}
</style>
