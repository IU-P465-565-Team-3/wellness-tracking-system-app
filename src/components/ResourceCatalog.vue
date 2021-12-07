<template>
  <v-container class="my-5" grid-list-lg>
    <v-row>
      <v-col cols="3">
      </v-col>
      <v-col cols="9">
        <v-text-field label="Search"
        v-model="searchText"
        outlined
        append-icon="mdi-magnify"
        @input="fetchListings"
        clearable
        :loading="isFetchingListings"
        @click:append="fetchListings">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-row class="py-3"><h3>Filters</h3></v-row>
        <v-row style="max-width: 400px">
          <v-text-field label="Publisher"
            v-model="searchPublisher"
            aria-autocomplete="publisher"
            prepend-icon="mdi-account-search"
            outlined
            @input="fetchListings"
            clearable
            :loading="isFetchingListings">
          </v-text-field>
        </v-row>
        <v-row style="max-width: 400px">
          <v-autocomplete
            label="Tags"
            v-model="searchTags"
            prepend-icon="mdi-tag-multiple"
            multiple
            chips
            clearable
            deletable-chips
            :items="tagsCollection"
            auto-select-first
            @input="fetchListings"
          ></v-autocomplete>
        </v-row>
      </v-col>
      <v-col cols="9">
      <v-layout justify-center row wrap v-if="listings.length">
        <v-flex xs12 sm6 md6 lg4 xl3 v-for="listing in listings" :key="listing.id">
          <v-card height="450" class="text-center ma-2">
              <v-responsive class="pt-4">
                <v-img width="100%" height="280" :src="listing.imageUrl" class="text-center"></v-img>
              </v-responsive>
              <v-card-text>
                <div class="line-clamp--one"> <h2>{{ listing.name }}</h2></div>
                <div class="line-clamp--one">{{ listing.description }}</div>
                <v-rating
                v-if="listing.averageRating"
                length="5"
                :value="listing.averageRating"
                small
                dense
                readonly
                half-increments
              ></v-rating>
              <div v-else>
                <small>No rating yet</small>
              </div>
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
      <v-layout pa-2 v-else justify-center text-center>
        No listings found.
      </v-layout>
    </v-col>
  </v-row>
  <v-dialog transition="dialog-top-transition" max-width="900" v-model="dialogOpen">
      <template v-slot:default>
        <v-card class="pa-2">
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
            <div v-if="isClient && enrollmentText">{{ enrollmentText }}</div>
            <v-row v-if="selectedListing.type === ListingType.FitnessPlan">
              <v-col>
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
              </v-col>
            </v-row>
            <multimedia-post v-else-if="selectedListing.type === ListingType.MultimediaPost"
              :name="selectedListing.name"
              :description="selectedListing.description"
              :imageUrl="selectedListing.imageUrl"
              :imageAnnotation="selectedListing.imageAnnotation"
              :content="selectedListing.content">
            </multimedia-post>
            <v-row>
              <v-layout column pa-2>
                <h2>
                  Reviews
                </h2>
                <v-flex pa-3 class="primary--text" v-if="isReviewsLoading">
                  <v-progress-circular indeterminate></v-progress-circular>
                </v-flex>
                <v-flex py-2 v-if="!isReviewsLoading && !selectedListing.userReview && !selectedListing.reviews.length">No reviews yet.</v-flex>
                <v-flex py-2 v-else-if="!isReviewsLoading && selectedListing.userReview">
                  <div class="font-weight-bold">Your review</div>
                  <div class="px-2">{{ new Date(selectedListing.userReview.createdDate).toLocaleString() }}</div>
                  <v-rating
                    class="px-2"
                    :length="5"
                    :value="selectedListing.userReview.rating"
                    small
                    dense
                    readonly
                    half-increments
                  ></v-rating>
                  <blockquote class="blockquote pt-0 px-2">
                    {{ selectedListing.userReview.text }}
                  </blockquote>
                </v-flex>
                <template v-if="showAddReview">
                  <v-flex v-if="selectedListing.type === ListingType.FitnessPlan">
                    You have enrolled to this plan. Would you like to write a review?
                  </v-flex>
                  <v-flex v-else-if="selectedListing.type === ListingType.MultimediaPost">
                    How would you rate this content?
                  </v-flex>
                </template>
                <v-flex
                  v-if="!isReviewsLoading && showAddReview">
                  <v-rating
                    class="pa-1"
                    hover
                    :length="5"
                    v-model="newReview.rating"
                    dense
                  ></v-rating>
                  <v-textarea v-model="newReview.text" :rows="3" outlined counter="1500"></v-textarea>
                  <v-btn class="primary"
                  @click="submitReview"
                  :disabled="!(newReview.rating && newReview.text)">Submit Review</v-btn>
                </v-flex>
                <v-flex v-if="!isReviewsLoading && selectedListing.userReview && selectedListing.reviews.length">
                  <span class="font-weight-bold">Reviews from other users</span>
                </v-flex>
                <v-flex py-2 v-for="review in selectedListing.reviews" :key="review.id">
                  <div class="px-2">{{ review.user.firstName }} {{ review.user.lastName }}</div>
                  <div class="px-2">{{ new Date(review.createdDate).toLocaleString() }}</div>
                  <v-rating
                    class="px-2"
                    :length="5"
                    :value="review.rating"
                    small
                    dense
                    readonly
                    half-increments
                  ></v-rating>
                  <blockquote class="blockquote pt-0 px-2">
                    {{ review.text }}
                  </blockquote>
                </v-flex>
              </v-layout>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-center" v-if="selectedListing.type === ListingType.FitnessPlan">
            <v-btn class="primary--text" @click="enroll" v-if="isClient">
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
import { enrollToPlan, getListingById, getReviews, getSelfReview, getEnrollmentCount, addReview, getTags } from '../api/plans.js'
import moment from 'moment'
import MultimediaPost from './MultimediaPost'
import { getListings } from '../api/resourceCatalog.js'
import { mapGetters } from 'vuex'
import { ListingType } from '../enums/index.js'
import debounce from 'lodash.debounce'

