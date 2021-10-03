<template>
    <v-container>
        <v-row>
            <v-col align-center>
                <v-card>
                    <v-app-bar class="primary" dark>
                        <v-spacer></v-spacer>
                            <h3>Add New Task</h3>
                        <v-spacer></v-spacer>
                    </v-app-bar>

                    <v-card width="100%" class="pa-4">
                        <v-text-field label="Name" v-model="taskName"></v-text-field>
                        <v-autocomplete label="Sets" :items="numbers"></v-autocomplete>
                        <v-autocomplete label="Reps" :items="numbers"></v-autocomplete>
                        <v-text-field label="how many sets"></v-text-field>

                        <v-btn block color="blue--text" @click="addToList" :disabled="!taskName.length">
                            <v-icon large>
                                mdi-plus
                            </v-icon>
                            <h3>Add</h3>
                        </v-btn>
                    </v-card>
                </v-card>
            </v-col>

            <v-col>
                <v-card>
                    <v-app-bar class="grey lighten-2" center height="70px">
                        <v-spacer></v-spacer>
                            <h3 class="green--text">Current Workout list</h3>
                        <v-spacer></v-spacer>

                    </v-app-bar>
                    <v-card-text >
                        <span v-if="!taskList.length" color="gray--text">Add a task to get started</span>
                        <v-checkbox v-for="task in taskList" :key="task" :label="task"></v-checkbox>
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <v-date-picker full-width color="info"></v-date-picker>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>

export default
({
  data: () => ({
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    taskName: '',
    taskList: []
  }),
  methods: {
    addToList () {
      this.taskList.push(this.taskName)
      this.taskName = ''
    }
  }
})
</script>
