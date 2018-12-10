<template>
<v-layout justify-center class="layout">
  <v-flex xs12 sm10 md6>
    <v-navigation-drawer v-model="drawer" absolute temporary right height="50%">
        <v-list v-for="item in $store.state.cart" class="pa-1" :key="item.id">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="item.image">
            </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{item.firstname}} {{item.lastname}}</v-list-tile-title>
                <span class="small grey--text">{{ item.title }}</span>
              </v-list-tile-content>
          </v-list-tile>
           <v-divider></v-divider>
        </v-list>
      </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>{{ roundtable.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-badge overlap color="orange">
          <span slot="badge">{{ $store.state.cartCount }}</span>
          <v-icon>
            people
          </v-icon>
        </v-badge>
      </v-btn>

    </v-toolbar>
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
      <v-tabs slot="extension" v-model="active" centered color="transparent" slider-color="indigo">
        <v-tab v-for="round in roundtable.rounds" :key="round">
          Round {{ round }}
        </v-tab>
      </v-tabs>
      <v-tabs-items>
        <v-tab-item v-for="round in roundtable.rounds" :key="round">
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs3 v-for="expert in experts" :key="expert.title">

                  <v-card>
                    <v-img :src="expert.image">
                    </v-img>
                    <v-card-title primary-title>
                      <div>
                        <div class="subtitle">{{ expert.title }}</div>
                        <span class="grey--text">1,000 miles of wonder</span>
                        <div v-if="expert.selected">Selected</div>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn small  @click="selectExpert(expert)">Select</v-btn>
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
      </v-tabs-items>
    </main>
  </v-flex>
</v-layout>
</template>

<script>
import {
  db
} from '../firebaseConfig'
export default {
  data: function () {
    return {
      active: null,
      drawer: false,
      tabs: null,
      roundtable: {},
      dialog: false,
      dialogInfo: {},
      experts: []
    }
  },
  created: async function () {
    // return this.$store.getters.roundtable('Rd2AR6w9cIfRYxBMANdi')
    const snapshot = await db
      .collection('users')
      .doc('tBmMmpFJpCWJptMl4cy0BqMQteF3')
      .collection('roundtables')
      .doc('Rd2AR6w9cIfRYxBMANdi')
      .collection('experts')
      .orderBy('lastname', 'asc').get()

    this.experts = snapshot.docs.map(doc => {
      const data = doc.data()
      data.id = doc.id
      return data
    })
    const snapshot2 = await db
      .collection('users')
      .doc('tBmMmpFJpCWJptMl4cy0BqMQteF3')
      .collection('roundtables')
      .doc('Rd2AR6w9cIfRYxBMANdi').get()
    this.roundtable = snapshot2.data()
  },
  methods: {
    openDialog(expert) {
      this.dialog = true
      this.dialogInfo = expert
    },
    selectExpert(expert) {
      expert.selected = { round: 1 }
      this.$store.commit('addToCart', expert)
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0)
    }
  }
}
</script>

<style>
.layout {
  margin-top: 5em;
}
</style>
