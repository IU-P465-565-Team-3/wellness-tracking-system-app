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
          <listing-card :listing="listing"></listing-card>
        </v-flex>
      </v-layout>
      <v-layout pa-2 v-else justify-center text-center>
        No listings found.
      </v-layout>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import ListingCard from './ListingCard.vue'

import { getTags } from '../api/plans.js'
import { getListings } from '../api/resourceCatalog.js'
import { ListingType } from '../enums/index.js'
import debounce from 'lodash.debounce'

export default {
  data () {
    return {
      listings: [],
      isFetchingListings: false,
      searchText: '',
      searchPublisher: '',
      searchTags: [],
      tagsCollection: [],
      ListingType
    }
  },
  methods: {
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
  components: {
    ListingCard
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
