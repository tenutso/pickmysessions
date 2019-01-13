<template>
<div>
  <v-toolbar color="indigo" dark fixed>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{ roundtable.name }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <span v-if="$store.state.tokenInfo">
      Welcome {{ $store.state.tokenInfo.firstname }} {{ $store.state.tokenInfo.lastname }}
    </span>
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
      drawer: true
    }
  },
}
</script>


<style>

  </style>
