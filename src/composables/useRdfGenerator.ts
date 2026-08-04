import { ref } from 'vue'
import nunjucks from 'nunjucks'
import * as N3 from 'n3'
import { JsonLdSerializer } from 'jsonld-streaming-serializer'
import type { FormConfig } from '@/assets/forms-config'
import type { VocabularyEntry } from '@/assets/vocabularies'

export type OutputFormat = 'Turtle' | 'N-Triples' | 'N-Quads' | 'JSON-LD'

export interface FormatOption {
  title: string
  value: OutputFormat
  mime: string
  ext: string
}

export const FORMAT_OPTIONS: FormatOption[] = [
  { title: 'Turtle', value: 'Turtle', mime: 'text/turtle', ext: '.ttl' },
  { title: 'N-Triples', value: 'N-Triples', mime: 'application/n-triples', ext: '.nt' },
  { title: 'N-Quads', value: 'N-Quads', mime: 'application/n-quads', ext: '.nq' },
  { title: 'JSON-LD', value: 'JSON-LD', mime: 'application/ld+json', ext: '.jsonld' },
]

function slugify(str: string): string {
  return String(str)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function cleanBlankLines(text: string): string {
  return text
    .split('\n')
    .filter((line) => line.trim() !== '')
    .join('\n')
}

export function useRdfGenerator() {
  const quads = ref<N3.Quad[]>([])
  const prefixes = ref<Record<string, string>>({})
  const rdfOutput = ref('')
  const currentFormat = ref<OutputFormat>('Turtle')
  const generating = ref(false)
  const error = ref<string | null>(null)

  async function generate(
    formData: Record<string, unknown>,
    config: FormConfig,
    vocabularies?: Record<string, VocabularyEntry[]>,
  ): Promise<string> {
    generating.value = true
    error.value = null

    try {
      // Load template
      const templateStr = await config.template()

      // Prepare data — inject header fields
      const data = JSON.parse(JSON.stringify(formData)) as Record<string, Record<string, unknown>>
      if (!data.header) data.header = {}
      if (!data.header.id) data.header.id = crypto.randomUUID()
      if (!data.header.created) data.header.created = new Date().toISOString()
      data.header.modified = new Date().toISOString()
      data.header.type = config.rdfClass

      // Render Nunjucks template
      const env = new nunjucks.Environment(null, { autoescape: false })
      env.addGlobal('slugify', slugify)
      env.addGlobal('now', () => new Date())

      const vocab_map: Record<string, Record<string, string>> = vocabularies
        ? Object.fromEntries(
            Object.entries(vocabularies).map(([id, entries]) => [
              id,
              Object.fromEntries(entries.map((e) => [e.label, e.iri])),
            ]),
          )
        : {}

      const rendered = cleanBlankLines(env.renderString(templateStr, { obj: data, slugify, data_platform_url: 'https://kcong.cefriel.com/', vocab_map }))

      // Parse into quads — use synchronous API (no callback) to avoid async timing issues
      const templateFormat = config.templateFormat || 'text/turtle'
      const parser = new N3.Parser({ format: templateFormat as string })
      const parsedQuads: N3.Quad[] = parser.parse(rendered)

      // Extract prefix declarations from the rendered string
      const parsedPrefixes: Record<string, string> = {}
      for (const line of rendered.split('\n')) {
        const m = line.match(/^@prefix\s+(\w*):\s+<([^>]+)>\s*\.?/)
        if (m) parsedPrefixes[m[1]] = m[2]
      }

      quads.value = parsedQuads
      prefixes.value = parsedPrefixes

      // Pre-select output format based on the template's MIME type
      const outputFormat = FORMAT_OPTIONS.find(f => f.mime === templateFormat)?.value ?? 'Turtle'
      currentFormat.value = outputFormat
      rdfOutput.value = await serializeTo(outputFormat)
      return rdfOutput.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
      throw e
    } finally {
      generating.value = false
    }
  }

  function serializeTo(format: OutputFormat): Promise<string> {
    return new Promise((resolve, reject) => {
      if (format === 'JSON-LD') {
        const serializer = new JsonLdSerializer({ space: '  ' })
        let result = ''
        serializer.on('data', (chunk: string) => { result += chunk })
        serializer.on('end', () => resolve(result))
        serializer.on('error', (e: Error) => reject(e))
        quads.value.forEach((q) => serializer.write(q))
        serializer.end()
      } else {
        const n3Format = format === 'Turtle' ? 'Turtle' : format === 'N-Triples' ? 'N-Triples' : 'N-Quads'
        const writer = new N3.Writer({
          format: n3Format,
          prefixes: format === 'Turtle' ? prefixes.value : undefined,
        })
        quads.value.forEach((q) => writer.addQuad(q))
        writer.end((err: Error | null, result: string) => {
          if (err) reject(err)
          else resolve(result)
        })
      }
    })
  }

  async function changeFormat(format: OutputFormat) {
    currentFormat.value = format
    rdfOutput.value = await serializeTo(format)
  }

  function getFileExtension(): string {
    return FORMAT_OPTIONS.find((f) => f.value === currentFormat.value)?.ext || '.ttl'
  }

  function downloadRdf(filename?: string) {
    const ext = getFileExtension()
    const mime = FORMAT_OPTIONS.find((f) => f.value === currentFormat.value)?.mime || 'text/turtle'
    const blob = new Blob([rdfOutput.value], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (filename || 'output') + ext
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  function clear() {
    quads.value = []
    prefixes.value = {}
    rdfOutput.value = ''
    error.value = null
  }

  return {
    quads,
    rdfOutput,
    currentFormat,
    generating,
    error,
    generate,
    changeFormat,
    downloadRdf,
    clear,
  }
}
