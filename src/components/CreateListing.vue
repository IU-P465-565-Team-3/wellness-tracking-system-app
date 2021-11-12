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
                <v-img :lazy-src="imageSrc" max-width="300" max-height="200"></v-img>
                <v-row>
                  <v-col>
                    <v-file-input
                    show-size
                    counter
                    multiple
                    label="Image"
                    v-model="files"
                    prepend-icon="mdi-image-plus"
                  ></v-file-input>
                  </v-col>
                  <v-col class="shrink ma-auto">
                    <v-btn
                    color="primary"
                    :disabled="!files.length"
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
                :imageSrc="imageSrc"
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
      imageSrc: '',
      imageAnnotation: '',
      typeId: ListingType.FitnessPlan,
      files: [],
      ListingType
    }
  },
  methods: {
    async uploadImage () {
      const file = this.files[0]
      this.imageSrc = await uploadFile(file)
    }
  },
  components: {
    EventPlanner
  }
}
</script>
