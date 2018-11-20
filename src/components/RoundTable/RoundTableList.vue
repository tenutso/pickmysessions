<template>
<b-table :fields="fields" :items="roundtables">
  <template slot="edit" slot-scope="data">
    <a :href="'/#/admin/roundtable/edit/' + data.item.id">Edit</a>
  </template>
</b-table>

</template>

<script>
import { db, firebase } from '../../firebaseConfig.js'
export default {
  name: 'RoundTableList',
  data: function() {
    return {
      roundtables: [],
      currentUser: '',
      fields: ['name', 'edit']
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
}
</script>

<style>

</style>
