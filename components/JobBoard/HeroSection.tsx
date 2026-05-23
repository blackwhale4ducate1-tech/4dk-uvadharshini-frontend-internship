'use client'

import { motion } from 'framer-motion'
import { Briefcase, ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <div className="w-full relative rounded-3xl overflow-hidden border border-border/50">
      {/* Background with gradient and animated accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />

      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 py-24 md:py-32">
        <div className="text-center space-y-8">
          {/* Header */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                <Briefcase size={24} className="text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              Find Your <span className="text-primary">Dream Job</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Explore thousands of job opportunities from the best companies in the world. Start your career journey today.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            className="flex gap-2 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <input
              type="text"
              placeholder="Search jobs, companies, locations..."
              className="flex-1 px-6 py-4 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent shadow-lg transition-all"
            />
            <motion.button
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Search</span>
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center justify-center gap-8 pt-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">1000+</p>
              <p className="text-sm text-muted-foreground">Active Jobs</p>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">500+</p>
              <p className="text-sm text-muted-foreground">Companies</p>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">50+</p>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
