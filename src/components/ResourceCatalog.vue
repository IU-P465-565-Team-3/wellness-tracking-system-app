<template>
    <v-container class="my-5" grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="plans in resourse" :key="plans.id">
                <v-card width="600" height="500" class="text-center ma-2">
                    <v-responsive class="pt-4">
                        <v-img  width="100%" height="300" src= "plans.imageUrl" class="text-center"></v-img>
                    </v-responsive>
                    <v-card-text>
                        <div class="subheading" id="test"> <h2>{{ plans.type.name}}</h2></div>
                        <div class="subheading">{{ plans.description }}</div>
                        <div class="subheading">{{plans.id}}</div>
                    </v-card-text>

                    <v-row>
                    <v-col class="mx-2">
                        <v-btn color="blue lighten-2">
                            <v-icon>mdi-plus</v-icon>
                            <h3>Enroll</h3>
                        </v-btn>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-col>
                        <v-dialog transition="dialog-top-transition" max-width="600">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="blue lighten-2" v-bind="attrs" v-on="on" @click="detail">
                                    Details
                                </v-btn>
                            </template>

                            <template v-slot:default="dialog">
                                <v-card>
                                    <v-toolbar color="blue lighten-1">
                                        plans Details of the {{plans.type.name}}
                                        <v-spacer></v-spacer>

                                        <v-btn text @click="dialog.value = false" color="red">
                                            close
                                        </v-btn>
                                    </v-toolbar>

                                    <v-responsive class="pt-4">
                                        <v-img  width="100%" height="300" src= "plans.imageUrl" class="text-center"></v-img>
                                    </v-responsive>

                                    <v-card-text>
                                        <div><h4>Periods: 1 week from {{today}}</h4></div>
                                        <div><h4>Workout name: {{ plans.type.name }}</h4></div>
                                        <div><h4>Workout Creator: {{plans.user.username}}</h4></div>
                                        <div><h4>Description: {{plans.description}}</h4></div>

                                    </v-card-text>

                                    <v-divider inset></v-divider>

                                    <v-card-actions class="justify-center">
                                        <v-btn>
                                            <v-icon>mdi-plus</v-icon>
                                            <h3>Enroll</h3>
                                        </v-btn>

                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-col>
                    </v-row>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import resourseApi from '../api/resourceCatalog.js'

export default {

  data () {
    return {
      today: new Date().toISOString().substr(5, 5),
      resourse: []
    }
  },

  created () {
    resourseApi.getResource()
      .then(response => {
        this.resourse = response.data
        console.log(this.resourse)
      })
      .catch(error => {
        console.log('There was an error: ' + error.response)
      })
  }
}

</script>
