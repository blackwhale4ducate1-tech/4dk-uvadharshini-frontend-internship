import { MOCK_JOBS } from '@/lib/generate-jobs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const page = parseInt(searchParams.get('page') || '0', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)

  // Get filter parameters
  const roles = searchParams.getAll('role')
  const companies = searchParams.getAll('company')
  const locations = searchParams.getAll('location')
  const jobTypes = searchParams.getAll('jobType')
  const experiences = searchParams.getAll('experience')

  // Filter jobs based on parameters
  let filtered = MOCK_JOBS

  if (roles.length > 0) {
    filtered = filtered.filter((job) =>
      roles.some((role) =>
        job.title.toLowerCase().includes(role.toLowerCase())
      )
    )
  }

  if (companies.length > 0) {
    filtered = filtered.filter((job) =>
      companies.some((company) =>
        job.company.toLowerCase().includes(company.toLowerCase())
      )
    )
  }

  if (locations.length > 0) {
    filtered = filtered.filter((job) =>
      locations.some((location) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      )
    )
  }

  if (jobTypes.length > 0) {
    filtered = filtered.filter((job) => jobTypes.includes(job.jobType))
  }

  if (experiences.length > 0) {
    filtered = filtered.filter((job) => experiences.includes(job.experience))
  }

  // Pagination
  const total = filtered.length
  const start = page * limit
  const end = start + limit
  const paginated = filtered.slice(start, end)

  return NextResponse.json({
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      hasMore: end < total,
    },
  })
}
