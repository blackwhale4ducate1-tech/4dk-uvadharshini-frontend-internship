export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  experience: 'Entry-level' | 'Mid-level' | 'Senior' | 'Executive'
  category: string
  postedDate: Date | string
  matchScore: number
  logo?: string
}

export interface Filters {
  role: string[]
  company: string[]
  location: string[]
  jobType: string[]
  salary: string[]
  experience: string[]
  date: string[]
}
