<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group id="nameInputGroup" label="Name:" label-for="nameInput" description="Enter a name for this roundtable event">
        <b-form-input id="nameInput1" type="text" v-model="form.name" required placeholder="">
        </b-form-input>
      </b-form-group>
      <b-form-group id="roundsInputGroup" label="How many rounds?" label-for="roundsInput2">
        <b-form-input id="roundsInput2" type="number" v-model="form.rounds" required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="seatsInputGroup" label="How many seats per round?" label-for="seatsInput">
        <b-form-input id="seatsInput" type="number" v-model="form.seats" required>
        </b-form-input>
      </b-form-group>
      <b-btn class="btn btn-sm btn-primary" type="submit" variant="primary">Save</b-btn>
      <b-btn class="btn btn-sm btn-outline-primary" @click="$router.push('/admin/roundtables')" variant="primary">Cancel</b-btn>
    </b-form>
  </div>

</template>

<script>
import { db, firebase } from "@/firebaseConfig.js"
export default {
  name: "RoundTableEdit",
  data: function() {
    return {
      form: {
        name: "",
        rounds: 2,
        seats: 7
      }
    };
  },
  created: async function() {
    const roundTableCol = await db
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection("roundtables")
      .doc(this.$route.params.id)
      .get()
    this.form = roundTableCol.data()
    console.log('Edit RoundTable: ', this.form)
  },
  methods: {
    onSubmit: async function(evt) {
      evt.preventDefault();
      const user = firebase.auth().currentUser;
      await db
        .collection("users")
        .doc(user.uid)
        .collection("roundtables")
        .doc(this.$route.params.id)
        .set({
          name: this.form.name,
          rounds: this.form.rounds,
          seats: this.form.seats
        });
      this.$router.push('/admin/roundtable/list')
    }
  }
};
</script>
