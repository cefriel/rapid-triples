<template>
  <TermTooltip :label="tooltip">
    {{ displayValue }}<small v-if="language" class="has-text-grey">@{{ language }}</small>
  </TermTooltip>
</template>

<script setup lang="ts">

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import TermTooltip from './TermTooltip.vue'
import {Term} from 'rdf-js'
import {computed} from 'vue'

interface Props {
  term: Term,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const props = defineProps<Props>()

const displayValue = computed(() => termValue(props.term))

const language = computed(() => {
  if (props.term.termType !== "Literal") {
    return null
  }
  return props.term.language ?? null;
})
const tooltip = computed(() => {
  const expandedValue = expandValue(props.term)
  return expandedValue !== displayValue.value ? expandedValue : ''
})

function termValue(term: Term): string {
  if (term.termType === 'NamedNode') {
    return term.value
  }
  return term.value
}

function expandValue(term: Term): string {
  if (term.termType === 'Literal') {
    const datatype = term.datatype ? `^^${(term.datatype).value}` : ''
    const language = term.language ? `@${term.language}` : ''

    return `${term.value}${datatype}${language}`
  }
  return term.value
}

</script>

<script lang="ts">

export default {
  name: 'ZazukoTerm',
}

</script>
