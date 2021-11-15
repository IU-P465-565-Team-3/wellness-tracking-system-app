<template>
  <v-container>
      <template>
        <div id="talkjs-container" style="width: 90%; margin: 30px; height: 500px">
          <i>Loading chat...</i>
        </div>
      </template>
  </v-container>
</template>

<script>
import Talk from 'talkjs'

export default {
  name: 'Inbox',
  mounted: function () {
    Talk.ready.then(function () {
      var me = new Talk.User({
        id: 'ejhon@email.com',
        name: 'Emily',
        email: 'ejhon@email.com',
        welcomeMessage: 'Hello, this is the test user1',
        role: 'User'
      })

      const Session = new Talk.Session({
        appId: 't1IBjkBR',
        me: me
      })
      var other = new Talk.User({
        id: 'dmuradil@email.com',
        name: 'Dilzat',
        email: 'dmuradil@email.com',
        role: 'Professional'
      })

      var conversation = Session.getOrCreateConversation(
        Talk.oneOnOneId(me, other)
      )

      conversation.setParticipant(me)
      conversation.setParticipant(other)

      var inbox = Session.createInbox({ selected: conversation })
      inbox.mount(document.getElementById('talkjs-container'))
    })
  }
}
</script>
