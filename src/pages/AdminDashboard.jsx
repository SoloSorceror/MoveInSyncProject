import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    Train, Users, TicketCheck, TrendingUp, AlertCircle,
    CheckCircle2, Clock, ChevronRight, Map, Activity,
    ArrowUpRight, ArrowDownRight
} from 'lucide-react'

/* ── Stats ─────────────────────────────────────────────────────── */
const KPI_CARDS = [
    { label: 'Total Passengers Today', value: '6,218,430', change: '+4.2%', up: true, icon: Users, color: '#D7231A', bg: '#FEF2F2' },
    { label: 'Tickets Issued Today', value: '1,284,921', change: '+2.8%', up: true, icon: TicketCheck, color: '#003087', bg: '#EFF6FF' },
    { label: 'Active Metro Lines', value: '9 / 9', change: '100%', up: true, icon: Train, color: '#00873D', bg: '#F0FDF4' },
    { label: 'Avg Journey Time', value: '24 min', change: '-1.3 min', up: true, icon: Clock, color: '#7C3AED', bg: '#F5F3FF' },
]

const RECENT_BOOKINGS = [
    { id: 'MTS-7834', from: 'Rajiv Chowk', to: 'New Delhi', fare: '₹40', time: '09:45 AM', status: 'Active' },
    { id: 'MTS-7833', from: 'Hauz Khas', to: 'Botanical Garden', fare: '₹60', time: '09:32 AM', status: 'Active' },
    { id: 'MTS-7832', from: 'Dwarka Sec 21', to: 'Kashmere Gate', fare: '₹55', time: '09:18 AM', status: 'Completed' },
    { id: 'MTS-7831', from: 'Airport (T3)', to: 'New Delhi', fare: '₹60', time: '09:10 AM', status: 'Completed' },
    { id: 'MTS-7830', from: 'Noida Electronic City', to: 'Rajiv Chowk', fare: '₹45', time: '09:01 AM', status: 'Completed' },
]

const LINE_STATUS = [
    { line: 'Yellow Line', color: '#D97706', stations: 37, status: 'Operational', freq: '3 min' },
    { line: 'Blue Line', color: '#2563EB', stations: 50, status: 'Operational', freq: '4 min' },
    { line: 'Red Line', color: '#D7231A', stations: 29, status: 'Minor Delay', freq: '6 min' },
    { line: 'Magenta Line', color: '#C026D3', stations: 25, status: 'Operational', freq: '5 min' },
    { line: 'Orange Line', color: '#EA580C', stations: 6, status: 'Operational', freq: '15 min' },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-6 max-w-[1400px] mx-auto">

            {/* Page header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-[#003087]">Admin Overview</h1>
                    <p className="text-gray-500 text-sm">MetroSync Network Control — Real-time dashboard</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#00873D] bg-green-50 border border-green-200 px-3 py-2 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-[#00873D] animate-pulse" />
                    All Systems Operational
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {KPI_CARDS.map(({ label, value, change, up, icon: Icon, color, bg }, i) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                                <Icon size={20} style={{ color }} />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${up ? 'text-[#00873D] bg-green-50' : 'text-[#D7231A] bg-red-50'}`}>
                                {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {change}
                            </span>
                        </div>
                        <p className="text-2xl font-black text-gray-900 mb-0.5">{value}</p>
                        <p className="text-xs text-gray-500 font-semibold">{label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

                {/* Recent Bookings table */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <TicketCheck size={16} className="text-[#D7231A]" />
                            <h2 className="font-black text-gray-800 text-sm">Recent Bookings</h2>
                        </div>
                        <Link to="/admin/tickets" className="text-xs font-bold text-[#003087] hover:text-[#D7231A] transition-colors flex items-center gap-1">
                            View All <ChevronRight size={12} />
                        </Link>
                    </div>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="text-left px-5 py-2.5 text-xs font-black text-gray-500 uppercase tracking-wider">Ticket ID</th>
                                <th className="text-left px-3 py-2.5 text-xs font-black text-gray-500 uppercase tracking-wider">Journey</th>
                                <th className="text-left px-3 py-2.5 text-xs font-black text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="text-left px-3 py-2.5 text-xs font-black text-gray-500 uppercase tracking-wider">Fare</th>
                                <th className="text-left px-3 py-2.5 text-xs font-black text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {RECENT_BOOKINGS.map((b, i) => (
                                <motion.tr key={b.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.35 + i * 0.05 }}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                                >
                                    <td className="px-5 py-3">
                                        <span className="font-mono font-bold text-xs text-[#003087]">{b.id}</span>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className="font-semibold text-gray-800">{b.from}</span>
                                        <span className="text-gray-400 mx-1">→</span>
                                        <span className="font-semibold text-gray-800">{b.to}</span>
                                    </td>
                                    <td className="px-3 py-3 text-gray-500 text-xs font-semibold">{b.time}</td>
                                    <td className="px-3 py-3 font-black text-[#D7231A]">{b.fare}</td>
                                    <td className="px-3 py-3">
                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${b.status === 'Active'
                                            ? 'bg-green-50 text-[#00873D] border border-green-200'
                                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                                            }`}>
                                            {b.status === 'Active' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00873D] mr-1 animate-pulse" />}
                                            {b.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Right column: Line status */}
                <div className="space-y-5">
                    <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#003087]">
                            <Activity size={15} className="text-blue-300" />
                            <h3 className="font-black text-white text-sm">Line Status</h3>
                            <span className="ml-auto text-[10px] bg-[#00873D] text-white font-bold px-2 py-0.5 rounded-full">LIVE</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {LINE_STATUS.map((l, i) => (
                                <motion.div key={l.line}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 + i * 0.06 }}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-800 text-sm truncate">{l.line}</p>
                                        <p className="text-xs text-gray-400">{l.stations} stations · {l.freq}</p>
                                    </div>
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-full flex-shrink-0 ${l.status === 'Operational'
                                        ? 'bg-green-50 text-[#00873D]'
                                        : 'bg-yellow-50 text-amber-600'
                                        }`}>
                                        {l.status === 'Operational'
                                            ? <><CheckCircle2 size={10} className="inline mr-1" />OK</>
                                            : <><AlertCircle size={10} className="inline mr-1" />Delay</>}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick links */}
                    <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 }}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                    >
                        <div className="px-4 py-3 border-b border-gray-100">
                            <h3 className="font-black text-gray-800 text-sm">Quick Actions</h3>
                        </div>
                        <div className="p-3 space-y-2">
                            {[
                                { label: 'View All Passengers', to: '/admin/users', color: '#D7231A', bg: '#FEF2F2' },
                                { label: 'Manage Network Lines', to: '/admin/lines', color: '#003087', bg: '#EFF6FF' },
                                { label: 'Bulk Import Data', to: '/admin/import', color: '#00873D', bg: '#F0FDF4' },
                                { label: 'View Network Map', to: '/map', color: '#7C3AED', bg: '#F5F3FF' },
                            ].map(({ label, to, color, bg }) => (
                                <Link key={label} to={to}
                                    className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm transition-all hover:translate-x-1 hover:shadow-sm"
                                    style={{ backgroundColor: bg, color }}>
                                    {label} <ChevronRight size={14} />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
