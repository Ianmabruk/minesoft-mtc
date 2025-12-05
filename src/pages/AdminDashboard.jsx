import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, FileText, Briefcase, TrendingUp, Eye, CheckCircle, XCircle, 
  Clock, DollarSign, Globe, Shield, BarChart, Settings, Bell, Search,
  Download, Filter, Calendar, ArrowUp, ArrowDown, Mail, Send, Phone, Building
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
import config from '../config'

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dashboardData, setDashboardData] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [quotes, setQuotes] = useState([])
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [jobs, setJobs] = useState([])
  const [showJobModal, setShowJobModal] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [showAdminSignup, setShowAdminSignup] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { register: emailRegister, handleSubmit: emailHandleSubmit, reset: emailReset } = useForm()
  const { register: signupRegister, handleSubmit: signupHandleSubmit, reset: signupReset } = useForm()
  const { register: jobRegister, handleSubmit: jobHandleSubmit, reset: jobReset } = useForm()

  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      fetchDashboardData()
    }
  }, [])

  const onLogin = async (data) => {
    // Check if it's the main admin
    if (data.email === 'ianmabruk3@gmail.com') {
      localStorage.setItem('admin_authenticated', 'true')
      setIsAuthenticated(true)
      fetchDashboardData()
      toast.success('Welcome to Admin Dashboard')
      return
    }
    
    // Check authorized admins
    const authorizedAdmins = JSON.parse(localStorage.getItem('authorized_admins') || '[]')
    const admin = authorizedAdmins.find(a => a.email === data.email && a.code === data.password)
    
    if (admin) {
      localStorage.setItem('admin_authenticated', 'true')
      setIsAuthenticated(true)
      fetchDashboardData()
      toast.success('Welcome to Admin Dashboard')
    } else {
      toast.error('Invalid credentials or unauthorized access')
    }
  }

  const fetchDashboardData = async () => {
    // Load data from localStorage
    setDashboardData({ loaded: true })
  }

  const fetchUsers = async () => {
    const users = JSON.parse(localStorage.getItem('mtc_users') || '[]')
    setUsers(users)
  }

  const fetchQuotes = async () => {
    const quotes = JSON.parse(localStorage.getItem('mtc_quotes') || '[]')
    setQuotes(quotes)
  }

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/projects')
      setProjects(response.data)
    } catch (error) {
      // Demo data if API fails
      setProjects([
        {
          id: '1',
          name: 'Enterprise Banking Platform',
          client: 'Major Financial Institution',
          clientEmail: 'project.manager@bank.com',
          status: 'In Progress',
          progress: 75,
          teamSize: 12,
          budget: 850000,
          startDate: '2024-01-15',
          endDate: '2024-07-15',
          daysRemaining: 45,
          technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
          description: 'Complete digital transformation of core banking systems with modern web interface and API integration.'
        },
        {
          id: '2',
          name: 'Government Security System',
          client: 'Federal Agency',
          clientEmail: 'security.lead@gov.agency',
          status: 'Planning',
          progress: 15,
          teamSize: 8,
          budget: 1200000,
          startDate: '2024-03-01',
          endDate: '2025-03-01',
          daysRemaining: 180,
          technologies: ['Java', 'Spring', 'Oracle', 'Docker'],
          description: 'High-security system for classified data management with advanced encryption and audit trails.'
        },
        {
          id: '3',
          name: 'Healthcare Analytics Platform',
          client: 'Healthcare Network',
          clientEmail: 'analytics@healthcare.com',
          status: 'In Progress',
          progress: 60,
          teamSize: 6,
          budget: 450000,
          startDate: '2024-02-01',
          endDate: '2024-08-01',
          daysRemaining: 90,
          technologies: ['Python', 'TensorFlow', 'React', 'MongoDB'],
          description: 'AI-powered analytics platform for patient data analysis and predictive healthcare insights.'
        }
      ])
    }
  }

  const sendQuoteEmail = async (data) => {
    try {
      // Try to send via backend if available
      await axios.post(`${config.API_BASE_URL || 'http://localhost:5000'}/api/admin/send-quote`, {
        ...data,
        clientEmail: selectedClient.email,
        clientName: `${selectedClient.firstName} ${selectedClient.lastName}`
      })
      toast.success('Quote email sent successfully!')
    } catch (error) {
      // Fallback: Save to localStorage for manual follow-up
      const emailQueue = JSON.parse(localStorage.getItem('email_queue') || '[]')
      emailQueue.push({
        id: Date.now().toString(),
        to: selectedClient.email,
        subject: data.subject,
        content: data,
        created_at: new Date().toISOString(),
        status: 'pending'
      })
      localStorage.setItem('email_queue', JSON.stringify(emailQueue))
      toast.success('Quote saved! Email will be sent when backend is available.')
    }
    setShowEmailModal(false)
    emailReset()
  }
  
  const onAdminSignup = async (data) => {
    const adminRequests = JSON.parse(localStorage.getItem('admin_requests') || '[]')
    const newRequest = {
      id: Date.now().toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      reason: data.reason,
      status: 'pending',
      created_at: new Date().toISOString()
    }
    adminRequests.push(newRequest)
    localStorage.setItem('admin_requests', JSON.stringify(adminRequests))
    
    toast.success('Admin access request submitted! You will receive an email with access code if approved.')
    setShowAdminSignup(false)
    signupReset()
  }
  
  const authorizeAdmin = (request) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    const authorizedAdmins = JSON.parse(localStorage.getItem('authorized_admins') || '[]')
    
    authorizedAdmins.push({
      id: request.id,
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      code: code,
      authorized_at: new Date().toISOString()
    })
    
    localStorage.setItem('authorized_admins', JSON.stringify(authorizedAdmins))
    
    // Update request status
    const adminRequests = JSON.parse(localStorage.getItem('admin_requests') || '[]')
    const updatedRequests = adminRequests.map(r => 
      r.id === request.id ? { ...r, status: 'approved', code } : r
    )
    localStorage.setItem('admin_requests', JSON.stringify(updatedRequests))
    
    toast.success(`Admin authorized! Access code: ${code}`)
  }
  
  const fetchJobs = async () => {
    const jobs = JSON.parse(localStorage.getItem('mtc_jobs') || '[]')
    setJobs(jobs)
  }
  
  const onJobSubmit = async (data) => {
    const jobs = JSON.parse(localStorage.getItem('mtc_jobs') || '[]')
    const requirements = data.requirements.split('\n').filter(req => req.trim())
    
    if (editingJob) {
      const updatedJobs = jobs.map(job => 
        job.id === editingJob.id ? { ...editingJob, ...data, requirements, updated_at: new Date().toISOString() } : job
      )
      localStorage.setItem('mtc_jobs', JSON.stringify(updatedJobs))
      setJobs(updatedJobs)
      toast.success('Job updated successfully!')
    } else {
      const newJob = {
        id: Date.now().toString(),
        ...data,
        requirements,
        created_at: new Date().toISOString()
      }
      jobs.push(newJob)
      localStorage.setItem('mtc_jobs', JSON.stringify(jobs))
      setJobs(jobs)
      toast.success('Job added successfully!')
    }
    
    setShowJobModal(false)
    setEditingJob(null)
    jobReset()
  }
  
  const deleteJob = (jobId) => {
    const jobs = JSON.parse(localStorage.getItem('mtc_jobs') || '[]')
    const updatedJobs = jobs.filter(job => job.id !== jobId)
    localStorage.setItem('mtc_jobs', JSON.stringify(updatedJobs))
    setJobs(updatedJobs)
    toast.success('Job deleted successfully!')
  }

  const logout = () => {
    localStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-midnight/90 to-electric/20" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 card-luxury max-w-md w-full mx-4"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 gold-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-midnight" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-softgray">Secure access to MTC LTD dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
            <div>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="Admin Email"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                placeholder="Password"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" className="w-full btn-primary">
              Access Dashboard
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAdminSignup(true)}
              className="text-gold hover:text-yellow-400 text-sm"
            >
              Request Admin Access
            </button>
          </div>
          

        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight/95 to-electric/10">
      {/* Header */}
      <header className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-midnight font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">MTC LTD Admin</h1>
                <p className="text-softgray text-sm">Dashboard Control Center</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-softgray hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button onClick={logout} className="btn-secondary text-sm px-4 py-2">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white/5 p-1 rounded-lg">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart },
            { id: 'users', name: 'Users', icon: Users },
            { id: 'quotes', name: 'Quote Requests', icon: FileText },
            { id: 'projects', name: 'Projects', icon: Briefcase },
            { id: 'jobs', name: 'Jobs', icon: Briefcase },
            { id: 'admin-requests', name: 'Admin Requests', icon: Users },
            { id: 'analytics', name: 'Analytics', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                if (tab.id === 'users') fetchUsers()
                if (tab.id === 'quotes') fetchQuotes()
                if (tab.id === 'projects') fetchProjects()
                if (tab.id === 'jobs') fetchJobs()
              }}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-gold text-midnight shadow-lg' 
                  : 'text-softgray hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Quote Requests Tab */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Quote Requests</h2>
              <div className="text-softgray">
                {quotes.length} total requests
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((quote) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-luxury cursor-pointer hover:scale-105"
                  onClick={() => {
                    setSelectedQuote(quote)
                    setShowQuoteModal(true)
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{quote.projectTitle || 'Untitled Project'}</h3>
                      <p className="text-softgray">{quote.firstName} {quote.lastName}</p>
                      <p className="text-softgray text-sm">{quote.company}</p>
                    </div>
                    {quote.estimatedCost && (
                      <span className="text-gold font-bold">KSH {quote.estimatedCost.toLocaleString()}</span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    {quote.services && quote.services.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {quote.services.map((service, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gold/20 text-gold text-xs rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-softgray text-sm line-clamp-2">
                      {quote.projectDescription || quote.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-softgray text-sm">
                      {new Date(quote.created_at).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedClient(quote)
                        setShowEmailModal(true)
                      }}
                      className="text-gold hover:text-yellow-400 flex items-center"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Send Quote
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Active Projects</h2>
              <div className="text-softgray">
                {projects.length} total projects
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-luxury cursor-pointer hover:scale-105"
                  onClick={() => {
                    setSelectedProject(project)
                    setShowProjectModal(true)
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                      <p className="text-softgray">{project.client}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'In Progress' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'Planning' ? 'bg-yellow-500/20 text-yellow-400' :
                      project.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-softgray">Progress</span>
                      <span className="text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gold rounded-full h-2 transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-softgray">Budget:</span>
                      <span className="text-gold font-bold">KSH {project.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-softgray">Team:</span>
                      <span className="text-white">{project.teamSize} members</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-softgray">Days Left:</span>
                      <span className={`font-medium ${
                        project.daysRemaining < 30 ? 'text-red-400' :
                        project.daysRemaining < 60 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {project.daysRemaining} days
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gold/20 text-gold text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 text-softgray text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-softgray text-sm">
                      Due: {new Date(project.endDate).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedClient({
                          firstName: project.client.split(' ')[0],
                          lastName: project.client.split(' ').slice(1).join(' '),
                          email: project.clientEmail
                        })
                        setShowEmailModal(true)
                      }}
                      className="text-gold hover:text-yellow-400 flex items-center"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Send Update
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Registered Users</h2>
              <button
                onClick={() => setShowEmailModal(true)}
                className="btn-primary flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Quote Email
              </button>
            </div>

            <div className="card-luxury overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-6 text-gold font-semibold">Name</th>
                      <th className="text-left py-4 px-6 text-gold font-semibold">Email</th>
                      <th className="text-left py-4 px-6 text-gold font-semibold">Company</th>
                      <th className="text-left py-4 px-6 text-gold font-semibold">Joined</th>
                      <th className="text-left py-4 px-6 text-gold font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-4 px-6 text-white">{user.firstName} {user.lastName}</td>
                        <td className="py-4 px-6 text-softgray">{user.email}</td>
                        <td className="py-4 px-6 text-softgray">{user.company || 'N/A'}</td>
                        <td className="py-4 px-6 text-softgray">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => {
                              setSelectedClient(user)
                              setShowEmailModal(true)
                            }}
                            className="text-gold hover:text-yellow-400 flex items-center"
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Send Quote
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Job Listings</h2>
              <button
                onClick={() => {
                  setEditingJob(null)
                  setShowJobModal(true)
                  jobReset()
                }}
                className="btn-primary flex items-center"
              >
                Add New Job
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="card-luxury">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      <p className="text-gold">{job.department}</p>
                      <p className="text-softgray text-sm">{job.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingJob(job)
                          setShowJobModal(true)
                        }}
                        className="text-gold hover:text-yellow-400 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-softgray text-sm mb-3">{job.description}</p>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-softgray">{job.type}</span>
                    <span className="text-gold">{job.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Requests Tab */}
        {activeTab === 'admin-requests' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Admin Access Requests</h2>
            <div className="grid grid-cols-1 gap-4">
              {JSON.parse(localStorage.getItem('admin_requests') || '[]').map((request) => (
                <div key={request.id} className="card-luxury">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold">{request.firstName} {request.lastName}</h3>
                      <p className="text-softgray">{request.email}</p>
                      <p className="text-softgray text-sm mt-2">{request.reason}</p>
                    </div>
                    <div className="flex space-x-2">
                      {request.status === 'pending' && (
                        <button
                          onClick={() => authorizeAdmin(request)}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          Authorize
                        </button>
                      )}
                      <span className={`px-2 py-1 rounded text-xs ${
                        request.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card-luxury">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-softgray">Total Users</p>
                  <p className="text-3xl font-bold text-white">{users.length}</p>
                </div>
                <Users className="w-12 h-12 text-gold" />
              </div>
            </div>
            <div className="card-luxury">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-softgray">Quote Requests</p>
                  <p className="text-3xl font-bold text-white">{quotes.length}</p>
                </div>
                <FileText className="w-12 h-12 text-gold" />
              </div>
            </div>
            <div className="card-luxury">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-softgray">Total Revenue</p>
                  <p className="text-3xl font-bold text-white">KSH 312M</p>
                </div>
                <DollarSign className="w-12 h-12 text-gold" />
              </div>
            </div>
            <div className="card-luxury">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-softgray">Active Projects</p>
                  <p className="text-3xl font-bold text-white">24</p>
                </div>
                <Briefcase className="w-12 h-12 text-gold" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quote Details Modal */}
      {showQuoteModal && selectedQuote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-midnight border border-gold/20 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Quote Request Details</h2>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="text-softgray hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <p className="text-softgray"><span className="text-white">Name:</span> {selectedQuote.firstName} {selectedQuote.lastName}</p>
                    <p className="text-softgray"><span className="text-white">Email:</span> {selectedQuote.email}</p>
                    <p className="text-softgray"><span className="text-white">Phone:</span> {selectedQuote.phone || 'N/A'}</p>
                    <p className="text-softgray"><span className="text-white">Company:</span> {selectedQuote.company}</p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Project Information</h3>
                  <div className="space-y-2">
                    <p className="text-softgray"><span className="text-white">Title:</span> {selectedQuote.projectTitle}</p>
                    <p className="text-softgray"><span className="text-white">Timeline:</span> {selectedQuote.timeline || 'Not specified'}</p>
                    <p className="text-softgray"><span className="text-white">Budget:</span> {selectedQuote.budget || 'Not specified'}</p>
                    {selectedQuote.estimatedCost && (
                      <p className="text-softgray"><span className="text-white">Estimated Cost:</span> <span className="text-gold font-bold">KSH {selectedQuote.estimatedCost.toLocaleString()}</span></p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Services Requested</h3>
                  {selectedQuote.services && selectedQuote.services.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedQuote.services.map((service, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-softgray">No services specified</p>
                  )}
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Project Description</h3>
                  <p className="text-softgray">{selectedQuote.projectDescription}</p>
                </div>

                {selectedQuote.requirements && (
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Requirements</h3>
                    <p className="text-softgray">{selectedQuote.requirements}</p>
                  </div>
                )}

                {selectedQuote.additionalInfo && (
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Additional Information</h3>
                    <p className="text-softgray">{selectedQuote.additionalInfo}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setSelectedClient(selectedQuote)
                  setShowQuoteModal(false)
                  setShowEmailModal(true)
                }}
                className="btn-primary flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Quote Email
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Project Details Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-midnight border border-gold/20 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Project Details</h2>
              <button
                onClick={() => setShowProjectModal(false)}
                className="text-softgray hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Project Information</h3>
                  <div className="space-y-2">
                    <p className="text-softgray"><span className="text-white">Name:</span> {selectedProject.name}</p>
                    <p className="text-softgray"><span className="text-white">Client:</span> {selectedProject.client}</p>
                    <p className="text-softgray"><span className="text-white">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        selectedProject.status === 'In Progress' ? 'bg-green-500/20 text-green-400' :
                        selectedProject.status === 'Planning' ? 'bg-yellow-500/20 text-yellow-400' :
                        selectedProject.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedProject.status}
                      </span>
                    </p>
                    <p className="text-softgray"><span className="text-white">Budget:</span> <span className="text-gold font-bold">KSH {selectedProject.budget.toLocaleString()}</span></p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Timeline</h3>
                  <div className="space-y-2">
                    <p className="text-softgray"><span className="text-white">Start Date:</span> {new Date(selectedProject.startDate).toLocaleDateString()}</p>
                    <p className="text-softgray"><span className="text-white">End Date:</span> {new Date(selectedProject.endDate).toLocaleDateString()}</p>
                    <p className="text-softgray"><span className="text-white">Days Remaining:</span> 
                      <span className={`ml-1 font-medium ${
                        selectedProject.daysRemaining < 30 ? 'text-red-400' :
                        selectedProject.daysRemaining < 60 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {selectedProject.daysRemaining} days
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Progress</h3>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-softgray">Completion</span>
                      <span className="text-white">{selectedProject.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div 
                        className="bg-gold rounded-full h-3 transition-all"
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-softgray"><span className="text-white">Team Size:</span> {selectedProject.teamSize} members</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-softgray">{selectedProject.description}</p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Client Contact</h3>
                  <p className="text-softgray"><span className="text-white">Email:</span> {selectedProject.clientEmail}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setSelectedClient({
                    firstName: selectedProject.client.split(' ')[0],
                    lastName: selectedProject.client.split(' ').slice(1).join(' '),
                    email: selectedProject.clientEmail
                  })
                  setShowProjectModal(false)
                  setShowEmailModal(true)
                }}
                className="btn-primary flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Project Update
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-midnight border border-gold/20 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Send Quote Email</h2>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-softgray hover:text-white"
              >
                ✕
              </button>
            </div>

            {selectedClient && (
              <div className="mb-6 p-4 bg-white/5 rounded-lg">
                <p className="text-white">To: {selectedClient.firstName} {selectedClient.lastName}</p>
                <p className="text-softgray">{selectedClient.email}</p>
              </div>
            )}

            <form onSubmit={emailHandleSubmit(sendQuoteEmail)} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Subject</label>
                <input
                  {...emailRegister('subject', { required: 'Subject required' })}
                  placeholder="Your MTC LTD Project Quote"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Quote Amount</label>
                <input
                  {...emailRegister('quoteAmount', { required: 'Quote amount required' })}
                  type="number"
                  placeholder="150000"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Project Details</label>
                <textarea
                  {...emailRegister('projectDetails', { required: 'Project details required' })}
                  placeholder="Describe the project scope, timeline, and deliverables..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Payment Breakdown</label>
                <textarea
                  {...emailRegister('paymentBreakdown')}
                  placeholder="Development: $100,000&#10;Design: $25,000&#10;Testing: $15,000&#10;Deployment: $10,000"
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Quote Email
              </button>
            </form>
          </motion.div>
        </div>
      )}
      
      {/* Admin Signup Modal */}
      {showAdminSignup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-midnight border border-gold/20 rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Request Admin Access</h2>
              <button
                onClick={() => setShowAdminSignup(false)}
                className="text-softgray hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={signupHandleSubmit(onAdminSignup)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  {...signupRegister('firstName', { required: 'First name required' })}
                  placeholder="First Name"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                />
                <input
                  {...signupRegister('lastName', { required: 'Last name required' })}
                  placeholder="Last Name"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                />
              </div>
              
              <input
                {...signupRegister('email', { required: 'Email required' })}
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
              />
              
              <textarea
                {...signupRegister('reason', { required: 'Reason required' })}
                placeholder="Why do you need admin access?"
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
              />
              
              <button type="submit" className="w-full btn-primary">
                Submit Request
              </button>
            </form>
          </motion.div>
        </div>
      )}
      
      {/* Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-midnight border border-gold/20 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
              <button
                onClick={() => {
                  setShowJobModal(false)
                  setEditingJob(null)
                }}
                className="text-softgray hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={jobHandleSubmit(onJobSubmit)} className="space-y-4">
              <input
                {...jobRegister('title', { required: 'Job title required' })}
                placeholder="Job Title"
                defaultValue={editingJob?.title || ''}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  {...jobRegister('department', { required: 'Department required' })}
                  placeholder="Department"
                  defaultValue={editingJob?.department || ''}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                />
                <input
                  {...jobRegister('location', { required: 'Location required' })}
                  placeholder="Location"
                  defaultValue={editingJob?.location || ''}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <select
                  {...jobRegister('type', { required: 'Job type required' })}
                  defaultValue={editingJob?.type || ''}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                >
                  <option value="">Select Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
                <input
                  {...jobRegister('salary', { required: 'Salary required' })}
                  placeholder="Salary Range"
                  defaultValue={editingJob?.salary || ''}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                />
              </div>
              
              <textarea
                {...jobRegister('description', { required: 'Description required' })}
                placeholder="Job Description"
                defaultValue={editingJob?.description || ''}
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
              />
              
              <textarea
                {...jobRegister('requirements', { required: 'Requirements required' })}
                placeholder="Requirements (one per line)"
                defaultValue={editingJob?.requirements?.join('\n') || ''}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
              />
              
              <button type="submit" className="w-full btn-primary">
                {editingJob ? 'Update Job' : 'Add Job'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard