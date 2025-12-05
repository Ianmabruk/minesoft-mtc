import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const response = await axios.post(`http://localhost:5000${endpoint}`, data)
      
      localStorage.setItem('user_authenticated', 'true')
      localStorage.setItem('user_email', data.email)
      setIsAuthenticated(true)
      toast.success(isLogin ? 'Login successful!' : 'Registration successful!')
      navigate('/home')
      reset()
    } catch (error) {
      console.error('Auth error:', error)
      toast.error(error.response?.data?.error || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-midnight via-midnight/90 to-electric/20" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 card-luxury max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 gold-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-midnight font-bold text-2xl">M</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Join MTC LTD'}
          </h1>
          <p className="text-softgray">
            {isLogin ? 'Sign in to access premium services' : 'Create your account to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
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
          )}

          <div>
            <input
              {...register('email', { 
                required: 'Email required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
              })}
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register('password', { 
                required: 'Password required',
                minLength: { value: 3, message: 'Password must be at least 3 characters' }
              })}
              type="password"
              placeholder="Password"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {!isLogin && (
            <div>
              <input
                {...register('company')}
                placeholder="Company Name (Optional)"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-softgray focus:outline-none focus:border-gold"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              reset()
            }}
            className="text-gold hover:text-yellow-400 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="mt-4 p-3 bg-white/5 rounded-lg text-center">
          <p className="text-softgray text-sm">Demo: test@example.com / 123</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Auth