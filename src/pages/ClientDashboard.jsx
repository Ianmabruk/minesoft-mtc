import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, DollarSign, Calendar, FileText, TrendingUp, CheckCircle, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const ClientDashboard = () => {
  const [projects, setProjects] = useState([])
  const [quotes, setQuotes] = useState([])
  const userEmail = localStorage.getItem('user_email')

  useEffect(() => {
    fetchClientData()
  }, [])

  const fetchClientData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/client/dashboard?email=${userEmail}`)
      setProjects(response.data.projects || [])
      setQuotes(response.data.quotes || [])
    } catch (error) {
      console.error('Failed to fetch client data')
    }
  }

  const ProjectCard = ({ project }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-luxury"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{project.name}</h3>
          <p className="text-softgray">{project.service}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
          project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
          'bg-yellow-500/20 text-yellow-400'
        }`}>
          {project.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gold/20 rounded-lg mx-auto mb-2">
            <Users className="w-6 h-6 text-gold" />
          </div>
          <p className="text-white font-semibold">{project.teamMembers}</p>
          <p className="text-softgray text-sm">Team Members</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-electric/20 rounded-lg mx-auto mb-2">
            <TrendingUp className="w-6 h-6 text-electric" />
          </div>
          <p className="text-white font-semibold">{project.progress}%</p>
          <p className="text-softgray text-sm">Progress</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-2">
            <Calendar className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-white font-semibold">{project.daysLeft}</p>
          <p className="text-softgray text-sm">Days Left</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-softgray">Progress</span>
          <span className="text-white">{project.progress}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gold h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-white font-medium">Payment Utilization:</h4>
        {project.paymentBreakdown?.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-softgray">{item.category}</span>
            <span className="text-white">${item.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your <span className="text-gold">Projects</span>
            </h1>
            <p className="text-xl text-softgray">Track progress and manage your enterprise solutions</p>
          </motion.div>

          {/* Active Projects */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Active Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Quotes */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Quotes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((quote, index) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-luxury"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Quote #{quote.id.slice(-6)}</h3>
                      <p className="text-softgray text-sm">{new Date(quote.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      quote.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      quote.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {quote.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-softgray">Services:</span>
                      <span className="text-white text-sm">{quote.services?.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-softgray">Estimated Cost:</span>
                      <span className="text-gold font-semibold">${quote.estimatedCost?.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-softgray text-sm">{quote.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ClientDashboard