import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Route as RouteIcon, Globe, ShieldCheck, LogOut, PanelLeftClose, PanelLeft, Moon, Sun } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import AnimatedOutlet from '@/components/AnimatedOutlet';

export default function AdminLayout() {
    const { theme, toggleTheme } = useUIStore();
    const isDark = theme === 'dark';
    const navigate = useNavigate();

    return (
        <div className={`min-h-screen font-sans ${isDark ? 'dark bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 flex`}>
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-sm sticky top-0 h-screen">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
                            A
                        </div>
                        <span className="font-bold text-lg tracking-tight">Admin Portal</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`
                        }
                    >
                        <LayoutDashboard size={20} />
                        Compatibility Matrix
                    </NavLink>

                    <NavLink
                        to="/admin/lines"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`
                        }
                    >
                        <RouteIcon size={20} />
                        Route Management
                    </NavLink>

                    <NavLink
                        to="/admin/import"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`
                        }
                    >
                        <Globe size={20} />
                        Bulk Import
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        {isDark ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        <LogOut size={20} />
                        Exit Admin
                    </button>
                </div>
            </aside>

            {/* Main Content Pane */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center px-8 z-10 sticky top-0 justify-between">
                    <h1 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <ShieldCheck size={20} className="text-emerald-500" />
                        System Operations
                    </h1>
                </header>
                <div className="flex-1 overflow-y-auto p-8 bg-[#f8fafc] dark:bg-[#020617]">
                    <AnimatedOutlet />
                </div>
            </main>
        </div>
    );
}
