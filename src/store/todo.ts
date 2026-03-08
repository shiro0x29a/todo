import { create } from "zustand"

type Filter = "all" | "completed" | "uncompleted"
type SortType = "created-desc" | "created-asc"

import { FilterType, SortType } from '../types'

interface TodoStore {
  filter: FilterType
  sortBy: SortType
  currentPage: number
  selectedTask: string | null
  showPopup: boolean

  setFilter: (f: FilterType) => void
  setSortBy: (s: SortType) => void
  setPage: (p: number) => void

  openDeletePopup: (id: string) => void
  closeDeletePopup: () => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  filter: "all",
  sortBy: "created-desc",
  currentPage: 1,

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
    })
}))
