// Utility to clear all localStorage data for fresh start
export const clearAllData = () => {
  localStorage.removeItem('mtc_users')
  localStorage.removeItem('mtc_quotes')
  localStorage.removeItem('mtc_applications')
  localStorage.removeItem('mtc_jobs')
  localStorage.removeItem('mtc_projects')
  localStorage.removeItem('user_authenticated')
  localStorage.removeItem('user_email')
  localStorage.removeItem('current_user')
  localStorage.removeItem('admin_authenticated')
  console.log('All MTC LTD data cleared')
}

// Initialize with demo data
export const initializeDemoData = () => {
  // Demo jobs
  const jobs = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      department: 'Software Development',
      location: 'New York, NY / Remote',
      type: 'Full-time',
      salary: '$120,000 - $180,000',
      description: 'Lead development of enterprise-grade applications for Fortune 500 clients.',
      requirements: ['5+ years experience', 'React, Node.js, TypeScript', 'AWS/Azure experience']
    }
  ]
  
  // Demo projects
  const projects = [
    {
      id: '1',
      name: 'Enterprise Banking Platform',
      client: 'Major Financial Institution',
      duration: '18 months',
      teamSize: 12,
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      status: 'In Progress',
      completionDays: 120
    }
  ]
  
  localStorage.setItem('mtc_jobs', JSON.stringify(jobs))
  localStorage.setItem('mtc_projects', JSON.stringify(projects))
  console.log('Demo data initialized')
}