'use client'

import { useFilterStore } from '@/lib/store'
import { ChevronDown, X } from 'lucide-react'
import { useState } from 'react'

interface FilterGroup {
  label: string
  key: keyof typeof useFilterStore.getState
  options: string[]
}

const filterGroups: FilterGroup[] = [
  {
    label: 'Role',
    key: 'role' as const,
    options: [
      'Frontend Engineer',
      'Backend Engineer',
      'Full Stack Engineer',
      'Product Manager',
      'Design System',
      'UX/UI Designer',
    ],
  },
  {
    label: 'Location',
    key: 'location' as const,
    options: [
      'Remote',
      'San Francisco, CA',
      'New York, NY',
      'London, UK',
      'Berlin, Germany',
    ],
  },
  {
    label: 'Job Type',
    key: 'jobType' as const,
    options: ['Full-time', 'Part-time', 'Contract', 'Remote'],
  },
  {
    label: 'Experience',
    key: 'experience' as const,
    options: ['Entry-level', 'Mid-level', 'Senior', 'Executive'],
  },
]

export function FilterSidebar() {
  const { filters, toggleFilterValue, clearFilters } = useFilterStore()
  const [expanded, setExpanded] = useState<string>('Role')

  const hasActiveFilters = Object.values(filters).some((v) => v.length > 0)

  const getFilterValue = (key: string) => {
    return filters[key as keyof typeof filters] || []
  }

  return (
    <div className="w-64 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-2">
        {filterGroups.map((group) => (
          <div key={group.label} className="border border-border rounded-lg">
            <button
              onClick={() =>
                setExpanded(expanded === group.label ? '' : group.label)
              }
              className="w-full flex items-center justify-between p-4 hover:bg-secondary/10 transition-colors"
            >
              <span className="font-medium text-foreground">{group.label}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  expanded === group.label ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expanded === group.label && (
              <div className="border-t border-border px-4 py-3 space-y-2">
                {group.options.map((option) => {
                  const isChecked = getFilterValue(group.key).includes(option)
                  return (
                    <label
                      key={option}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFilterValue(group.key, option)}
                        className="w-4 h-4 rounded border-border bg-card checked:bg-primary checked:border-primary cursor-pointer"
                      />
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {option}
                      </span>
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="space-y-2 pt-4 border-t border-border">
          <p className="text-sm font-medium text-foreground">Active Filters</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, values]) =>
              values.map((value) => (
                <div
                  key={`${key}-${value}`}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  <span className="text-sm">{value}</span>
                  <button
                    onClick={() =>
                      toggleFilterValue(
                        key as keyof typeof filters,
                        value
                      )
                    }
                    className="hover:opacity-70"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
