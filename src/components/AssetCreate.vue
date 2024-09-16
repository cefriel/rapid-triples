<template>
  <div>
    <PageTitle :title="asset_type" :show_breadcrumbs="true"/>
    <v-row class="px-10 my-2">
      <v-col cols="8" class="py-2">
        <p><b>Fill the form with all the metadata and download the RDF</b> representation using <a
            href="https://w3id.org/mobilitydcat-ap/">mobilityDCAT-AP</a>. Test and experiment to learn how different
          information should be described in RDF according to the mobilityDCAT-AP specification. The form is compliant
          with the minimum profile required by mobilityDCAT-AP.<br><br>
          The page is client-side only so all the information inserted are not collected/stored but can not be retrieved
          if the page is reloaded. The output RDF can be converted to different serializations using online converters
          such as <a href="https://rdfshape.weso.es/dataConvert">RDFShape</a>.<br><br>
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

            <v-btn color="primary" @click="downloadRDF" class="mb-2">Download RDF</v-btn>

            <rdf-editor
                class="h-full overflow-hidden"
                :value.prop="saved_asset"
                :format="selectedFormat"
                prefixes="schema"
                auto-parse
                parse-delay="1000"
                @parsing-failed="onParsingFailed"
                @quads-changed="onQuadsChanged"
                @prefixes-parsed="onPrefixesParsed"
            ></rdf-editor>
          </div>

          <!-- PDF Upload and Display -->
          <div v-else class="text-center" style="height: 85vh;">
            <div v-if="!selectedPdf">
              <img src="@/assets/upload_pdf.png" alt="No Data Available"
                   style="max-width: 60%; height: auto; margin-top: 200px;">
              <p>Choose a PDF to display the preview in this area!</p>
              <v-btn @click="selectFile" color="primary" class="mt-2">
                <v-icon left>mdi-upload</v-icon>
                Select PDF
              </v-btn>
              <input ref="pdfInput" type="file" accept="application/pdf" style="display:none" @change="onFileSelected">
            </div>
            <div v-else style="height: 100%;">
              <iframe :src="pdfUrl" style="width: 100%; height: 100%;" frameborder="0"></iframe>
              <!-- Button to send PDF name -->
              <v-btn @click="sendPdfName" color="success" class="mt-2">
                <v-icon left>mdi-api</v-icon>
                Send PDF
              </v-btn>
            </div>
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
import mdcatap_template from 'raw-loader!@/assets/mobility-lifting.jinja';
import rdf from 'rdf-ext';
import '@rdfjs-elements/rdf-editor';
import { parsers } from '@rdf-esm/formats-common'; // Updated

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
import Prism from 'prismjs';
import 'prismjs/components/prism-turtle'; // Import Turtle syntax highlighting
import 'prismjs/themes/prism.css';
import { v4 as uuidv4 } from 'uuid';


export default {
  name: 'AssetCreate',
  components: {
    JsonForm,
    PageTitle,
    Alert
  },
  data() {
    return {
      template_engine: null,
      template: null,
      valid: null,
      saved_asset_rdf: null,
      asset_schema: {},
      initial_asset: {},
      asset: {},
      saved_asset: {},
      alert_messages: [],
      selectedPdf: null,
      pdfUrl: null,
      formKey: 0,
      parseError: null,
      formats: [...parsers.keys()],
      selectedFormat: 'text/turtle', // Default format
      editorPrefixes: {},
      dataset: rdf.dataset(),
      options: {
        ajv: ajv,
        context: {
          languages: require("../assets/languages.json")
        }
      }
    };
  },
  mounted() {
    this.asset_schema = require("@/assets/mobilityDCAT-AP.json");
    this.template_engine = require('nunjucks');
    this.template = this.template_engine.compile(mdcatap_template);
  },
  methods: {


  onParsingFailed(e) {
      console.error('Parsing failed:', e.detail.error);
      this.parseError = e.detail.error;
    },
    onQuadsChanged(e) {
      console.log('Quads changed:', e.detail.value);
      this.dataset = rdf.dataset(e.detail.value);
    },
    onPrefixesParsed(e) {
      console.log('Prefixes parsed:', e.detail.prefixes);
      this.editorPrefixes = e.detail.prefixes;
    },
    downloadRDF() {
      if (!this.saved_asset) {
        this.alert_messages.push({message: 'No RDF content to download.', alert_type: 'error'});
        return;
      }

      const formatToExtension = {
        'text/turtle': 'ttl',
        'application/ld+json': 'jsonld',
        'application/rdf+xml': 'rdf'
      };

      const fileExtension = formatToExtension[this.selectedFormat] || 'ttl';

      const blob = new Blob([this.saved_asset], {type: this.selectedFormat});
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
      this.asset.header.type = "Dataset";
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
        this.saved_asset = this.template.render({
          obj: this.asset,
          data_platform_url: "https://kcong.cefriel.com/",
          slugify: slugify
        });
      } catch (error) {
        console.log(error);
      }
      this.saved_asset = this.saved_asset.replace(/^\s*\n/gm, "");
      this.saved_asset_rdf = Prism.highlight(this.saved_asset, Prism.languages.turtle, 'turtle');
    },
    selectFile() {
      this.$refs.pdfInput.click();
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      if (file && file.type === "application/pdf") {
        this.selectedPdf = file;
        this.pdfUrl = URL.createObjectURL(file);
      } else {
        this.alert_messages.push({message: 'Please select a valid PDF file.', alert_type: 'error'});
      }
    },
    sendPdfName() {
      if (this.selectedPdf) {
        const data = {
          "content": {
            "distributions": [],
            "spatial_coverage": "http://publications.europa.eu/resource/authority/country/ITA",
            "accrual_periodicity": "Continuously",
            "mobility_themes": ["Other"]
          },
          "header": {
            "publisher_email": "no-reply@cefriel.com",
            "publisher_name": "EXTRACTED FROM PDF",
            "description": "EXTRACTED FROM PDF",
            "name": "EXTRACTED FROM PDF",
            "identifier": "EXTRACTED FROM PDF"
          }
        };

        fetch('https://echo.zuplo.io/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(responseData => {
              const body = responseData.body;
              if (typeof responseData !== 'object') {
                throw new Error('The response is not a valid JSON object');
              }
              const validate = ajv.compile(this.asset_schema);
              console.log(body)

              const valid = validate(body);

              if (valid) {
                this.asset = {...body};
                this.formKey = Date.now();
                this.alert_messages.push({message: 'Data received and filled successfully', alert_type: 'success'});
              } else {
                const errors = validate.errors.map(err => `${err.instancePath} ${err.message}`).join(', ');
                throw new Error(`Schema validation failed: ${errors}`);
              }
            })
            .catch(error => {
              console.error("Error:", error);
              this.alert_messages.push({message: `Error: ${error.message}`, alert_type: 'error'});
            });
      }
    }
  }
};
</script>
