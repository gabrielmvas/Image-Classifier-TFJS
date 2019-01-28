<template>
  <v-toolbar>
    <v-toolbar-title class="hidden-sm-and-down">Image Classifier</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        v-for="button in buttons"
        :key="button.title"
        flat
        :to="button.path"
        class="mr-0 ml-0"
      >{{ button.title }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { title: "About", path: "/" },
        { title: "Classify Images", path: "/predict" },
        { title: "Classes", path: "/classes" },
        { title: "Git Hub", path: "/repository" }
      ]
    };
  }
};
</script>

<style>
</style>
