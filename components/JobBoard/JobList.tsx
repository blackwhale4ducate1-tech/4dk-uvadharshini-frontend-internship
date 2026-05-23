'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useFilterStore } from '@/lib/store'
import { Job } from '@/lib/types'
import { JobCard } from './JobCard'
import { useEffect, useRef, useCallback } from 'react'

interface JobListProps {
  onSelectJob: (job: Job) => void
}

async function fetchJobs(pageParam: number, filters: Record<string, string[]>) {
  const params = new URLSearchParams()
  params.append('page', pageParam.toString())
  params.append('limit', '12')

  Object.entries(filters).forEach(([key, values]) => {
    values.forEach((value) => params.append(key, value))
  })

  const response = await fetch(`/api/jobs?${params.toString()}`)
  if (!response.ok) throw new Error('Failed to fetch jobs')
  return response.json()
}

export function JobList({ onSelectJob }: JobListProps) {
  const { filters } = useFilterStore()
  const observerTarget = useRef<HTMLDivElement>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['jobs', filters],
      queryFn: ({ pageParam = 0 }) => fetchJobs(pageParam, filters),
      getNextPageParam: (lastPage) =>
        lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
      initialPageParam: 0,
    })

  // Infinite scroll observer
  useEffect(() => {
    if (!observerTarget.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(observerTarget.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (status === 'pending') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-72 rounded-xl bg-card border border-border animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load jobs</p>
      </div>
    )
  }

  const jobs = data?.pages.flatMap((page) => page.data) || []

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-semibold text-foreground mb-2">No jobs found</p>
        <p className="text-muted-foreground">
          Try adjusting your filters to see more results
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => (
          <JobCard
            key={job.id}
            job={job}
            index={index}
            onClick={() => onSelectJob(job)}
          />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={observerTarget} className="pt-8">
        {isFetchingNextPage ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-xl bg-card border border-border animate-pulse"
              />
            ))}
          </div>
        ) : (
          hasNextPage && (
            <div className="text-center py-8">
              <button
                onClick={() => fetchNextPage()}
                className="px-6 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                Load More
              </button>
            </div>
          )
        )}
      </div>
    </div>
  )
}
