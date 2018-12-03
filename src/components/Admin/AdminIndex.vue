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
          @click="$router.push({name: 'RoundTableList'})"
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
        <router-view></router-view>
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
        { icon: "people", title: "Roundtables" },
        { icon: "bar_chart", title: "Reports" },
        { icon: "lock_open", title: "Login" }
      ]
    };
  }
};
</script>
