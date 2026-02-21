import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import AdminDashboard from '@/pages/AdminDashboard'
import AdminLines from '@/pages/AdminLines'
import AdminBulkImport from '@/pages/AdminBulkImport'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import NetworkMap from '@/pages/NetworkMap'
import BookingConfirmation from '@/pages/BookingConfirmation'

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/map" element={<NetworkMap />} />
                <Route path="/booking/:id" element={<BookingConfirmation />} />
            </Route>

            {/* Secure Admin Routes Wrap */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="lines" element={<AdminLines />} />
                <Route path="import" element={<AdminBulkImport />} />
            </Route>
        </Routes>
    )
}

export default App
