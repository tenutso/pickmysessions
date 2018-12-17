<template>
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
      <main>
        <v-tabs v-model="active" centered color="transparent" slider-color="indigo">
          <v-tab v-for="round in roundtable.rounds" :key="round">
            Round {{ round }}
          </v-tab>
          <v-tab v-if="$store.state.cartCount == 3">FINISH</v-tab>
          <v-tab-item v-for="round in roundtable.rounds" :key="round">
            <v-card>
              <v-container fluid grid-list-md>
                <v-layout row wrap>
                  <v-flex xs3 v-for="expert in experts" :key="expert.title">

                    <v-card>
                      <v-img :height="200" :src="expert.image">
                      </v-img>
                      <v-card-title primary-title>
                        <div>
                          <div class="subtitle">{{ expert.title }}</div>
                          <span class="grey--text">1,000 miles of wonder</span>

                          <div v-if="$store.state.cart[expert.id]">
                            selected in {{ $store.state.cart[expert.id].round }}
                          </div>
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
          <v-tab-item v-if="$store.state.cartCount == 3">
            <checkout></checkout>
          </v-tab-item>
        </v-tabs>
      </main>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import {
  db
} from '../firebaseConfig'
import Navigation from '@/components/Navigation'
import Checkout from '@/components/Checkout'
export default {
  components: {
    Navigation,
    Checkout
  },
  data: function () {
    return {
      active: null,
      tabs: null,
      roundtable: Object,
      dialog: false,
      dialogInfo: Object,
      experts: Array,
      selectedState: {}
    }
  },
  firestore: function () {
    return {
      experts: db
        .collection('users')
        .doc('tBmMmpFJpCWJptMl4cy0BqMQteF3')
        .collection('roundtables')
        .doc('Rd2AR6w9cIfRYxBMANdi')
        .collection('experts')
        .orderBy('lastname', 'asc'),
      roundtable: db
        .collection('users')
        .doc('tBmMmpFJpCWJptMl4cy0BqMQteF3')
        .collection('roundtables')
        .doc('Rd2AR6w9cIfRYxBMANdi')
    }
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
        data: expert
      })

      /*
      if (this.$store.state.cartCount == 3) {
        this.active = 3 // finsih tab
      } else {
        this.active = round - 1
      }
      */
      //const active = parseInt(this.active)

      // TODO skip over selected rounds
      // this.active = (active < 2 ? active + 1 : 0)
    },
    undoExpert(expert, round) {
      // this.active = this.$store.state.cart[expert.id].round - 1
      this.$store.commit('removeCartItem', expert.id)
    },
    isSelected(expert) {
      return this.selectedState.find((item) => {
        return (item.expertId == expert.id)
      })
    }
  }
}
</script>

<style>
.layout {
  margin-top: 5em;
}
</style>
