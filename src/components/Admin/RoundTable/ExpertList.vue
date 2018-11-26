<template>
  <div>
    <div class="row">
      <div class="container">
        <b-button class="btn btn-sm btn-secondary" @click="$router.push('/admin/roundtable/' + $route.params.id + '/experts/create')">Add New</b-button>
        <br><br>
        <div v-if="experts.length">
          <b-table :fields="fields" :items="experts">
            <template slot="edit" slot-scope="data">
              <b-btn class="btn btn-sm btn-outline-success" @click="editExpert(data.item)">Edit</b-btn>
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

import { db, firebase } from "@/firebaseConfig.js";

export default {
  name: "RoundTableList",
  data: function() {
    return {
      experts: [],
      userId: "",
      fields: [
        "firstname",
        "lastname",
        {
          edit: {
            label: "",
            hidden: true
          }
        }
      ]
    };
  },
  firestore: function() {
    this.userId = firebase.auth().currentUser.uid
    return {
      experts: db
        .collection("users")
        .doc(this.userId)
        .collection("roundtables")
        .doc(this.$route.params.id)
        .collection("experts")
    };
  },
  methods: {
    editExpert: function(expert) {
      this.$router.push("experts/edit/" + expert.id);
    },
    deleteRoundtable: async function(expert) {
      if (
        !confirm('Are you sure you want to delete "' + expert.firstname + ' ' + expert.lastname + '"?')
      ) {
        return;
      }
      var col = await db
        .collection("users")
        .doc(this.$store.state.currentUser.uid)
        .collection("roundtables")
        .doc(this.$route.params.id)
        .collection("experts")
        .doc(expert.id)
        .get();
      await col.ref.delete();
      this.$router.push("/admin/roundtable/list");
    }
  }
};
</script>

<style>
</style>
