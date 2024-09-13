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
            <JsonForm key="formKey" v-on:update:model="set_asset_value"
                      v-bind:schema="asset_schema" v-bind:options="options"/>
          </v-form>
          <p><br></p>
          <v-btn @click="create_object" style="margin-top: 10px;">Generate</v-btn>
        </v-col>

        <v-col cols="6">
          <div v-if="saved_asset_rdf" class="rdf-container">
            <v-btn color="primary" @click="downloadRDF" class="mb-2">Download RDF</v-btn>
            <pre id="rdf-text" class="language-turtle">
                            <p class="language-turtle" v-html="saved_asset_rdf"></p>
                        </pre>
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
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

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
<script>

import JsonForm from './JsonForm';
import Alert from './Alert.vue'
import PageTitle from './PageTitle.vue';
import Ajv from "ajv"
import mdcatap_template from 'raw-loader!@/assets/mobility-lifting.jinja'

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
import Prism from 'prismjs';
import 'prismjs/components/prism-turtle'; // Import Turtle syntax highlighting
import 'prismjs/themes/prism.css';
import {v4 as uuidv4} from 'uuid';

export default {
  name: 'AssetCreate',
  components: {
    JsonForm,
    PageTitle,
    Alert
  },
  props: {
    asset_type: String,
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
      options: {
        ajv: ajv,
        context: {
          languages: require("../assets/languages.json")
        }
      }
    }
  },
  mounted() {
    // Asset type schema
    this.asset_schema = require("@/assets/mobilityDCAT-AP.json");
    this.template_engine = require('nunjucks');
    this.template = this.template_engine.compile(mdcatap_template);
  },
  methods: {
    downloadRDF() {
      if (!this.saved_asset_rdf) return;

      const rdfElement = document.getElementById('rdf-text');

      if (rdfElement) {
        let textToDownload = rdfElement.textContent || rdfElement.innerText;

        textToDownload = textToDownload.replace(/^\s*\n/gm, "").trim();

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
    set_asset_value: function (event) {
      this.asset = event;
    },
    create_object: function () {
      this.$refs.form.validate();
      if (!this.valid) {
        this.alert_messages.push({message: 'Validation error', alert_type: 'error'});
      } else {
        this.alert_messages = [];
      }

      // Set vars that are hidden from the user
      this.asset.header.creation_time = new Date().toISOString();
      this.asset.header.last_updated = new Date().toISOString();
      this.asset.header.type = "Dataset";
      this.asset.header.id = uuidv4();

      function slugify(str) {
        return String(str).normalize('NFKD') // split accented characters into their base characters and diacritical
            .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
            .trim() // trim leading or trailing whitespace
            .toLowerCase() // convert to lowercase
            .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-'); // remove consecutive hyphens
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
    }
  }
}
</script>
