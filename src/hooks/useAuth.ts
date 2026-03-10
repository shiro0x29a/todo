import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'

import { User, AccessToken } from '../schemas/auth'
import { authService } from '../services/auth'
import { useAuthStore } from '../store/auth'

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser)

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data: AccessToken) => {
      localStorage.setItem('token', data.token ?? '')
      setUser({ email: data.email, filter: 'all', sortBy: 'created-desc' })
    },
    onError: (err: any) => {
      console.error(err)
    }
  })
}

export function useRegister() {
  const setUser = useAuthStore((s) => s.setUser)

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.register(email, password),
    onSuccess: (data: AccessToken) => {
      localStorage.setItem('token', data.token ?? '')
      setUser({ email: data.email, filter: 'all', sortBy: 'created-desc' })
    },
    onError: (err: any) => {
      console.error(err)
    }
  })
}

export function useMe() {
  const setUser = useAuthStore((s) => s.setUser)

  return useQuery<User, Error>({
    queryKey: ['me'],
    queryFn: async () => {
      const user: User = await authService.me()
      setUser(user)
      return user
    },
    enabled: !!localStorage.getItem('token'),
    onError: (err: any) => {
      console.error(err)
    }
  } as UseQueryOptions<User, Error>)
}
