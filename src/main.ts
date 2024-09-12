import { createApp } from 'vue';
import vuetify from './plugins/vuetify';
import router from './router';
import App from '@/App.vue';
import moment from 'moment';
import vueResource from 'vue-resource'; // Updated import for vue-resource
import './styles/index.css';

const app = createApp(App);

app.config.globalProperties.$resource = vueResource;

// Set page title
router.beforeEach((to, from, next) => {
    const { title } = to.meta;
    document.title = typeof title === 'function' ? title(to) : title;
    next();
});

// Global filters
app.config.globalProperties.$filters = {
    formatDate(value: string) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY hh:mm');
        }
    },
    removeUnderscore(value: string) {
        if (!value) return '';
        return value.toString().replaceAll('_', ' ');
    }
};

app.use(router);
app.use(vuetify);
app.mount('#app');
