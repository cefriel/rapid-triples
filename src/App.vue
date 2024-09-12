<template>
  <v-app id="inspire">
    <Topbar/>
    <v-main >
      <router-view/>
    </v-main>
    <FooterComponent/>

  </v-app>
</template>

<script>
import FooterComponent from './components/Footer.vue';
import Topbar from './components/Topbar.vue';

export default {
  name: 'App',
  components: { FooterComponent, Topbar },
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



.fade-enter-active, .fade-leave-active {
  transition-timing-function: ease;
  transition-duration: 2s;
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