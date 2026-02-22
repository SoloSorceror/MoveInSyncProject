import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Train, User, LogOut, ShieldCheck, X, Menu,
    Map, Ticket, Search, PhoneCall, Bell, Home, ChevronRight
} from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'

/* ── Tricolor tokens ───────────────────────────────────────────── */
// Red: #D7231A  |  Navy Blue: #003087  |  Green: #00873D

const NAV_LINKS = [
    { to: '/', label: 'Home', icon: Home, end: true },
    { to: '/map', label: 'Network', icon: Map, end: false },
    { to: '/dashboard', label: 'My Tickets', icon: Ticket, end: false, protected: true },
]

export default function Navbar() {
    const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore()
    const { isAuthenticated, user, logout } = useAuthStore()
    const navigate = useNavigate()
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchVal, setSearchVal] = useState('')

    const handleLogout = () => {
        logout(); setSidebarOpen(false); navigate('/')
    }

    return (
        <>
            {/* ── Tier 1: Utility Bar ──────────────────────────────────── */}
            <div className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 gap-4">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 shrink-0 group">
                            <div className="relative">
                                <div className="w-11 h-11 rounded-full bg-[#D7231A] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                                    <Train size={20} className="text-white" />
                                </div>
                                {/* tricolor ring */}
                                <div className="absolute inset-0 rounded-full ring-2 ring-offset-1 ring-[#003087] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="hidden sm:block leading-tight">
                                <p className="font-black text-[#003087] text-base tracking-tight">MoveIn<span className="text-[#D7231A]">Sync</span></p>
                                <p className="text-[10px] text-gray-500 font-semibold tracking-wider">SMART TRANSIT BOOKING</p>
                            </div>
                        </Link>

                        {/* Helpline badge */}
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#003087] rounded-lg text-white text-sm font-semibold">
                            <PhoneCall size={14} className="text-[#00D166]" />
                            <span>Helpline:</span>
                            <span className="text-[#00D166] font-black tracking-wider">155370</span>
                        </div>

                        {/* Service status button */}
                        <Link to="/map" className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#00873D] text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors shrink-0">
                            <Bell size={14} />
                            Service Status
                        </Link>

                        {/* Search bar */}
                        <div className="flex-1 max-w-xs hidden md:block">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchVal}
                                    onChange={e => setSearchVal(e.target.value)}
                                    placeholder="Search stations, routes…"
                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-[#003087] focus:ring-1 focus:ring-[#003087]/30 transition-all"
                                />
                            </div>
                        </div>

                        {/* Auth section */}
                        <div className="flex items-center gap-2">
                            {isAuthenticated ? (
                                <div className="hidden md:flex items-center gap-2">
                                    <Link to="/profile" className={`flex items-center gap-2 px-3 py-1.5 rounded-full border hover:shadow-sm transition-all ${user?.role === 'admin' ? 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${user?.role === 'admin' ? 'bg-indigo-600' : 'bg-[#D7231A]'}`}>
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <span className="text-sm font-semibold text-gray-800">{user?.name}</span>
                                        {user?.role === 'admin' && (
                                            <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold">ADMIN</span>
                                        )}
                                    </Link>
                                    <button onClick={handleLogout} title="Sign out"
                                        className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all">
                                        <LogOut size={16} />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login"
                                    className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-[#D7231A] text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors shadow-sm">
                                    <User size={15} /> Sign In
                                </Link>
                            )}

                            {/* Mobile hamburger */}
                            <button onClick={toggleSidebar} aria-label="Open menu"
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <Menu size={22} className="text-[#003087]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Tier 2: Main Navigation Bar ───────────────────────────── */}
            <div className="fixed top-14 w-full z-40 bg-[#003087] shadow-md">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-10 gap-1 overflow-x-auto no-scrollbar">

                        {NAV_LINKS.map(({ to, label, icon: Icon, end, protected: isProtected }) =>
                            (!isProtected || isAuthenticated) && (
                                <NavLink key={to} to={to} end={end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-none rounded-b-none whitespace-nowrap transition-all border-b-3 ${isActive
                                            ? 'bg-white/15 text-white border-b-[3px] border-[#D7231A]'
                                            : 'text-blue-100 hover:bg-white/10 hover:text-white border-b-[3px] border-transparent'
                                        }`
                                    }>
                                    <Icon size={14} /> {label}
                                </NavLink>
                            )
                        )}

                        {isAuthenticated && user?.role === 'admin' && (
                            <NavLink to="/admin"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all border-b-[3px] ${isActive
                                        ? 'bg-white/15 text-white border-[#D7231A]'
                                        : 'text-blue-100 hover:bg-white/10 hover:text-white border-transparent'
                                    }`
                                }>
                                <ShieldCheck size={14} /> Admin Portal
                            </NavLink>
                        )}

                        {/* Right-side quick links */}
                        <div className="ml-auto hidden lg:flex items-center gap-1">
                            <a href="mailto:feedback@demo.moveinsync.in" className="flex items-center gap-1.5 px-4 py-1.5 bg-[#D7231A] text-white text-xs font-bold rounded-md hover:bg-red-700 transition-colors">
                                For Feedback / Complaints <ChevronRight size={12} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Mobile Drawer ─────────────────────────────────────────── */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden" />
                        <motion.aside
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                            className="fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col md:hidden">

                            {/* Drawer Header */}
                            <div className="bg-[#003087] px-5 py-4 flex items-center justify-between">
                                <span className="font-black text-white text-base">MoveIn<span className="text-yellow-300">Sync</span></span>
                                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                                    <X size={20} className="text-white" />
                                </button>
                            </div>

                            {/* Tricolor strip */}
                            <div className="flex h-1">
                                <div className="flex-1 bg-[#D7231A]" />
                                <div className="flex-1 bg-white" />
                                <div className="flex-1 bg-[#00873D]" />
                            </div>

                            {isAuthenticated && (
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${user?.role === 'admin' ? 'bg-indigo-600' : 'bg-[#D7231A]'}`}>
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">{user?.name}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <nav className="flex-1 p-4 space-y-1">
                                {NAV_LINKS.map(({ to, label, icon: Icon, end, protected: isProtected }) =>
                                    (!isProtected || isAuthenticated) && (
                                        <Link key={to} to={to} onClick={() => setSidebarOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-[#003087] font-semibold text-sm transition-all">
                                            <Icon size={17} className="text-[#D7231A]" /> {label}
                                        </Link>
                                    )
                                )}
                                {isAuthenticated && user?.role === 'admin' && (
                                    <Link to="/admin" onClick={() => setSidebarOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-indigo-700 hover:bg-indigo-50 font-semibold text-sm transition-all">
                                        <ShieldCheck size={17} /> Admin Portal
                                    </Link>
                                )}
                            </nav>

                            <div className="p-4 border-t border-gray-100">
                                {isAuthenticated ? (
                                    <button onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-semibold text-sm transition-all">
                                        <LogOut size={17} /> Sign Out
                                    </button>
                                ) : (
                                    <Link to="/login" onClick={() => setSidebarOpen(false)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#D7231A] text-white rounded-xl font-semibold text-sm">
                                        <User size={17} /> Sign In
                                    </Link>
                                )}
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
