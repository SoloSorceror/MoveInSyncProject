import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SkeletonCard } from '@/components/Skeleton'
import {
    Users, TicketCheck, Train, Clock, ChevronRight,
    CheckCircle2, AlertTriangle, Activity
} from 'lucide-react'
import {
    ADMIN_KPI, ADMIN_RECENT_BOOKINGS, ADMIN_LINE_STATUS, ADMIN_QUICK_ACTIONS
} from '@/data/dummyData'

/* ── Map iconKey → lucide component ─────────────────────────────── */
const ICON_MAP = { users: Users, ticket: TicketCheck, train: Train, clock: Clock }

export default function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="max-w-6xl mx-auto space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-[#003087]">Admin Overview</h1>
                    <p className="text-gray-400 text-sm mt-0.5">MoveInSync Network Control — Real-time dashboard</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#00873D] bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                    <CheckCircle2 size={13} /> All Systems Operational
                </span>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {isLoading ? (
                    Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                    ADMIN_KPI.map(({ label, value, change, up, iconKey }, i) => {
                        const Icon = ICON_MAP[iconKey] || Activity
                        const colors = [
                            { icon: '#D7231A', bg: '#FEF2F2' },
                            { icon: '#003087', bg: '#EFF6FF' },
                            { icon: '#00873D', bg: '#F0FDF4' },
                            { icon: '#7C3AED', bg: '#F5F3FF' },
                        ]
                        return (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: colors[i].bg }}>
                                        <Icon size={18} style={{ color: colors[i].icon }} />
                                    </div>
                                    <span className="text-xs font-bold text-[#00873D] bg-green-50 px-2 py-0.5 rounded-full">
                                        ↑ {change}
                                    </span>
                                </div>
                                <p className="text-2xl font-black text-gray-900">{value}</p>
                                <p className="text-xs text-gray-400 font-semibold mt-0.5">{label}</p>
                            </motion.div>
                        )
                    }))}
            </div>

            {/* Recent Bookings + Line Status */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">

                {/* Recent Bookings */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <TicketCheck size={16} className="text-[#D7231A]" />
                            <h2 className="font-black text-gray-800 text-sm">Recent Bookings</h2>
                        </div>
                        <span className="text-xs font-bold text-[#003087] hover:underline cursor-pointer flex items-center gap-1">
                            View All <ChevronRight size={12} />
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-400 text-[11px] font-black uppercase tracking-wider">
                                    <th className="px-5 py-3 text-left">Ticket ID</th>
                                    <th className="px-5 py-3 text-left">Journey</th>
                                    <th className="px-4 py-3 text-left">Time</th>
                                    <th className="px-4 py-3 text-left">Fare</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {ADMIN_RECENT_BOOKINGS.map(({ id, from, to, fare, time, status }) => (
                                    <tr key={id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3 font-mono text-[#003087] text-xs font-bold">{id}</td>
                                        <td className="px-5 py-3 font-semibold text-gray-800">
                                            {from} → {to}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 text-xs">{time}</td>
                                        <td className="px-4 py-3 font-black text-[#D7231A]">{fare}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${status === 'Active'
                                                ? 'bg-green-50 text-[#00873D] border border-green-200'
                                                : 'bg-gray-100 text-gray-500 border border-gray-200'
                                                }`}>
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Right column: Line Status + Quick Actions */}
                <div className="space-y-4">
                    {/* Line Status */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center justify-between bg-[#003087] px-4 py-3">
                            <div className="flex items-center gap-2">
                                <Activity size={14} className="text-blue-300" />
                                <h3 className="font-black text-white text-sm">Line Status</h3>
                            </div>
                            <span className="text-[10px] font-black bg-[#00873D] text-white px-2.5 py-1 rounded-full">LIVE</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {ADMIN_LINE_STATUS.map(({ line, color, stations, status, freq }) => (
                                <div key={line} className="flex items-center gap-3 px-4 py-2.5">
                                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-800">{line}</p>
                                        <p className="text-[10px] text-gray-400">{stations} stations · {freq}</p>
                                    </div>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${status === 'Operational'
                                        ? 'text-[#00873D] bg-green-50'
                                        : 'text-amber-600 bg-amber-50'
                                        }`}>
                                        {status === 'Operational' ? '✓ OK' : '⚠ Delay'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                    >
                        <div className="px-4 py-3 border-b border-gray-100">
                            <h3 className="font-black text-gray-800 text-sm">Quick Actions</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {ADMIN_QUICK_ACTIONS.map(({ label, to, color, bg }) => (
                                <Link key={label} to={to}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group">
                                    <span className="text-sm font-bold transition-colors" style={{ color }}>{label}</span>
                                    <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
