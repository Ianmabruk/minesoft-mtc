import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code, Shield, BarChart3, Megaphone, Star, Users, Award, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const Home = () => {
  const [stats, setStats] = useState({
    websites: 847,
    clients: 500,
    projects: 1250,
    satisfaction: 99.9
  })

  useEffect(() => {
    // Animate numbers on load
    const timer = setTimeout(() => {
      setStats({
        websites: 847,
        clients: 500,
        projects: 1250,
        satisfaction: 99.9
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const services = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'Custom enterprise applications, web platforms, and mobile solutions',
      price: 'From $50,000',
      features: ['Full-Stack Development', 'Cloud Architecture', 'API Integration']
    },
    {
      icon: Shield,
      title: 'Cybersecurity Solutions',
      description: 'Government-grade security and compliance frameworks',
      price: 'From $25,000',
      features: ['Security Audits', 'Penetration Testing', 'Compliance Management']
    },
    {
      icon: BarChart3,
      title: 'Data Analytics & AI',
      description: 'Machine learning models and business intelligence solutions',
      price: 'From $40,000',
      features: ['Predictive Analytics', 'ML Implementation', 'BI Dashboards']
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Strategic B2B marketing campaigns and brand development',
      price: 'From $15,000/mo',
      features: ['SEO & SEM', 'Content Strategy', 'Performance Analytics']
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'CTO, Fortune 500 Company',
      content: 'MTC LTD transformed our digital infrastructure with exceptional precision.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      position: 'Director of Security',
      content: 'Their cybersecurity solutions exceeded our government compliance requirements.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      position: 'VP of Analytics',
      content: 'The AI-driven insights accelerated our growth by 300%.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight/50 to-electric/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Premium Enterprise
              <span className="gold-gradient bg-clip-text text-transparent block">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-softgray mb-8 max-w-4xl mx-auto">
              Trusted by Fortune 500 companies and government agencies worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="btn-primary inline-flex items-center">
                Explore Services <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/quote" className="btn-secondary">
                Get Quote
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 gold-gradient rounded-full opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-electric/20 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }} />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-premium/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">{stats.websites}+</div>
              <div className="text-softgray">Websites Built</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">{stats.clients}+</div>
              <div className="text-softgray">Enterprise Clients</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">{stats.projects}+</div>
              <div className="text-softgray">Projects Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">{stats.satisfaction}%</div>
              <div className="text-softgray">Client Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-gold">Services</span>
            </h2>
            <p className="text-xl text-softgray max-w-3xl mx-auto">
              Comprehensive solutions designed for enterprise excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-luxury group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 gold-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-midnight" />
                  </div>
                  <div className="text-right">
                    <div className="text-gold font-bold text-lg">{service.price}</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-softgray mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-softgray">
                      <div className="w-2 h-2 bg-gold rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="text-gold hover:text-yellow-400 font-medium inline-flex items-center">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary inline-flex items-center">
              View All Services <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-premium/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Client <span className="text-gold">Excellence</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-luxury"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                <p className="text-softgray mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-softgray">{testimonial.position}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-softgray mb-8">
              Transform your business with enterprise-grade solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote" className="btn-primary inline-flex items-center">
                Get Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/careers" className="btn-secondary">
                Join Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home