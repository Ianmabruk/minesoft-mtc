import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Lock, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'

const Checkout = () => {
  const [selectedPlan, setSelectedPlan] = useState('enterprise')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const plans = {
    starter: {
      name: 'Starter Package',
      price: '$25,000',
      features: ['Basic Implementation', '3 Months Support', 'Standard Security', 'Email Support']
    },
    enterprise: {
      name: 'Enterprise Package',
      price: '$75,000',
      features: ['Full Implementation', '12 Months Support', 'Advanced Security', '24/7 Priority Support', 'Custom Integration']
    },
    premium: {
      name: 'Premium Package',
      price: '$150,000',
      features: ['Complete Solution', 'Unlimited Support', 'Government-Grade Security', 'Dedicated Account Manager', 'Custom Development']
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Payment processed successfully!')
      // Redirect to success page or dashboard
    } catch (error) {
      toast.error('Payment failed. Please try again.')
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
              Secure <span className="text-gold">Checkout</span>
            </h1>
            <p className="text-xl text-softgray">Complete your enterprise solution purchase</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card-luxury">
                <h2 className="text-2xl font-bold text-white mb-6">Select Package</h2>
                <div className="space-y-4">
                  {Object.entries(plans).map(([key, plan]) => (
                    <div
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPlan === key 
                          ? 'border-gold bg-gold/10' 
                          : 'border-white/20 hover:border-gold/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                        <span className="text-gold font-bold text-xl">{plan.price}</span>
                      </div>
                      <ul className="space-y-1">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-softgray text-sm">
                            <CheckCircle className="w-4 h-4 text-gold mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-luxury">
                <h3 className="text-xl font-semibold text-white mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-softgray">Package</span>
                    <span className="text-white">{plans[selectedPlan].name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-softgray">Subtotal</span>
                    <span className="text-white">{plans[selectedPlan].price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-softgray">Tax</span>
                    <span className="text-white">Calculated at completion</span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-gold font-bold text-xl">{plans[selectedPlan].price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-luxury"
            >
              <div className="flex items-center mb-6">
                <Lock className="w-6 h-6 text-gold mr-2" />
                <h2 className="text-2xl font-bold text-white">Payment Information</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Billing Information</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      {...register('firstName', { required: 'First name required' })}
                      placeholder="First Name"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                    />
                    <input
                      {...register('lastName', { required: 'Last name required' })}
                      placeholder="Last Name"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <input
                    {...register('email', { required: 'Email required' })}
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <input
                    {...register('company', { required: 'Company required' })}
                    placeholder="Company Name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Card Information</label>
                  <div className="relative">
                    <input
                      {...register('cardNumber', { required: 'Card number required' })}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-softgray focus:outline-none focus:border-gold"
                    />
                    <CreditCard className="absolute right-3 top-3 w-6 h-6 text-softgray" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    {...register('expiry', { required: 'Expiry required' })}
                    placeholder="MM/YY"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                  />
                  <input
                    {...register('cvv', { required: 'CVV required' })}
                    placeholder="123"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('terms', { required: 'Please accept terms' })}
                    className="w-4 h-4 text-gold bg-white/10 border-white/20 rounded focus:ring-gold"
                  />
                  <label className="text-softgray text-sm">
                    I agree to the <Link to="#" className="text-gold hover:text-yellow-400">Terms of Service</Link> and <Link to="#" className="text-gold hover:text-yellow-400">Privacy Policy</Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  {loading ? 'Processing...' : `Complete Purchase - ${plans[selectedPlan].price}`}
                </button>
              </form>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-softgray text-sm">
                  <Lock className="w-4 h-4" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Checkout