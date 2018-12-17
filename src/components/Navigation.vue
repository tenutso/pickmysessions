<template>
<div>
  <v-navigation-drawer v-model="drawer" absolute temporary right height="50%">
    <v-list v-for="(item, index) in $store.state.cart" class="pa-1" :key="index">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img :src="item.data.image">
            </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{item.data.firstname}} {{item.data.lastname}}</v-list-tile-title>
            <span class="small grey--text">{{ item.data.title }}</span>
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
</div>
</template>


<script>
export default {
  name: 'Navigation',
  props: {
    roundtable: null
  },
  data: function () {
    return {
      drawer: false
    }
  },
}
</script>


<style>

  </style>
