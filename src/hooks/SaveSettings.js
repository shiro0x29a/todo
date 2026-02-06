import { api } from '../hooks/api'

export async function saveSettings(filter, sortBy) {
  try {
    await api.put(
      '/me/settings',
      { filter, sortBy },
    )
  } catch (err) {
    console.error('Error saving settings:', err)
  }
}
