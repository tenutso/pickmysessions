<template>
<div>
  <v-toolbar flat color="white">
    <v-toolbar-title>{{ $store.currentRoundtable.name }}</v-toolbar-title>
    <v-divider class="mx-2" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-dialog persistent full-width v-model="dialog">
      <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs4 sm4 md4>
                <v-text-field v-model="expertItem.prefix" label="Prefix"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="expertItem.firstname" label="First Name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="expertItem.lastname" label="Last Name"></v-text-field>
              </v-flex>
              <v-flex xs4 sm4 md4>
                <v-text-field v-model="expertItem.suffix" label="Suffix"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="expertItem.title" label="Title"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-textarea v-model="expertItem.desc" label="Description"></v-textarea>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-btn raised class="primary" @click="onPickFile">Upload Photo</v-btn>
                <input
                      type="file"
                      style="display: none"
                      ref="fileInput"
                      accept="image/*"
                      @change="onFilePicked"
                    >
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <img v-if="!imageUrl" :src="expertItem.image" height="150" />
                  <img v-if="imageUrl" :src="imageUrl" height="150" />
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
  <v-data-table :headers="headers" :items="experts" class="elevation-1">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.firstname }} {{ props.item.lastname }}</td>
      <td class="justify-center layout px-0">
        <v-icon small class="mr-2" @click="editExpert(props.item)">
          edit
        </v-icon>
        <v-icon small @click="deleteExpert(props.item)">
          delete
        </v-icon>
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
  name: "ExpertList",
  data: function () {
    return {
      dialog: false,
      formTitle: 'Expert',
      experts: [],
      expertItem: {
        prefix: '',
        firstname: '',
        lastname: '',
        suffix: '',
        title: '',
        desc: '',
        image: ''
      },
      expertDefault: {},
      userId: "",
      roundtableId: "",
      imageUrl: '',
      image: null,
      headers: [{
          text: "Experts",
          align: "left",
          sortable: true,
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
    this.userId = firebase.auth().currentUser.uid
    this.roundtableId = this.$store.currentRoundtable.id
    return {
      experts: db
        .collection("users")
        .doc(this.userId)
        .collection("roundtables")
        .doc(this.roundtableId)
        .collection("experts")
    };
  },
  methods: {
    editExpert: function (expert) {
      this.expertItem = Object.assign({}, expert)
      this.expertItem.id = expert.id
      this.dialog = true;
    },
    deleteExpert: async function (expert) {
      if (
        !confirm('Are you sure you want to delete "' + expert.firstname + ' ' + expert.lastname + '"?')
      ) {
        return;
      }

      var col = await db
        .collection("users")
        .doc(this.userId)
        .collection("roundtables")
        .doc(this.roundtableId)
        .collection("experts")
        .doc(expert.id)
        .get();
      await col.ref.delete();
    },
    save: async function (evt) {

      let expertId = ''
      const expertRef = db
          .collection("users")
          .doc(this.userId)
          .collection("roundtables")
          .doc(this.roundtableId)
          .collection('experts')

      if (this.expertItem.id) {
        expertId = this.expertItem.id
        await expertRef
          .doc(expertId)
          .set({
            suffix: this.expertItem.suffix,
            firstname: this.expertItem.firstname,
            lastname: this.expertItem.lastname,
            suffix: this.expertItem.suffix,
            title: this.expertItem.title,
            desc: this.expertItem.desc
          });
      } else {
          const newExpert = await expertRef
          .add({
            suffix: this.expertItem.suffix,
            firstname: this.expertItem.firstname,
            lastname: this.expertItem.lastname,
            suffix: this.expertItem.suffix,
            title: this.expertItem.title,
            desc: this.expertItem.desc
          });
          expertId = newExpert.id
      }

      // Upload image if new or changed
      if (this.image) {
        const ext = this.image.name.slice(this.image.name.lastIndexOf('.'))
        const fileData = await firebase.storage().ref(this.userId +
          '/' + 'roundtables/' +
          '/' + this.roundtableId +
          '/' + expertId +
          '.' + ext).put(this.image)

          console.log(fileData)
          let imageUrl = await fileData.ref.getDownloadURL()
          await expertRef.doc(expertId).update({image: imageUrl})
          this.image = { }
      }

      this.dialog = false
    },
    close: function () {
      this.dialog = false
      this.imageUrl = ''
      this.image = ''
      setTimeout(() => {
        this.expertItem = Object.assign({}, this.expertDefault)
      }, 300)
    },
    onPickFile(event) {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name
      console.log(files)
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]

    }
  }
};
</script>

<style>
</style>
