<template>
  <v-app>
    <v-app-bar app color="primary" flat dark>
      <router-link
        tag="div"
        :to="
          $route.name === 'Login' || $route.name === 'Registration'
            ? '/'
            : 'dashboard'
        "
        class="d-flex headline align-center"
        :style="{ cursor: 'pointer' }"
      >
        <v-icon>mdi-barley</v-icon>
        MePhy Health
      </router-link>
      <v-divider vertical class="mx-4" />
      <v-row v-if="$route.name !== 'Login' && $route.name !== 'Registration'">
        <v-col class="shrink">
          <v-btn small depressed fab color="primary" to="dashboard">
            <v-icon>mdi-view-dashboard</v-icon>
          </v-btn>
        </v-col>
        <v-col class="shrink" v-if="isClient">
          <v-btn small depressed fab color="primary" to="plan">
            <v-icon>mdi-calendar-clock</v-icon>
          </v-btn>
        </v-col>
        <v-col class="shrink" v-if="isProfessional">
          <v-btn small depressed fab color="primary" to="create">
            <v-icon>mdi-creation</v-icon>
          </v-btn>
        </v-col>
        <v-col class="shrink">
          <v-btn small depressed fab color="primary" to="catalog">
            <v-icon>mdi-meditation</v-icon>
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col class="shrink">
          <v-btn small depressed fab color="primary" to="profile">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-col>
        <!-- <v-col class="shrink">
        <v-btn small depressed fab color="primary">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-col> -->
        <v-col class="shrink">
          <v-btn small depressed fab color="primary" to="login">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(['isClient', 'isProfessional', 'isAdmin'])
  },
  methods: {
    ...mapActions(['retrieveUser'])
  },
  created () {
    this.retrieveUser()
  }
}
</script>
