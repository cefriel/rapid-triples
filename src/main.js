import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import Resource from 'vue-resource';
import moment from 'moment/src/moment';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['rdf-editor']

Vue.use(Resource);

// Set page title
router.beforeEach((to, from, next) => {
    const { title } = to.meta;
    document.title = typeof title === 'function' ? title(to) : title;
    next();
});

// Vue functions to be used in templates
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
});

Vue.filter('remove_underscore', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.replaceAll("_", " ")
})

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')
