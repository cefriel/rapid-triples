<template>
  <div style="height: 100vh; width:100vh" class="graph-container">
    <GraphLayout class="graph-layout w-full h-full" :layout-cfg="layoutCfg" :nodes="resources" :links="links"
                 :active-links="activeLinks"
                 :auto-zoom="false" @link-enter="onLinkHover" @link-out="onUnhover">
      <template v-slot:node="{ node }">
        <ResourceCard :resource="node" :active-links="activeLinks" @hover-title="onHoverResource"
                      @unhover-title="onUnhover" @hover-property="onHoverProperty" @unhover-property="onUnhover"/>
      </template>
    </GraphLayout>
    <div id="menu">
      <template v-if="showlayoutControls">
        <div class="control">
          <label>Rank Direction:</label>
          <select v-model="layoutCfg.rankdir">
            <option value="TB">Top to Bottom</option>
            <option value="BT">Bottom to Top</option>
            <option value="LR">Left to Right</option>
            <option value="RL">Right to Left</option>
          </select>
        </div>
        <div class="control">
          <label>Node Separation:</label>
          <input type="range" v-model="layoutCfg.nodesep" min="10" max="100">
        </div>
        <div class="control">
          <label>Rank Separation:</label>
          <input type="range" v-model="layoutCfg.ranksep" min="10" max="100">
        </div>
      </template>
      <CogIcon class="cog w-5 h-5" @click="toggleLayoutControls"></CogIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineProps } from 'vue';
import ResourceCard from './ResourceCard.vue';
import { linksFromResources, resourcesFromDataset } from '@/resourceUtils';
import { CogIcon } from '@heroicons/vue/24/solid';
import { GraphLayout } from '@zazuko/vue-graph-layout'

interface Props {
  dataset: any; // Use appropriate type if available
}

const props = defineProps<Props>();

const resources = computed(() => resourcesFromDataset(props.dataset));
const links = computed(() => linksFromResources(resources.value));
const activeLinks = ref([]);

function toggleLayoutControls() {
  showlayoutControls.value = !showlayoutControls.value;
}

const showlayoutControls = ref(false);
const layoutCfg = ref({
  rankdir: 'RL',
  align: undefined,
  nodesep: 20,
  ranksep: 50,
  marginx: 10,
  marginy: 10,
});

function onLinkHover(link) {
  activeLinks.value.push(link);
}

function onUnhover() {
  activeLinks.value = [];
}

function onHoverResource(resource) {
  activeLinks.value = links.value.filter(link => link.source === resource.id);
}

function onHoverProperty(resource, property) {
  activeLinks.value = links.value.filter(link => (
      link.source === resource.id && link.sourceProperty === property.id
  ));
}

// Watch for changes in the dataset prop
watch(() => props.dataset, (newDataset) => {
  console.log('New dataset:', newDataset);
  resources.value = resourcesFromDataset(newDataset);
  links.value = linksFromResources(resources.value);
});
</script>

<script lang="ts">
export default {
  name: 'GraphView',
};
</script>

<style scoped>
.graph-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.graph-layout {
  flex-grow: 1;
}

#menu {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  pointer-events: auto;
}

.control {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.cog {
  margin-left: auto;
  margin-right: 0;
  color: #8a9ba1;
}
</style>
