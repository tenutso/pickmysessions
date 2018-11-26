<template>
<div>
  <admin-header></admin-header>
  <div class="row">
    <div class="container">
      <b-button class="btn btn-sm btn-secondary" @click="$router.push('/admin/roundtable/create')">Add New</b-button>
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
  <admin-footer></admin-footer>
</div>
</template>

<script>
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import {
  db
} from "@/firebaseConfig.js";

export default {
  name: "RoundTableList",
  components: {
    AdminHeader,
    AdminFooter
  },
  data: function () {
    return {
      roundtables: [],
      currentUser: "",
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
    console.log(this.$store.state)
    return {
      roundtables: db
        .collection("users")
        .doc(this.$store.state.currentUser.uid)
        .collection("roundtables"),
    }
  },
  methods: {
    editRoundtable: function (roundtable) {
      this.$router.push("edit/" + roundtable.id)
    },
    listExperts: function (roundtable) {
      this.$router.push(roundtable.id + "/experts")
    },
    deleteRoundtable: async function (roundtable) {
      if (!confirm('Are you sure you want to delete "' + roundtable.name + '" ?')) {
        return
      }
      console.log(roundtable.id)
      var col = await db
        .collection("users")
        .doc(this.$store.state.currentUser.uid)
        .collection("roundtables")
        .doc(roundtable.id).get()
      await col.ref.delete()
      this.$router.push('/admin/roundtable/list')
    }
  }
}
</script>

<style>
</style>
