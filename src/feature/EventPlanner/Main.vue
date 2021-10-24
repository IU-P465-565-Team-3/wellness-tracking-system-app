<template>
    <v-container>
      <v-row>
        <v-col align-center>
          <v-card>
            <v-app-bar class="primary" dark>
              <v-spacer></v-spacer>
                <h3>Create Event</h3>
              <v-spacer></v-spacer>
            </v-app-bar>
              <v-card width="100%" class="pa-4">
                <v-text-field label="Name" v-model="eventName"></v-text-field>
                <v-datetime-picker
                  label="Start Time"
                  :time-format="'HH:mm:ss'"
                  v-model="startTime">
                    <template v-slot:dateIcon>
                      <v-icon>mdi-calendar</v-icon>
                    </template>
                    <template v-slot:timeIcon>
                      <v-icon>mdi-clock</v-icon>
                    </template>
                </v-datetime-picker>
                <v-datetime-picker
                  label="End Time"
                  :time-format="'HH:mm:ss'"
                  v-model="endTime">
                    <template v-slot:dateIcon>
                      <v-icon>mdi-calendar</v-icon>
                    </template>
                    <template v-slot:timeIcon>
                      <v-icon>mdi-clock</v-icon>
                    </template>
                </v-datetime-picker>
                <v-btn block color="blue--text" @click="addToList" :disabled="!eventName.length">
                  <v-icon>
                      mdi-plus
                  </v-icon>
                  <h3>Add</h3>
                </v-btn>
              </v-card>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-text >
              <span v-if="!events.length" color="gray--text">No events added</span>
              <v-list v-else>
                <v-list-item v-for="event, i in events" :key="i" :label="event">{{ event.name }} <small>&nbsp;({{ new Date(event.start).toLocaleString() }} - {{ new Date(event.end).toLocaleString() }})</small></v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
        <v-sheet height="500">
          <v-calendar
            ref="calendar"
            :type="'week'"
            :events="events"
            :event-overlap-threshold="30"
          ></v-calendar>
        </v-sheet>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-btn color="primary" :disabled="!events.length">
          <h3>Create Plan</h3>
        </v-btn>
      </v-row>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      eventName: '',
      startTime: '',
      endTime: '',
      events: []
    }
  },
  methods: {
    addToList () {
      this.events.push({
        name: this.eventName,
        start: this.startTime,
        end: this.endTime
      })
      this.eventName = ''
    }
  }
}
</script>
