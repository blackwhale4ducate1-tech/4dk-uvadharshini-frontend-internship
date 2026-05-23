'use client'

import { Job } from '@/lib/types'
import { useFilterStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { Bookmark, MapPin, DollarSign, Briefcase } from 'lucide-react'

interface JobCardProps {
  job: Job
  index: number
  onClick: () => void
}

export function JobCard({ job, index, onClick }: JobCardProps) {
  const { isBookmarked, toggleBookmark } = useFilterStore()
  const bookmarked = isBookmarked(job.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="p-5 border border-border rounded-xl bg-card hover:bg-secondary/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              {job.logo && (
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
            </div>
          </div>

          {/* Match score badge */}
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/30">
            <span className="text-sm font-bold text-accent">
              {job.matchScore}%
            </span>
          </div>
        </div>

        {/* Job details */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} className="text-accent" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign size={16} className="text-accent" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase size={16} className="text-accent" />
            <span>{job.jobType}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {job.experience}
          </span>
          <span className="inline-flex px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
            {job.category}
          </span>
        </div>

        {/* Description preview */}
        <p className="text-sm text-foreground/70 line-clamp-2 mb-4">
          {job.description}
        </p>

        {/* Bookmark button */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Posted {formatDate(job.postedDate)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleBookmark(job.id)
            }}
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
          >
            <Bookmark
              size={16}
              className={bookmarked ? 'fill-accent text-accent' : 'text-muted-foreground'}
            />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function formatDate(date: Date | string): string {
  const now = new Date()
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const diff = now.getTime() - dateObj.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}
