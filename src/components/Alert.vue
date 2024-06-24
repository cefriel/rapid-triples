<template>
    <v-container>
        <v-alert class="text-center" :value="!!message" :type="alert_type" dismissible> {{ message }} </v-alert>
    </v-container>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        message: String,
        alert_type: String
    }
}
</script>
