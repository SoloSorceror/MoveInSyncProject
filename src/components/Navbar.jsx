import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Train, Sun, Moon, User, LogOut, ShieldCheck, X, Menu, Map, Ticket } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'

export default function Navbar() {
    const { theme, toggleTheme, isSidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore()
    const { isAuthenticated, user, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        setSidebarOpen(false)
        navigate('/')
    }

    const navLinks = [
        { to: '/map', label: 'Network Map', icon: Map },
        { to: '/dashboard', label: 'My Tickets', icon: Ticket, protected: true },
    ]

    return (
        <>
            <nav className="fixed top-0 w-full z-50 glass-panel border-b border-gray-200/80 dark:border-gray-800/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-gradient-to-br from-metro-primary to-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                                <Train size={22} />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                                MetroSync
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map(({ to, label, icon: Icon, protected: isProtected }) =>
                                (!isProtected || isAuthenticated) && (
                                    <Link
                                        key={to}
                                        to={to}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-metro-primary dark:hover:text-blue-400 transition-all"
                                    >
                                        <Icon size={16} />
                                        {label}
                                    </Link>
                                )
                            )}
                            {isAuthenticated && user?.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"
                                >
                                    <ShieldCheck size={16} />
                                    Admin
                                </Link>
                            )}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {/* Theme toggle */}
                            <button
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-600 dark:text-slate-300"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            {/* Auth actions - desktop */}
                            {isAuthenticated ? (
                                <div className="hidden md:flex items-center gap-2">
                                    <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold ${user?.role === 'admin' ? 'bg-indigo-500' : 'bg-metro-primary'}`}>
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{user?.name}</span>
                                        {user?.role === 'admin' && (
                                            <span className="text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-md font-semibold">Admin</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        aria-label="Logout"
                                        className="p-2 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                                        title="Sign out"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="hidden md:flex items-center gap-2 btn btn-primary btn-sm rounded-xl px-5 shadow-lg shadow-metro-primary/30 text-white border-0">
                                    <User size={16} /> Sign In
                                </Link>
                            )}

                            {/* Mobile hamburger */}
                            <button
                                onClick={toggleSidebar}
                                aria-label="Open menu"
                                className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Menu size={22} className="text-slate-700 dark:text-slate-200" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
                        />

                        {/* Drawer Panel */}
                        <motion.aside
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed top-0 right-0 z-50 h-full w-72 bg-white dark:bg-slate-900 shadow-2xl flex flex-col md:hidden"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-gradient-to-br from-metro-primary to-blue-600 rounded-lg text-white">
                                        <Train size={18} />
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white">MetroSync</span>
                                </div>
                                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                                    <X size={20} className="text-slate-600 dark:text-slate-300" />
                                </button>
                            </div>

                            {/* Drawer User Info */}
                            {isAuthenticated && (
                                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${user?.role === 'admin' ? 'bg-indigo-500' : 'bg-metro-primary'}`}>
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white text-sm">{user?.name}</p>
                                            <p className="text-xs text-slate-500">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Drawer nav links */}
                            <nav className="flex-1 p-4 space-y-1">
                                {navLinks.map(({ to, label, icon: Icon, protected: isProtected }) =>
                                    (!isProtected || isAuthenticated) && (
                                        <Link key={to} to={to} onClick={() => setSidebarOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-metro-primary transition-all">
                                            <Icon size={18} /> {label}
                                        </Link>
                                    )
                                )}
                                {isAuthenticated && user?.role === 'admin' && (
                                    <Link to="/admin" onClick={() => setSidebarOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all">
                                        <ShieldCheck size={18} /> Admin Panel
                                    </Link>
                                )}
                            </nav>

                            {/* Drawer footer */}
                            <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                                {isAuthenticated ? (
                                    <button onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
                                        <LogOut size={18} /> Sign Out
                                    </button>
                                ) : (
                                    <Link to="/login" onClick={() => setSidebarOpen(false)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-metro-primary text-white rounded-xl font-semibold">
                                        <User size={18} /> Sign In
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
