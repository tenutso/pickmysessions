<template>
<div>
  <v-toolbar flat color="white">
    <v-toolbar-title>{{ $store.state.selectedRoundtable.name }}</v-toolbar-title>
    <v-divider class="mx-2" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <expert-create></expert-create>
    <expert-edit></expert-edit>
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
import ExpertCreate from '@/components/Admin/RoundTable/ExpertCreate'
import ExpertEdit from '@/components/Admin/RoundTable/ExpertEdit'
export default {
  name: "ExpertList",
  components: {
    ExpertCreate,
    ExpertEdit
  },
  data: function () {
    return {
      dialog: false,
      editMode: false,
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
    return {
      experts: this.$store.state.roundtableRef
        .doc(this.$store.state.selectedRoundtable.id)
        .collection("experts")
    };
  },
  watch: {
    imageUrl: function(newValue, oldValue) {
      // If a new image file is picked, show the new image before saving
      this.$set(this.expertItem, 'image', '')
    }
  },
  methods: {
    editExpert: function (expert) {
      this.$store.commit('setSelectedExpert', Object.assign({id: expert.id}, expert))
      this.expertItem = Object.assign({}, expert)
      this.expertItem.id = expert.id
      this.$store.state.expertEditMode = true
    },
    deleteExpert: async function (expert) {
      if (
        !confirm('Are you sure you want to delete "' + expert.firstname + ' ' + expert.lastname + '"?')
      ) {
        return;
      }

      var col = await this.$store.state.roundtableRef
        .doc(this.$store.state.selectedRoundtable.id)
        .collection("experts")
        .doc(expert.id)
        .get();
      await col.ref.delete();
    },
    save: async function (evt) {

      let expertId = ''
      const expertRef = this.$store.state.roundtableRef
          .doc(this.$store.state.selectedRoundtable.id)
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
            desc: this.expertItem.desc,
            image: this.expertItem.image
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
