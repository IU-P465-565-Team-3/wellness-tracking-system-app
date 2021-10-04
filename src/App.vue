<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      flat
      dark
    >
      <div class="d-flex headline align-center">
        Wellness Tracking System
      </div>
      <v-divider vertical class="mx-4" />
        <v-btn small depressed fab color="primary" to="dashboard">
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
        <v-btn small depressed fab color="primary" to="plan">
          <v-icon>mdi-calendar-clock</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn small depressed fab color="primary">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  })
}
</script>
