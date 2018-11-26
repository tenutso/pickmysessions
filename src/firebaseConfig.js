import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDG2ZWT2wMSzg5t0jB7KzL0HzQwyx-lHxI",
  authDomain: "pickmysessions.firebaseapp.com",
  databaseURL: "",
  projectId: "pickmysessions",
  storageBucket: "",
  messagingSenderId: "896627724266"
};
firebase.initializeApp(config);

const db = firebase.firestore();

const settings = { timestampsInSnapshots: true };
db.settings(settings);

export { firebase, db };
