<template>
  <div class="h-full flex flex-col">
    <h1 class="p-4 text-lg font-semibold bg-gray-600 text-gray-50">Graph Layout demo</h1>
    <div class="flex-grow flex flex-row">
      <div class="w-1/3 p-4 bg-gray-100 flex flex-col gap-4">
        <label>
          Auto-zoom:
          <input type="checkbox" v-model="autoZoom" />
        </label>
      </div>
      <graph-layout
          :nodes="nodes"
          :links="links"
          :auto-zoom="autoZoom"
          :layout-cfg="layoutCfg"
          @link-enter="onLinkEnter"
          @link-out="onLinkOut"
      >
        <template #node="{ node }">
          <article class="bg-primary-300 rounded-lg p-4">
            <h2 class="font-semibold">{{ node.id }}</h2>
            <ul>
              <li v-for="property in node.properties" :key="property.id">
                {{ property.id }}: {{ property.name }}
              </li>
            </ul>
          </article>
        </template>
      </graph-layout>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { Parser } from 'n3';
import GraphLayout from './GraphLayout.vue';

export default {
  name: 'RDFGraph',
  components: {
    GraphLayout,
  },
  props: {
    rdfData: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const nodes = ref([]);
    const links = ref([]);
    const autoZoom = ref(true);
    const layoutCfg = ref({
      rankdir: 'RL',
      align: undefined,
      nodesep: 20,
      ranksep: 50,
      marginx: 10,
      marginy: 10,
    });
    const activeLinks = ref([]);

    const parseRDF = (rdfData) => {
      console.log(rdfData)
      const parser = new Parser();
      const quads = parser.parse(rdfData);
      const nodeMap = new Map();
      const linkList = [];

      quads.forEach((quad) => {
        const subject = quad.subject.value;
        const predicate = quad.predicate.value;
        const object = quad.object.value;

        if (!nodeMap.has(subject)) {
          nodeMap.set(subject, { id: subject, properties: [] });
        }
        if (!nodeMap.has(object)) {
          nodeMap.set(object, { id: object, properties: [] });
        }

        nodeMap.get(subject).properties.push({ id: predicate, name: object });

        if (quad.object.termType === 'NamedNode') {
          linkList.push({ source: subject, target: object, label: predicate });
        }
      });

      nodes.value = Array.from(nodeMap.values());
      links.value = linkList;
    };

    watch(
        () => props.rdfData,
        (newRdfData) => {
          parseRDF(newRdfData);
        },
        { immediate: true }
    );

    const onLinkEnter = (link) => {
      activeLinks.value = [link];
    };

    const onLinkOut = () => {
      activeLinks.value = [];
    };

    onMounted(() => {
      parseRDF(props.rdfData);
    });

    return {
      nodes,
      links,
      autoZoom,
      layoutCfg,
      activeLinks,
      onLinkEnter,
      onLinkOut,
    };
  },
};
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}
</style>
