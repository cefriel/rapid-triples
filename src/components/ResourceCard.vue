<template>
  <div class="resource-card">
    <h3 @mouseover="hoverTitle" @mouseleave="unhoverTitle">{{ resource.id }}</h3>
    <ul>
      <li v-for="property in resource.properties" :key="property.id">
        <span @mouseover="() => hoverProperty(property)" @mouseleave="unhoverProperty">
          {{ property.id }}: {{ property.value }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Property, Resource } from '@/model/resource.model'

interface Props {
  resource: Resource
  activeLinks: Array<any>
  env: any
}

const props = defineProps<Props>()
const emit = defineEmits(['hover-title', 'unhover-title', 'hover-property', 'unhover-property'])

function hoverTitle() {
  emit('hover-title', props.resource)
}

function unhoverTitle() {
  emit('unhover-title')
}

function hoverProperty(property: Property) {
  emit('hover-property', props.resource, property)
}

function unhoverProperty() {
  emit('unhover-property')
}
</script>

<style scoped>
.resource-card {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
