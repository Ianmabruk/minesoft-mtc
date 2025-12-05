import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign, Upload, Download, Calendar, Users, ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const Careers = () => {
  const [jobs, setJobs] = useState([])
  const [projects, setProjects] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [showApplication, setShowApplication] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    fetchJobs()
    fetchProjects()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs')
      setJobs(response.data)
    } catch (error) {
      // Demo data if API fails
      setJobs([
        {
          id: '1',
          title: 'Senior Full Stack Developer',
          department: 'Software Development',
          location: 'New York, NY / Remote',
          type: 'Full-time',
          salary: '$120,000 - $180,000',
          description: 'Lead development of enterprise-grade applications for Fortune 500 clients using React, Node.js, and cloud technologies.',
          requirements: [
            '5+ years full-stack development experience',
            'Expert in React, Node.js, TypeScript',
            'Experience with AWS/Azure cloud platforms',
            'Strong system design and architecture skills',
            'Experience with microservices and APIs'
          ]
        },
        {
          id: '2',
          title: 'Cybersecurity Specialist',
          department: 'Cybersecurity',
          location: 'Washington, DC',
          type: 'Full-time',
          salary: '$130,000 - $200,000',
          description: 'Implement security solutions for government and enterprise clients, conduct penetration testing and security audits.',
          requirements: [
            'CISSP, CEH, or equivalent certifications',
            '4+ years cybersecurity experience',
            'Experience with penetration testing tools',
            'Knowledge of compliance frameworks (SOC2, HIPAA)',
            'Government clearance preferred'
          ]
        },
        {
          id: '3',
          title: 'Data Scientist',
          department: 'Data Analytics',
          location: 'San Francisco, CA / Remote',
          type: 'Full-time',
          salary: '$140,000 - $220,000',
          description: 'Build AI/ML solutions for enterprise clients, develop predictive models and data pipelines.',
          requirements: [
            'PhD/Masters in Data Science, Statistics, or related field',
            'Expert in Python, R, SQL',
            'Experience with TensorFlow, PyTorch',
            'Strong statistical analysis skills',
            'Experience with big data technologies'
          ]
        },
        {
          id: '4',
          title: 'Digital Marketing Manager',
          department: 'Digital Marketing',
          location: 'Chicago, IL / Hybrid',
          type: 'Full-time',
          salary: '$90,000 - $130,000',
          description: 'Lead B2B marketing campaigns for enterprise clients, manage digital marketing strategies and analytics.',
          requirements: [
            '3+ years B2B marketing experience',
            'Expert in Google Ads, LinkedIn, HubSpot',
            'Strong analytical and data-driven mindset',
            'Experience with marketing automation',
            'Excellent communication skills'
          ]
        }
      ])
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects')
      setProjects(response.data)
    } catch (error) {
      // Demo data if API fails
      setProjects([
        {
          id: '1',
          name: 'Enterprise Banking Platform',
          client: 'Major Financial Institution',
          duration: '18 months',
          teamSize: 12,
          technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
          status: 'In Progress',
          completionDays: 120
        },
        {
          id: '2',
          name: 'Government Security System',
          client: 'Federal Agency',
          duration: '24 months',
          teamSize: 8,
          technologies: ['Java', 'Spring', 'Oracle', 'Docker'],
          status: 'Planning',
          completionDays: 180
        },
        {
          id: '3',
          name: 'Healthcare Analytics Platform',
          client: 'Healthcare Network',
          duration: '12 months',
          teamSize: 6,
          technologies: ['Python', 'TensorFlow', 'React', 'MongoDB'],
          status: 'In Progress',
          completionDays: 90
        }
      ])
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = new FormData()
    
    Object.keys(data).forEach(key => {
      if (key === 'cv' && data[key][0]) {
        formData.append(key, data[key][0])
      } else if (key !== 'cv') {
        formData.append(key, data[key])
      }
    })
    
    formData.append('jobId', selectedJob.id)
    
    try {
      await axios.post('http://localhost:5000/api/apply', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast.success('Application submitted successfully!')
      reset()
      setShowApplication(false)
    } catch (error) {
      toast.success('Application submitted successfully! (Demo mode)')
      reset()
      setShowApplication(false)
    } finally {
      setLoading(false)
    }
  }

  const downloadCV = () => {
    // Create a sample CV download
    const cvContent = `
MTC LTD - Sample CV Template

PERSONAL INFORMATION
Name: [Your Full Name]
Email: [your.email@example.com]
Phone: [Your Phone Number]
Location: [Your City, State]

PROFESSIONAL SUMMARY
[Write a brief summary of your experience and skills relevant to the position]

TECHNICAL SKILLS
• Programming Languages: [List your languages]
• Frameworks & Libraries: [List frameworks]
• Databases: [List database experience]
• Cloud Platforms: [AWS, Azure, GCP experience]
• Tools & Technologies: [Development tools]

WORK EXPERIENCE
[Company Name] - [Position] ([Start Date] - [End Date])
• [Achievement or responsibility]
• [Achievement or responsibility]
• [Achievement or responsibility]

EDUCATION
[Degree] in [Field] - [University Name] ([Year])

CERTIFICATIONS
• [Certification Name] - [Issuing Organization] ([Year])

PROJECTS
[Project Name]
• [Brief description and technologies used]
    `
    
    const blob = new Blob([cvContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'MTC_LTD_CV_Template.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('CV template downloaded!')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="glass border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gold" />
              <span className="text-white font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-midnight font-bold text-xl">M</span>
              </div>
              <span className="text-white font-bold text-xl">MTC LTD Careers</span>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Join Our <span className="text-gold">Team</span>
            </h1>
            <p className="text-xl text-softgray max-w-3xl mx-auto mb-8">
              Build the future of enterprise technology with industry-leading experts and cutting-edge projects.
            </p>
            <button
              onClick={downloadCV}
              className="btn-secondary inline-flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV Template
            </button>
          </motion.div>

          {/* Current Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Current <span className="text-gold">Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-luxury"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'In Progress' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'Planning' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-softgray mb-4">{project.client}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-softgray">Duration:</span>
                      <span className="text-white">{project.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-softgray">Team Size:</span>
                      <span className="text-white">{project.teamSize} members</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-softgray">Completion:</span>
                      <span className="text-gold">{project.completionDays} days</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gold/20 text-gold text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job Listings */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">
                Open <span className="text-gold">Positions</span>
              </h2>
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-luxury cursor-pointer hover:scale-[1.02] transition-transform"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                      <p className="text-gold font-medium">{job.department}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedJob(job)
                        setShowApplication(true)
                      }}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Apply Now
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-softgray mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                  </div>
                  
                  <p className="text-softgray mb-4">{job.description}</p>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Key Requirements:</h4>
                    <ul className="text-softgray text-sm space-y-1">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <li key={idx}>• {req}</li>
                      ))}
                      {job.requirements.length > 3 && (
                        <li className="text-gold">• +{job.requirements.length - 3} more requirements</li>
                      )}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card-luxury">
                <h3 className="text-xl font-semibold text-white mb-4">Why Join MTC LTD?</h3>
                <ul className="space-y-3 text-softgray">
                  <li>• Competitive enterprise-level salaries</li>
                  <li>• Comprehensive health & dental coverage</li>
                  <li>• Flexible remote work options</li>
                  <li>• $5,000 annual learning budget</li>
                  <li>• Equity participation program</li>
                  <li>• Cutting-edge technology stack</li>
                  <li>• Work with Fortune 500 clients</li>
                  <li>• Government project opportunities</li>
                </ul>
              </div>

              <div className="card-luxury">
                <h3 className="text-xl font-semibold text-white mb-4">Our Culture</h3>
                <p className="text-softgray mb-4">
                  Innovation-driven environment where top talent collaborates on enterprise solutions 
                  that impact Fortune 500 companies and government agencies worldwide.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-softgray">Team Size:</span>
                    <span className="text-white">150+ experts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-softgray">Active Projects:</span>
                    <span className="text-white">25+ enterprise</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-softgray">Client Retention:</span>
                    <span className="text-gold">98%</span>
                  </div>
                </div>
              </div>

              <div className="card-luxury">
                <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
                <div className="space-y-3">
                  <button
                    onClick={downloadCV}
                    className="w-full btn-secondary flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    CV Template
                  </button>
                  <a
                    href="mailto:careers@mtcltd.com"
                    className="w-full btn-outline flex items-center justify-center"
                  >
                    Contact HR
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplication && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-midnight border border-gold/20 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Apply for {selectedJob.title}</h2>
              <button
                onClick={() => setShowApplication(false)}
                className="text-softgray hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('firstName', { required: 'First name required' })}
                    placeholder="First Name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName.message}</p>}
                </div>
                <div>
                  <input
                    {...register('lastName', { required: 'Last name required' })}
                    placeholder="Last Name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName.message}</p>}
                </div>
              </div>

              <input
                {...register('email', { required: 'Email required' })}
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

              <input
                {...register('phone')}
                placeholder="Phone Number"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
              />

              <div>
                <label className="block text-white mb-2">Resume/CV (PDF, DOC, DOCX)</label>
                <input
                  {...register('cv', { required: 'Resume required' })}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                />
                {errors.cv && <p className="text-red-400 text-sm">{errors.cv.message}</p>}
              </div>

              <textarea
                {...register('coverLetter')}
                placeholder="Cover Letter (Optional)"
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
                <Upload className="ml-2 w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Careers