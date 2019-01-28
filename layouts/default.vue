<template>
    <v-app dark>
        <app-toolbar></app-toolbar>
        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>
        <app-footer></app-footer>
    </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar/Toolbar.vue'
import Footer from '@/components/Footer/Footer.vue'

export default {
    components: {
        'app-toolbar': Toolbar,
        'app-footer': Footer
    }
}
</script>
