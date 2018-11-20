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
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>

</template>

<script>
import { db, firebase } from "../../firebaseConfig.js";
export default {
  name: "RoundTableCreate",
  data: function() {
    return {
      form: {
        name: "",
        rounds: 2,
        seats: 7
      }
    };
  },
  methods: {
    onSubmit: async function(evt) {
      evt.preventDefault();
      const user = firebase.auth().currentUser;
      await db
        .collection("users")
        .doc(user.uid)
        .collection("roundtables")
        .add({
          name: this.form.name,
          rounds: this.form.rounds,
          seats: this.form.seats
        });
    }
  }
};
</script>
