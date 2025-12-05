import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Services from './pages/Services'
import Checkout from './pages/Checkout'
import Quote from './pages/Quote'
import BusinessForm from './pages/BusinessForm'
import Careers from './pages/Careers'
import ClientDashboard from './pages/ClientDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem('user_authenticated')
    setIsAuthenticated(authStatus === 'true')
  }, [])

  return (
    <div className="min-h-screen luxury-gradient">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/home" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/services" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Services />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/quote" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Quote />
          </ProtectedRoute>
        } />
        <Route path="/business-form" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <BusinessForm />
          </ProtectedRoute>
        } />
        <Route path="/careers" element={<Careers />} />
        <Route path="/dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ClientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0A1A2F',
            color: '#F5F7FA',
            border: '1px solid #D4AF37',
          },
        }}
      />
    </div>
  )
}

export default App