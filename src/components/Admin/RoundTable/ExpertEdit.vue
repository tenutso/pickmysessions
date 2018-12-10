<template>
    <v-dialog persistent width="600px" v-model="this.$store.state.expertEditMode">
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
              <v-flex xs12 sm12 md12>
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
  name: "ExpertEdit",
  props: {
    selectedExpert: null,
    selectedRoundtable: null
  },
  data: function () {
    return {
      formTitle: 'Edit Expert',
      expertDefault: {},
      imageUrl: '',
      image: null,
    }
  },
  computed: {
    expert: function () {
      return this.selectedExpert
    },
    roundtable: function () {
      return this.selectedRoundtable
    }
  },
  watch: {
    image: function (oldval, newval) {
      this.expert.image = this.imageUrl
    }
  },
  methods: {
    save: async function (evt) {
      let expertId = ''
      const expertRef = this.$store.state.roundtableRef
          .doc(this.roundtable.id)
          .collection('experts')
      await expertRef
        .doc(this.expert.id)
        .set({
          suffix: this.expert.suffix,
          firstname: this.expert.firstname,
          lastname: this.expert.lastname,
          suffix: this.expert.suffix,
          title: this.expert.title,
          desc: this.expert.desc,
          image: this.expert.image
        });

      // Upload image if new or changed
      if (this.image) {
        this.$store.dispatch('uploadImage', {
          image: this.image,
          roundtableId: this.roundtable.id,
          expertId: this.expert.id
        })
        this.image = {}
      }
      this.$store.state.expertEditMode = false
    },
    close: function () {
      this.$store.state.expertEditMode = false
      this.imageUrl = ''
      this.image = ''
      setTimeout(() => {
        // this.expertItem = Object.assign({}, this.expertDefault)
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
