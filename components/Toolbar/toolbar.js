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
            this.$nuxt.$emit("toggleDrawer");
        }
    }
};