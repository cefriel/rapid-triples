import Vue from 'vue'
import Router from 'vue-router'

import AssetCreate from './components/AssetCreate.vue'

Vue.use(Router)


const router= new Router({
    mode: 'history',
    routes: [
        {
            path: '/rapid-triples/',
            name: 'asset_create',
            component: AssetCreate,
            props: {
                asset_type : 'MyRDFClass'
            },
            meta: {
                title: "Cefriel RDF Metadata Generator",
            }
        },
    ]
})

export default router
