<template>
  <v-app>
    <v-main>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field label="Username" v-model="username" prepend-icon="mdi-account-circle"
          @keydown.enter="authenticate" />
          <v-text-field
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="password"
          @keydown.enter="authenticate"
          @click:append="showPassword = !showPassword"/>
        </v-card-text>
        <v-divider></v-divider>
        <v-radio-group class="px-4" row v-model="role">
          <v-radio label="Client" value="radio-1"></v-radio>
          <v-radio label="Fitness Professional" value="radio-2"></v-radio>
          <v-radio label="Admin" value="radio-3"></v-radio>
        </v-radio-group>
        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-row class="justify-center">
            <v-col class="shrink">
              <v-btn depressed :to="{ name: 'Registration' }">Join Now</v-btn>
            </v-col>
            <v-col class="shrink">
              <v-btn color="info" @click="authenticate">Login</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      role: 'radio-1',
      showPassword: false,
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async authenticate () {
      try {
        await this.login({
          username: this.username,
          password: this.password
        })
        this.$router.push('dashboard')
      } catch {}
    }
  }
}
</script>
