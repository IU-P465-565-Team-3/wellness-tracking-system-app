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
      <v-spacer />
      <v-btn depressed color="primary">
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
