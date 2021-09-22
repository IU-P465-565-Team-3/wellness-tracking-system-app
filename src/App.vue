<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex headline align-center">
        Wellness Tracking System
      </div>

      <v-spacer />

      <v-btn
        href="https://github.com/IU-P465-565-Team-3/wellness-tracking-system-app"
        target="_blank"
        text
      >
        <span class="mr-2">View GitHub Repository</span>
        <v-icon>mdi-open-in-new</v-icon>
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
