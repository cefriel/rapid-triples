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
      <!--      <RDFGraph :rdfData="rdfData" />-->
      <GraphView :dataset="rdfData" :env="env"/>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import GraphView from "@/components/GraphView.vue";

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
    GraphView,
  },
};
</script>

<style scoped>
.language-turtle {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
