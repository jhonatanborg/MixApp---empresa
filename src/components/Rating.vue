<template>
  <div class="col-sm-12" id="rating">
    <v-card class="pa-4" flat>
      <div class="col-sm-12 d-flex justify-space-between align-center">
        <div class="d-flex justify-center-between align-center">
          <div class="display-1 font-weight-bold">4,5</div>
          <div class="text-center">
            <v-rating
              background-color="#765eda"
              color="#765eda"
              size="35"
              v-model="rating"
            ></v-rating>
          </div>
        </div>
        <div>
          <div class="subtitle-large">154 Avaliações</div>
        </div>
      </div>
      <div>
        <v-divider></v-divider>
        <div class="coments">
          <v-list three-line>
            <template v-for="(item, index) in items">
              <v-subheader
                v-if="item.header"
                :key="item.avatar"
                v-text="item.header"
              ></v-subheader>
              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>
              <v-list-item v-else :key="item">
                <v-list-item-avatar>
                  <v-avatar color="red">
                    <span class="white--text subtitle">CJ</span>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="d-flex justify-space-between">
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                  </div>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-rating
                    v-model="rating"
                    background-color="orange lighten-3"
                    color="#765eda"
                  ></v-rating>
                  <v-list-item-action-text
                    >20/12/2019 - 20:38</v-list-item-action-text
                  >
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    rating: 3,
    items: [
      { header: "Todas" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Renato Lopes",
        subtitle:
          "<span class='text--primary'> Lanche muito bom, com certeza o melhor do site </span>",
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Renato Lopes",
        subtitle:
          "<span class='text--primary'> Lanche muito bom, com certeza o melhor do site </span>",
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Renato Lopes",
        subtitle:
          "<span class='text--primary'> Lanche muito bom, com certeza o melhor do site </span>",
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Renato Lopes",
        subtitle:
          "<span class='text--primary'> Lanche muito bom, com certeza o melhor do site </span>",
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Renato Lopes",
        subtitle:
          "<span class='text--primary'> Lanche muito bom, com certeza o melhor do site </span>",
      },
    ],
  }),
};
</script>

<style>
.subtitle-large {
  color: #797979;
}
</style>
