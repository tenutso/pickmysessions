<template>
<v-card>
  <v-list two-line>
    <v-list-tile v-for="item in $store.state.cart" :key="item.id" avatar>
      <v-list-tile-action>
        <v-badge color="pink">
          <span slot="badge"><strong>{{ item.round }}</strong></span>
        </v-badge>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title v-text="item.data.firstname + ' ' + item.data.lastname + ' ' + item.data.suffix"></v-list-tile-title>
        <span class="grey--text">{{ item.data.title }}</span>
      </v-list-tile-content>
      <v-list-tile-avatar>
        <img :src="item.data.image">
            </v-list-tile-avatar>

    </v-list-tile>

  </v-list>
</v-card>
</template>

<script>
export default {
  name: 'checkout'
}
</script>
