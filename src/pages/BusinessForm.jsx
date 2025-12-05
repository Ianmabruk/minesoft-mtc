import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Building, Users, Target, DollarSign } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'

const BusinessForm = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const businessTypes = [
    'Technology/Software',
    'Healthcare',
    'Finance/Banking',
    'E-commerce/Retail',
    'Manufacturing',
    'Education',
    'Government',
    'Non-profit',
    'Other'
  ]

  const companySizes = [
    'Startup (1-10 employees)',
    'Small Business (11-50 employees)',
    'Medium Business (51-200 employees)',
    'Large Enterprise (201-1000 employees)',
    'Fortune 500 (1000+ employees)'
  ]

  const onSubmit = async (data) => {
    setLoading(true)
    
    // Save business info to localStorage
    const businessForms = JSON.parse(localStorage.getItem('business_forms') || '[]')
    const newForm = {
      id: Date.now().toString(),
      ...data,
      created_at: new Date().toISOString()
    }
    businessForms.push(newForm)
    localStorage.setItem('business_forms', JSON.stringify(businessForms))
    
    toast.success('Business information submitted! Redirecting to quote form...')
    
    // Redirect to quote page after 2 seconds
    setTimeout(() => {
      navigate('/quote')
    }, 2000)
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tell Us About Your <span className="text-gold">Business</span>
            </h1>
            <p className="text-xl text-softgray">
              Help us understand your business to provide the best solution
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-luxury"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Company Information */}
              <div>
                <div className="flex items-center mb-6">
                  <Building className="w-6 h-6 text-gold mr-3" />
                  <h2 className="text-2xl font-bold text-white">Company Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2">Company Name *</label>
                    <input
                      {...register('companyName', { required: 'Company name required' })}
                      placeholder="Your Company Name"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                    />
                    {errors.companyName && <p className="text-red-400 text-sm mt-1">{errors.companyName.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Industry/Business Type *</label>
                    <select
                      {...register('businessType', { required: 'Business type required' })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                    >
                      <option value="">Select Industry</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.businessType && <p className="text-red-400 text-sm mt-1">{errors.businessType.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Company Size *</label>
                    <select
                      {...register('companySize', { required: 'Company size required' })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                    >
                      <option value="">Select Company Size</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    {errors.companySize && <p className="text-red-400 text-sm mt-1">{errors.companySize.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Years in Business</label>
                    <input
                      {...register('yearsInBusiness')}
                      type="number"
                      placeholder="e.g., 5"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-white mb-2">Company Website</label>
                  <input
                    {...register('website')}
                    placeholder="https://yourcompany.com"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Business Description */}
              <div>
                <div className="flex items-center mb-6">
                  <Target className="w-6 h-6 text-gold mr-3" />
                  <h2 className="text-2xl font-bold text-white">Business Overview</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white mb-2">What does your company do? *</label>
                    <textarea
                      {...register('businessDescription', { required: 'Business description required' })}
                      placeholder="Describe your business, products, and services..."
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
                    />
                    {errors.businessDescription && <p className="text-red-400 text-sm mt-1">{errors.businessDescription.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Target Market/Customers *</label>
                    <textarea
                      {...register('targetMarket', { required: 'Target market required' })}
                      placeholder="Who are your customers? B2B, B2C, specific industries..."
                      rows={3}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
                    />
                    {errors.targetMarket && <p className="text-red-400 text-sm mt-1">{errors.targetMarket.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Current Challenges</label>
                    <textarea
                      {...register('challenges')}
                      placeholder="What challenges is your business facing that we can help solve?"
                      rows={3}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Service Requirements */}
              <div>
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-gold mr-3" />
                  <h2 className="text-2xl font-bold text-white">Service Requirements</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white mb-2">What services are you looking for? *</label>
                    <textarea
                      {...register('servicesNeeded', { required: 'Services needed required' })}
                      placeholder="Software development, cybersecurity, data analytics, digital marketing..."
                      rows={3}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
                    />
                    {errors.servicesNeeded && <p className="text-red-400 text-sm mt-1">{errors.servicesNeeded.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Project Goals & Objectives</label>
                    <textarea
                      {...register('projectGoals')}
                      placeholder="What do you want to achieve with this project?"
                      rows={3}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2">Preferred Timeline</label>
                      <select
                        {...register('timeline')}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                      >
                        <option value="">Select Timeline</option>
                        <option value="ASAP">ASAP (Rush project)</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="12+ months">12+ months</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Budget Range</label>
                      <select
                        {...register('budgetRange')}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                      >
                        <option value="">Select Budget Range</option>
                        <option value="Under KSH 3.25M">Under KSH 3,250,000</option>
                        <option value="KSH 3.25M-6.5M">KSH 3,250,000 - 6,500,000</option>
                        <option value="KSH 6.5M-13M">KSH 6,500,000 - 13,000,000</option>
                        <option value="KSH 13M-32.5M">KSH 13,000,000 - 32,500,000</option>
                        <option value="KSH 32.5M-65M">KSH 32,500,000 - 65,000,000</option>
                        <option value="KSH 65M+">KSH 65,000,000+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-white mb-2">Additional Information</label>
                <textarea
                  {...register('additionalInfo')}
                  placeholder="Any other details that would help us understand your needs better..."
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center text-lg py-4"
              >
                {loading ? 'Processing...' : 'Continue to Quote Form'}
                <Send className="ml-3 w-6 h-6" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BusinessForm