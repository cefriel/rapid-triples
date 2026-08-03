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
        class="mr-2 toolbar-select"
        :label="msgs.formTypeLabel"
      />

      <span class="toolbar-hint">{{ msgs.toolbarHint }}</span>

      <v-spacer class="toolbar-spacer" />

      <div class="toolbar-actions">
        <v-btn
          size="small"
          variant="text"
          prepend-icon="mdi-upload"
          :title="msgs.uploadJsonTitle"
          @click="triggerUpload"
        >
          <span class="btn-text-desktop">{{ msgs.uploadJson }}</span>
        </v-btn>
        <v-btn
          size="small"
          variant="text"
          prepend-icon="mdi-download"
          :title="msgs.downloadJsonTitle"
          :disabled="!hasData"
          @click="formDataHelper.downloadJson()"
        >
          <span class="btn-text-desktop">{{ msgs.downloadJson }}</span>
        </v-btn>
        <v-btn
          size="small"
          variant="text"
          prepend-icon="mdi-eraser"
          :title="msgs.clearFormTitle"
          @click="onClear"
        >
          <span class="btn-text-desktop">{{ msgs.clearForm }}</span>
        </v-btn>
        <v-btn
          size="small"
          variant="flat"
          color="primary"
          :title="msgs.generateRdfTitle"
          :loading="rdfGen.generating.value"
          :disabled="!hasData"
          class="generate-rdf-btn"
          @click="onGenerate"
        >
          <v-icon icon="mdi-cog" class="icon-only-mobile" />
          <span class="btn-text-desktop">{{ msgs.generateRdf }}</span>
        </v-btn>
      </div>
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

    <!-- Content: form only (no output) or form + RDF side-by-side (with output) -->
    <div
      :class="[
        'form-rdf-layout',
        rdfText ? 'with-rdf' : 'form-only',
      ]"
    >
      <div class="form-section">
        <v-container fluid class="pa-4">
          <v-form v-if="schema" ref="formRef" v-model="isFormValid">
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

      <div v-if="rdfText" class="rdf-section">
        <rdf-output
          :code="rdfText"
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
import formsRegistry, { getFormOptions, getFormKeys, type FormConfig } from '@/assets/forms-config'
import { useFormData } from '@/composables/useFormData'
import { useRdfGenerator } from '@/composables/useRdfGenerator'
import { VOCABULARIES, type VocabularyEntry } from '@/assets/vocabularies'
import { loadVocabulary } from '@/composables/useVocabulary'
import { getMessages } from '@/assets/messages'
import { brand } from '@/config/branding'
import RdfOutput from '@/components/RdfOutput.vue'

const effectiveLocale = brand.locale ?? (navigator.language?.split('-')[0] ?? 'en')
const msgs = computed(() => getMessages(effectiveLocale))

const formOptions = getFormOptions()
const selectedForm = ref(getFormKeys()[0] || 'demo')
const model = ref<Record<string, unknown>>({})
const schema = shallowRef<Record<string, unknown> | null>(null)
const formRef = ref<{
  validate?: () => Promise<{ valid: boolean } | boolean> | { valid: boolean } | boolean
  resetValidation?: () => void
} | null>(null)
const isFormValid = ref(false)
const vocabContext = ref<Record<string, VocabularyEntry[]>>({})
const fileInput = ref<HTMLInputElement | null>(null)

const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref<string | undefined>(undefined)

function notify(text: string, color?: string) {
  snackbarText.value = text
  snackbarColor.value = color
  snackbar.value = true
}

