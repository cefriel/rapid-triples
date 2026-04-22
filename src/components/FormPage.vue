<template>
  <div>
    <!-- Toolbar -->
    <v-toolbar density="compact" color="transparent" class="px-2 toolbar-secondary">
      <v-select
        v-if="formOptions.length > 1"
        v-model="selectedForm"
        :items="formOptions"
        item-title="title"
        item-value="value"
        density="compact"
        variant="outlined"
        hide-details
        style="max-width: 220px"
        class="mr-2"
        label="Form type"
      />

      <span class="toolbar-hint">Fill the form and click "Generate RDF" to convert to linked data.</span>

      <v-spacer />

      <v-btn
        size="small"
        variant="text"
        prepend-icon="mdi-upload"
        title="Upload existing form data as JSON"
        @click="triggerUpload"
      >
        <span class="btn-text-desktop">Upload JSON</span>
      </v-btn>
      <v-btn
        size="small"
        variant="text"
        prepend-icon="mdi-download"
        title="Download current form data as JSON"
        :disabled="!hasData"
        @click="formDataHelper.downloadJson()"
      >
        <span class="btn-text-desktop">Download JSON</span>
      </v-btn>
      <v-btn
        size="small"
        variant="text"
        prepend-icon="mdi-eraser"
        title="Clear form"
        @click="onClear"
      >
        <span class="btn-text-desktop">Clear</span>
      </v-btn>
      <v-btn
        size="small"
        variant="flat"
        color="primary"
        title="Generate RDF output"
        :loading="rdfGen.generating.value"
        :disabled="!hasData"
        class="generate-rdf-btn"
        @click="onGenerate"
      >
        <v-icon icon="mdi-cog" class="icon-only-mobile" />
        <span class="btn-text-desktop">Generate RDF</span>
      </v-btn>
    </v-toolbar>

    <v-divider color="secondary" />

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      accept=".json"
      style="display: none"
      @change="onFileSelected"
    />

    <!-- Content: form + RDF side-by-side on desktop, stacked on mobile -->
    <div class="form-rdf-layout">
      <div class="form-section">
        <v-container fluid class="pa-4">
          <v-form v-if="schema">
            <vjsf
              v-model="model"
              :schema="schema"
              :options="vjsfOptions"
            />
          </v-form>
          <div v-else class="text-center pa-8">
            <v-progress-circular indeterminate color="primary" />
          </div>
        </v-container>
      </div>

      <div v-if="rdfOutput" class="rdf-section">
        <rdf-output
          :code="rdfOutput"
          :format="currentFormat"
          @update:format="onFormatChange"
          @download="onDownloadRdf"
        />
      </div>
    </div>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000" location="bottom right">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, shallowRef } from 'vue'
import Vjsf from '@koumoul/vjsf'
import '@koumoul/vjsf/styles/vjsf.css'
import RdfOutput from '@/components/RdfOutput.vue'
import formsRegistry, { getFormOptions, getFormKeys, type FormConfig } from '@/assets/forms-config'
import { useFormData } from '@/composables/useFormData'
import { useRdfGenerator } from '@/composables/useRdfGenerator'

const formOptions = getFormOptions()
const selectedForm = ref(getFormKeys()[0] || 'demo')
const model = ref<Record<string, unknown>>({})
const schema = shallowRef<Record<string, unknown> | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref<string | undefined>(undefined)

function notify(text: string, color?: string) {
  snackbarText.value = text
  snackbarColor.value = color
  snackbar.value = true
}

const vjsfOptions = {
  density: 'comfortable' as const,
  readOnlyPropertiesMode: 'hide' as const,
  useExamples: true,
  locale: 'en',
  initialValidation: 'always' as const,
}

const formDataHelper = useFormData(selectedForm, model)
const rdfGen = useRdfGenerator()
const { rdfOutput, currentFormat } = rdfGen

const hasData = computed(() => {
  return model.value && Object.keys(model.value).length > 0
})

let currentConfig: FormConfig | undefined

async function loadForm(key: string) {
  const cfg = formsRegistry[key]
  if (!cfg) return
  currentConfig = cfg
  schema.value = null
  rdfGen.clear()

  const loadedSchema = await cfg.schema()
  schema.value = loadedSchema

  // Load saved data or start fresh
  formDataHelper.init()
}

watch(selectedForm, (key) => {
  loadForm(key)
})

onMounted(() => {
  loadForm(selectedForm.value)
})

async function onGenerate() {
  if (!currentConfig) return
  try {
    await rdfGen.generate(model.value, currentConfig)
  } catch (e) {
    notify(e instanceof Error ? e.message : 'RDF generation failed', 'error')
  }
}

async function onFormatChange(format: Parameters<typeof rdfGen.changeFormat>[0]) {
  try {
    await rdfGen.changeFormat(format)
  } catch (e) {
    notify('Format conversion failed', 'error')
  }
}

function onDownloadRdf() {
  const name = (model.value as Record<string, Record<string, string>>)?.header?.name || 'output'
  rdfGen.downloadRdf(name.replace(/\s+/g, '-').toLowerCase())
}

function triggerUpload() {
  fileInput.value?.click()
}

async function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  try {
    await formDataHelper.uploadJson(file)
    notify('JSON data loaded successfully', 'success')
  } catch (e) {
    notify(e instanceof Error ? e.message : 'Failed to load JSON', 'error')
  }
  input.value = ''
}

function onClear() {
  formDataHelper.clearForm()
  rdfGen.clear()
  notify('Form cleared')
}
</script>

<style scoped>
.form-rdf-layout {
  display: flex;
  align-items: stretch;
  min-height: calc(100vh - 96px);
}

.form-section {
  flex: 1 1 0;
  min-width: 0;
}

.rdf-section {
  flex: 1 1 0;
  min-width: 0;
  border-left: 2px solid rgb(var(--v-theme-secondary));
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.toolbar-secondary {
  background-color: rgba(var(--v-theme-secondary), 0.3) !important;
}

.toolbar-hint {
  font-size: 0.8rem;
  color: #666;
  margin-left: 0.5rem;
  white-space: nowrap;
}

.btn-text-desktop {
  display: inline;
}

.generate-rdf-btn {
  margin-left: 10px;
}

.icon-only-mobile {
  display: none;
}

@media (max-width: 600px) {
  .toolbar-hint {
    font-size: 0.65rem;
    margin-left: 0.25rem;
    display: block;
    max-width: 240px;
    white-space: normal;
  }

  .btn-text-desktop {
    display: none;
  }

  .generate-rdf-btn {
    margin-left: 0;
  }

  .icon-only-mobile {
    display: block;
  }
}

@media (max-width: 960px) {
  .form-rdf-layout {
    flex-direction: column;
  }

  .rdf-section {
    flex: none;
    width: 100%;
    min-height: 400px;
    border-left: none;
    border-top: 2px solid rgb(var(--v-theme-secondary));
    padding: 1rem;
    box-sizing: border-box;
  }
}
</style>
