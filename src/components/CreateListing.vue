<template>
  <v-container>
    <v-row>
      <v-col align-center>
        <v-card>
          <v-app-bar class="primary" dark>
            <v-spacer></v-spacer>
              <h3>Create Listing</h3>
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-card-text>
            <v-stepper
              v-model="currentStep"
              vertical
            >
              <v-stepper-step
                :complete="currentStep > 1"
                :editable="currentStep >= 1"
                step="1"
              >
                Listing Information
                <small>Details to show on the catalog page</small>
              </v-stepper-step>
              <v-stepper-content step="1">
              <v-radio-group row v-model="typeId" hide-details="" label="Listing Type">
                <v-radio label="Fitness Plan" :value="ListingType.FitnessPlan"></v-radio>
                <v-radio label="Multimedia Post" :value="ListingType.MultimediaPost"></v-radio>
              </v-radio-group>
                <v-text-field label="Name" v-model="name"></v-text-field>
                <v-textarea v-model="description" no-resize :rows="2" persistent-hint>
                  <template v-slot:label>
                    <div>
                      Description <small>(optional)</small>
                    </div>
                  </template>
                </v-textarea>
                <v-row>
                  <v-col cols="12">
                    <transition name="fade">
                      <v-img :src="imageUrl" :max-width="300" :max-height="200" class="ma-auto" v-if="imageUrl"></v-img>
                    </transition>
                  </v-col>
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
                <v-text-field label="Image Annotation" v-model="imageAnnotation"></v-text-field>
                <v-btn
                color="primary"
                @click="currentStep = 2"
                >
                  Continue
                </v-btn>
              </v-stepper-content>

              <v-stepper-step
                :complete="currentStep > 2"
                :editable="currentStep >= 2"
                step="2"
              >
                Content
                <small>Plans or media content that clients can view</small>
              </v-stepper-step>
              <v-stepper-content step="2">
                <event-planner v-if="typeId == ListingType.FitnessPlan"
                :name="name"
                :description="description"
                :imageUrl="imageUrl"
                :imageAnnotation="imageAnnotation"
                />
              </v-stepper-content>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventPlanner from './EventPlanner.vue'
import { ListingType } from '../enums'
import { uploadFile } from '../api/plans'

export default {
  data () {
    return {
      currentStep: 1,
      name: '',
      description: '',
      imageUrl: '',
      imageAnnotation: '',
      typeId: ListingType.FitnessPlan,
      selectedFile: null,
      isUploading: false,
      ListingType
    }
  },
  methods: {
    async uploadImage () {
      this.isUploading = true
      try {
        const res = await uploadFile(this.selectedFile)
        if (res.data) {
          this.imageUrl = res.data
        }
      } catch (err) {
        console.error(err)
      }
      this.isUploading = false
    },
    clearImage () {
      this.imageUrl = ''
    }
  },
  components: {
    EventPlanner
  }
}
</script>
