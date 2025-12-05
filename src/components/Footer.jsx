import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'

const Footer = () => {
  const services = [
    'Software Development',
    'Cybersecurity Solutions', 
    'Data Analytics & AI',
    'Digital Marketing'
  ]

  const company = [
    'About Us',
    'Careers',
    'Contact',
    'Privacy Policy',
    'Terms of Service'
  ]

  return (
    <footer className="luxury-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-midnight font-bold text-xl">M</span>
              </div>
              <span className="text-white font-bold text-xl">MTC LTD</span>
            </div>
            <p className="text-softgray">
              Engineering the Future of Innovation, Security, and Intelligence for enterprise clients worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-softgray hover:text-gold transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-softgray hover:text-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-softgray hover:text-gold transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gold">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-softgray hover:text-white transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gold">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item}>
                  <Link to="#" className="text-softgray hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold" />
                <span className="text-softgray">info@mtcltd.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold" />
                <span className="text-softgray">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-softgray">New York, NY 10001</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-softgray">
            © 2024 MTC LTD. All rights reserved. | Engineered with precision and excellence.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer