<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="purple darken-1" app>
      <v-toolbar-side-icon
        @click.native.stop="drawer = !drawer"
        class="hidden-sm-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>SeatSelect</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tool-bar-items class="hidden-xs-only">
        <v-btn flat>
          <v-icon left>people</v-icon>
          Roundtables
        </v-btn>
      </v-tool-bar-items>
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
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
export default {
  name: "Admin",
  components: {
    AdminHeader,
    AdminFooter
  },
  data() {
    return {
      drawer: false
    };
  }
};
</script>
