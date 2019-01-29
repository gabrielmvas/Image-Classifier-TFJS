<template>
  <v-toolbar>
    <v-toolbar-title >
        <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="toggleDrawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Image Classifier</span> 
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down" >
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
  },
  methods: {
    toggleDrawer() {
      this.$nuxt.$emit('toggleDrawer')
    }
  }
};
</script>

<style>
</style>
