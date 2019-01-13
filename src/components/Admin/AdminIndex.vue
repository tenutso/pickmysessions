<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      dark
      class="primary"
      app
    >
      <v-toolbar-side-icon
        @click.native.stop="drawer = !drawer"
        class="hidden-sm-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>SeatSelect</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
        v-for="item in menuItems"
        :key="item.title"
        class="hidden-xs-only"
      >
        <v-btn
          @click="$router.push({name: item.path})"
          flat
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

      </v-toolbar-items>
      <v-spacer></v-spacer>
      <UserLoggedIn></UserLoggedIn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <div v-if="$store.state.loader" class="text-xs-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
      <router-view v-else></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import UserLoggedIn from "../UserLoggedIn";
export default {
  name: "Admin",
  components: {
    UserLoggedIn
  },
  data() {
    return {
      drawer: false,
      menuItems: [
        { icon: "people", title: "Roundtables", path: "RoundTableList" },
        { icon: "bar_chart", title: "Reports", path: "Reports" }
      ]
    };
  },
  beforeCreate: function () {
    this.$store.commit('setLoader', true)
  },
  updated: function () {
    let vm = this
    this.$nextTick(function () {

      setTimeout(function () {
        vm.$store.commit('setLoader', false)
      }, 1123)
    })

  },
};
</script>
