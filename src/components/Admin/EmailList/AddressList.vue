<template>
<div>
  <v-toolbar flat color="white">
    <v-toolbar-title>{{ list.name }}</v-toolbar-title>
    <v-divider class="mx-2" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-dialog v-model="importDialog" max-width="500px">
      <v-btn small slot="activator" color="primary" dark class="mb-2">Import</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Import from CSV</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-btn raised class="primary" @click="onPickFile">Browse</v-btn>
                <input
                      type="file"
                      style="display: none"
                      ref="fileInput"
                      accept="text/plain"
                      @change="onFilePicked"
                    >
                <span>{{ fileName }}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="importDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="importProcess">Import</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addDialog" max-width="500px">
      <v-btn small slot="activator" color="primary" dark class="mb-2">Add Email</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Create Email List</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="list.name" label="Name"></v-text-field>
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

  <v-data-table class="elevation-1" :headers="headers" :items="tokens">
    <template slot="items" slot-scope="data">
      <td>{{ data.item.firstname }}</td>
      <td>{{ data.item.lastname }}</td>
      <td>{{ data.item.email }}</td>
      <td>{{ data.item.id }}</td>
      <td class="justify-center layout px-0">
        <v-icon small class="mr-2" @click="lists(data.item)">edit</v-icon>
        <v-icon small class="mr-2" @click="deleteToken(data.item)">delete</v-icon>
      </td>
    </template>
  </v-data-table>
</div>
</template>

<script>
import {
  firestore
} from '@/firebaseConfig.js'
export default {
  data: function () {
    return {
      addDialog: false,
      importDialog: false,
      list: {},
      tokens: [],
      importFile: null,
      fileArray: [],
      fileName: '',
      filePath: '',
      headers: [{
          text: "First Name",
          align: "left",
          value: "firstname"
        },
        {
          text: "Last Name",
          align: "left",
          sortable: true,
          value: "lastname"
        },
        {
          text: "Email Address",
          sortable: false,
          value: "email"
        },
        {
          text: "Token",
          sortable: false,
          value: "token"
        },
        {
          text: "Actions",
          sortable: false,
          value: "edit"
        }
      ]
    }
  },
  firestore: function () {
    return {
      list: this.$store.state
        .clientRef
        .collection('lists')
        .doc(this.$route.params.id),
      tokens: this.$store.state
        .clientRef
        .collection('lists')
        .doc(this.$route.params.id)
        .collection('tokens')
    }
  },
  methods: {
    save: async function () {
      const list = await this.$store.state
        .clientRef
        .collection('lists')
        .add({
          name: this.list.name
        })

      this.dialog = false
    },
    close: function () {
      this.dialog = false
    },
    deleteToken: async function (token) {
      if (
        !confirm('Are you sure you want to delete "' + token.id + '" ?')
      ) {
        return;
      }
      var col = await this.$store.state
        .clientRef
        .collection('lists')
        .doc(this.$route.params.id)
        .collection('tokens')
        .doc(token.id)
        .get();
      await col.ref.delete();
    },
    onPickFile(event) {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      this.fileName = files[0].name
      // console.log(files)
      if (!/\.(csv|txt)$/i.test(this.fileName)) {
        return alert('File must be a valid csv or txt file!')
      }
      let fileLines = []
      const fileReader = new FileReader()
      var vm = this
      fileReader.onload = function (e) {
        fileLines = fileReader.result.split("\r\n")

        let heading = fileLines[0].split(",")
        fileLines.splice(0,1)
        fileLines.splice(fileLines.length - 1, 1) // remove last empty row

        fileLines.forEach(function (line) {
          var temp = line.split(",")
          var tempobj = {}
          for (var i = 0; i < temp.length; i++) {
            tempobj[heading[i]] = temp[i]
          }
          vm.fileArray.push(tempobj)
        })

      }
      fileReader.readAsText(files[0])

      // this.importFile = files[0]

      /*
      this.$store.dispatch('uploadFile', this.importFile)
        .then( (filePath) => {
          this.filePath = filePath
          console.log(this.filePath)
        })
      */
    },
    importProcess() {

      var vm = this
      this.fileArray.forEach(async function(item) {
        var col = await vm.$store.state
        .clientRef
        .collection('lists')
        .doc(vm.$route.params.id)
        .collection('tokens')
        .set(item)
      })

      console.log(this.fileArray)
      this.importDialog = false

    }
  }
}
</script>
