import { FilterType, SortType } from '../types'

import { api } from '../services/api'

export async function saveSettings(filter: FilterType, sortBy: SortType) {
  try {
    await api.put(
      '/me/settings',
      { filter, sortBy },
    )
  } catch (err) {
    console.error('Error saving settings:', err)
  }
}
