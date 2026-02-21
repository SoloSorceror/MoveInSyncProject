import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

/**
 * ProtectedRoute — wraps a route with auth + optional role checks.
 * Usage:
 *   <ProtectedRoute>              → requires auth only
 *   <ProtectedRoute role="admin"> → requires auth AND admin role
 */
export default function ProtectedRoute({ children, role }) {
    const { isAuthenticated, user } = useAuthStore()
    const location = useLocation()

    if (!isAuthenticated) {
        // Redirect to login, preserving the original destination
        return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }

    if (role && user?.role !== role) {
        // Wrong role — send admins to /admin, users to /
        return <Navigate to={user?.role === 'admin' ? '/admin' : '/'} replace />
    }

    return children
}
