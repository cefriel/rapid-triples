<template>
  <v-tabs v-if="rdfData">
    <v-tab>Turtle Syntax</v-tab>
    <v-tab>RDF Graph</v-tab>

    <v-tab-item>
      <pre id="rdf-text" class="language-turtle">
        <code class="language-turtle" v-html="highlightedRdfData"></code>
      </pre>
    </v-tab-item>
    <v-tab-item>
      <RDFGraph :rdfData="rdfData" />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import RDFGraph from './RDFGraph.vue';

export default {
  name: 'RDFTabs',
  props: {
    rdfData: {
      type: String,
      required: true,
    },
    highlightedRdfData: {
      type: String,
      required: true,
    },
  },
  components: {
    RDFGraph,
  },
};
</script>

<style scoped>
.language-turtle {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