const vjsfOptions = computed(() => ({
  density: 'comfortable' as const,
  readOnlyPropertiesMode: 'hide' as const,
  useExamples: 'items' as const,
  locale: effectiveLocale,
  initialValidation: 'never' as const,
  validateOn: 'blur' as const,
  messages: {
    errorRequired: msgs.value.errorRequired,
    errorOneOf: msgs.value.errorOneOf,
    addItem: msgs.value.addItem,
    delete: msgs.value.delete,
    confirm: msgs.value.confirm,
    edit: msgs.value.edit,
    close: msgs.value.close,
    duplicate: msgs.value.duplicate,
    copy: msgs.value.copy,
    paste: msgs.value.paste,
    sort: msgs.value.sort,
    up: msgs.value.up,
    down: msgs.value.down,
    showHelp: msgs.value.showHelp,
    default: msgs.value.default,
    name: msgs.value.name,
    examples: msgs.value.examples,
    deprecated: msgs.value.deprecated,
    keyboardDate: msgs.value.keyboardDate,
    keyboardDateTime: msgs.value.keyboardDateTime,
  },
  context: {
    vocabularies: vocabContext.value,
  },
}) as any)

const formDataHelper = useFormData(selectedForm, model)
const rdfGen = useRdfGenerator()
const { rdfOutput: rdfText, currentFormat } = rdfGen

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

  const vocabularyPairs = await Promise.all(
    VOCABULARIES.map(async (vocab) => {
      const entries = await loadVocabulary(vocab)
      return [vocab.id, entries] as const
    }),
  )
  vocabContext.value = Object.fromEntries(vocabularyPairs) as Record<string, VocabularyEntry[]>

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

  const validationResult = await formRef.value?.validate?.()
  const valid = typeof validationResult === 'boolean'
    ? validationResult
    : (validationResult?.valid ?? isFormValid.value)

  if (!valid) {
    isFormValid.value = false
    notify(msgs.value.formInvalid, 'error')
    return
  }

  isFormValid.value = true

  try {
    await rdfGen.generate(model.value, currentConfig)
  } catch (e) {
    notify(e instanceof Error ? e.message : msgs.value.generateFailed, 'error')
  }
}

async function onFormatChange(format: Parameters<typeof rdfGen.changeFormat>[0]) {
  try {
    await rdfGen.changeFormat(format)
  } catch (e) {
    notify(msgs.value.formatConversionFailed, 'error')
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
    notify(msgs.value.jsonLoaded, 'success')
  } catch (e) {
    notify(e instanceof Error ? e.message : msgs.value.jsonFailed, 'error')
  }
  input.value = ''
}

function onClear() {
  formDataHelper.clearForm()
  formRef.value?.resetValidation?.()
  isFormValid.value = false
  rdfGen.clear()
  notify(msgs.value.formCleared)
}
</script>

<style scoped>
.form-rdf-layout {
  min-height: 0;
}

.form-rdf-layout.with-rdf {
  display: flex;
  align-items: stretch;
  min-height: calc(100vh - 96px);
}

.form-rdf-layout.form-only {
  display: block;
  max-width: 860px;
  margin: 0 auto;
}

.form-rdf-layout.form-only .form-section {
  flex: none;
}

.form-section {
  flex: 1 1 0;
  min-width: 0;
  font-size: 0.85rem;
}

.form-section :deep(.v-label),
.form-section :deep(.v-field__input),
.form-section :deep(.v-input),
.form-section :deep(.v-messages),
.form-section :deep(.vjsf-property) {
  font-size: 0.85rem;
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

.toolbar-secondary :deep(.v-toolbar__content) {
  gap: 0.4rem;
}

.toolbar-select {
  max-width: 160px;
  margin-top: 6px;
  font-size: 0.8rem;
}

.toolbar-select :deep(.v-field__input) {
  font-size: 0.8rem;
  min-height: 28px;
  padding-top: 2px;
  padding-bottom: 2px;
}

.toolbar-select :deep(.v-label) {
  font-size: 0.8rem;
}

.toolbar-hint {
  font-size: 0.8rem;
  color: #666;
  margin-left: 0.5rem;
  white-space: nowrap;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 0.1rem;
  margin-left: auto;
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
    display: none;
  }

  .toolbar-select {
    max-width: 130px;
    margin-top: 6px;
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
  .form-rdf-layout.with-rdf {
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
