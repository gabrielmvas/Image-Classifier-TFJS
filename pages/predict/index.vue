<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="mt-5">
        <v-card-title>
          <span class="card-title">Predict</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>
            Browse some image on your device that you want to classify and you will get
            the top 3 predictions the model made.
          </p>
          <hr class="mb-3">
          <v-layout row>
            <!-- <v-flex xs6 d-flex>
              <v-select
                class="mt-0"
                :items="models"
                item-text="title"
                item-value="value"
                label="Select the model"
                outline
                color="white"
                v-model="model"
              ></v-select>
            </v-flex> -->
            <v-flex xs6 offset-xs3 d-flex>
              <v-btn
                style="height: 60px; border-radius: 5px;"
                @click="pickFile"
                class="mt-0"
                outline
              >
                <span style="color: white">Browse Image</span>
                <input
                  type="file"
                  id="file-selector"
                  style="display: none"
                  ref="picker"
                  @change="previewImage"
                  accept="image/*"
                >
              </v-btn>
            </v-flex>
          </v-layout>
          <hr class="mb-3 mt-2" v-if="image.isUploaded">
          <v-layout row wrap v-if="image.isUploaded">
            <v-flex xs6>
              <v-img style="margin: auto" height="200" width="200" ref="img" :src="image.data"></v-img>
            </v-flex>
            <v-flex class="mt-3" xs6>
              <v-btn @click="clearImage" outline>Clear Image</v-btn>
              <p></p>
              <v-btn class="ml-4" @click="predict" outline>Predict</v-btn>
            </v-flex>
          </v-layout>
          <hr class="mt-3">
          <v-layout class="mt-3" row wrap>
              <v-flex xs12>
                  <p v-for="(pred, index) in predictions.top3" :key="index">
                      {{ pred.className }} - {{ pred.probability.toFixed(2) + '%' }}
                  </p>
              </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as tf from "@tensorflow/tfjs";
import { all } from "@/service/utils";

export default {
  data() {
    return {
      models: [
        { title: "VGG16", value: "vgg" },
        { title: "MobileNet", value: "mobilenet" }
      ],
      image: {
        isUploaded: false,
        data: ""
      },
      model: null,
      imageNetClasses: all,
      predictions: {
        top3: [],
        hasPrediction: false
      }
    };
  },
  methods: {
    pickFile() {
      this.$refs.picker.click();
    },
    previewImage(event) {
      let input = event.target;

      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.image.data = e.target.result;
          this.image.isUploaded = true;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    clearImage() {
      this.image.isUploaded = false;
      this.image.data = "";
      this.predictions.top3 = []
      this.predictions.hasPrediction = false
    },
    preprocessImage(image, modelName) {
      let img = new Image();
      img.src = image;
      let tensor = tf
        .fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat();

      if (modelName == undefined) {
        return tensor.expandDims();
      } else if (modelName == "vgg16") {
        let meanImageNetRGB = tf.tensor1d([123.68, 116.779, 103.939]);
        return tensor
          .sub(meanImageNetRGB)
          .reverse(2)
          .expandDims();
      } else if (modelName == "mobilenet") {
        let offset = tf.scalar(127.5);
        return tensor
          .sub(offset)
          .div(offset)
          .expandDims();
      } else {
        throw new Error("Unknown Model");
      }
    },
    async loadModel() {
      /* this.model = await tf.loadModel(`http://localhost:3000/vgg16/model.json`) */
      this.model = await tf.loadModel("https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json");
    },
    async predict() {
      let image = this.image.data;
      let tensor = this.preprocessImage(image, 'mobilenet');

      let prediction = await this.model.predict(tensor).data();

      this.predictions.top3 = Array.from(prediction)
        .map((prob, index) => {
          return {
            probability: prob,
            className: this.imageNetClasses[index]
          };
          this.predictions.hasPrediction = true;
        })
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 3);
    }
  },
  created() {
    this.loadModel();
  }
};
</script>

<style scoped>
.card-title {
  margin: auto;
  font-weight: bold;
  font-size: 30px;
}
</style>
