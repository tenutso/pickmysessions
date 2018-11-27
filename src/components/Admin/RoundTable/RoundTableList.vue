<template>
<div>
  <div class="row">
    <div class="container" >
      <b-button class="btn btn-sm btn-secondary" @click="$router.push('/admin/roundtables/create')">Add New</b-button>
      <br><br>
      <div v-if="roundtables.length">
        <b-table :fields="fields" :items="roundtables">
          <template slot="edit" slot-scope="data">
            <b-btn class="btn btn-sm btn-outline-success" @click="editRoundtable(data.item)">Edit</b-btn>
            <b-btn class="btn btn-sm btn-outline-success" @click="listExperts(data.item)">Experts</b-btn>
            <b-btn class="btn btn-sm btn-outline-success" @click="deleteRoundtable(data.item)">Delete</b-btn>
          </template>
        </b-table>
      </div>
      <div v-else>
        <p>No experts in this roundtable</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  db, firebase
} from "@/firebaseConfig.js";

export default {
  name: "RoundTableList",
  data: function () {
    return {
      roundtables: [],
      userId: "",
      fields: [
        "name",
        {
          edit: {
            label: "",
            hidden: true
          }
        }
      ]
    };
  },
  firestore: function () {
    this.userId = firebase.auth().currentUser.uid
    console.log(this.userId)
    return {
      roundtables: db
        .collection("users")
        .doc(this.userId)
        .collection("roundtables")
    }
  },
  methods: {
    editRoundtable: function (roundtable) {
      this.$router.replace("roundtables/edit/" + roundtable.id)
    },
    listExperts: function (roundtable) {
      this.$router.replace('roundtables/' + roundtable.id + "/experts")
    },
    deleteRoundtable: async function (roundtable) {
      if (!confirm('Are you sure you want to delete "' + roundtable.name + '" ?')) {
        return
      }
      console.log(roundtable.id)
      var col = await db
        .collection("users")
        .doc(this.userId)
        .collection("roundtables")
        .doc(roundtable.id).get()
      await col.ref.delete()
      this.$router.push('/admin/roundtables')
    }
  }
}
</script>

<style>
</style>
