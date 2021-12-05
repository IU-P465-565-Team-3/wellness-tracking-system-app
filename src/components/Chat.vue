<template>
  <v-container>
    <v-row>
      <v-col cols="6" style="width: 90%; margin: 30px 0px; height: 500px" v-if="this.user.role === 'CLIENT'">
              <v-card>
                <div class="text-center">
                    Professionals
                </div>
                <v-card-title>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Professionals" single-line hide-details>
                  </v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="professionals" :search="search">
                  <template v-slot:[`item.chat`]="{ item }">
                    <v-btn>
                      <v-icon small class="mr-2" @click="updateReceiver(item)">
                      chat
                    </v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card>
          </v-col>
      <v-col cols="6">
        <template>
        <div id="talkjs-container" style="width: 90%; margin: 30px; height: 500px">
          <i>loading chat</i>
        </div>
      </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Talk from 'talkjs'
import { mapGetters } from 'vuex'
import api from '../api/professionals.js'

export default {
  name: 'Inbox',
  data: () => ({
    search: '',
    headers: [
      {
        text: 'First Name',
        align: 'start',
        filterable: false,
        value: 'firstName'
      },
      { text: 'Last Name', value: 'lastName' },
      { text: 'Chat', value: 'chat', sortable: 'false' }
    ],
    professionals: [],
    otherId: 'kyamada@email.com',
    otherFirstName: 'Kai',
    otherEmail: 'kyamada@email.com',
    otherRole: 'PROFESSIONAL'
  }),
  computed: {
    ...mapGetters(['user'])
  },
  mounted () {
    var userFirstName = this.user.firstName
    var userId = this.user.username
    var userEmail = this.user.username
    var userRole = this.user.role
    var receiverFirstName = this.otherFirstName
    var recieverId = this.otherId
    var recieverEmail = this.otherEmail
    var recieverRole = this.otherRole
    api.getProfessionals()
      .then(response => {
        const professionals = response.data
        this.professionals.splice(0, professionals.length, ...professionals)
      })
      .catch(error => {
        console.log('There was an error: ' + error.response)
      })
    Talk.ready.then(function () {
      var me = new Talk.User({
        id: userId,
        name: userFirstName,
        email: userEmail,
        welcomeMessage: 'welcome to my chat.',
        role: userRole
      })

      const Session = new Talk.Session({
        appId: 't1IBjkBR',
        me: me
      })
      var other = new Talk.User({
        id: recieverId,
        name: receiverFirstName,
        email: recieverEmail,
        welcomeMessage: 'Hello, How can I help you?',
        role: recieverRole
      })

      var conversation = Session.getOrCreateConversation(Talk.oneOnOneId(me, other))

      conversation.setParticipant(me)
      conversation.setParticipant(other)

      var inbox = Session.createInbox({ selected: conversation })
      inbox.mount(document.getElementById('talkjs-container'))
    })
  },
  methods: {
    updateReceiver (item) {
      this.pro = item
      this.otherId = item.username
      this.otherFirstName = item.firstName
      this.otherEmail = item.username
      this.otherRole = item.role
      console.log(this.otherFirstName)

      var userFirstName = this.user.firstName
      var userId = this.user.username
      var userEmail = this.user.username
      var userRole = this.user.role
      Talk.ready.then(function () {
        var me = new Talk.User({
          id: userId,
          name: userFirstName,
          email: userEmail,
          welcomeMessage: 'welcome to my chat.',
          role: userRole
        })

        const Session = new Talk.Session({
          appId: 't1IBjkBR',
          me: me
        })
        var other = new Talk.User({
          id: item.username,
          name: item.firstName,
          email: item.username,
          welcomeMessage: 'Hello, How can I help you?',
          role: item.role
        })

        var conversation = Session.getOrCreateConversation(Talk.oneOnOneId(me, other))

        conversation.setParticipant(me)
        conversation.setParticipant(other)

        var inbox = Session.createInbox({ selected: conversation })
        inbox.mount(document.getElementById('talkjs-container'))
      })
    }
  }
}
</script>
