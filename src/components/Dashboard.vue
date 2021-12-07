<template>
  <v-container>
    <div class="dashboard-greeting">
      {{ dynamicGreeting }}, {{ user.firstName }}
    </div>
    <v-row class="my-2" v-if="isClient">
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
      <v-col v-if="tagListings1.length" cols="12">
        <h3>Recommendations for "{{ recommendationTag1.name }}"</h3>
        <v-slide-group>
          <listing-card :listing="listing" :small="true" v-for="listing, i in tagListings1" :key="i"></listing-card>
        </v-slide-group>
      </v-col>
      <v-col v-if="tagListings2.length" cols="12">
        <h3>Recommendations for "{{ recommendationTag2.name }}"</h3>
        <v-slide-group>
          <listing-card :listing="listing" :small="true" v-for="listing, i in tagListings2" :key="i"></listing-card>
        </v-slide-group>
      </v-col>
      <v-col v-if="tagListings3.length" cols="12">
        <h3>Recommendations for "{{ recommendationTag3.name }}"</h3>
        <v-slide-group>
          <listing-card :listing="listing" :small="true" v-for="listing, i in tagListings3" :key="i"></listing-card>
        </v-slide-group>
      </v-col>
      <v-col v-if="demographicRecommendations.length" cols="12">
        <h3>Popular among similar users</h3>
        <v-slide-group>
          <listing-card :listing="listing" :small="true" v-for="listing, i in demographicRecommendations" :key="i"></listing-card>
        </v-slide-group>
      </v-col>
      <v-col v-if="subscriptionRecommendations.length" cols="12">
        <h3>Recommended from your subscriptions</h3>
        <v-slide-group>
          <listing-card :listing="listing" :small="true" v-for="listing, i in subscriptionRecommendations" :key="i"></listing-card>
        </v-slide-group>
      </v-col>
    </v-row>
    <v-row class="ma-2" v-else>
      Metrics are currently unavailable for your role.
    </v-row>
  </v-container>
</template>
<script>
import moment from 'moment'
import { getEnrollments } from '../api/plans'
import { mapGetters } from 'vuex'
import { getRecommendationsByDemographic, getRecommendationsByTagId, getSubscriptionRecommendations } from '../api/recommendations'
import ListingCard from './ListingCard.vue'

export default {
  components: { ListingCard },
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
      events: [],
      recommendationTag1: null,
      recommendationTag2: null,
      recommendationTag3: null,
      tagListings1: [],
      tagListings2: [],
      tagListings3: [],
      demographicRecommendations: [],
      subscriptionRecommendations: []
    }
  },
  computed: {
    ...mapGetters(['user', 'isClient']),
    dynamicGreeting () {
      const hour = moment().hour()
      if (hour >= 5 && hour < 12) {
        return 'Good Morning'
      } else if (hour >= 12 && hour < 18) {
        return 'Good Afternoon'
      } else {
        return 'Good Evening'
      }
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
    const tagMap = new Map()

    for (const sub of enrollments) {
      const subColor = this.colors.pop()
      const startDate = moment(sub.startDate).valueOf()
      const mappedEvents = sub.listing.events.map(e => ({
        name: e.name,
        description: e.description,
        start: startDate + e.startTime,
        end: startDate + e.endTime,
        color: subColor,
        timed: true
      }))
      this.events.push(...mappedEvents)

      sub.listing.tags.forEach(tag => {
        tagMap.set(tag.id, tag)
      })
    }

    const [tagId1, tagId2, tagId3] = Array.from(tagMap.keys()).sort(() => Math.random() - Math.random())
      .slice(0, 3)
    this.recommendationTag1 = tagMap.get(tagId1)
    this.recommendationTag2 = tagMap.get(tagId2)
    this.recommendationTag3 = tagMap.get(tagId3)
    console.log(tagId1, tagId2, tagMap)

    const tagListingCollection = [this.tagListings1, this.tagListings2, this.tagListings3];
    [this.recommendationTag1, this.recommendationTag2, this.recommendationTag3].forEach(async (tag, index) => {
      if (tag) {
        const tagListings = (await getRecommendationsByTagId(tag.id)).data
        tagListingCollection[index].splice(0, tagListingCollection.length, ...tagListings)
      }
    })

    const demoListings = (await getRecommendationsByDemographic()).data
    this.demographicRecommendations.splice(0, this.demographicRecommendations.length, ...demoListings)

    const subListings = (await getSubscriptionRecommendations()).data
    this.subscriptionRecommendations.splice(0, this.subscriptionRecommendations.length, ...subListings)
  }
}
</script>
<style lang="scss">
.dashboard-greeting {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 2em;
}
</style>
