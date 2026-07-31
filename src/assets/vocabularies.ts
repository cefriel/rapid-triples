/**
 * Controlled vocabulary registry for rapid-triples.
 *
 * Each entry in VOCABULARIES describes a SKOS RDF/XML vocabulary to load.
 * The `id` key is used to inject the parsed entries into the VJSF form context
 * under `context.vocabularies[id]`, making them available to form fields and
 * Nunjucks templates.
 *
 * To add a vocabulary:
 *   1. Place the SKOS RDF/XML file under public/vocabularies/.
 *   2. Add an entry to VOCABULARIES below.
 *   3. Reference it in your JSON Schema via x-display options or template filters.
 *
 * Example entry (uncomment and adapt):
 * {
 *   id: 'license',
 *   label: 'License',
 *   lang: 'en',
 *   schemaPath: 'license',
 *   sources: ['/vocabularies/licenses.rdf'],
 * },
 */

export interface VocabularyEntry {
  /** Display label (skos:prefLabel) */
  label: string
  /** Full IRI (rdf:about) */
  iri: string
  /** Optional broader concept IRIs (all skos:broader rdf:resource values) */
  broaderIris?: string[]
}

export interface VocabularySource {
  /** Unique key used to inject entries into the form context */
  id: string
  /** Human-readable name */
  label: string
  /** Paths to SKOS RDF/XML files (relative to public/ or fully qualified URLs; merged in order) */
  sources: string[]
  /** Default language for prefLabel extraction */
  lang: string
  /** Dot-separated JSON path within the form schema to the field holding enum values.
   *  For array item enums use "field.items". */
  schemaPath: string
}

export const VOCABULARIES: VocabularySource[] = [
  // Add your vocabulary sources here.
]
