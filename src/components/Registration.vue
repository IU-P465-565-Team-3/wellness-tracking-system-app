<template>
  <v-app>
    <v-main>
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
              <v-menu
                ref="dobMenu"
                v-model="dobMenu"
                :close-on-content-click="false"
                :return-value.sync="dateOfBirth"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateOfBirth"
                    label="Date of Birth"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateOfBirth"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="dobMenu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dobMenu.save(dateOfBirth)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Email" v-model="username" :hint="'This will be your username'" persistent-hint />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
                <v-text-field label="Password" :type="showPassword ? 'text' : 'password'"
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :error="password !== confirmPassword"
                @click:append="showPassword = !showPassword"/>
            </v-col>
            <v-col>
                <v-text-field label="Confirm Password" :type="showPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label>Gender</label>
              <v-radio-group class="px-4" row v-model="gender" hide-details="">
                <v-radio label="Female" :value="'Female'"></v-radio>
                <v-radio label="Male" :value="'Male'"></v-radio>
                <v-radio label="Others" :value="'Others'"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label>Account Type</label>
              <v-radio-group class="px-4" row v-model="role" hide-details="">
                <v-radio label="Client" :value="'CLIENT'"></v-radio>
                <v-radio label="Fitness Professional" :value="'PROFESSIONAL'"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-row class="justify-center">
            <v-col class="shrink">
              <v-btn depressed :to="{ name: 'Login' }">Return to Login</v-btn>
            </v-col>
            <v-col class="shrink">
              <v-btn color="info" @click="createAccount">Create Account</v-btn>
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
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      username: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      gender: 'Female',
      role: 'CLIENT',
      dobMenu: false
    }
  },
  methods: {
    ...mapActions('auth', ['register']),
    async createAccount () {
      try {
        await this.register({
          firstName: this.firstName,
          lastName: this.lastName,
          dateOfBirth: this.dateOfBirth,
          username: this.username,
          password: this.password,
          gender: this.gender,
          role: this.role
        })
        this.$router.push({ name: 'Login' })
      } catch {}
    }
  }
}
</script>
