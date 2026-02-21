import { Link } from 'react-router-dom'
import { Train, Menu, User, Sun, Moon } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

export default function Navbar() {
    const { theme, toggleTheme } = useUIStore()

    return (
        <nav className="fixed top-0 w-full z-50 glass-panel border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-metro-primary to-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/30">
                            <Train size={24} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                            MetroSync
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/map" className="font-medium hover:text-metro-primary transition-colors">Network Map</Link>
                        <Link to="/dashboard" className="font-medium hover:text-metro-primary transition-colors">My Tickets</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <Link to="/login" className="hidden md:flex items-center gap-2 btn btn-primary btn-sm rounded-full px-6 shadow-lg shadow-metro-primary/30 text-white border-0">
                            <User size={16} /> Sign In
                        </Link>
                        <button className="md:hidden p-2">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
