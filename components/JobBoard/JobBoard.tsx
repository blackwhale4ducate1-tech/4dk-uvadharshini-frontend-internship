'use client'

import { useState } from 'react'
import { useFilterStore } from '@/lib/store'
import { Job } from '@/lib/types'
import { HeroSection } from './HeroSection'
import { FilterSidebar } from './FilterSidebar'
import { JobList } from './JobList'
import { JobDetailPanel } from './JobDetailPanel'

export function JobBoard() {
  const { setSelectedJob: setSelectedJobId } = useFilterStore()
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job)
    setSelectedJobId(job.id)
  }

  const handleClosePanel = () => {
    setSelectedJob(null)
    setSelectedJobId(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <HeroSection />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <FilterSidebar />
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Available Positions
              </h2>
              <p className="text-muted-foreground">
                Browse and apply to the latest job openings
              </p>
            </div>
            <JobList onSelectJob={handleJobSelect} />
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedJob && (
        <JobDetailPanel job={selectedJob} onClose={handleClosePanel} />
      )}

      {/* Backdrop when panel is open */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={handleClosePanel}
        />
      )}
    </div>
  )
}
