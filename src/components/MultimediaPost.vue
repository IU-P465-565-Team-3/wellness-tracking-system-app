<template>
  <v-container pa-0>
    <v-row class="py-2">
      <v-col align-center>
        <v-card outlined>
          <v-app-bar class="grey darken-2" dark v-if="enableCreator">
            <v-spacer></v-spacer>
              <h3>Add Media</h3>
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-card-text>
            <v-row v-for="object, i in content" :key="i">
              <v-col>
                <media-content :content="object"></media-content>
              </v-col>
              <v-col class="shrink post-toolbar" v-if="enableCreator">
                <v-btn text color="gray" @click="toggleEditable(i)" small>
                  <v-icon color="grey" v-if="object.editable">
                    mdi-check
                  </v-icon>
                  <v-icon color="grey" v-else>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn text color="gray" @click="deleteContent(i)" small>
                  <v-icon color="grey">
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="enableCreator">
              <v-col>Append content</v-col>
              <v-col class="shrink">
                <v-btn @click="appendContent(ContentType.Text)">
                  <v-icon>
                    mdi-text-box-plus
                  </v-icon>
                  Text
                  </v-btn>
              </v-col>
              <v-col class="shrink">
                <v-btn @click="appendContent(ContentType.Image)">
                  <v-icon>
                    mdi-image-plus
                  </v-icon>
                  Image
                  </v-btn>
              </v-col>
              <v-col class="shrink">
                <v-btn @click="appendContent(ContentType.Video)" disabled>
                  <v-icon>
                    mdi-video-plus
                  </v-icon>
                  Video
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row class="justify-center pb-5">
              <v-btn color="primary" :disabled="!content.length" @click="publishPost" v-if="enableCreator">
                <h3>Publish Post</h3>
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createListing } from '../api/plans'
import { ContentType, ListingType } from '../enums'
import MediaContent from './MediaContent'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    imageAnnotation: {
      type: String,
      required: true
    },
    content: {
      type: Array,
      required: false,
      default: () => []
    },
    enableCreator: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      ContentType
    }
  },
  methods: {
    appendContent (type) {
      this.content.push({
        type,
        description: '',
        sourceUrl: '',
        annotation: '',
        editable: true
      })
    },
    toggleEditable (index) {
      const content = this.content[index]
      if (content) {
        content.editable = !content.editable
      }
    },
    deleteContent (index) {
      this.content.splice(index, 1)
    },
    async publishPost () {
      const listing = {
        name: this.name,
        description: this.description,
        imageUrl: this.imageUrl,
        imageAnnotation: this.imageAnnotation,
        type: ListingType.MultimediaPost,
        content: this.content.map(c => {
          return {
            type: c.type,
            description: c.description,
            sourceUrl: c.sourceUrl
          }
        })
      }
      await createListing(listing)
      this.$router.push({ name: 'Dashboard' })
    }
  },
  components: {
    MediaContent
  }
}
</script>
