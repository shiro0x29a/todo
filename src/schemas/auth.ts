import { z } from 'zod'

import { FilterType, SortType } from '../types'

export const UserSchema = z.object({
  email: z.string().email(),
  filter: z.string(),
  sortBy: z.string()
})

export const AccessTokenSchema = z.object({
  token: z.string(),
  email: z.string().email(),
})

// export const LoginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
// })
//
// export const RegisterSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
// })

export type User = z.infer<typeof UserSchema>
export type AccessToken = z.infer<typeof AccessTokenSchema>
