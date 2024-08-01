<template>
  <div>
    <v-container  >
      <v-row>
        <v-col>
          <v-tabs v-model="activeTab" v-if="rdfData">
            <v-tab> Turtle Syntax </v-tab>
            <v-tab> RDF Graph </v-tab>
          </v-tabs>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div v-if="activeTab === 0">
            <pre id="rdf-text" class="language-turtle">
              <code class="language-turtle" v-html="highlightedRdfData"></code>
            </pre>
          </div>

          <div v-if="activeTab === 1">
            <GraphView :dataset="dataset.value" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import GraphView from "@/components/GraphView.vue";
import rdf from 'rdf-ext';
import ParserN3 from '@rdfjs/parser-n3';
import { Readable } from 'readable-stream';
import { ref } from "vue";

export default {
  name: 'RDFTabs',
  components: {
    GraphView,
  },
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
  setup() {
    const dataset = ref(rdf.dataset());
    return {
      dataset
    };
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  watch: {
    rdfData: {
      immediate: true,
      handler(newVal) {
        this.parseRdfData(newVal);
      },
    },
  },
  methods: {
    async parseRdfData(data) {
      try {
        const parser = new ParserN3();
        const input = Readable.from([data]);
        const quads = [];

        const quadStream = parser.import(input);

        for await (const quad of quadStream) {
          quads.push(quad);
        }

        this.dataset.value = rdf.dataset(quads);
        console.log('Parsed dataset:', this.dataset.value);
      } catch (error) {
        console.error('Error parsing RDF data:', error);
      }
    },
  },
};
</script>

<style scoped>
.language-turtle {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
