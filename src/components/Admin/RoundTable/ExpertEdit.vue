<template>
    <v-dialog persistent full-width v-model="dialog">
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
                  <img v-if="expertItem.image" :src="expertItem.image" height="150" />
                  <img v-else-if="imageUrl" :src="imageUrl" height="150" />
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
</template>

<script>
export default {
  name: "ExpertEdit",
  props: {
    editMode: null,
  },
  data: function () {
    return {
      dialog: false,
      formTitle: 'Edit Expert',
      expertItem: this.$store.state.selectedExpert,
      expertDefault: {},
      imageUrl: '',
      image: null,
    }
  },
  mounted () {
    this.dialog = this.editMode
    this.expertItem = this.$store.state.selectedExpert
  },
  watch: {
    imageUrl: function(newValue, oldValue) {
      // If a new image file is picked, show the new image before saving
      this.$set(this.expertItem, 'image', '')
    }
  },
  methods: {
    save: async function (evt) {
      let expertId = ''
      const expertRef = this.$store.state.roundtableRef
          .doc(this.$store.state.selectedRoundtable.id)
          .collection('experts')
      expertId = this.expertItem.id
      await expertRef
        .doc(expertId)
        .set({
          suffix: this.expertItem.suffix,
          firstname: this.expertItem.firstname,
          lastname: this.expertItem.lastname,
          suffix: this.expertItem.suffix,
          title: this.expertItem.title,
          desc: this.expertItem.desc,
          image: this.expertItem.image
        });

      // Upload image if new or changed
      if (this.image) {
        this.$store.dispatch('uploadImage', this.image)
        this.image = {}
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
      if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(filename)) {
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
