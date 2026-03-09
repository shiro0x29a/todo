import { api } from './api'
import { User, UserSchema, AccessToken, AccessTokenSchema } from '../schemas/auth'

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const data = await api.post('/login', { email, password })
    console.log(data)
    return AccessTokenSchema.parse(data)
  },

  async register(email: string, password: string): Promise<AccessToken> {
    const data = await api.post('/register', { email, password })
    console.log(data)
    return AccessTokenSchema.parse(data)
  },

  async me(): Promise<User> {
    const data = await api.get('/me')
    console.log(data)
    return UserSchema.parse(data)
  },
}
