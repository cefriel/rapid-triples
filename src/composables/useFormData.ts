import { ref, watch, type Ref, type WatchStopHandle } from 'vue'

const STORAGE_PREFIX = 'rapid-triples:formData:'

export function useFormData(formKey: Ref<string>, model: Ref<Record<string, unknown>>) {
  const loaded = ref(false)
  let autoSaveStopHandle: WatchStopHandle | null = null
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

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

  function clearForm() {
    localStorage.removeItem(storageKey())
    model.value = {}
  }

  function autoSave() {
    if (autoSaveStopHandle) return

    autoSaveStopHandle = watch(
      model,
      () => {
        if (!loaded.value) return
        if (debounceTimer) clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => persist(), 500)
      },
      { deep: true },
    )
  }

  function init() {
    const saved = loadSaved()
    model.value = saved ?? {}
    loaded.value = true
    autoSave()
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

  return { init, clearForm, downloadJson, uploadJson, loaded }
}
