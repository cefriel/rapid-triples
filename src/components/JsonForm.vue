<template>
  <v-container>
    <v-form v-model="valid">
      <Vjsf v-model="model" :schema="schema" :options="options" @input="$emit('update:model', $event)" />
    </v-form>
  </v-container>
</template>

<script>
import Vjsf from '@koumoul/vjsf'

export default {
  name: 'JsonForm',
  components: { Vjsf },
  props: {
    schema: Object,
    options: Object,
    // model: Object
  },
  emits: ['update:model'],
  data() {
    return {
      valid: false,
      model: {}
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="css">
.theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea, .theme--light.v-input--is-disabled .v-select__selection--disabled {
  color: rgba(0, 0, 0) !important;
}
</style>
