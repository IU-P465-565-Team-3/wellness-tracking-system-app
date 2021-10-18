<template>
    <v-container class="my-5" grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="workout in catalog" :key="workout.name">
                <v-card width="600" height="500" class="text-center ma-2">
                    <v-responsive class="pt-4">
                        <v-img  width="100%" height="300" src= "meditation.jpg" class="text-center"></v-img>
                    </v-responsive>
                    <v-card-text>
                        <div class="subheading" id="test"> <h2>{{ workout.name }}</h2></div>
                        <div class="subheading">{{ workout.discription }}</div>
                        <div class="subheading">{{workout.publisherId}}</div>
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
                                        Workout Details of the {{workout.name}}
                                        <v-spacer></v-spacer>

                                        <v-btn text @click="dialog.value = false" color="red">
                                            close
                                        </v-btn>
                                    </v-toolbar>

                                    <v-responsive class="pt-4">
                                        <v-img  width="100%" height="300" src= "advanced workout.jpg" class="text-center"></v-img>
                                    </v-responsive>

                                    <v-card-text>
                                        <div><h4>Periods: {{today}}</h4></div>
                                        <div><h4>Workout name: {{ workout.name }}</h4></div>
                                        <div><h4>Workout Creator: : {{workout.publisherId}}</h4></div>
                                        <div><h4>Description: {{workout.description}}</h4></div>

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

