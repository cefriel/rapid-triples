/**
 * Application message bundles for UI localization.
 *
 * To add a new language:
 *   1. Add a new entry to `bundles` below, keyed by its BCP-47 language tag (e.g. 'fr', 'de').
 *   2. Set `brand.locale` in src/config/branding.ts to that key.
 */

export interface Messages {
  // Notification messages
  formInvalid: string
  generateFailed: string
  jsonLoaded: string
  jsonFailed: string
  formCleared: string
  formatConversionFailed: string
  // Toolbar labels
  formTypeLabel: string
  toolbarHint: string
  uploadJson: string
  uploadJsonTitle: string
  downloadJson: string
  downloadJsonTitle: string
  clearForm: string
  clearFormTitle: string
  generateRdf: string
  generateRdfTitle: string
  // VJSF field-level messages (keys must match VJSF expectations)
  errorRequired: string
  errorOneOf: string
  addItem: string
  delete: string
  confirm: string
  edit: string
  close: string
  duplicate: string
  copy: string
  paste: string
  sort: string
  up: string
  down: string
  showHelp: string
  default: string
  name: string
  examples: string
  deprecated: string
  keyboardDate: string
  keyboardDateTime: string
}

const bundles: Record<string, Messages> = {
  en: {
    formInvalid: 'Form is not valid. Please correct the validation errors before generating.',
    generateFailed: 'RDF generation failed',
    jsonLoaded: 'JSON data loaded successfully',
    jsonFailed: 'Failed to load JSON',
    formCleared: 'Form cleared',
    formatConversionFailed: 'Format conversion failed',
    formTypeLabel: 'Form type',
    toolbarHint: 'Fill the form and click "Generate RDF" to convert to linked data.',
    uploadJson: 'Upload JSON',
    uploadJsonTitle: 'Upload existing form data as JSON',
    downloadJson: 'Download JSON',
    downloadJsonTitle: 'Download current form data as JSON',
    clearForm: 'Clear',
    clearFormTitle: 'Clear form',
    generateRdf: 'Generate RDF',
    generateRdfTitle: 'Generate RDF output',
    errorRequired: 'Required',
    errorOneOf: 'Select a value',
    addItem: 'Add item',
    delete: 'Delete',
    confirm: 'Confirm',
    edit: 'Edit',
    close: 'Close',
    duplicate: 'Duplicate',
    copy: 'Copy',
    paste: 'Paste',
    sort: 'Sort',
    up: 'Move up',
    down: 'Move down',
    showHelp: 'Show help',
    default: 'default: ',
    name: 'name: ',
    examples: 'Examples: ',
    deprecated: 'Deprecated',
    keyboardDate: 'MM/DD/YYYY',
    keyboardDateTime: 'MM/DD/YYYY HH:mm',
  },
  it: {
    formInvalid: 'Il form non è valido. Si prega di correggere gli errori di validazione prima di generare.',
    generateFailed: 'La generazione RDF è fallita',
    jsonLoaded: 'Dati JSON caricati con successo',
    jsonFailed: 'Caricamento JSON non riuscito',
    formCleared: 'Modulo svuotato',
    formatConversionFailed: 'Conversione del formato fallita',
    formTypeLabel: 'Tipo di form',
    toolbarHint: 'Compila il form e clicca "Genera RDF" per convertire in linked data.',
    uploadJson: 'Carica JSON',
    uploadJsonTitle: 'Carica i dati del form da un file JSON',
    downloadJson: 'Scarica JSON',
    downloadJsonTitle: 'Scarica i dati attuali del form come JSON',
    clearForm: 'Svuota',
    clearFormTitle: 'Svuota il form',
    generateRdf: 'Genera RDF',
    generateRdfTitle: 'Genera output RDF',
    errorRequired: 'Informazione obbligatoria',
    errorOneOf: 'Selezionare un valore',
    addItem: 'Aggiungi elemento',
    delete: 'Elimina',
    confirm: 'Conferma',
    edit: 'Modifica',
    close: 'Chiudi',
    duplicate: 'Duplica',
    copy: 'Copia',
    paste: 'Incolla',
    sort: 'Ordina',
    up: 'Sposta su',
    down: 'Sposta giù',
    showHelp: 'Mostra aiuto',
    default: 'predefinito: ',
    name: 'nome: ',
    examples: 'Esempi: ',
    deprecated: 'Informazione deprecata',
    keyboardDate: 'DD/MM/YYYY',
    keyboardDateTime: 'DD/MM/YYYY HH:mm',
  },
}

export function getMessages(locale?: string): Messages {
  return bundles[locale ?? 'en'] ?? bundles.en
}

export default bundles
