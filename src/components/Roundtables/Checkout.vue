<template>
<div>
  <v-card>
        <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">You're almost done.</h3>
        <div>To complete your selection click on the complete button below.</div>
        </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-list two-line>
      <v-subheader>Your selection by round</v-subheader>
      <v-list-tile v-for="item in $store.state.cart" :key="item.id" avatar>

        <v-list-tile-action>
          <v-badge color="pink">
            <span slot="badge"><strong>{{ item.round }}</strong></span>
          </v-badge>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title v-text="item.firstname + ' ' + item.lastname + ' ' + item.suffix"></v-list-tile-title>
          <span class="grey--text">{{ item.title }}</span>
        </v-list-tile-content>
        <v-list-tile-avatar large>
          <img :src="item.image">
            </v-list-tile-avatar>

      </v-list-tile>

    </v-list>
  <v-divider></v-divider>
  <v-card-actions>
      <v-btn :loading='saveMode' @click="saveSelection" block color="pink" dark>Complete Selection</v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'checkout',
  data: function() {
    return {
      saveMode: false
    }

  },
  methods: {
    async saveSelection() {
      this.saveMode = true
      for (var index in this.$store.state.cart) {

        var round = this.$store.state.cart[index].round

        var expert =  await this.$store.state.clientRef
          .collection('roundtables')
          .doc(this.$store.state.token.roundtableId)
          .collection('experts')
          .doc(index)
          .get()

        var tickets = expert.data().tickets
        tickets[round] = tickets[round] - 1
        console.log(round)
        console.log(tickets)

        await this.$store.state.clientRef
          .collection('roundtables')
          .doc(this.$store.state.token.roundtableId)
          .collection('experts')
          .doc(index)
          .update({
            tickets: tickets
          })

      }

      this.$store.state.clientRef
      .collection('roundtables')
      .doc(this.$store.state.token.roundtableId)
      .collection('choices')
      .doc(this.$store.state.token.tokenId)
      .set({
        items: this.$store.state.cart,
        tokenInfo: this.$store.state.tokenInfo,
        timestamp: new Date()
      })
      // TODO: add timestap

     this.saveMode = false
    }
  }
}
</script>
