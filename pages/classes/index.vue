<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2>
            <v-card style="border-radius: 15px" class="mt-5">
                <v-card-title>
                    <span class="card-title">
                        Classes
                    </span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-list dense>
                    <template v-for="(c, index) in allClasses" >
                        <v-list-tile :key="index" >
                            <v-list-tile-content>
                                <v-list-tile-title> {{c}} </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { classes } from '@/service/classes'

export default {
    data() {
        return {
            allClasses: classes
        }
    }
}
</script>

<style scoped>
.card-title {
    margin: auto;
    font-weight: bold; 
    font-size: 30px;
}
</style>
