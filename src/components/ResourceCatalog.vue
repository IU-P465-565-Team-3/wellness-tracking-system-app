<template>
    <v-container class="my-5" grid-list-lg>
        <v-layout justify-center row wrap>
            <v-flex xs12 sm6 md6 lg4 xl3 v-for="listing in listings" :key="listing.id">
                <v-card height="450" class="text-center ma-2">
                    <v-responsive class="pt-4">
                      <v-img width="100%" height="300" :src="listing.imageUrl" class="text-center"></v-img>
                    </v-responsive>
                    <v-card-text>
                        <div class="subheading"> <h2>{{ listing.name }}</h2></div>
                        <div class="subheading">{{ listing.description }}</div>
                    </v-card-text>
                    <v-card-actions>
                      <v-layout justify-center>
                        <v-btn color="primary" @click="viewListing(listing)">
                            Details
                        </v-btn>
                      </v-layout>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog transition="dialog-top-transition" max-width="800" v-model="dialogOpen">
            <template v-slot:default>
                <v-card>
                  <v-card-title>
                    <v-toolbar color="primary" dark>
                        {{ selectedListing.name }}
                        <v-spacer></v-spacer>
                        <v-btn text @click="closeDialog">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                  </v-card-title>
                  <v-card-text>
                      <div>Published by {{ selectedListing.user.firstName }} {{ selectedListing.user.lastName }} ({{ selectedListing.user.username }})</div>
                      <v-menu
                        ref="startDateMenu"
                        v-model="startDateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="startDate"
                            label="Plan Start Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="startDate"
                          @input="startDateMenu = false"
                        >
                        </v-date-picker>
                      </v-menu>
                      <v-sheet height="500">
                        <v-calendar
                          ref="calendar"
                          :type="type"
                          :events="events"
                          :event-overlap-mode="mode"
                          :event-overlap-threshold="5"
                          :interval-height="30"
                        ></v-calendar>
                      </v-sheet>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn class="primary--text" @click="enroll">
                        <v-icon>mdi-plus</v-icon>
                        <h3>Enroll</h3>
                      </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-container>
</template>

<script>
import { enrollToPlan, getPlan } from '../api/plans.js'
import moment from 'moment'

import api from '../api/resourceCatalog.js'

export default {

  data () {
    return {
      listings: [],
      dialogOpen: false,
      mode: 'stack',
      type: 'week',
      offsetEvents: [],
      events: [],
      startDateMenu: false,
      startDate: moment().format('YYYY-MM-DD'),
      selectedListing: null
    }
  },
  methods: {
    updateEvents () {
      const planStartTime = moment(this.startDate).valueOf()
      this.events.splice(0, this.events.length, ...this.offsetEvents.map(e => {
        const newEvent = {}
        Object.assign(newEvent, {
          ...e,
          start: planStartTime + e.start,
          end: planStartTime + e.end
        })
        return newEvent
      }))
    },
    async viewListing (listing) {
      const plan = (await getPlan(listing.id)).data
      this.selectedListing = plan
      this.dialogOpen = true
      this.offsetEvents.splice(0, this.offsetEvents.length, ...plan.events.map(e => ({
        name: e.name,
        description: e.description,
        start: e.startTime,
        end: e.endTime,
        timed: true
      })))
      this.updateEvents()
    },
    async enroll () {
      await enrollToPlan(this.selectedListing.id, {
        startDate: this.startDate
      })
      this.dialogOpen = false
    },
    closeDialog () {
      this.events.splice(0, this.events.length)
      this.dialogOpen = false
      this.startDate = moment().format('YYYY-MM-DD')
      this.selectedListing = null
    }
  },
  mounted () {
    api.getResource()
      .then(response => {
        const listings = response.data
        this.listings.splice(0, listings.length, ...listings)
      })
      .catch(error => {
        console.log('There was an error: ' + error.response)
      })
  },
  watch: {
    startDate () {
      this.updateEvents()
    }
  }
}

</script>
