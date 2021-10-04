<template>
  <v-container>
    <div class="dashboard-greeting">
      {{ dynamicGreeting }}
    </div>
    <v-row class="my-2">
      <v-col :sm="12">
      <div>
        Here's your activities for this week
      </div>
        <v-sheet height="500">
          <v-calendar
            ref="calendar"
            :type="type"
            :event-overlap-threshold="30"
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
  </v-container>
</template>
<script>
import moment from 'moment'

export default {
  data () {
    return {
      type: 'week'
    }
  },
  computed: {
    dynamicGreeting () {
      const hour = moment().hour()
      if (hour >= 5 && hour < 12) {
        return 'Good Morning'
      } else if (hour >= 12 && hour < 6) {
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
  }
}
</script>
<style lang="scss">
.dashboard-greeting {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 2em;
}
</style>
