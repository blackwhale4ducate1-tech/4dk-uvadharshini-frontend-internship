import { faker } from '@faker-js/faker'
import { Job } from './types'

const companies = [
  'Vercel',
  'Google',
  'Meta',
  'Microsoft',
  'Apple',
  'Amazon',
  'Netflix',
  'Spotify',
  'Stripe',
  'Figma',
  'Notion',
  'Slack',
  'Discord',
  'GitHub',
  'Zapier',
  'Airtable',
  'Webflow',
  'Framer',
  'Linear',
  'Supabase',
]

const roles = [
  'Frontend Engineer',
  'Backend Engineer',
  'Full Stack Engineer',
  'Product Manager',
  'Design System',
  'UX/UI Designer',
  'DevOps Engineer',
  'Data Scientist',
  'Mobile Engineer',
  'ML Engineer',
  'Security Engineer',
  'QA Engineer',
]

const locations = [
  'San Francisco, CA',
  'New York, NY',
  'London, UK',
  'Berlin, Germany',
  'Tokyo, Japan',
  'Singapore',
  'Toronto, Canada',
  'Sydney, Australia',
  'Amsterdam, Netherlands',
  'Remote',
]

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote']
const experiences = ['Entry-level', 'Mid-level', 'Senior', 'Executive']

const benefits = [
  'Health insurance',
  'Dental coverage',
  '401k matching',
  'Stock options',
  'Unlimited PTO',
  'Remote work',
  'Learning budget',
  'Home office setup',
  'Flexible hours',
  'Mental health support',
]

const requirements = [
  'JavaScript/TypeScript',
  'React',
  'Node.js',
  'Python',
  'SQL',
  'Git',
  'Problem-solving skills',
  'Communication skills',
  'Team collaboration',
  'API design',
  'Database design',
  'Testing',
]

export function generateJobs(count: number, seed?: number): Job[] {
  if (seed) faker.seed(seed)

  const jobs: Job[] = []

  for (let i = 0; i < count; i++) {
    const postedDate = faker.date.recent({ days: 30 })
    const daysSincePosted = Math.floor(
      (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    const jobReqs = faker.helpers.arrayElements(requirements, {
      min: 4,
      max: 8,
    })
    const jobBenefits = faker.helpers.arrayElements(benefits, {
      min: 3,
      max: 6,
    })

    const job: Job = {
      id: `job-${i + 1}`,
      title: faker.helpers.arrayElement(roles),
      company: faker.helpers.arrayElement(companies),
      location: faker.helpers.arrayElement(locations),
      salary: `$${faker.number.int({ min: 80, max: 250 })}k - $${faker.number.int({ min: 251, max: 350 })}k`,
      description: faker.lorem.paragraphs(3),
      requirements: jobReqs,
      benefits: jobBenefits,
      jobType: faker.helpers.arrayElement(jobTypes) as any,
      experience: faker.helpers.arrayElement(experiences) as any,
      category: faker.helpers.arrayElement(roles),
      postedDate,
      matchScore: faker.number.int({ min: 60, max: 100 }),
      logo: `https://api.dicebear.com/7.x/initials/svg?seed=${faker.helpers.arrayElement(companies)}`,
    }
    jobs.push(job)
  }

  return jobs
}

// Generate consistent set of jobs with a fixed seed for the API
export const MOCK_JOBS = generateJobs(100, 42)
