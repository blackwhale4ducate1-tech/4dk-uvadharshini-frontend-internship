'use client'

import { Job } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Share2, MapPin, DollarSign, Briefcase, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

interface JobDetailPanelProps {
  job: Job | null
  onClose: () => void
}

export function JobDetailPanel({ job, onClose }: JobDetailPanelProps) {
  const [step, setStep] = useState(0)
  const [showApplication, setShowApplication] = useState(false)

  if (!job) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 500, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-screen w-full max-w-2xl bg-card border-l border-border shadow-2xl flex flex-col z-50"
      >
        {/* Header */}
        <div className="border-b border-border p-6 flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur-sm">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">{job.title}</h2>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary/10 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Key info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <DollarSign size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Salary</p>
                  <p className="font-medium text-foreground">{job.salary}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Briefcase size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground">{job.jobType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <CheckCircle2 size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium text-foreground">{job.experience}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                About the Role
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Requirements
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Benefits
              </h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 space-y-3 bg-card/95 backdrop-blur-sm sticky bottom-0">
          <button
            onClick={() => setShowApplication(true)}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Apply Now
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
            }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg text-foreground hover:bg-secondary/5 transition-colors"
          >
            <Share2 size={16} />
            Share Job
          </button>
        </div>
      </motion.div>

      {/* Application modal overlay */}
      {showApplication && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowApplication(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}
    </AnimatePresence>
  )
}
