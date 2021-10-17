<template>
  <v-app>
    <v-content>
      <v-card width="600" class="mx-auto mt-9">
        <v-card-title>Registration</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field label="First Name" v-model="firstName"/>
            </v-col>
            <v-col>
              <v-text-field label="Last Name" v-model="lastName"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Month" v-model="month"/>
            </v-col>
            <v-col>
              <v-text-field label="Day" v-model="day"/>
            </v-col>
            <v-col>
              <v-text-field label="Year" v-model="year"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Email" v-model="email"/>
            </v-col>
            <v-col>
              <v-text-field label="Username" v-model="username"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
                <v-text-field label="Password" v-model="password" :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"/>
            </v-col>
            <v-col>
                <v-text-field label="Confirm Password" :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
              :items="items"
              label="Account Type"
              v-model="role"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-app>
</template>
<script>

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      items: ['Client', 'Professional'],
      showPassword: false
    }
  },
  methods: {
    ...mapActions('auth', ['registration']),
    async authenticate () {
      try {
        await this.registration({
          firstName: this.firstName,
          lastName: this.lastName,
          month: this.month,
          day: this.day,
          year: this.year,
          email: this.email,
          username: this.username,
          password: this.password
        })
        this.$router.push('dashboard')
      } catch {}
    }
  }
}
</script>
