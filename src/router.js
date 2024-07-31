import { createRouter, createWebHistory } from 'vue-router';
import AssetCreate from './components/AssetCreate.vue';

const routes = [
    {
        path: '/mobilitydcatap-ui/',
        name: 'asset_create',
        component: AssetCreate,
        props: {
            asset_type: 'mobilityDCAT-AP'
        },
        meta: {
            title: "Cefriel RDF Metadata Generator",
        }
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
