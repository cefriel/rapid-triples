<template>
  <div>
    <PageTitle :title="asset_type" :show_breadcrumbs="true"/>
    <v-row class="px-10 my-2">
      <v-col cols="8" class="py-2">
        <p>Fill the form with all the metadata and download the corresponding RDF. Test and experiment to learn how different
          information should be described in RDF according to the considered specification.<br><br>
          The page is client-side only so all the information inserted are not collected/stored but can not be retrieved
          if the page is reloaded. The output RDF can be converted to different serializations.<br><br>
          This page is powered by <b>KCONG (Knowledge Catalogue and Governance)</b> a complete (meta)data catalogue
          solution developed by <a href="https://www.cefriel.com/">Cefriel</a>. If you want to know more visit <a
              href="https://kcong.cefriel.com/">https://kcong.cefriel.com/</a>.</p>
      </v-col>
      <v-col cols="4" class="text-center py-2">
        <img src="@/assets/logo.png" alt="Company Logo" style="max-height: 100px;">
      </v-col>
    </v-row>

    <Alert v-for="(alert_message, index) in alert_messages" :key="index" :message="alert_message.message"
           :alert_type="alert_message.alert_type"/>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-form ref="form" v-model="valid">
            <JsonForm :key="formKey" :value="asset" v-on:update:model="set_asset_value"
                      v-bind:schema="asset_schema" v-bind:options="options"/>
          </v-form>
          <p><br></p>
          <v-btn @click="create_object" style="margin-top: 10px;">Generate</v-btn>
        </v-col>

        <v-col cols="6">
          <div v-if="saved_asset_rdf" class="rdf-container">
            <!-- Dropdown to select format -->
            <v-select
                v-model="selectedFormat"
                :items="formats"
                label="Select RDF Format"
                class="mb-3"
            ></v-select>

            <rdf-editor
                class="h-full overflow-hidden"
                :value.prop="saved_asset_rdf"
                :format="selectedFormat"
                :readonly=true
                :prefixes="editorPrefixes"
                auto-parse
                parse-delay="1000"
                @parsing-failed="onParsingFailed"
                @prefixes-parsed="onPrefixesParsed"
                @serialized="onSerialized"
            ></rdf-editor>

            <v-btn color="primary" @click="downloadRDF" class="mb-2">Download RDF</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import JsonForm from './JsonForm';
import Alert from './Alert.vue';
import PageTitle from './PageTitle.vue';

import Ajv from "ajv";
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

import form_template from 'raw-loader!@/assets/form-lifting.jinja';
import '@rdfjs-elements/rdf-editor';
import { parsers } from '@rdf-esm/formats-common'; // Updated
import { v4 as uuidv4 } from 'uuid';


export default {
  name: 'AssetCreate',
  components: {
    JsonForm,
    PageTitle,
    Alert
  },
  props: ['asset_type'],
  data() {
    return {
      template_engine: null,
      template: null,
      valid: null,
      asset_schema: {},
      initial_asset: {},
      asset: {},
      saved_asset: {},
      saved_asset_rdf: null,
      serialized_rdf: null,
      alert_messages: [],
      selectedPdf: null,
      pdfUrl: null,
      formKey: 0,
      parseError: null,
      formats: [...parsers.keys()],
      selectedFormat: 'text/turtle', // Default format
      editorPrefixes: null,
      options: {
        ajv: ajv,
        context: {
          languages: require("../assets/languages.json")
        }
      }
    };
  },
  mounted() {
    this.asset_schema = require("@/assets/form.json");
    this.template_engine = require('nunjucks');
    this.template = this.template_engine.compile(form_template);
  },
  methods: {
    onParsingFailed(e) {
      console.error('Parsing failed:', e.detail.error);
      this.parseError = e.detail.error;
    },
    onPrefixesParsed(e) {
      // Supported prefixes at https://github.com/zazuko/rdf-vocabularies/tree/master/ontologies
      if (!this.editorPrefixes) {
        this.editorPrefixes = Object.keys(e.detail.prefixes).join(",");
      }
    },
    onSerialized(e) {
      this.serialized_rdf = e.detail.value;
    },
    downloadRDF() {
      if (!this.serialized_rdf) {
        this.alert_messages.push({message: 'No RDF content to download.', alert_type: 'error'});
        return;
      }

      const formatToExtension = {
        'text/turtle': 'ttl',
        'application/ld+json': 'jsonld',
        'application/rdf+xml': 'rdf',
        'application/trig': 'trig',
        'application/n-triples': 'nt',
        'application/n-quads': 'nq',
        'text/n3': 'n3',
      };

      const fileExtension = formatToExtension[this.selectedFormat] || 'ttl';

      const blob = new Blob([this.serialized_rdf], {type: this.selectedFormat});
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rdf-data.${fileExtension}`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },

    set_asset_value(event) {
      this.asset = event;
    },
    create_object() {
      this.$refs.form.validate();
      if (!this.valid) {
        this.alert_messages.push({message: 'Validation error', alert_type: 'error'});
      } else {
        this.alert_messages = [];
      }

      if (!this.asset.header) {
        this.asset.header = {};
      }
      this.asset.header.creation_time = new Date().toISOString();
      this.asset.header.last_updated = new Date().toISOString();
      this.asset.header.type = this.asset_type;
      this.asset.header.id = uuidv4();

      function slugify(str) {
        return String(str).normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
      }

      try {
        this.saved_asset_rdf = this.template.render({
          obj: this.asset,
          data_platform_url: "https://kcong.cefriel.com/",
          slugify: slugify
        });
      } catch (error) {
        console.log(error);
      }
      this.saved_asset_rdf = this.saved_asset_rdf.replace(/^\s*\n/gm, "");
    }
  }
};
</script>
