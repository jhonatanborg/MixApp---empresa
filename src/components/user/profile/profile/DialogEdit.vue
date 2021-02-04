<template>
  <div id="editPerfil" v-if="itemsUser">
    <v-dialog persistent v-model="viewDialog" max-width="360">
      <v-card class="pa-4">
        <v-toolbar dense flat color="white">
          <v-toolbar-title> Alterar</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="closeDialog">
            <v-icon>mdi-close</v-icon>Fechar
          </v-btn>
        </v-toolbar>

        <div v-if="!itemsUser.pass" class="col-sm-12  py-5">
          <v-text-field
            outlined
            :label="itemsUser.title"
            :value="itemsUser.value"
            dense
          ></v-text-field>
          <v-spacer></v-spacer>
        </div>
        <div v-else class="col-sm-12  py-5">
          <v-text-field outlined dense label="Senha atual"></v-text-field>
          <v-text-field outlined dense label="Nova senha"></v-text-field>
          <v-text-field
            outlined
            dense
            label="Confirmar nova senha"
          ></v-text-field>
        </div>
        <v-spacer></v-spacer>
        <v-btn block color="#5530E5" @click="updateUser(itemsUser)" dark
          >Confirmar</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    viewDialog: Boolean,
    closeDialog: {
      type: Function,
    },
    userRouter: Object,
    itemsUser: Object,
    valueUpdate: Object,
  },
  data: () => ({
    viewDialog: false,
    itemUser: null,
  }),
  methods: {
    updateUser(item) {
      const payload = {
        state: "user",
        method: "PUT",
        url: "/user/" + item.id,
        insert: true,
        data: this.editValue.data,
      };
      this.$store.dispatch("user/request", payload);
    },
  },
};
</script>

<style></style>
