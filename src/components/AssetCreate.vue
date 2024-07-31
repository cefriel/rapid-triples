<template>
  <div>
    <PageTitle :title="asset_type" :show_breadcrumbs="true"/>
    <v-row class="px-10 my-2">
      <v-col cols="8" class="py-2">
        <p>
          <b>Fill the form with all the metadata and download the RDF</b>
          representation using
          <a href="https://w3id.org/mobilitydcat-ap/">mobilityDCAT-AP</a>. Test
          and experiment to learn how different information should be described
          in RDF according to the mobilityDCAT-AP specification. The form is
          compliant with the minimum profile required by mobilityDCAT-AP.
        </p>
      </v-col>
      <v-col cols="4" class="text-center py-2">
        <img :src="logoSrc" alt="Company Logo" style="max-height: 100px;"/>
      </v-col>
    </v-row>

    <Alert v-for="(alert_message, index) in alert_messages" :key="index" :message="alert_message.message"
           :alert_type="alert_message.alert_type"/>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-form ref="form" v-model="valid">
            <JsonForm
                key="formKey"
                v-on:update:model="set_asset_value"
                v-bind:schema="asset_schema"
                v-bind:options="options"
            />
          </v-form>
          <p><br/></p>
          <v-btn @click="create_object" style="margin-top: 10px;">Generate</v-btn>
        </v-col>

        <v-col cols="6">
          <div v-if="saved_asset_rdf">
            <v-btn color="primary" @click="downloadRDF" class="mb-2">Download RDF</v-btn>
            <RDFTabs :rdfData="saved_asset" :highlightedRdfData="saved_asset_rdf"/>
          </div>
          <div v-else class="text-center">
            <img :src="noDataSrc" alt="No Data Available" style="max-width: 60%; height: auto; margin-top: 200px;"/>
            <p>Your RDF model will appear here!</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import JsonForm from './JsonForm.vue';
import Alert from './Alert.vue';
import PageTitle from './PageTitle.vue';
import RDFTabs from './RDFTabs.vue';
import Ajv from 'ajv';
import Prism from 'prismjs';
import 'prismjs/components/prism-turtle';
import 'prismjs/themes/prism.css';
import {v4 as uuidv4} from 'uuid';
import logoPath from '@/assets/logo.png';
import noDataPath from '@/assets/no_data.png';
import mdcatap_template from 'raw-loader!@/assets/mobility-lifting.jinja'

// Create a single AJV instance outside of the Vue component
const ajv = new Ajv({allErrors: true});

export default {
  name: 'AssetCreate',
  components: {
    JsonForm,
    PageTitle,
    Alert,
    RDFTabs,
  },
  props: {
    asset_type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      template_engine: null,
      template: null,
      valid: false,
      saved_asset_rdf: null,
      asset_schema: {},
      initial_asset: {},
      asset: {
        header: {
          identifier: '',
          name: '',
          description: '',
          publisher_name: '',
          publisher_email: '',
          access_url: '',
          creation_time: '',
          last_updated: '',
          type: '',
          id: '',
        },
        content: {
          mobility_themes: [],
          accrual_periodicity: '',
          spatial_coverage: '',
          temporal_coverage_start: '',
          temporal_coverage_end: '',
          distributions: []
        }
      },
      saved_asset: {},
      alert_messages: [],
      logoSrc: logoPath,
      noDataSrc: noDataPath,
      options: {
        context: {
          languages: require('@/assets/languages.json'),
        },
      },
    };
  },
  mounted() {
    // Load the schema and handle errors
    try {
      this.asset_schema = require('@/assets/mobilityDCAT-AP.json');
      console.log('Loaded schema:', this.asset_schema);
      // Further log the structure to ensure correct loading
      console.log('Schema properties:', Object.keys(this.asset_schema.properties));
    } catch (error) {
      console.error("Error loading schema:", error);
      this.alert_messages.push({message: 'Error loading schema', alert_type: 'error'});
    }

    // Verify template engine
    try {
      this.template_engine = require('nunjucks');
      console.log('Template engine loaded:', this.template_engine);
    } catch (error) {
      console.error("Error loading template engine:", error);
      this.alert_messages.push({message: 'Error loading template engine', alert_type: 'error'});
    }

    // Verify template loading
    try {
      this.template = this.template_engine.compile(mdcatap_template);
      console.log('Template compiled successfully');
    } catch (error) {
      console.error("Error compiling template:", error);
      this.alert_messages.push({message: 'Error compiling template', alert_type: 'error'});
    }
  },
  methods: {
    downloadRDF() {
      if (!this.saved_asset_rdf) return;

      const rdfElement = document.getElementById('rdf-text');
      console.log('Downloading RDF...');

      if (rdfElement) {
        let textToDownload = rdfElement.textContent || rdfElement.innerText;
        textToDownload = textToDownload.replace(/^\s*\n/gm, '').trim();

        const blob = new Blob([textToDownload], {type: 'text/plain;charset=utf-8'});
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'rdf-data.ttl');
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    },
    set_asset_value(event) {
      console.log('Asset value updated:', event);
      this.asset = event;
    },
    create_object() {
      console.log('Creating object...');
      this.$refs.form.validate();
      console.log('Form validation status:', this.valid);

      if (!this.valid) {
        this.alert_messages.push({message: 'Validation error', alert_type: 'error'});
      } else {
        this.alert_messages = [];
      }

      // Set vars that are hidden from the user
      this.asset.header.creation_time = new Date().toISOString();
      this.asset.header.last_updated = new Date().toISOString();
      this.asset.header.type = 'Dataset';
      this.asset.header.id = uuidv4();

      function slugify(str) {
        return String(str)
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
      }

      try {
        this.saved_asset = this.template.render({
          obj: this.asset,
          data_platform_url: 'https://kcong.cefriel.com/',
          slugify: slugify,
        });
        console.log('Saved asset:', this.saved_asset, 'Type:', typeof this.saved_asset);
      } catch (error) {
        console.log('Error rendering template:', error);
      }
      console.log(this.saved_asset)
      if (typeof this.saved_asset === 'string') {
        this.saved_asset = this.saved_asset.replace(/^\s*\n/gm, '');
        this.saved_asset_rdf = Prism.highlight(this.saved_asset, Prism.languages.turtle, 'turtle');
      } else {
        this.alert_messages.push({message: 'Template rendering did not produce a string', alert_type: 'error'});
      }
    }

  },
};
</script>

<style scoped>
.rdf-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.rdf-container pre {
  width: 100%;
}

.download-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}
</style>
