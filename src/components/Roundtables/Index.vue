<template>
<v-app>

  <div data-app>
    <v-layout justify-center class="layout">
      <v-flex xs12 sm10 md6>
        <navigation v-bind:roundtable="roundtable"></navigation>
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="headline">{{ dialogInfo.title }}</v-card-title>
            <v-card-text>
              {{ dialogInfo.desc }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div v-if="$store.state.loader" class="text-xs-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <main v-else>
          <v-tabs v-model="active" centered color="transparent" slider-color="indigo">
            <v-tab v-for="round in Number(roundtable.rounds)" :key="round">
              Round {{ round }}
            </v-tab>
            <v-tab :disabled="$store.state.cartCount != 3">FINISH</v-tab>
            <v-tab-item v-for="round in Number(roundtable.rounds)" :key="round">
              <v-card>
                <v-container fluid grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs3 v-for="expert in experts" :key="expert.title">

                      <v-card>
                        <div v-if="$store.state.cart[expert.id]" class="selected-item"></div>
                        <div v-if="$store.state.cart[expert.id]" class="selected-item-text">ROUND {{ $store.state.cart[expert.id].round }}</div>
                        <v-img :height="200" :src="expert.image"></v-img>
                        <v-card-title primary-title>
                          <div>
                            <div class="subtitle">{{ expert.title }}</div>
                            <span class="grey--text">{{ expert.tickets[round] }} tickets left</span>
                          </div>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn v-if="$store.state.cart[expert.id]" small @click="undoExpert(expert, $store.state.cart[expert.id])">Undo</v-btn>
                          <v-btn v-else small @click="selectExpert(expert, round)">Select</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn icon @click="openDialog(expert)">
                            <v-icon>more</v-icon>
                          </v-btn>
                        </v-card-actions>

                      </v-card>

                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-tab-item>
            <v-tab-item v-if="$store.state.cartCount === 3">
              <checkout></checkout>
            </v-tab-item>
          </v-tabs>
        </main>
      </v-flex>
    </v-layout>
  </div>
</v-app>
</template>

<script>
import {
  db
} from '@/firebaseConfig'
import Navigation from '@/components/Navigation'
import Checkout from '@/components/Roundtables/Checkout'
export default {
  components: {
    Navigation,
    Checkout
  },
  data: function () {
    return {
      active: null,
      tabs: null,
      roundtable: {},
      dialog: false,
      dialogInfo: {},
      experts: [],
      selectedState: {},
      token: {}
    }
  },
  firestore: function () {
    return {
      experts: db
        .collection('users')
        .doc(this.$store.state.token.userId)
        .collection('roundtables')
        .doc(this.$store.state.token.roundtableId)
        .collection('experts')
        .orderBy('lastname', 'asc'),
      roundtable: db
        .collection('users')
        .doc(this.$store.state.token.userId)
        .collection('roundtables')
        .doc(this.$store.state.token.roundtableId)
    }
  },
  beforeCreate: async function () {
    this.$store.commit('setLoader', true)
    this.$store.commit('setToken', this.$route.params.id)
    const tokenInfo = await db
        .collection('users')
        .doc(this.$store.state.token.userId)
        .collection('roundtables')
        .doc(this.$store.state.token.roundtableId)
        .collection('tokens')
        .doc(this.$store.state.token.tokenId)
        .get()
    this.$store.commit('setTokenInfo', tokenInfo.data())


  },
  updated: function () {
    let vm = this
    this.$nextTick(function () {

      setTimeout(function () {
        vm.$store.commit('setLoader', false)
      }, 300)
    })

  },
  methods: {
    openDialog(expert) {
      this.dialog = true
      this.dialogInfo = expert
    },
    selectExpert(expert, round) {

      // allow only 1 selection per round by
      // looping through selections and removing previous selection

      for (var expertId in this.$store.state.cart) {
        if (this.$store.state.cart[expertId].round === round) {
          this.$store.commit('removeCartItem', expertId)
        }
      }

      this.$store.commit('addToCart', {
        id: expert.id,
        round: round,
        firstname: expert.firstname,
        lastname: expert.lastname,
        suffix: expert.suffix,
        title: expert.title,
        image: expert.image,
      })

      /*
      if (this.$store.state.cartCount == 3) {
        this.active = 3 // finsih tab
      } else {
        this.active = round - 1
      }
      */
      const active = parseInt(this.active)

      // TODO skip over selected rounds
      this.active = (active < 3 ? active + 1 : 0)
    },
    undoExpert(expert, round) {
      // this.active = this.$store.state.cart[expert.id].round - 1
      this.$store.commit('removeCartItem', expert.id)
    }
  }
}
</script>

<style>
.layout {
  margin-top: 5em;
}
.selected-item {
  position: absolute;
  height:30px;
  width:100%;
  background: green;
  z-index: 9999999;
  opacity: .6;
}
.selected-item-text {
  position:absolute;
  height:30px;
  width:100%;
  font-weight:400;
  text-align: center;
  font-size:18px;
  color:white;
  z-index: 99999999;
}
</style>
