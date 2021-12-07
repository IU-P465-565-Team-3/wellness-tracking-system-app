<template>
  <v-container>
      <v-row>
          <v-col cols="6">
              <v-card height="400" width="500">
                  <div class="text-center">
                      Profile
                  </div>
                  <div class="text-center">
                      name: {{user.firstName}} {{user.lastName}}
                      <v-divider></v-divider>
                      email: {{user.username}}
                      <v-divider></v-divider>
                      id: {{user.id}}
                      <v-divider></v-divider>
                      Account Type: {{user.role}}
                      <v-divider></v-divider>
                  </div>
              </v-card>
          </v-col>
          <v-col cols="6">
              <v-card>
                <div class="text-center">
                      All Professionals
                </div>
                <v-card-title>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Professionals by last name" single-line hide-details>
                  </v-text-field>
                </v-card-title>
                <v-data-table :headers="headersForAll" :items="professionals" :search="search">
                  <template v-slot:[`item.subscribe`]="{ item }">
                    <v-btn>
                      <v-icon small class="mr-2" @click="subProfessional(item)">
                      Subscribe
                    </v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
              <v-card v-if="this.user.role === 'CLIENT'">
                <div class="text-center">
                      My Subscribed Professionals
                </div>
                <v-card-title>
                </v-card-title>
                <v-data-table :headers="headersForMuSub" :items="subbedPros">
                </v-data-table>
              </v-card>
              <v-card v-if="this.user.role === 'PROFESSIONAL'">
                <div class="text-center">
                      My Subscribed User
                </div>
                <v-card-title>
                </v-card-title>
                <v-data-table :headers="headersForMuSub" :items="subbedUsers">
                </v-data-table>
              </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../api/professionals.js'
export default {
  computed: {
    ...mapGetters(['user'])
  },
  data () {
    return {
      search: '',
      headersForAll: [
        {
          text: 'First Name',
          align: 'start',
          filterable: false,
          value: 'firstName'
        },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Subscribe', value: 'subscribe', sortable: 'false' }
      ],
      headersForMuSub: [
        {
          text: 'First Name',
          align: 'start',
          filterable: false,
          value: 'firstName'
        },
        { text: 'Last Name', value: 'lastName' }
      ],
      professionals: [],
      subbedPros: [],
      subUserCount: '',
      subbedUsers: []
    }
  },
  mounted () {
    // Get all Professionals in the database
    api.getProfessionals()
      .then(response => {
        const professionals = response.data
        this.professionals.splice(0, professionals.length, ...professionals)
      })
    // Get listed of professionals subscribed by current user (this.user.id == currentUser's id)
    api.getsubbedPros()
      .then(response => {
        const subbedPros = response.data
        this.subbedPros.splice(0, this.subbedPros.length, ...subbedPros)
      })

    api.getSubbedUsers(this.user.id)
      .then(response => {
        const subbedUsers = response.data
        this.subbedUsers.splice(0, this.subbedUsers.length, ...subbedUsers)
      })

    api.getSubUserCount(this.user.id)
      .then(response => {
        const subUserCount = response.data
        console.log(subUserCount)
      })
  },
  methods: {
    // Make a post request to add the professional's id to the list of currentUser subscribed list)
    subProfessional (item) {
      api.addProfessionals(item.id)
      window.location.reload()
    }
  }
}
</script>
