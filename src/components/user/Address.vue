<template>
  <div>
    <v-card outlined class="pa-5 mt-5" flat>
      <div>
        <span class="subtitle">Endereços</span>
      </div>
      <v-list two-line>
        <v-divider></v-divider>
        <div v-for="(item, key) in user.address" :key="item.id">
          <v-list-item>
            <v-list-item-content class="my-2">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <div>
                {{ item.street }}, {{ item.number }},
                {{ item.complement }}
              </div>
            </v-list-item-content>
            <v-list-item-action>
              <div>
                <v-btn
                  @click="editAddress(key, item)"
                  text
                  fab
                  color="primary"
                  size="10"
                >
                  <v-icon size="25">mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  @click="deleteAddress(key, item)"
                  text
                  fab
                  color="error"
                  size="10"
                >
                  <v-icon size="25">mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
      <v-btn block @click="dialog()" outlined color="#765eda" dark
        >Novo endereço</v-btn
      >
    </v-card>
    <DialogNewAddress
      :dialogAddress="viewDialogNewAddress"
      :closeDialog="closeDialog"
    />
    <DialogEditAdress
      :idAddress="idAddress"
      :address="addressEdit"
      :viewDialogAddress="viewDialogAddress"
      :closeDialog="this.closeDialog"
    />
    <DialogDeleteAddress
      :closeDialog="this.closeDialog"
      :userAddress="addressEdit"
      :viewDialogDelete="viewDialogDelete"
    />
  </div>
</template>

<script>
import DialogEditAdress from "@/components/DialogAddress";
import DialogNewAddress from "@/components/DialogNewAdress";
import DialogDeleteAddress from "@/components/DeleteAddress";

export default {
  props: {
    user: Object,
  },
  components: {
    DialogEditAdress,
    DialogNewAddress,
    DialogDeleteAddress,
  },

  data: () => ({
    viewDialogAddress: null,
    addressEdit: null,
    modalEdit: "",
    idAddress: null,
    viewDialogNewAddress: false,
    viewDialogDelete: false,
  }),

  methods: {
    editAddress(key, item) {
      this.viewDialogAddress = true;
      this.addressEdit = item;
      this.idAddress = item.id;
    },
    closeDialog() {
      this.viewDialogAddress = false;
      this.viewDialogNewAddress = false;
      this.viewDialogDelete = false;
    },
    dialog() {
      this.viewDialogNewAddress = true;
    },
    deleteAddress(key, item) {
      this.addressEdit = item;

      this.viewDialogDelete = true;
    },
  },
};
</script>

<style>
.subtitle-large {
  font-size: 16px;
}
.price {
  font-size: 16px;
}
.description-product {
  font-size: 14px;
}
.edit-title {
  font-size: 14px;
}
</style>
