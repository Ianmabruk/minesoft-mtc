import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, Calculator } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
import Navbar from '../components/Navbar'

const Quote = () => {
  const [loading, setLoading] = useState(false)
  const [estimatedCost, setEstimatedCost] = useState(null)
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

  const services = [
    { id: 'software', name: 'Software Development', basePrice: 6500000 },
    { id: 'cybersecurity', name: 'Cybersecurity Solutions', basePrice: 3250000 },
    { id: 'data-analytics', name: 'Data Analytics & AI', basePrice: 5200000 },
    { id: 'digital-marketing', name: 'Digital Marketing', basePrice: 1950000 }
  ]

  const projectSizes = [
    { id: 'small', name: 'Small (1-3 months)', multiplier: 1 },
    { id: 'medium', name: 'Medium (3-6 months)', multiplier: 2 },
    { id: 'large', name: 'Large (6-12 months)', multiplier: 3.5 },
    { id: 'enterprise', name: 'Enterprise (12+ months)', multiplier: 5 }
  ]

  const watchedValues = watch()

  const calculateEstimate = () => {
    const selectedServices = services.filter(service => 
      watchedValues[service.id]
    )
    const selectedSize = projectSizes.find(size => 
      size.id === watchedValues.projectSize
    )

    if (selectedServices.length > 0 && selectedSize) {
      const baseCost = selectedServices.reduce((sum, service) => sum + service.basePrice, 0)
      const estimate = baseCost * selectedSize.multiplier
      setEstimatedCost(estimate)
    } else {
      setEstimatedCost(null)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const selectedServices = services.filter(service => data[service.id]).map(s => s.name)
      
      // Save to localStorage
      const quotes = JSON.parse(localStorage.getItem('mtc_quotes') || '[]')
      const newQuote = {
        id: Date.now().toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company,
        phone: data.phone,
        projectTitle: data.projectTitle,
        projectDescription: data.projectDescription,
        requirements: data.requirements,
        timeline: data.timeline,
        budget: data.budget,
        services: selectedServices,
        projectSize: data.projectSize,
        estimatedCost,
        additionalInfo: data.additionalInfo,
        created_at: new Date().toISOString()
      }
      quotes.push(newQuote)
      localStorage.setItem('mtc_quotes', JSON.stringify(quotes))
      
      toast.success('Quote request submitted! We\'ll contact you within 24 hours.')
      reset()
      setEstimatedCost(null)
    } catch (error) {
      toast.error('Failed to submit quote request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get Your <span className="text-gold">Custom Quote</span>
            </h1>
            <p className="text-xl text-softgray">
              Tell us about your project and get a detailed proposal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quote Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-luxury"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Project Details</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          {...register('firstName', { required: 'First name required' })}
                          placeholder="First Name"
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                        />
                        {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <input
                          {...register('lastName', { required: 'Last name required' })}
                          placeholder="Last Name"
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                        />
                        {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <input
                        {...register('email', { required: 'Email required' })}
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                      />
                      <input
                        {...register('phone')}
                        placeholder="Phone Number"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                      />
                    </div>

                    <input
                      {...register('company', { required: 'Company required' })}
                      placeholder="Company Name"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold mt-4"
                    />
                  </div>

                  {/* Project Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Project Information</h3>
                    <input
                      {...register('projectTitle', { required: 'Project title required' })}
                      placeholder="Project Title"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold mb-4"
                    />

                    <textarea
                      {...register('projectDescription', { required: 'Project description required' })}
                      placeholder="Describe your project in detail..."
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none mb-4"
                    />

                    <textarea
                      {...register('requirements', { required: 'Requirements required' })}
                      placeholder="Specific requirements and features needed..."
                      rows={3}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  {/* Services Needed */}
                  <div>
                    <label className="block text-white mb-3">Services Needed</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {services.map((service) => (
                        <label key={service.id} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            {...register(service.id)}
                            type="checkbox"
                            onChange={calculateEstimate}
                            className="w-4 h-4 text-gold bg-white/10 border-white/20 rounded focus:ring-gold"
                          />
                          <span className="text-white">{service.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Project Size */}
                  <div>
                    <label className="block text-white mb-3">Project Size & Timeline</label>
                    <div className="space-y-2">
                      {projectSizes.map((size) => (
                        <label key={size.id} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            {...register('projectSize', { required: 'Project size required' })}
                            type="radio"
                            value={size.id}
                            onChange={calculateEstimate}
                            className="w-4 h-4 text-gold bg-white/10 border-white/20 focus:ring-gold"
                          />
                          <span className="text-white">{size.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Timeline & Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">Preferred Timeline</label>
                      <input
                        {...register('timeline')}
                        placeholder="e.g., 6 months"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">Budget Range</label>
                      <select
                        {...register('budget')}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                      >
                        <option value="">Select Budget Range</option>
                        <option value="3M-6.5M">KSH 3,000,000 - 6,500,000</option>
                        <option value="6.5M-13M">KSH 6,500,000 - 13,000,000</option>
                        <option value="13M-32.5M">KSH 13,000,000 - 32,500,000</option>
                        <option value="32.5M+">KSH 32,500,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label className="block text-white mb-2">Additional Information</label>
                    <textarea
                      {...register('additionalInfo')}
                      placeholder="Any additional details, constraints, or special requirements..."
                      rows={3}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    {loading ? 'Submitting...' : 'Submit Quote Request'}
                    <Send className="ml-2 w-5 h-5" />
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Estimate Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-luxury"
              >
                <div className="flex items-center mb-4">
                  <Calculator className="w-6 h-6 text-gold mr-2" />
                  <h3 className="text-xl font-semibold text-white">Instant Estimate</h3>
                </div>
                
                {estimatedCost ? (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold mb-2">
                      KSH {estimatedCost.toLocaleString()}
                    </div>
                    <p className="text-softgray text-sm">
                      Estimated project cost
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-softgray">
                    Select services and project size to see estimate
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="card-luxury"
              >
                <h3 className="text-lg font-semibold text-white mb-4">What Happens Next</h3>
                <div className="space-y-3 text-sm text-softgray">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-midnight font-bold text-xs">1</span>
                    </div>
                    <span>We review your project requirements</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-midnight font-bold text-xs">2</span>
                    </div>
                    <span>Our experts create a detailed proposal</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-midnight font-bold text-xs">3</span>
                    </div>
                    <span>Schedule a consultation call within 24 hours</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card-luxury"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Why Choose MTC LTD</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-softgray text-sm">
                    <CheckCircle className="w-4 h-4 text-gold mr-2" />
                    500+ successful projects
                  </li>
                  <li className="flex items-center text-softgray text-sm">
                    <CheckCircle className="w-4 h-4 text-gold mr-2" />
                    Fortune 500 trusted partner
                  </li>
                  <li className="flex items-center text-softgray text-sm">
                    <CheckCircle className="w-4 h-4 text-gold mr-2" />
                    Government-grade security
                  </li>
                  <li className="flex items-center text-softgray text-sm">
                    <CheckCircle className="w-4 h-4 text-gold mr-2" />
                    24/7 premium support
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Quote