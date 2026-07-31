import type { VocabularyEntry, VocabularySource } from '@/assets/vocabularies'
import { brand } from '@/config/branding'

function resolveVocabularySourceUrl(source: string): string {
  // Keep fully qualified URLs unchanged.
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(source)) return source

  const baseUrl = import.meta.env.BASE_URL || '/'
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const normalizedSource = source.startsWith('/') ? source.slice(1) : source

  return `${normalizedBase}${normalizedSource}`
}

function languageMatches(actual: string | null, expected: string): boolean {
  if (!actual) return false
  const normalizedActual = actual.toLowerCase()
  const normalizedExpected = expected.toLowerCase()
  return normalizedActual === normalizedExpected || normalizedActual.startsWith(`${normalizedExpected}-`)
}

function pickLabel(
  labels: HTMLCollectionOf<Element>,
  defaultLang: string,
  preferredLang?: string,
): string | null {
  if (preferredLang) {
    for (const lbl of labels) {
      const txt = lbl.textContent?.trim()
      if (!txt) continue
      const lblLang = lbl.getAttributeNS('http://www.w3.org/XML/1998/namespace', 'lang')
        ?? lbl.getAttribute('xml:lang')
      if (languageMatches(lblLang, preferredLang)) return txt
    }
  }

  for (const lbl of labels) {
    const txt = lbl.textContent?.trim()
    if (!txt) continue
    const lblLang = lbl.getAttributeNS('http://www.w3.org/XML/1998/namespace', 'lang')
      ?? lbl.getAttribute('xml:lang')
    if (languageMatches(lblLang, defaultLang)) return txt
  }

  for (const lbl of labels) {
    const txt = lbl.textContent?.trim()
    if (txt) return txt
  }

  return null
}

/** Parse SKOS RDF/XML and extract concepts with prefLabel in the given language.
 *  Handles both skos:Concept and owl:NamedIndividual elements. */
function parseSkosRdfXml(xml: string, defaultLang: string, preferredLang?: string): VocabularyEntry[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'application/xml')
  const rdfNs = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
  const skosNs = 'http://www.w3.org/2004/02/skos/core#'
  const owlNs = 'http://www.w3.org/2002/07/owl#'

  const entries: VocabularyEntry[] = []

  const isSkosConcept = (el: Element): boolean => {
    if (el.namespaceURI === skosNs && el.localName === 'Concept') return true

    // Keep owl:NamedIndividual or rdf:Description only if explicitly typed as skos:Concept.
    if (
      (el.namespaceURI === owlNs && el.localName === 'NamedIndividual')
      || (el.namespaceURI === rdfNs && el.localName === 'Description')
    ) {
      const typeEls = el.getElementsByTagNameNS(rdfNs, 'type')
      return [...typeEls].some((typeEl) => {
        const typeIri = typeEl.getAttributeNS(rdfNs, 'resource') ?? typeEl.getAttribute('rdf:resource')
        return typeIri === `${skosNs}Concept`
      })
    }

    return false
  }

  // Parse only concept resources (never ConceptScheme).
  const candidates = doc.querySelectorAll('[*|about]')

  for (const el of candidates) {
    if (!isSkosConcept(el)) continue

    const iri = el.getAttributeNS(rdfNs, 'about')
      ?? el.getAttribute('rdf:about')
    if (!iri) continue

    const labels = el.getElementsByTagNameNS(skosNs, 'prefLabel')
    const label = pickLabel(labels, defaultLang, preferredLang)

    const broaderEls = el.getElementsByTagNameNS(skosNs, 'broader')
    const broaderIris = [...broaderEls]
      .map((broaderEl) => {
        return broaderEl.getAttributeNS(rdfNs, 'resource')
          ?? broaderEl.getAttribute('rdf:resource')
          ?? undefined
      })
      .filter((broader): broader is string => Boolean(broader))

    if (label) {
      const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1)
      entries.push({ label: capitalizedLabel, iri, broaderIris })
    }
  }

  return entries
}

// In-memory cache — populated once per app session
const memoryCache = new Map<string, VocabularyEntry[]>()

export async function loadVocabulary(vocab: VocabularySource): Promise<VocabularyEntry[]> {
  const preferredLang = brand.vocabularyLabelLang?.trim() || undefined
  const cacheKey = `${vocab.id}:${preferredLang ?? vocab.lang}`
  if (memoryCache.has(cacheKey)) return memoryCache.get(cacheKey)!

  const allEntries: VocabularyEntry[] = []

  for (const url of vocab.sources) {
    const resolvedUrl = resolveVocabularySourceUrl(url)
    const resp = await fetch(resolvedUrl)
    if (!resp.ok) throw new Error(`Failed to load vocabulary "${vocab.id}": HTTP ${resp.status} from ${resolvedUrl}`)
    const xml = await resp.text()
    allEntries.push(...parseSkosRdfXml(xml, vocab.lang, preferredLang))
  }

  // Deduplicate by IRI, sort alphabetically by label
  const byIri = new Map(allEntries.map(e => [e.iri, e]))
  const result = [...byIri.values()].sort((a, b) => a.label.localeCompare(b.label))

  memoryCache.set(cacheKey, result)
  return result
}

/** Build a label→IRI lookup map for use in templates */
export function buildIriMap(entries: VocabularyEntry[]): Record<string, string> {
  return Object.fromEntries(entries.map(e => [e.label, e.iri]))
}
