<template>
    <v-app dark>
        <v-toolbar fixed app>
            <v-toolbar-title class="hidden-sm-and-down">Image Classifier</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn 
                v-for="button in toolbarButtons" 
                :key="button.title" 
                flat 
                :to="button.path"
                class="mr-0 ml-0"
            >
                {{ button.title }}
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>

        <v-footer app>
            <span style="margin: auto" > 
                Image Classifier &copy; 2019
            </span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            toolbarButtons: [
                { title: "About", path: "/" },
                { title: "Classify Images", path: "/predict" },
                { title: "Classes", path: "/classes" }
            ]
        }
    }
}
</script>
