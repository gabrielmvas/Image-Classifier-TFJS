<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
            <v-card class="mt-5">
                <v-card-title>
                    <span class="card-title">
                        Git Hub Repository
                    </span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <p>
                        Link to my github where you will have access
                        to the source code of this project.
                    </p>
                    <div class="text-xs-center" >
                        <v-tooltip bottom>
                            <v-btn slot="activator" fab @click="goToGit">
                                <v-icon>code</v-icon>
                                <a 
                                    ref="gitRep" 
                                    href="https://github.com/gabrielmvas/Image-Classifier-TFJS"
                                    target="_blank"
                                >
                                </a>
                            </v-btn>
                            <span>GitHub</span>
                        </v-tooltip>
                    </div>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    methods: {
        goToGit() {
            this.$refs.gitRep.click()
        }
    }
}
</script>

<style>
.card-title {
    margin: auto;
    font-weight: bold; 
    font-size: 30px;
}
</style>
