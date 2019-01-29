<template>
    <v-app dark>
        <app-navdrawer></app-navdrawer>
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
import Navdrawer from '@/components/Navdrawer/Navdrawer.vue'

export default {
    components: {
        'app-toolbar': Toolbar,
        'app-footer': Footer,
        'app-navdrawer': Navdrawer
    }
}
</script>