export default {
  data () {
    return {
      today: new Date().toISOString().substr(5, 5),

      datas: '',

      catalog:
            [
              { workoutId: '0001', typeID: '01', name: 'Beginner Level 1', publisherId: '1027', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et leo molestie, rutrum magna vitae, gravida urna. Nullam eleifend, quam porttitor suscipit dapibus, nibh velit commodo metus, sodales tincidunt mi libero vel eros. Duis nisl ligula, commodo eget lectus et, dapibus dapibus eros. Aenean quis nisi non felis faucibus vulputate. Sed aliquet eu nisi ut rhoncus. Duis porta arcu eu arcu blandit, vel vehicula urna pellentesque. Phasellus non lacus in ante egestas venenatis non sit amet nulla. Suspendisse sit amet placerat lectus, vel lobortis turpis. Vestibulum mollis volutpat lorem, vel efficitur est placerat posuere. Praesent ac faucibus mauris. Etiam lacinia elementum erat non imperdiet. Maecenas eu varius ligula. Sed semper porta odio, sit amet ultrices nulla ullamcorper.' },
              { workoutId: '0002', typeID: '01', name: 'Beginner Level 2', publisherId: '1027', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et leo molestie, rutrum magna vitae, gravida urna. Nullam eleifend, quam porttitor suscipit dapibus, nibh velit commodo metus, sodales tincidunt mi libero vel eros. Duis nisl ligula, commodo eget lectus et, dapibus dapibus eros. Aenean quis nisi non felis faucibus vulputate. Sed aliquet eu nisi ut rhoncus. Duis porta arcu eu arcu blandit, vel vehicula urna pellentesque. Phasellus non lacus in ante egestas venenatis non sit amet nulla. Suspendisse sit amet placerat lectus, vel lobortis turpis. Vestibulum mollis volutpat lorem, vel efficitur est placerat posuere. Praesent ac faucibus mauris. Etiam lacinia elementum erat non imperdiet. Maecenas eu varius ligula. Sed semper porta odio, sit amet ultrices nulla ullamcorper.' },
              { workoutId: '0003', typeID: '01', name: 'Beginner Level 3', publisherId: '1027', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et leo molestie, rutrum magna vitae, gravida urna. Nullam eleifend, quam porttitor suscipit dapibus, nibh velit commodo metus, sodales tincidunt mi libero vel eros. Duis nisl ligula, commodo eget lectus et, dapibus dapibus eros. Aenean quis nisi non felis faucibus vulputate. Sed aliquet eu nisi ut rhoncus. Duis porta arcu eu arcu blandit, vel vehicula urna pellentesque. Phasellus non lacus in ante egestas venenatis non sit amet nulla. Suspendisse sit amet placerat lectus, vel lobortis turpis. Vestibulum mollis volutpat lorem, vel efficitur est placerat posuere. Praesent ac faucibus mauris. Etiam lacinia elementum erat non imperdiet. Maecenas eu varius ligula. Sed semper porta odio, sit amet ultrices nulla ullamcorper.' },
              { workoutId: '0004', typeID: '01', name: 'Adept Level 1', publisherId: '3321', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et leo molestie, rutrum magna vitae, gravida urna. Nullam eleifend, quam porttitor suscipit dapibus, nibh velit commodo metus, sodales tincidunt mi libero vel eros. Duis nisl ligula, commodo eget lectus et, dapibus dapibus eros. Aenean quis nisi non felis faucibus vulputate. Sed aliquet eu nisi ut rhoncus. Duis porta arcu eu arcu blandit, vel vehicula urna pellentesque. Phasellus non lacus in ante egestas venenatis non sit amet nulla. Suspendisse sit amet placerat lectus, vel lobortis turpis. Vestibulum mollis volutpat lorem, vel efficitur est placerat posuere. Praesent ac faucibus mauris. Etiam lacinia elementum erat non imperdiet. Maecenas eu varius ligula. Sed semper porta odio, sit amet ultrices nulla ullamcorper.' },
              { workoutId: '0005', typeID: '01', name: 'Adept Level 2', publisherId: '3321', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et leo molestie, rutrum magna vitae, gravida urna. Nullam eleifend, quam porttitor suscipit dapibus, nibh velit commodo metus, sodales tincidunt mi libero vel eros. Duis nisl ligula, commodo eget lectus et, dapibus dapibus eros. Aenean quis nisi non felis faucibus vulputate. Sed aliquet eu nisi ut rhoncus. Duis porta arcu eu arcu blandit, vel vehicula urna pellentesque. Phasellus non lacus in ante egestas venenatis non sit amet nulla. Suspendisse sit amet placerat lectus, vel lobortis turpis. Vestibulum mollis volutpat lorem, vel efficitur est placerat posuere. Praesent ac faucibus mauris. Etiam lacinia elementum erat non imperdiet. Maecenas eu varius ligula. Sed semper porta odio, sit amet ultrices nulla ullamcorper.' },
              { workoutId: '0006', typeID: '01', name: 'Expert Level 1', publisherId: '4678', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et leo molestie, rutrum magna vitae, gravida urna. Nullam eleifend, quam porttitor suscipit dapibus, nibh velit commodo metus, sodales tincidunt mi libero vel eros. Duis nisl ligula, commodo eget lectus et, dapibus dapibus eros. Aenean quis nisi non felis faucibus vulputate. Sed aliquet eu nisi ut rhoncus. Duis porta arcu eu arcu blandit, vel vehicula urna pellentesque. Phasellus non lacus in ante egestas venenatis non sit amet nulla. Suspendisse sit amet placerat lectus, vel lobortis turpis. Vestibulum mollis volutpat lorem, vel efficitur est placerat posuere. Praesent ac faucibus mauris. Etiam lacinia elementum erat non imperdiet. Maecenas eu varius ligula. Sed semper porta odio, sit amet ultrices nulla ullamcorper.' },
              { workoutId: '0007', typeID: '01', name: 'Expert Level 1', publisherId: '4678', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et leo molestie, rutrum magna vitae, gravida urna. Nullam eleifend, quam porttitor suscipit dapibus, nibh velit commodo metus, sodales tincidunt mi libero vel eros. Duis nisl ligula, commodo eget lectus et, dapibus dapibus eros. Aenean quis nisi non felis faucibus vulputate. Sed aliquet eu nisi ut rhoncus. Duis porta arcu eu arcu blandit, vel vehicula urna pellentesque. Phasellus non lacus in ante egestas venenatis non sit amet nulla. Suspendisse sit amet placerat lectus, vel lobortis turpis. Vestibulum mollis volutpat lorem, vel efficitur est placerat posuere. Praesent ac faucibus mauris. Etiam lacinia elementum erat non imperdiet. Maecenas eu varius ligula. Sed semper porta odio, sit amet ultrices nulla ullamcorper.' }
            ]
    }
  }
}

</script>
