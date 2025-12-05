import { motion } from 'framer-motion'
import { ArrowRight, Code, Shield, BarChart3, Megaphone, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'

const Landing = () => {
  const services = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'Custom enterprise applications and web platforms'
    },
    {
      icon: Shield,
      title: 'Cybersecurity Solutions',
      description: 'Government-grade security and compliance'
    },
    {
      icon: BarChart3,
      title: 'Data Analytics & AI',
      description: 'Machine learning and business intelligence'
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Strategic B2B marketing campaigns'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-midnight via-midnight/90 to-electric/20" />
      <div className="absolute top-20 left-10 w-20 h-20 gold-gradient rounded-full opacity-20 animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-electric/20 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Header */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
            <span className="text-midnight font-bold text-xl">M</span>
          </div>
          <span className="text-white font-bold text-xl">MTC LTD</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/careers" className="btn-secondary flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Careers
          </Link>
          <Link to="/auth" className="btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center min-h-screen px-4 -mt-20">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Engineering the Future of
              <span className="gold-gradient bg-clip-text text-transparent block">Innovation</span>
            </h1>
            <p className="text-2xl md:text-3xl text-softgray mb-12 max-w-4xl mx-auto">
              Premium enterprise solutions for Fortune 500 companies and government agencies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth" className="btn-primary inline-flex items-center text-xl px-12 py-4">
                Get Quote <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
              <Link to="/careers" className="btn-secondary">
                Join Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-gold">Expertise</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-luxury text-center group"
              >
                <div className="w-16 h-16 gold-gradient rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-midnight" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-softgray">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-softgray mb-8">
              Join 500+ enterprise clients who trust MTC LTD
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth" className="btn-primary inline-flex items-center text-lg px-10 py-4">
                Get Started Today <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
              <Link to="/careers" className="btn-secondary">
                Join Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Landing