import { useState } from 'react'
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Train, LayoutDashboard, Map, Settings, Grid3x3, ChevronRight, Menu, X, ShieldCheck } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { ADMIN_TOP_BAR_STATS } from '@/data/dummyData'

/* ── Only the routes that actually exist + are useful ─────────── */
const NAV_ITEMS = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/lines', label: 'Network Lines', icon: Map, end: false },
    { to: '/admin/import', label: 'Bulk Import', icon: Settings, end: false },
    { to: '/admin/matrix', label: 'Compat Matrix', icon: Grid3x3, end: false },
]

/* ── Indian Flag SVG ───────────────────────────────────────────── */
function IndianFlag({ size = 24 }) {
    const w = size * 1.5
    const h = size
    return (
        <svg width={w} height={h} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2 }}>
            <rect width="900" height="200" fill="#FF9933" />
            <rect y="200" width="900" height="200" fill="#FFFFFF" />
            <rect y="400" width="900" height="200" fill="#138808" />
            <circle cx="450" cy="300" r="85" fill="none" stroke="#000080" strokeWidth="8" />
            <circle cx="450" cy="300" r="14" fill="#000080" />
            {Array.from({ length: 24 }, (_, i) => {
                const angle = (i * 15 * Math.PI) / 180
                return (
                    <line key={i}
                        x1={450 + 14 * Math.cos(angle)} y1={300 + 14 * Math.sin(angle)}
                        x2={450 + 85 * Math.cos(angle)} y2={300 + 85 * Math.sin(angle)}
                        stroke="#000080" strokeWidth="4" />
                )
            })}
        </svg>
    )
}

export default function AdminLayout() {
    const { user } = useAuthStore()
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* ── Sidebar (full height, no scroll cut-off) ─────────── */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-[#003087] flex flex-col
                transform transition-transform duration-300 ease-in-out shadow-xl
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static lg:z-auto lg:flex-shrink-0
            `}>
                {/* Tricolor strip */}
                <div className="flex h-1.5 flex-shrink-0">
                    <div className="flex-1 bg-[#D7231A]" />
                    <div className="flex-1 bg-white/30" />
                    <div className="flex-1 bg-[#00873D]" />
                </div>

                {/* Logo + Indian Flag */}
                <div className="px-4 py-4 border-b border-white/10 flex-shrink-0 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#D7231A] flex items-center justify-center shadow-md flex-shrink-0">
                            <Train size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="font-black text-white text-base">Metro<span className="text-yellow-300">Sync</span></p>
                            <p className="text-blue-200 text-[10px] font-bold tracking-wider">ADMIN PORTAL</p>
                        </div>
                    </div>
                    {/* Indian Flag + Brand */}
                    <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5 border border-white/10">
                        <IndianFlag size={22} />
                        <div>
                            <p className="text-white font-black text-xs">MoveInSync</p>
                            <p className="text-blue-200 text-[10px] font-semibold">Smart Metro Network</p>
                        </div>
                    </div>
                </div>

                {/* User card */}
                <div className="px-4 py-3 border-b border-white/10 flex-shrink-0">
                    <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#D7231A] flex items-center justify-center font-black text-white text-sm flex-shrink-0">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-bold text-white text-sm truncate">{user?.name || 'Admin'}</p>
                            <p className="text-blue-200 text-[10px] truncate">{user?.email}</p>
                        </div>
                        <ShieldCheck size={14} className="text-[#00D166] flex-shrink-0" />
                    </div>
                </div>

                {/* Nav — fills remaining space */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    <p className="text-blue-300/60 text-[10px] font-black uppercase tracking-widest px-3 mb-3">Navigation</p>
                    {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                        <NavLink key={to} to={to} end={end}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all ${isActive
                                    ? 'bg-[#D7231A] text-white shadow-md'
                                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                                }`
                            }>
                            {({ isActive }) => (
                                <>
                                    <Icon size={17} className={isActive ? 'text-white' : 'text-blue-300'} />
                                    {label}
                                    {isActive && <ChevronRight size={13} className="ml-auto" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom padding so sidebar extends full height visually */}
                <div className="flex-shrink-0 pb-6 px-4">
                    <div className="border-t border-white/10 pt-4">
                        <Link to="/"
                            className="flex items-center gap-2 text-blue-200 hover:text-white text-xs font-semibold transition-colors">
                            ← Back to Passenger View
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setMobileOpen(false)}
                        className="fixed inset-0 z-30 bg-black/50 lg:hidden" />
                )}
            </AnimatePresence>

            {/* ── Main content ─────────────────────────────────────── */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* Top bar */}
                <header className="bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center gap-4 flex-shrink-0 shadow-sm">
                    <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        {mobileOpen ? <X size={20} className="text-[#003087]" /> : <Menu size={20} className="text-[#003087]" />}
                    </button>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                        <span className="text-[#003087] font-black">Admin</span>
                        <ChevronRight size={14} />
                        <span className="text-gray-700">MoveInSync Control Panel</span>
                    </div>
                    <div className="ml-auto hidden md:flex items-center gap-2">
                        {ADMIN_TOP_BAR_STATS.map(({ label, value, colorHex, bgHex }) => (
                            <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200" style={{ backgroundColor: bgHex }}>
                                <span className="font-black text-sm" style={{ color: colorHex }}>{value}</span>
                                <span className="text-xs text-gray-500">{label}</span>
                            </div>
                        ))}
                    </div>
                </header>

                {/* Tricolor rule */}
                <div className="flex h-0.5 flex-shrink-0">
                    <div className="flex-1 bg-[#D7231A]" />
                    <div className="flex-1 bg-white" />
                    <div className="flex-1 bg-[#00873D]" />
                </div>

                {/* ✅ Outlet — renders nested admin route pages, scrollable */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
