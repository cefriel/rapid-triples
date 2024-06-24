<template>
    <v-app id="inspire">
        <Topbar/>
        <v-main >
            <router-view/>
        </v-main>
        <Footer/>

    </v-app>
</template>

<script>
    import Footer from './components/Footer.vue';
    import Topbar from './components/Topbar.vue';

    export default {
        name: 'App',
        components: { Footer, Topbar },
        data() {
            return {
                app_name: 'Cefriel RDF Metadata Generator',
                app_logo: require('@/assets/logo.png'),
                path_items: [],
                username : window.localStorage.getItem('auth-user')
            }
        },
        methods: {
        },

    };
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
    .v-application {
        font-family: 'Lato', sans-serif !important;
    }

    .card-content {
        position: absolute;
        height: 100%;
        width: 100%;
        bottom: 0;
        text-shadow: 4px 0px 4px #000000, -4px 0px 4px #000000, 0px -4px 4px #000000, 0px 4px 4px #000000, 0px 4px 4px #000000;
        color: white !important;
        justify-content: center;
        text-align: center;
        align-items: center;
        position: absolute;
        border-style: solid;
        border-radius: 5px;
        border-color: #f5f5f5;
        border-width: 2px;
        background-color: rgba(250,250,250, 0.8) !important;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        word-break: normal; /* maybe !important  */

    }

    .fade-enter-active, .fade-leave-active {
        transition-timing-function: ease;
        transition-duration: 2s;
        transition-delay: 1s;
        transition: 0.5s;
    }

    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        text-align: center;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #7ca5c3 !important;
        border-radius: 4px;
    }
    .v-card__text, .v-card__title {
        word-break: normal; /* maybe !important  */
    }

</style>
