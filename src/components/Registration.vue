<template>
  <v-app>
    <v-content>
      <v-card width="600" class="mx-auto mt-9">
        <v-card-title>Registration</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field label="First Name"/>
            </v-col>
            <v-col>
              <v-text-field label="Last Name"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Month"/>
            </v-col>
            <v-col>
              <v-text-field label="Day"/>
            </v-col>
            <v-col>
              <v-text-field label="Year"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Email"/>
            </v-col>
            <v-col>
              <v-text-field label="Username"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
                <v-text-field label="Password" :type="showPassword ? 'text' : 'password'"
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
export default {
  data () {
    return {
      items: ['Client', 'Professional'],
      showPassword: false
    }
  }
}
</script>
