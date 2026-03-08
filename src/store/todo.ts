import { create } from "zustand"

type Filter = "all" | "completed" | "uncompleted"
type SortType = "created-desc" | "created-asc"

import { FilterType, SortType } from '../types'

interface TodoStore {
  taskText: string
  setTaskText: (text: string) => void

  filter: FilterType
  sortBy: SortType

  selectedTask: string | null
  showPopup: boolean

  setFilter: (f: FilterType) => void
  setSortBy: (s: SortType) => void
  setPage: (p: number) => void

  openDeletePopup: (id: string) => void
  closeDeletePopup: () => void

  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  setTotalPages: (pages: number) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  taskText: "",
  setTaskText: (text) =>
    set({ taskText: text }),

  filter: "all",
  sortBy: "created-desc",

  selectedTask: null,
  showPopup: false,

  setFilter: (filter) =>
    set({ filter, currentPage: 1 }),

  setSortBy: (sortBy) =>
    set({ sortBy }),

  setPage: (currentPage) =>
    set({ currentPage }),

  openDeletePopup: (id) =>
    set({
      selectedTask: id,
      showPopup: true
    }),

  closeDeletePopup: () =>
    set({
      selectedTask: null,
      showPopup: false
    }),

  currentPage: 1,
  totalPages: 1,

  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
}))
