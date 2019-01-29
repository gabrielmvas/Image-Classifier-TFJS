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