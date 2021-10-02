<template>
  <v-app>
    <v-content>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field label="Username" prepend-icon="mdi-account-circle"/>
          <v-text-field 
          label="Password" 
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"/>
        </v-card-text>
        <v-divider></v-divider>
        <v-radio-group v-model="row" row>
          <v-radio label="Client" value="radio-1"></v-radio>
          <v-radio label="Fitness Professional" value="radio-2"></v-radio>
          <v-radio label="Admin" value="radio-3"></v-radio>
        </v-radio-group>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data()
  {
    return{
      showPassword:false
    }
  }
}
</script>