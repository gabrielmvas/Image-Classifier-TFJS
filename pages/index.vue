<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
            <v-card class="mt-5" style="border-radius: 15px">
                <v-card-title>
                    <span class="card-title">
                        Image Classifier
                    </span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <p>
                        This is an simple web application that uses the modelMobileNet to classify/make predictions about images.
                    </p>
                    <p>
                        Please note that this model have been trained to classify one thousand specific classes, so do not expect very high accuracy for whatever input, you can input images the model does not recognize, so probably you will get a wrong prediction.
                    </p>
                    <p>
                        In case you want to know which classes are in the model you can click on "Classes" on the toolbar or 
                        <nuxt-link to="/classes" style="color: yellow"> 
                            click here. 
                        </nuxt-link>
                    </p>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.card-title {
    margin: auto;
    font-weight: bold; 
    font-size: 30px;
}
</style>
