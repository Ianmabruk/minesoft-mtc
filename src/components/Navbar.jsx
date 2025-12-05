import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, LogOut } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user_authenticated')
    localStorage.removeItem('user_email')
    navigate('/auth')
  }

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Services', path: '/services' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Careers', path: '/careers' },
    { name: 'Quote', path: '/quote' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="flex items-center space-x-2">
            <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
              <span className="text-midnight font-bold text-xl">M</span>
            </div>
            <span className="text-white font-bold text-xl">MTC LTD</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors ${
                  location.pathname === item.path 
                    ? 'text-gold' 
                    : 'text-white hover:text-gold'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <Link to="/checkout" className="btn-primary">
              Get Started
            </Link>
            
            <button
              onClick={handleLogout}
              className="text-white hover:text-gold transition-colors flex items-center"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass"
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block py-2 text-white hover:text-gold"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/checkout"
              className="block py-2 text-gold font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
            <button
              onClick={() => {
                handleLogout()
                setIsOpen(false)
              }}
              className="block py-2 text-white hover:text-gold w-full text-left"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar