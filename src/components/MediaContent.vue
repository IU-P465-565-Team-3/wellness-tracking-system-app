<template>
  <v-container>
    <v-row>
      <template v-if="content.editable">
        <v-textarea v-if="content.type === ContentType.Text" :rows="3" v-model="content.description" />
      </template>
      <template v-else>
        <div class="text-pre-wrap black--text" v-text="content.description">
        </div>
      </template>
      <template v-if="content.editable">
        <v-row v-if="content.type === ContentType.Image">
          <v-col>
            <v-file-input
              show-size
              counter
              label="Image"
              v-model="selectedFile"
              prepend-icon="mdi-image-plus"
              @click:clear="clearImage"
              :disabled="isUploading"
              :loading="isUploading"
            ></v-file-input>
          </v-col>
          <v-col class="shrink ma-auto">
            <v-btn
            color="primary"
            :disabled="!selectedFile || isUploading"
            @click="uploadImage">
              Upload
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <transition name="fade">
          <v-img :src="content.sourceUrl" :max-width="500" :max-height="500" contain class="ma-auto" v-if="content.sourceUrl"></v-img>
        </transition>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { uploadFile } from '../api/plans'
import { ContentType } from '../enums'
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selectedFile: null,
      isUploading: false,
      ContentType
    }
  },
  methods: {
    async uploadImage () {
      this.isUploading = true
      try {
        const res = await uploadFile(this.selectedFile)
        if (res.data) {
          this.content.sourceUrl = res.data
        }
      } catch (err) {
        console.error(err)
      }
      this.isUploading = false
      this.content.editable = false
    },
    clearImage () {
      this.content.sourceUrl = ''
    }
  }
}
</script>
