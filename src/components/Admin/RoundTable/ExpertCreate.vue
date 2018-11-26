<template>
  <div>
    <admin-header></admin-header>
    <b-form @submit="onSubmit">
      <b-form-group id="prefixInputGroup" label="Prefix:" label-for="prefixInput" description="">
        <b-form-input id="prefixInput" type="text" v-model="form.prefix" placeholder=""></b-form-input>
      </b-form-group>
      <b-form-group id="firstNameInputGroup" label="First Name:" label-for="firstNameInput" description="">
        <b-form-input id="firstNameInput" type="text" v-model="form.firstname" required placeholder=""></b-form-input>
      </b-form-group>
      <b-form-group id="lastNameInputGroup" label="Last Name:" label-for="lastNameInput" description="">
        <b-form-input id="lastNameInput" type="text" v-model="form.lastname" required placeholder=""></b-form-input>
      </b-form-group>
      <b-form-group id="suffixInputGroup" label="Suffix:" label-for="suffixInput" description="">
        <b-form-input id="suffixInput" type="text" v-model="form.suffix" placeholder=""></b-form-input>
      </b-form-group>
      <b-form-group id="titleInputGroup" label="Presentation Title:" label-for="titleInput" description="">
        <b-form-input id="titleInput" type="text" v-model="form.title" required placeholder=""></b-form-input>
      </b-form-group>
      <b-form-group id="descInputGroup" label="Description:" label-for="descInput" description="Enter a description for this session">
        <b-form-textarea id="descInput" :rows="5" :cols="4" v-model="form.desc" required placeholder=""></b-form-textarea>
      </b-form-group>
      <b-form-group label="Included in rounds:">
        <b-form-checkbox-group v-model="form.rounds">
          <div v-for="r in roundtable.rounds" v-bind:key="r">
            <b-form-checkbox :checked=true :value="r">Round: {{ r }}</b-form-checkbox>
          </div>
        </b-form-checkbox-group>
      </b-form-group>

      <b-btn class="btn btn-sm btn-primary" type="submit" variant="primary">Save</b-btn>
      <b-btn class="btn btn-sm btn-outline-primary" @click="$router.push('/admin/roundtable/list')" variant="primary">Cancel</b-btn>
    </b-form>
    <admin-footer></admin-footer>
  </div>
</template>

<script>
import { db, firebase } from "@/firebaseConfig.js";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
export default {
  name: "ExpertCreate",
  components: {
    AdminHeader,
    AdminFooter
  },
  data: function() {
    return {
      form: {
        prefix: '',
        firstname: '',
        lastname: '',
        suffix: '',
        title: '',
        desc: '',
        rounds: ''
       },
      currentUser: '',
      roundtable: {}
    };
  },
  firestore: function() {
    this.currentUser = firebase.auth().currentUser
    console.log('User', this.currentUser)
    return {
      roundtable: db
        .collection("users")
        .doc(this.currentUser.uid)
        .collection("roundtables")
        .doc(this.$route.params.id)
    }
  },
  methods: {
    onSubmit: async function(evt) {
      evt.preventDefault();
      const user = firebase.auth().currentUser

      var rounds = { }
      this.form.rounds.forEach(item => {
        rounds[item] = this.roundtable.seats
      })

      await db
        .collection("users")
        .doc(user.uid)
        .collection("roundtables")
        .doc(this.$route.params.id)
        .collection('experts')
        .add({
            prefix: this.form.prefix,
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            suffix: this.form.suffix,
            title: this.form.title,
            desc: this.form.desc,
            rounds: rounds
        });

      // this.$router.push("/admin/roundtable/list");
    }
  }
};
</script>
