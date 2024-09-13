<template>
  <v-container>
    <v-form v-model="valid">
      <v-jsf v-model="model" :schema="schema" :options="options" @input="$emit('update:model', $event)" />
    </v-form>
  </v-container>
</template>

<script>
import VJsf from '@koumoul/vjsf/lib/VJsf.js'
import '@koumoul/vjsf/lib/VJsf.css'
import '@koumoul/vjsf/lib/deps/third-party.js'

export default {
  name: 'JsonForm',
  components: { VJsf },
  props: {
    schema: Object,
    options: Object,
    value: Object
  },
  emits: ['update:model'],
  data() {
    return {
      valid: false,
      model: this.value || {}
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.model = newValue || {};
      },
      deep: true,
      immediate: true
    }
  },
  methods: {}
}
</script>

<style lang="css">
.theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea, .theme--light.v-input--is-disabled .v-select__selection--disabled {
  color: rgba(0, 0, 0) !important;
}
</style>
