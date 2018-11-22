<template>
  <div class="row">
    <div class="container">
      <btn class="btn btn-sm btn-outline-secondary" @click="$router.push('/admin/roundtable/create')">Add New</btn>
      <br><br>
      <b-table :fields="fields" :items="roundtables">
        <template slot="edit" slot-scope="data">
          <b-btn class="btn btn-sm btn-outline-success" @click="editTable(data.item.id)">Edit</b-btn>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { db, firebase } from '../../firebaseConfig.js'
export default {
  name: 'RoundTableList',
  data: function() {
    return {
      roundtables: [],
      currentUser: '',
      fields: [
        'name',
        {
          'edit': {
          label: '',
          hidden: true
          }
        }
      ]
    }
  },
  created: async function() {
    this.currentUser = firebase.auth().currentUser
    const roundTablesCol = await db.collection('users').doc(this.currentUser.uid).collection('roundtables').get()
    roundTablesCol.forEach((doc) => {
      this.roundtables.push({
        id: doc.id,
        name: doc.data().name
      })
    })
    console.log(this.roundtables)
  },
  methods: {
    editTable: function (roundtableId) {
      this.$router.push('edit/' + roundtableId)
    }
  }
}
</script>

<style>

</style>
