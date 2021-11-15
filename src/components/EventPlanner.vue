<template>
    <v-container>
      <v-row>
        <v-col align-center>
          <v-card>
            <v-app-bar class="primary" dark v-if="isClient">
              <v-spacer></v-spacer>
                <h3>Create Plan</h3>
              <v-spacer></v-spacer>
            </v-app-bar>
            <v-app-bar class="grey darken-2" dark v-if="isProfessional">
              <v-spacer></v-spacer>
                <h3>Add Events</h3>
              <v-spacer></v-spacer>
            </v-app-bar>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field label="Name" v-model="eventName"></v-text-field>
                    <v-textarea v-model="eventDescription" no-resize :rows="1" persistent-hint>
                      <template v-slot:label>
                        <div>
                          Description <small>(optional)</small>
                        </div>
                      </template>
                    </v-textarea>
                  </v-col>
                  <v-col>
                    <v-datetime-picker
                      label="Start Time"
                      :time-format="'HH:mm'"
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
                      :time-format="'HH:mm'"
                      v-model="endTime">
                        <template v-slot:dateIcon>
                          <v-icon>mdi-calendar</v-icon>
                        </template>
                        <template v-slot:timeIcon>
                          <v-icon>mdi-clock</v-icon>
                        </template>
                    </v-datetime-picker>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-layout justify-center>
                  <v-btn color="primary--text" @click="addToList" :disabled="!eventName.length">
                    <v-icon>
                        mdi-plus
                    </v-icon>
                    <h3>Add</h3>
                  </v-btn>
                </v-layout>
              </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
        <v-sheet height="500">
          <v-calendar
            ref="calendar"
            :type="type"
            :events="events"
            :event-overlap-mode="mode"
            :event-overlap-threshold="5"
            :interval-height="30"
            @click:event="showEvent"
          ></v-calendar>
          <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              color="primary"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer />
              <v-btn
                text
                @click="selectedOpen = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span class="gray--text" v-if="!selectedEvent.description">No description</span>
              <span v-html="selectedEvent.description"></span>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text color="gray" @click="deleteEvent">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        </v-sheet>
        </v-col>
      </v-row>
      <v-row class="justify-center pb-5">
        <v-btn color="primary" :disabled="!events.length" @click="createPlan">
          <h3>Create Plan</h3>
        </v-btn>
      </v-row>
    </v-container>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { createAndEnrollToPlan, createListing } from '../api/plans'
import { ListingType } from '../enums'

export default {
  data () {
    return {
      eventName: '',
      eventDescription: '',
      startTime: '',
      endTime: '',
      type: 'week',
      mode: 'stack',
      events: [],
      selectedEvent: {},
      selectedOpen: null,
      selectedElement: null
    }
  },
  props: {
    name: {
      type: String,
      default: moment().unix().toString()
    },
    description: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    imageAnnotation: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'isClient',
      'isProfessional'
    ])
  },
  methods: {
    addToList () {
      this.events.push({
        name: this.eventName,
        description: this.eventDescription,
        start: moment(this.startTime).valueOf(),
        end: moment(this.endTime).valueOf(),
        timed: true
      })
      this.eventName = ''
      this.eventDescription = ''
    },
    async createPlan () {
      const startDate = moment(moment().format('YYYY-MM-DD')).valueOf()
      const listing = {
        name: this.name,
        description: this.description,
        imageUrl: this.imageUrl,
        imageAnnotation: this.imageAnnotation,
        type: ListingType.FitnessPlan,
        events: this.events.map(e => ({
          name: e.name,
          description: e.description,
          startTime: e.start - startDate,
          endTime: e.end - startDate
        }))
      }

      if (this.isClient) {
        await createAndEnrollToPlan({
          plan: listing,
          startDate
        })
      } else if (this.isProfessional) {
        await createListing(listing)
      }
      this.$router.push({ name: 'Dashboard' })
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => { requestAnimationFrame(() => { this.selectedOpen = true }) })
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => { requestAnimationFrame(() => { open() }) })
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    deleteEvent () {
      const index = this.events.findIndex(e => e === this.selectedEvent)
      if (index !== -1) {
        this.selectedOpen = false
        this.selectedElement = null
        this.selectedEvent = {}
        this.events.splice(index, 1)
      }
    }
  }
}
</script>
