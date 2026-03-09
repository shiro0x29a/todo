import { api } from '../services/api'
import { useAuthStore } from '../store/auth'

export async function saveSettings(filter, sortBy) {
  try {
    await api.put(
      '/me/settings',
      { filter, sortBy },
    )

    // const user = useAuthStore.getState().user
    // const setUser = useAuthStore.getState().setUser
    //
    // if (user) {
    //   setUser({
    //     ...user,
    //     filter,
    //     sortBy,
    //   })
  } catch (err) {
    console.error('Error saving settings:', err)
  }
}
