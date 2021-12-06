<template>
  <v-container>
      <v-row>
          <v-col cols="5">
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
                      Counts: {{subCount}}
                  </div>
              </v-card>
          </v-col>
          <v-col cols="7">
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
        <v-col cols="5">
              <v-card>
                <div class="text-center">
                      My Subscribed Professionals
                </div>
                <v-card-title>
                </v-card-title>
                <v-data-table :headers="headersForMuSub" :items="subbedPros">
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
      proid: '',
      subCount: ''
    }
  },
  mounted () {
    api.getProfessionals()
      .then(response => {
        const professionals = response.data
        this.professionals.splice(0, professionals.length, ...professionals)
      })
    api.getsubbedPros()
      .then(response => {
        const subbedPros = response.data
        this.subbedPros.splice(0, this.professionals.length, ...subbedPros)
      })
    api.getSubcount(this.user.id)
      .then(response => {
        this.subCount = response.data
      })
  },
  methods: {
    subProfessional (item) {
      this.proid = item.id
      console.log(this.proid)
      api.addProfessionals(this.proid)
    }
  }
}
</script>
