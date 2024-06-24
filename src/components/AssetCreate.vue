<template>

    <div>
        <PageTitle :title="asset_type" :show_breadcrumbs="true" />
        <v-row class="px-10 my-2">
            <v-col cols="8" class="py-2">
                <p>Fill the form with all the metadata and download the RDF representation using <a href="https://w3id.org/mobilitydcat-ap/">mobilityDCAT-AP</a>.<br>
                Test and experiment with different metadata to learn how different information are described according to the moilityDCAT-AP specification. The form is compliant with the minimum profile required by mobilityDCAT-AP.<br>
                The page is client-side only so all the information inserted are not collected/stored but can not be retrieved if the page is reloaded.</p>
            </v-col>
            <v-col cols="4" class="text-right py-2">
                <img src="@/assets/logo.png" alt="Company Logo" style="max-height: 100px;">
            </v-col>
        </v-row>


        <Alert v-for="(alert_message, index) in alert_messages" :key="index" :message="alert_message.message"
            :alert_type="alert_message.alert_type" />
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-form ref="form" v-model="valid">
                        <JsonForm key="formKey" v-on:update:model="set_asset_value" 
                            v-bind:schema="asset_schema" v-bind:options="options" />
                    </v-form>
                    <v-btn @click="create_object">Submit</v-btn>
                </v-col>

                <v-col cols="6">
                    <div v-if="saved_asset_rdf" class="rdf-container">
                        <v-btn color="primary" @click="downloadRDF" class="mb-2">Download RDF</v-btn>
                        <pre id="rdf-text" class="language-turtle">
                            <p class="language-turtle" v-html="saved_asset_rdf"></p>
                        </pre>
                    </div>
                    <div v-else class="text-center">
                        <img src="@/assets/no_data.png" alt="No Data Available"
                            style="max-width: 60%; height: auto; margin-top: 200px;">
                        <p>Your RDF model will appear here!</p>
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
import { v4 as uuidv4 } from 'uuid';

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
            saved_asset_rdf:null,
            asset_schema: {},
            initial_asset: {},
            asset: {},
            saved_asset: {},
            alert_messages: [],
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

        const blob = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
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
                this.alert_messages.push({ message: 'Validation error', alert_type: 'error' });
            }
            else {
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

            let freq_iri = {
                "Continuously": "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT",
                "Never (one-time provision)": "http://publications.europa.eu/resource/authority/frequency/NEVER",
                "On occurrence / irregularly": "http://publications.europa.eu/resource/authority/frequency/IRREG",
                "Up to 1min": "https://w3id.org/mobilitydcat-ap/update-frequency/1min",
                "Up to 5min": "https://w3id.org/mobilitydcat-ap/update-frequency/5min",
                "Up to 10 min": "https://w3id.org/mobilitydcat-ap/update-frequency/10min",
                "Up to 15 min": "https://w3id.org/mobilitydcat-ap/update-frequency/15min",
                "Up to 30 min": "https://w3id.org/mobilitydcat-ap/update-frequency/30min",
                "Up to 1h": "http://publications.europa.eu/resource/authority/frequency/HOURLY",
                "Up to 2h": "http://publications.europa.eu/resource/authority/frequency/BIHOURLY",
                "Up to 3h": "http://publications.europa.eu/resource/authority/frequency/TRIHOURLY",
                "Up to 12h": "https://w3id.org/mobilitydcat-ap/update-frequency/12h",
                "Up to 24h": "https://w3id.org/mobilitydcat-ap/update-frequency/24h",
                "Up to Weekly": "http://publications.europa.eu/resource/authority/frequency/WEEKLY",
                "Up to Monthly": "http://publications.europa.eu/resource/authority/frequency/MONTHLY",
                "Up to every 2 months": "http://publications.europa.eu/resource/authority/frequency/BIMONTHLY",
                "Up to every 3 months": "http://publications.europa.eu/resource/authority/frequency/QUARTERLY",
                "Up to every 6 months": "https://w3id.org/mobilitydcat-ap/update-frequency/6-months",
                "Up to Annual": "http://publications.europa.eu/resource/authority/frequency/ANNUAL",
                "Up to Biennial": "http://publications.europa.eu/resource/authority/frequency/BIENNIAL",
                "Up to Triennial": "http://publications.europa.eu/resource/authority/frequency/TRIENNIAL",
                "Up to Quadrennial": "http://publications.europa.eu/resource/authority/frequency/QUADRENNIAL",
                "Up to Quinquennial": "http://publications.europa.eu/resource/authority/frequency/QUINQUENNIAL",
                "Up to Decennial": "http://publications.europa.eu/resource/authority/frequency/DECENNIAL",
                "Up to Bidecennial": "http://publications.europa.eu/resource/authority/frequency/BIDECENNIAL",
                "Up to Tridecennial": "http://publications.europa.eu/resource/authority/frequency/TRIDECENNIAL",
                "Unknown": "http://publications.europa.eu/resource/authority/frequency/UNKNOWN"
            };

            try {
                this.saved_asset = this.template.render({
                    obj: this.asset,
                    data_platform_url: "https://kcong.cefriel.com/",
                    freq_iri: freq_iri,
                    slugify: slugify
                });
            }
            catch (error) {
                console.log(error);
            }
            this.saved_asset = this.saved_asset.replace(/^\s*\n/gm, "");
            this.saved_asset_rdf = Prism.highlight(this.saved_asset, Prism.languages.turtle, 'turtle');
        }
    }
}

</script>
