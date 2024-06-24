<template>
    <v-container fluid class="page-top py-4 mb-8">
        <v-row>
            <v-col cols="9">
                <v-row class="ml-4"> <v-col> <h1 class="text-capitalize">{{title || remove_underscore }}</h1> </v-col> </v-row>
                <v-row class="ml-4" v-if="subtitle!=null"> <v-col> <h2 class="text-capitalize">{{subtitle || remove_underscore }}</h2> </v-col> </v-row>
                <v-row class="ml-4" v-if="third_line!=null"> <v-col> <h3> {{third_line || remove_underscore}} </h3> </v-col> </v-row>
            </v-col>
            <v-col cols="3">
                <v-row v-if="image!=null">
                    <v-img
                            max-height="160px"
                            position="bottom center"
                            v-bind:src="image"
                            contain
                            />
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    export default {
        name: 'PageTitle',
        components: {
        },
        props: {
            title: {
                type: String,
                required: true
            },
            subtitle: {
                type: String,
                required: false
            },
            third_line: {
                type: String,
                required: false
            },
            freetext: {
                type: String,
                required: false
            },
            image: {
                type: String,
                required: false
            },
            show_breadcrumbs: {
                type: Boolean,
                required: true
            }
        },
    };
</script>
<style lang="css" scoped>
    .page-top {
        background-color: #F5F5F5;
    }
</style>

