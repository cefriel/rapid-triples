import { ref, nextTick, type Ref } from 'vue'

const STORAGE_PREFIX = 'rapid-triples:formData:'

export function useFormData(formKey: Ref<string>, model: Ref<Record<string, unknown>>) {
  // false during programmatic model assignments; blocks vjsf's re-emitted defaults from being saved
  const loaded = ref(false)
  let debounceTimer: ReturnType<typeof setTimeout> | undefined

  function storageKey() {
    return STORAGE_PREFIX + formKey.value
  }

  function loadSaved(): Record<string, unknown> | null {
    try {
      const raw = localStorage.getItem(storageKey())
      if (raw) return JSON.parse(raw) as Record<string, unknown>
    } catch { /* ignore corrupt data */ }
    return null
  }

  function persist() {
    localStorage.setItem(storageKey(), JSON.stringify(model.value))
  }

  // Called from the vjsf @update:modelValue event — only fires on real user interactions
  function onUserChange() {
    if (!loaded.value) return
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => persist(), 500)
  }

  function clearForm() {
    clearTimeout(debounceTimer)
    loaded.value = false
    localStorage.removeItem(storageKey())
    model.value = {}
    // vjsf awaits nextTick before re-emitting defaults; our tick queues after its watcher trigger
    nextTick(() => { loaded.value = true })
  }

  function init() {
    clearTimeout(debounceTimer)
    loaded.value = false
    const saved = loadSaved()
    model.value = saved ?? {}
    nextTick(() => { loaded.value = true })
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(model.value, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formKey.value}-data.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  function uploadJson(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string)
          model.value = data
          persist()
          resolve()
        } catch (e) {
          reject(new Error('Invalid JSON file'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }

  return { init, clearForm, onUserChange, downloadJson, uploadJson, loaded }
}