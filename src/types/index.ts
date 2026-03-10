import {
  FormEvent,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from 'react'


export interface Task {
  id: number
  text: string
  isCompleted: boolean
  createdAt: number
  editedAt?: number
}

export type SortType = 'created-desc' | 'created-asc' | 'edited-desc' | 'edited-asc'
export type FilterType = 'all' | 'completed' | 'uncompleted'

export interface ITodoContext {
  taskText: string
  setTaskText: Dispatch<SetStateAction<string>>
  handleSubmit: () => void

  filter: string
  showFilter: boolean
  handleFilter: (e?: MouseEvent<HTMLButtonElement>, value?: boolean | string) => void
  filterAll: () => void
  filterCompleted: () => void
  filterUncompleted: () => void

  sortBy: SortType
  setSortBy: Dispatch<SetStateAction<SortType>>

  tasks: Task[]
  taskToggle: (id: number) => void
  handleEdit: (id: number, newText: string) => void
  handleDeleteClick: (id: number) => void

  currentPage: number
  totalPages: number
  setCurrentPage: Dispatch<SetStateAction<number>>

  showPopup: boolean
  handleConfirmDelete: () => void
  handleCancelDelete: () => void
}

export type AuthMode = 'login' | 'register'

export interface UserBase {
  email: string
}

export interface UserRegister extends UserBase {
  password: string
}

export interface UserLogin extends UserBase {
  password: string
}

export interface LoginResponse extends UserBase {
  token: string
}

export interface User extends UserBase {
  filter: FilterType | null
  sortBy: SortType | null
}

export interface IAuthContext {
  me: () => Promise<void>
  user: User | null
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  authMode: AuthMode
  setAuthMode: Dispatch<SetStateAction<AuthMode>>
  handleRegister: (e: FormEvent<HTMLFormElement>) => Promise<void>
  handleLogin: (e: FormEvent<HTMLFormElement>) => Promise<void>
  handleLogout: () => void
}

