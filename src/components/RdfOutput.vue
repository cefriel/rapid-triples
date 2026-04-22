<template>
  <div class="rdf-viewer">
    <div class="rdf-header">
      <select
        v-model="selectedFormat"
        class="rdf-format-select"
        @change="onFormatChange"
      >
        <option
          v-for="fmt in FORMAT_OPTIONS"
          :key="fmt.value"
          :value="fmt.value"
        >
          {{ fmt.title }}
        </option>
      </select>

      <div class="rdf-controls">
        <v-btn
          icon="mdi-content-copy"
          size="small"
          variant="text"
          title="Copy to clipboard"
          :disabled="!code"
          @click="copyToClipboard"
        />
        <v-btn
          icon="mdi-download"
          size="small"
          variant="text"
          title="Download RDF"
          :disabled="!code"
          @click="downloadRdf"
        />
        <v-btn
          icon="mdi-wrap"
          size="small"
          variant="text"
          :color="wrapLines ? 'primary' : undefined"
          title="Toggle line wrap"
          @click="wrapLines = !wrapLines"
        />
      </div>
    </div>

    <div class="rdf-content-container">
      <pre
        v-if="code"
        :class="['rdf-code-block', { 'wrap-lines': wrapLines }]"
      ><code v-html="highlightedCode"></code></pre>
      <div v-else class="rdf-placeholder">
        Click "Generate RDF" to see content here.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-turtle'
import 'prismjs/themes/prism.css'
import { FORMAT_OPTIONS, type OutputFormat } from '@/composables/useRdfGenerator'

const props = defineProps<{
  code: string
  format: OutputFormat
}>()

const emit = defineEmits<{
  'update:format': [format: OutputFormat]
  download: []
}>()

const selectedFormat = ref<OutputFormat>(props.format)
const wrapLines = ref(true)
const copied = ref(false)
const highlightedCode = ref('')

function getLanguage(format: OutputFormat): string {
  return format === 'JSON-LD' ? 'javascript' : 'turtle'
}

function renderHighlight() {
  const content = props.code
  if (!content) { highlightedCode.value = ''; return }
  const lang = getLanguage(selectedFormat.value)
  const grammar = Prism.languages[lang]
  if (grammar) {
    highlightedCode.value = Prism.highlight(content, grammar, lang)
  } else {
    highlightedCode.value = escapeHtml(content)
  }
}

// Watch props and re-highlight
watch(() => props.code, () => { renderHighlight() }, { immediate: true })
watch(() => props.format, (val) => {
  selectedFormat.value = val
  renderHighlight()
})

function onFormatChange() {
  emit('update:format', selectedFormat.value)
}

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function downloadRdf() {
  emit('download')
}

async function copyToClipboard() {
  if (!props.code) return
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = props.code
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>

<style>
.rdf-viewer {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0;
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.rdf-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.rdf-controls {
  display: flex;
  align-items: center;
}

.rdf-format-select {
  padding: 0.2rem 0.4rem;
  border-radius: 0;
  border: 1px solid rgba(0, 0, 0, 0.23);
  background: white;
  color: #374151;
  font-size: 0.8rem;
  cursor: pointer;
  transition: border-color 0.15s ease;
  min-width: 110px;
}

.rdf-format-select:focus {
  outline: none;
  border-color: rgb(var(--v-theme-primary));
}

.rdf-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  font-size: 0.8rem;
  color: #374151;
  user-select: none;
}

.rdf-checkbox {
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.rdf-wrap-toggle,
.rdf-checkbox,
.rdf-action-btn { display: none; }

.rdf-content-container {
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.rdf-code-block {
  margin: 0;
  flex: 1 1 0;
  height: 100%;
  overflow: auto;
  font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  min-height: 0;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0;
}

.rdf-code-block code {
  display: block;
  padding: 1rem;
  white-space: pre;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.rdf-code-block.wrap-lines code {
  white-space: pre-wrap;
}

.rdf-placeholder {
  padding: 2rem;
  text-align: center;
  color: #9ca3af;
  font-style: italic;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0;
  background: #f8fafc;
}

@media (max-width: 768px) {
  .rdf-header {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .rdf-format-select {
    width: 100%;
  }

  .rdf-controls {
    width: 100%;
    justify-content: flex-start;
  }

  .rdf-viewer {
    height: auto;
  }

  .rdf-content-container {
    flex: none;
  }

  .rdf-code-block {
    flex: none;
    height: 360px;
  }
}
</style>
