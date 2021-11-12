<template>
  <v-container>
    <div class="dashboard-greeting">
      {{ dynamicGreeting }}, {{ user.firstName }}
    </div>
    <v-row class="my-2" v-if="!isProfessional">
      <v-col :sm="12">
      <div>
        Here's your activities for this week
      </div>
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
      </v-col>
      <v-col :sm="6">
        <div>
          Steps taken
        </div>
        <v-sheet color="success">
          <v-sparkline
            :value="steps"
            color="rgba(255, 255, 255, .7)"
            fill
            :height="100"
            :padding="16"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">
              {{ timeline[item.index] }}
            </template>
          </v-sparkline>
        </v-sheet>
      </v-col>
      <v-col :sm="6">
        <div>
          Estd. calories burned
        </div>
        <v-sheet color="warning">
          <v-sparkline
            :value="calories"
            color="rgba(255, 255, 255, .7)"
            fill
            :height="100"
            :padding="16"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">
              {{ timeline[item.index] }}
            </template>
          </v-sparkline>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row class="ma-2">
      Metrics for this role are currently unavailable.
    </v-row>
  </v-container>
</template>
<script>
import moment from 'moment'
import { getEnrollments } from '../api/plans'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      type: 'week',
      mode: 'stack',
      colors: [
        '#6a3d9a',
        '#ff7f00',
        '#e31a1c',
        '#33a02c',
        'primary'
      ],
      events: []
    }
  },
  computed: {
    ...mapGetters(['user', 'isProfessional']),
    dynamicGreeting () {
      const hour = moment().hour()
      if (hour >= 5 && hour < 12) {
        return 'Good Morning'
      } else if (hour >= 12 && hour < 18) {
        return 'Good Afternoon'
      } else {
        return 'Good Evening'
      }
    },
    timeline () {
      return Array(7).fill()
        .map((_, i) => moment().subtract(7 - i, 'days').format('M/DD'))
    },
    steps () {
      return Array(7).fill()
        .map((_, i) => this.rng(1500, 6000))
    },
    calories () {
      return this.steps.map(step => Math.round((step / 1000) * 35) + this.rng(200, 500))
    }
  },
  methods: {
    rng (min, max) {
      return Math.round(Math.random() * (max - min) + min)
    }
  },
  async mounted () {
    this.events.splice(0, this.events.length)
    const enrollments = (await getEnrollments()).data
    for (const sub of enrollments) {
      const subColor = this.colors.pop()
      const startDate = new Date(sub.startDate).getTime()
      const mappedEvents = sub.plan.events.map(e => ({
        name: e.name,
        description: e.description,
        start: startDate + e.startTime,
        end: startDate + e.endTime,
        color: subColor,
        timed: true
      }))
      this.events.push(...mappedEvents)
    }
  }
}
</script>
<style lang="scss">
.dashboard-greeting {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 2em;
}
</style>
