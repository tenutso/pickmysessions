<template>
<div>
  <v-toolbar flat color="white">
    <v-toolbar-title>ROUNDTABLES</v-toolbar-title>
    <v-divider class="mx-2" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn small slot="activator" color="primary" dark class="mb-2">Create Roundtable</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Roundtables</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="roundtableItem.name" label="Name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field :mask="'##'" v-model="roundtableItem.rounds" label="How many rounds?"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field :mask="'##'" v-model="roundtableItem.seats" label="How many seats per rounds?"></v-text-field>
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

  <v-data-table class="elevation-1" :headers="headers" :items="roundtables">
    <template slot="items" slot-scope="data">
      <td>{{ data.item.name }}</td>
      <td class="justify-center layout px-0">
        <v-icon small class="mr-2" @click="editRoundtable(data.item)">edit</v-icon>
        <v-icon small class="mr-2" @click="listExperts(data.item)">people</v-icon></router-link>
        <v-icon small class="mr-2" @click="deleteRoundtable(data.item)">delete</v-icon>
      </td>
    </template>
  </v-data-table>
</div>
</template>

<script>
import {
  db,
  firebase
} from "@/firebaseConfig.js";
export default {
  name: "RoundTableList",
  data: function () {
    return {
      dialog: false,
      roundtableItem: {},
      roundtableDefault: {
        rounds: 3,
        seats: 7
      },
      roundtables: [],
      userId: "",
      headers: [{
          text: "Roundtables",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Actions",
          align: "center",
          sortable: false,
          value: "edit"
        }
      ]
    };
  },
  firestore: function () {
    
    return {
      roundtables: this.$store.state.roundtableRef
    }
  },
  created() {
    
  },
  methods: {
    editRoundtable: function (roundtable) {
      console.log(roundtable)
      this.roundtableItem = Object.assign({}, roundtable)
      this.roundtableItem.id = roundtable.id
      console.log(this.roundtableItem);
      this.dialog = true;
    },
    listExperts: function (roundtable) {
      this.$store.commit('selectedRoundtable', {id: roundtable.id, data: roundtable})
      this.$router.replace("roundtables/experts");
    },
    deleteRoundtable: async function (roundtable) {
      if (
        !confirm('Are you sure you want to delete "' + roundtable.name + '" ?')
      ) {
        return;
      }
      var col = await db
        .collection("users")
        .doc(this.userId)
        .collection("roundtables")
        .doc(roundtable.id)
        .get();
      await col.ref.delete();
      // this.$router.push("/admin/roundtables");
    },
    save: async function (evt) {
      const user = firebase.auth().currentUser;

      if (this.roundtableItem.id) {
        await db
          .collection("users")
          .doc(user.uid)
          .collection("roundtables")
          .doc(this.roundtableItem.id)
          .set({
            name: this.roundtableItem.name,
            rounds: this.roundtableItem.rounds,
            seats: this.roundtableItem.seats
          });
      } else {
        await db
          .collection("users")
          .doc(user.uid)
          .collection("roundtables")
          .add({
            name: this.roundtableItem.name,
            rounds: this.roundtableItem.rounds,
            seats: this.roundtableItem.seats
          });
      }

      this.dialog = false
    },
    close: function () {
      this.dialog = false
      setTimeout(() => {
        this.roundtableItem = Object.assign({}, this.roundtableDefault)
      }, 300)
    }
  }
};
</script>

<style>
</style>
