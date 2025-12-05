import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await axios.post('/api/inquiry', data)
      toast.success('Inquiry submitted successfully! We\'ll contact you within 24 hours.')
      reset()
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contact <span className="text-gold">Us</span>
            </h1>
            <p className="text-xl text-softgray max-w-3xl mx-auto">
              Ready to transform your business? Get in touch with our enterprise solutions experts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="card-luxury">
                <Mail className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                <p className="text-softgray">info@mtcltd.com</p>
                <p className="text-softgray">sales@mtcltd.com</p>
              </div>

              <div className="card-luxury">
                <Phone className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                <p className="text-softgray">+1 (555) 123-4567</p>
                <p className="text-softgray">+1 (555) 987-6543</p>
              </div>

              <div className="card-luxury">
                <MapPin className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
                <p className="text-softgray">123 Enterprise Plaza</p>
                <p className="text-softgray">New York, NY 10001</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-luxury"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Request a Quote</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      placeholder="First Name"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                    />
                    {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      placeholder="Last Name"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                    />
                    {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <input
                    {...register('company', { required: 'Company is required' })}
                    placeholder="Company Name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                  />
                  {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company.message}</p>}
                </div>

                <div>
                  <select
                    {...register('service', { required: 'Please select a service' })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                  >
                    <option value="">Select Service</option>
                    <option value="software-development">Software Development</option>
                    <option value="cybersecurity">Cybersecurity Solutions</option>
                    <option value="data-analytics">Data Analytics & AI</option>
                    <option value="digital-marketing">Digital Marketing</option>
                  </select>
                  {errors.service && <p className="text-red-400 text-sm mt-1">{errors.service.message}</p>}
                </div>

                <div>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    placeholder="Project Details"
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold resize-none"
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  {loading ? 'Submitting...' : 'Send Message'}
                  <Send className="ml-2 w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact