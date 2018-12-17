<template>
<div>
  <v-toolbar flat color="white">
    <v-toolbar-title>EMAIL LISTS</v-toolbar-title>
    <v-divider class="mx-2" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn small slot="activator" color="primary" dark class="mb-2">Create List</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Create Email List</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="list.name" label="Name"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>

  <v-data-table class="elevation-1" :headers="headers" :items="emailLists">
    <template slot="items" slot-scope="data">
      <td>{{ data.item.name }}</td>
      <td class="justify-center layout px-0">
        <v-icon small class="mr-2" @click="addressList(data.item)">edit</v-icon>
        <v-icon small class="mr-2" @click="deleteList(data.item)">delete</v-icon>
      </td>
    </template>
  </v-data-table>
</div>
</template>

<script>
import { firestore } from '@/firebaseConfig.js'
export default {
  data: function () {
    return {
      emailLists: {},
      dialog: false,
      list: {},
      headers: [{
          text: "Email Lists",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Actions",
          align: "center",
          sortable: false,
          value: "edit"
        }
      ]
    }
  },
  firestore: function () {
    return {
      emailLists: this.$store.state
        .clientRef
        .collection('lists')
    }
  },
  methods: {
    save: async function() {
      const list = await this.$store.state
        .clientRef
        .collection('lists')
        .add({
          name: this.list.name
      })
      this.dialog = false
      this.$router.push({
        name:'AddressList',
        params:{ id: list.id }
      })
    },
    close: function () {
      this.dialog = false
    },
    deleteList: async function(list) {
      if (
        !confirm('Are you sure you want to delete "' + list.name + '" ?')
      ) {
        return;
      }
      var col = await this.$store.state
        .clientRef
        .collection('lists')
        .doc(list.id)
        .get();
      await col.ref.delete();
    },
    addressList: function (list) {
      this.$router.push({
        name:'AddressList',
        params:{ id: list.id }
      })

    }
  }
}
</script>
