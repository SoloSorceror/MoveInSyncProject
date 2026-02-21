import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, Train, Upload, LogOut, Moon, Sun, ShieldCheck, Activity, Users, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import AnimatedOutlet from '@/components/AnimatedOutlet';

const NAV_ITEMS = [
    { to: '/admin', end: true, icon: LayoutGrid, label: 'Version Matrix', desc: 'Compatibility tracking' },
    { to: '/admin/lines', end: false, icon: Train, label: 'Route Editor', desc: 'Drag-and-drop lines' },
    { to: '/admin/import', end: false, icon: Upload, label: 'Bulk Import', desc: 'CSV / JSON upload' },
];

const STATS = [
    { icon: Train, label: 'Active Lines', value: '5', trend: '+0', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { icon: MapPin, label: 'Total Stations', value: '42', trend: '+3', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { icon: Users, label: 'Daily Riders', value: '2.4M', trend: '+8%', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-500/10' },
    { icon: Activity, label: 'System Health', value: '99.8%', trend: 'online', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
];

export default function AdminLayout() {
    const { theme, toggleTheme } = useUIStore();
    const { user, logout } = useAuthStore();
    const isDark = theme === 'dark';
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`min-h-screen font-sans ${isDark ? 'dark bg-[#0a0f1e] text-white' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 flex`}>

            {/* — Sidebar — */}
            <aside className="w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-sm sticky top-0 h-screen z-10">

                {/* Brand */}
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                            <ShieldCheck size={18} />
                        </div>
                        <div>
                            <span className="font-bold text-base text-slate-900 dark:text-white leading-none block">Admin Portal</span>
                            <span className="text-xs text-slate-400 mt-0.5 block">MetroSync Operations</span>
                        </div>
                    </div>
                </div>

                {/* User badge */}
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 truncate">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-indigo-400 truncate">{user?.email || 'admin@metro.com'}</p>
                        </div>
                    </div>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 p-4 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">Management</p>
                    {NAV_ITEMS.map(({ to, end, icon: Icon, label, desc }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive
                                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${isActive ? 'bg-indigo-100 dark:bg-indigo-500/20' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'}`}>
                                        <Icon size={16} className={isActive ? 'text-indigo-600 dark:text-indigo-400' : ''} />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm leading-none mb-0.5">{label}</p>
                                        <p className="text-xs text-slate-400 leading-none">{desc}</p>
                                    </div>
                                    {isActive && (
                                        <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-5 rounded-full bg-indigo-500" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer Actions */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
                    >
                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        {isDark ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 transition-colors text-sm font-medium"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors text-xs"
                    >
                        ← Back to Passenger App
                    </button>
                </div>
            </aside>

            {/* — Main Content — */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">

                {/* Top Header Bar */}
                <header className="shrink-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center px-8 justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <Activity size={16} className="text-emerald-500 animate-pulse" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">System Operational</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>Last synced: just now</span>
                        <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono">v2.4.1</span>
                    </div>
                </header>

                {/* Stats Bar */}
                <div className="shrink-0 px-8 py-4 grid grid-cols-2 xl:grid-cols-4 gap-4 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                    {STATS.map(({ icon: Icon, label, value, trend, color, bg }) => (
                        <div key={label} className={`flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 ${bg}`}>
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${bg}`}>
                                <Icon size={18} className={color} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                                <p className="font-bold text-slate-900 dark:text-white text-base leading-tight">{value}</p>
                            </div>
                            <span className={`ml-auto text-xs font-semibold ${color}`}>{trend}</span>
                        </div>
                    ))}
                </div>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50 dark:bg-[#0a0f1e]">
                    <AnimatedOutlet />
                </div>
            </main>
        </div>
    );
}
