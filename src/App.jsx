import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
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
        </Routes>
    )
}

export default App
