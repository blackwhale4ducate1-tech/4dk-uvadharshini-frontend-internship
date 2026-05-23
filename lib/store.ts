import { create } from 'zustand'
import { Filters } from './types'

interface FilterStore {
  filters: Filters
  selectedJobId: string | null
  bookmarks: Set<string>

  setFilter: (key: keyof Filters, values: string[]) => void
  toggleFilterValue: (key: keyof Filters, value: string) => void
  clearFilters: () => void
  setSelectedJob: (jobId: string | null) => void
  toggleBookmark: (jobId: string) => void
  isBookmarked: (jobId: string) => boolean
}

const defaultFilters: Filters = {
  role: [],
  company: [],
  location: [],
  jobType: [],
  salary: [],
  experience: [],
  date: [],
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  filters: defaultFilters,
  selectedJobId: null,
  bookmarks: new Set(),

  setFilter: (key, values) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: values,
      },
    }))
  },

  toggleFilterValue: (key, value) => {
    set((state) => {
      const current = state.filters[key]
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return {
        filters: {
          ...state.filters,
          [key]: updated,
        },
      }
    })
  },

  clearFilters: () => {
    set({ filters: defaultFilters })
  },

  setSelectedJob: (jobId) => {
    set({ selectedJobId: jobId })
  },

  toggleBookmark: (jobId) => {
    set((state) => {
      const newBookmarks = new Set(state.bookmarks)
      if (newBookmarks.has(jobId)) {
        newBookmarks.delete(jobId)
      } else {
        newBookmarks.add(jobId)
      }
      return { bookmarks: newBookmarks }
    })
  },

  isBookmarked: (jobId) => {
    return get().bookmarks.has(jobId)
  },
}))
