import { z } from 'zod'

import { FilterTypeSchema, SortTypeSchema } from './todo'

export const UserSchema = z.object({
  email: z.string().email(),
  filter: FilterTypeSchema.default('all'),
  sortBy: SortTypeSchema.default('created-desc'),
})

export const AccessTokenSchema = z.object({
  token: z.string(),
  email: z.string().email(),
})

export type User = z.infer<typeof UserSchema>
export type AccessToken = z.infer<typeof AccessTokenSchema>
