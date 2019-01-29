<template>
    <v-navigation-drawer
        v-if="navdrawerVisibility"
        app
        fixed
        :clipped="$vuetify.breakpoint.xlAndUp"
        v-model="isVisible"
    >
        <v-list>
            <template v-for="item in menuItems">
                <v-list-tile :to="item.path" :key="item.title">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            isVisible: null,
            menuItems: [
                { title: "About", path: "/" },
                { title: "Classify Images", path: "/predict" },
                { title: "Classes", path: "/classes" },
                { title: "Git Hub", path: "/repository" }
            ]
        };
    },
    mounted() {
        this.$nuxt.$on("toggleDrawer", () => {
            this.isVisible = !this.isVisible;
        });
    },
    computed: {
        navdrawerVisibility() {
            switch (this.$vuetify.breakpoint.name) {
                case "lg":
                case "xl":
                    return false;
                default:
                    return true;
            }
        }
    }
};
</script>

<style>
</style>