export default {
  data () {
    return {
      listings: [],
      modes: ['in-person', 'online', 'hybrid'],
      checkedModes: [],
      dialogOpen: false,
      mode: 'stack',
      type: 'week',
      offsetEvents: [],
      events: [],
      startDateMenu: false,
      startDate: moment().format('YYYY-MM-DD'),
      selectedListing: {
        reviews: [],
        userReview: null
      },
      enrollmentCount: null,
      newReview: {
        rating: null,
        text: ''
      },
      isReviewsLoading: false,
      isFetchingListings: false,
      searchText: '',
      searchPublisher: '',
      searchTags: [],
      tagsCollection: [],
      ListingType
    }
  },
  computed: {
    ...mapGetters(['isClient']),
    enrollmentText () {
      if (this.enrollmentCount > 0 && this.selectedListing) {
        switch (this.selectedListing.type) {
          case ListingType.FitnessPlan: {
            const timeS = this.enrollmentCount > 1 ? 'times' : 'time'
            return `You have previously enrolled ${this.enrollmentCount} ${timeS} to this plan.`
          }
        }
      }
      return ''
    },
    showAddReview () {
      if (this.selectedListing.userReview || !this.isClient) return false
      switch (this.selectedListing.type) {
        case ListingType.FitnessPlan:
          if (this.enrollmentCount > 0) {
            return true
          }
          break
        case ListingType.MultimediaPost:
          return true
      }
      return false
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
    async viewListing (selectedListing) {
      const listing = (await getListingById(selectedListing.id)).data
      Object.assign(this.selectedListing, listing, {
        reviews: [],
        userReview: null
      })
      this.dialogOpen = true
      switch (selectedListing.type) {
        case ListingType.FitnessPlan:
          this.offsetEvents.splice(0, this.offsetEvents.length, ...listing.events.map(e => ({
            name: e.name,
            description: e.description,
            start: e.startTime,
            end: e.endTime,
            timed: true
          })))
          this.updateEvents()
          break
      }
      this.enrollmentCount = (await getEnrollmentCount(listing.id)).data
      this.loadReviews()
    },
    async enroll () {
      await enrollToPlan(this.selectedListing.id, {
        startDate: this.startDate
      })
      this.dialogOpen = false
    },
    async loadReviews () {
      this.isReviewsLoading = true
      const userReview = (await getSelfReview(this.selectedListing.id)).data
      this.selectedListing.userReview = userReview
      const reviews = (await getReviews(this.selectedListing.id)).data
      this.selectedListing.reviews.splice(0, this.selectedListing.reviews.length, ...reviews)
      this.isReviewsLoading = false
    },
    async submitReview () {
      this.isReviewsLoading = true
      await addReview(this.selectedListing.id, this.newReview)
      this.loadReviews()
    },
    closeDialog () {
      this.events.splice(0, this.events.length)
      this.enrollmentCount = null
      this.dialogOpen = false
      this.startDate = moment().format('YYYY-MM-DD')
      Object.assign(this.newReview, {
        rating: null,
        text: ''
      })
    },
    fetchListings: debounce(async function () {
      this.isFetchingListings = true
      const listings = (await getListings({
        q: this.searchText || undefined,
        publisher: this.searchPublisher || undefined,
        tags: this.searchTags
      })).data
      this.listings.splice(0, this.listings.length, ...listings)
      this.isFetchingListings = false
    }, 300)
  },
  async mounted () {
    this.fetchListings()
    const existingTags = (await getTags()).data
    this.tagsCollection.splice(0, this.tagsCollection.length, ...existingTags.map(tag => tag.name))
  },
  watch: {
    startDate () {
      this.updateEvents()
    }
  },
  components: {
    MultimediaPost
  }
}

</script>

<style lang="scss">
.line-clamp--one {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.line-clamp--two {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
