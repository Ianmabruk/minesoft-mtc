import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/auth" replace />
}

export default ProtectedRoute