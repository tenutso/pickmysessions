<template>
    <v-dialog persistent v-model="dialog">
      <v-btn slot="activator" color="primary" dark class="mb-2">New Expert</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs4 sm4 md4>
                <v-text-field v-model="expert.prefix" label="Prefix"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="expert.firstname" label="First Name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="expert.lastname" label="Last Name"></v-text-field>
              </v-flex>
              <v-flex xs4 sm4 md4>
                <v-text-field v-model="expert.suffix" label="Suffix"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="expert.title" label="Title"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-textarea v-model="expert.desc" label="Description"></v-textarea>
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
                  <img v-if="expert.image" :src="expert.image" height="150" />
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
  name: "CreateExpert",
  data: function () {
    return {
      dialog: false,
      formTitle: 'Expert',
      experts: [],
      expert: {
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
    }
  },
  watch: {
    imageUrl: function(newValue, oldValue) {
      // If a new image file is picked, show the new image before saving
      this.$set(this.expert, 'image', '')
    }
  },
  methods: {
    save: async function (evt) {

      let expertId = ''
      const expertRef = this.$store.state.clientRef
          .collection('roundtables')
          .doc(this.$route.params.id)
          .collection('experts')

          const newExpert = await expertRef
          .add({
            suffix: this.expert.suffix,
            firstname: this.expert.firstname,
            lastname: this.expert.lastname,
            suffix: this.expert.suffix,
            title: this.expert.title,
            desc: this.expert.desc
          });
          expertId = newExpert.id

      // Upload image if new or changed
      if (this.image) {
        this.$store.dispatch('uploadImage', {
          image: this.image,
          roundtableId: this.$route.params.id,
          expertId: expertId
        })
        this.image = {}
      }
      this.expert = null
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

