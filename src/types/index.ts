import {
  Dispatch,
  SetStateAction,
} from 'react'


export type AuthMode = 'login' | 'register'

export interface User {
  email: string;
  password: string;
}

export interface AuthContextType {
  me: () => Promise<void>
  user: User | null
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  authMode: AuthMode
  setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  handleLogout: () => void
}

export interface Task {
  id: string
  text: string
  isCompleted: boolean
  createdAt: number
  editedAt?: number
}

export type SortType = 'created-desc' | 'created-asc' | 'edited-desc' | 'edited-asc'
export type FilterType = 'all' | 'completed' | 'uncompleted'

export interface TodoContextType {
  taskText: string
  setTaskText: Dispatch<SetStateAction<string>>
  handleSubmit: (e: React.FormEvent) => void

  filter: string
  showFilter: boolean
  handleFilter: (e: React.MouseEvent<HTMLButtonElement>, value: string) => void
  filterAll: () => void
  filterCompleted: () => void
  filterUncompleted: () => void

  sortBy: SortType
  setSortBy: Dispatch<SetStateAction<SortType>>

  tasks: Task[]
  taskToggle: (id: string) => void
  handleEdit: (id: string, newText: string) => void
  handleDeleteClick: (task: Task) => void

  currentPage: number
  totalPages: number
  setCurrentPage: Dispatch<SetStateAction<number>>

  showPopup: boolean
  handleConfirmDelete: () => void
  handleCancelDelete: () => void
}

