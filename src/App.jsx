import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import { ErrorBoundary } from '@/components/ErrorBoundary'

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const NetworkMap = lazy(() => import('@/pages/NetworkMap'))
const BookingConfirmation = lazy(() => import('@/pages/BookingConfirmation'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
const AdminLines = lazy(() => import('@/pages/AdminLines'))
const AdminBulkImport = lazy(() => import('@/pages/AdminBulkImport'))
const AdminMatrix = lazy(() => import('@/pages/AdminMatrix'))
const Profile = lazy(() => import('@/pages/Profile'))

// Full-screen skeleton fallback
function PageSkeleton() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-metro-primary/20 animate-pulse flex items-center justify-center">
                    <div className="w-6 h-6 rounded bg-metro-primary/40 animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-metro-primary animate-bounce [animation-delay:0ms]" />
                    <div className="w-2 h-2 rounded-full bg-metro-primary animate-bounce [animation-delay:150ms]" />
                    <div className="w-2 h-2 rounded-full bg-metro-primary animate-bounce [animation-delay:300ms]" />
                </div>
            </div>
        </div>
    )
}

function App() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<PageSkeleton />}>
                <Routes>
                    {/* Public Passenger Routes */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/map" element={<NetworkMap />} />

                        {/* Protected: logged-in users only */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/booking/:id" element={
                            <ProtectedRoute>
                                <BookingConfirmation />
                            </ProtectedRoute>
                        } />
                        <Route path="/profile" element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        } />
                    </Route>

                    {/* Protected: Admin-only Routes */}
                    <Route path="/admin" element={
                        <ProtectedRoute role="admin">
                            <AdminLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<AdminDashboard />} />
                        <Route path="lines" element={<AdminLines />} />
                        <Route path="import" element={<AdminBulkImport />} />
                        <Route path="matrix" element={<AdminMatrix />} />
                    </Route>
                </Routes>
            </Suspense>
        </ErrorBoundary>
    )
}

export default App
