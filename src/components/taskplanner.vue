<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-app-bar width="100%">
                        <v-spacer></v-spacer>
                        <v-appbar-title>
                             <h1>Task Planner Page</h1>
                        </v-appbar-title>
                        <v-spacer></v-spacer>
                    </v-app-bar>
                </v-card>
            </v-col> 
        </v-row>


        <v-row>
            
            <v-col align="center">
                <v-card height="100%">
                    <v-app-bar class="blue">
                        
                        <v-spacer></v-spacer>
                        <v-appbar-title>
                            <h3>ADD NEW TASK</h3>
                        </v-appbar-title>
                        <v-spacer></v-spacer>
                    </v-app-bar>

                    <v-card width="100%">
                        <v-text-field label="Name"></v-text-field>
                        <v-autocomplete label="Sets" :items="numbers"></v-autocomplete>
                        <v-autocomplete label="Reps" :items="numbers"></v-autocomplete>
                        <v-text-field label="how many sets"></v-text-field>


                        <v-btn color="blue--text" width="100%">
                            <v-icon large>
                                mdi-plus
                            </v-icon>
                            <h3>ADD</h3>
                        </v-btn>
                    </v-card>
                </v-card>
            </v-col>


            

            <v-col>
                <v-card height="380px">
                    <v-app-bar class="grey lighten-2" center height="70px">
                        <v-spacer></v-spacer>
                        <v-appbar-title class="green--text">
                            <h3>Current Workout list</h3> 
                        </v-appbar-title>

                        <v-spacer></v-spacer>
                    
                    </v-app-bar>

                    <v-card-text>
                        <v-checkbox label="test task 1"></v-checkbox>
                    </v-card-text>

                    <v-card-text>
                        <v-checkbox label="test task 2"></v-checkbox>
                    </v-card-text>

                    <v-card-text>
                        <v-checkbox label="test task 3"></v-checkbox>
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <v-date-picker v-model="picker" full-width color="red"></v-date-picker>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>



<script>

export default
({
    data:() => ({
        numbers:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    })
})
</script>
