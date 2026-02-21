import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SkeletonCard } from '@/components/Skeleton'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import html2canvas from 'html2canvas'
import {
    Train, MapPin, Download, Navigation, Clock,
    TicketCheck, ChevronRight, TrendingUp, Wallet, X
} from 'lucide-react'
import {
    ACTIVE_TICKET_DATA as ACTIVE_TICKET,
    PASSENGER_BOOKING_HISTORY as BOOKING_HISTORY,
    PASSENGER_STATS,
} from '@/data/dummyData'

const ICON_MAP = { train: Train, wallet: Wallet, trend: TrendingUp }

const lineColor = (line) => {
    if (!line) return '#64748B'
    if (line.includes('Yellow')) return '#D97706'
    if (line.includes('Blue')) return '#2563EB'
    if (line.includes('Red')) return '#D7231A'
    if (line.includes('Orange')) return '#EA580C'
    return '#64748B'
}

export default function Dashboard() {
    const [qrExpanded, setQrExpanded] = useState(false)
    const [activeTab, setActiveTab] = useState('tickets')
    const [isLoading, setIsLoading] = useState(true)

    const handleDownloadTicket = async () => {
        const ticketElement = document.getElementById('active-ticket-card')
        if (!ticketElement) return

        try {
            const canvas = await html2canvas(ticketElement, { scale: 3, useCORS: true, backgroundColor: '#ffffff' })
            const image = canvas.toDataURL('image/png', 1.0)
            const link = document.createElement('a')
            link.download = `${ACTIVE_TICKET.id}.png`
            link.href = image
            link.click()
        } catch (error) {
            console.error("Could not download ticket image", error)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-[90vh] bg-gray-50">
            {/* Tricolor strip */}
            <div className="flex h-1">
                <div className="flex-1 bg-[#D7231A]" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-[#00873D]" />
            </div>

            {/* Page Header */}
            <div className="bg-[#003087] px-4 sm:px-6 lg:px-8 pb-16 pt-8">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-white mb-1">My Dashboard</h1>
                        <p className="text-blue-200 text-sm font-medium flex items-center gap-2">
                            <Train size={14} /> MoveInSync Passenger Portal
                        </p>
                    </div>
                    <Link to="/"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#D7231A] text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">
                        <Navigation size={15} /> Book New Ticket
                    </Link>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-12 space-y-6">

                {/* ── Stats Row */}
                <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                    {PASSENGER_STATS.map(({ label, value, iconKey, colorHex, bgHex }) => {
                        const Icon = ICON_MAP[iconKey] || Train
                        return (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center gap-3 min-w-[160px] flex-1"
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bgHex }}>
                                    <Icon size={19} style={{ color: colorHex }} />
                                </div>
                                <div>
                                    <p className="text-lg font-black text-gray-900">{value}</p>
                                    <p className="text-xs text-gray-500 font-semibold">{label}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* ── Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

                    {/* Left Column */}
                    <div className="space-y-5">
                        {isLoading ? (
                            <>
                                <SkeletonCard className="h-64" />
                                <SkeletonCard className="h-48" />
                            </>
                        ) : (
                            <>
                                {/* Active Ticket — Boarding Pass */}
                                <motion.div
                                    id="active-ticket-card"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                                >
                                    {/* Header */}
                                    <div className="bg-[#003087] px-6 pt-6 pb-12 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 left-0 h-1 flex">
                                            <div className="flex-1 bg-[#D7231A]" />
                                            <div className="flex-1 bg-white/20" />
                                            <div className="flex-1 bg-[#00873D]" />
                                        </div>
                                        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/5" />

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <TicketCheck size={16} className="text-blue-300" />
                                                <span className="text-blue-200 font-bold text-xs tracking-wider uppercase">Active Ticket</span>
                                            </div>
                                            <span className="bg-[#00873D] text-white text-[10px] font-black px-2.5 py-1 rounded-full">● {ACTIVE_TICKET.status}</span>
                                        </div>

                                        <div className="flex items-start gap-3 flex-wrap sm:flex-nowrap">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-0.5">From</p>
                                                <p className="text-xl sm:text-2xl font-black text-white truncate">{ACTIVE_TICKET.from}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-[#D7231A] flex items-center justify-center text-white flex-shrink-0 mt-4">
                                                <ChevronRight size={18} />
                                            </div>
                                            <div className="flex-1 min-w-0 text-right">
                                                <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-0.5">To</p>
                                                <p className="text-xl sm:text-2xl font-black text-white truncate">{ACTIVE_TICKET.to}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tear line */}
                                    <div className="relative flex items-center -mt-4">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex-shrink-0 -ml-4 border-r border-dashed border-gray-300" />
                                        <div className="flex-1 border-t-2 border-dashed border-gray-300" />
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex-shrink-0 -mr-4" />
                                    </div>

                                    {/* Body */}
                                    <div className="px-6 pt-4 pb-6">
                                        <div className="flex flex-col sm:flex-row gap-5 items-center">
                                            {/* QR Code */}
                                            <div className="cursor-pointer group flex-shrink-0" onClick={() => setQrExpanded(true)}>
                                                <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                                                    <QRCodeSVG value={ACTIVE_TICKET.qrData} size={110} bgColor="#ffffff" fgColor="#003087" level="H" />
                                                </div>
                                                <p className="text-center text-[10px] text-gray-400 mt-2 font-mono font-semibold">{ACTIVE_TICKET.id}</p>
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 w-full space-y-3">
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {[
                                                        { label: 'Date', value: ACTIVE_TICKET.date },
                                                        { label: 'Departs', value: ACTIVE_TICKET.time },
                                                        { label: 'Passengers', value: `${ACTIVE_TICKET.passengers} Adult` },
                                                    ].map(({ label, value }) => (
                                                        <div key={label} className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-center">
                                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                                                            <p className="font-bold text-gray-800 text-xs mt-0.5">{value}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: lineColor(ACTIVE_TICKET.line) }} />
                                                    <span className="text-sm font-bold text-gray-700">{ACTIVE_TICKET.line}</span>
                                                    <span className="ml-auto font-black text-[#D7231A] text-lg">{ACTIVE_TICKET.fare}</span>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button onClick={handleDownloadTicket} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#003087] text-white rounded-xl font-bold text-sm hover:bg-blue-900 transition-colors">
                                                        <Download size={14} /> Save Ticket
                                                    </button>
                                                    <Link to="/map" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                                                        <MapPin size={14} /> Track Route
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Tabs: Bookings */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                                >
                                    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                                        <Clock size={16} className="text-[#D7231A]" />
                                        <h2 className="font-black text-gray-800 text-sm">Booking History</h2>
                                    </div>

                                    <div className="divide-y divide-gray-100">
                                        {BOOKING_HISTORY.map((b, i) => (
                                            <motion.div key={b.id}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + i * 0.06 }}
                                                className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                                            >
                                                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                    <Train size={16} className="text-[#003087]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-gray-800 text-sm">{b.from} → {b.to}</p>
                                                    <p className="text-xs text-gray-500">{b.date} · {b.id}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-black text-gray-800 text-sm">{b.fare}</p>
                                                    <span className="text-[10px] font-bold text-[#00873D] bg-green-50 px-2 py-0.5 rounded-full">{b.status}</span>
                                                </div>
                                                <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                        >
                            <div className="px-5 py-4 bg-[#D7231A]">
                                <h3 className="font-black text-white text-sm">Quick Actions</h3>
                            </div>
                            <div className="p-4 space-y-2">
                                {[
                                    { label: 'Book New Ticket', color: '#D7231A', bg: '#FEF2F2', to: '/' },
                                    { label: 'View Network Map', color: '#003087', bg: '#EFF6FF', to: '/map' },
                                    { label: 'Fare Calculator', color: '#00873D', bg: '#F0FDF4', to: '/' },
                                ].map(({ label, color, bg, to }) => (
                                    <Link key={label} to={to}
                                        className="flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all hover:translate-x-1"
                                        style={{ backgroundColor: bg, color }}>
                                        {label} <ChevronRight size={15} />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* Wallet / Pass widget */}
                        <motion.div
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#003087] rounded-2xl p-5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 flex">
                                <div className="flex-1 bg-[#D7231A]" />
                                <div className="flex-1 bg-white/20" />
                                <div className="flex-1 bg-[#00873D]" />
                            </div>
                            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/5" />
                            <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">MoveInSync Pass</p>
                            <p className="text-3xl font-black text-white mb-0.5">₹1,240</p>
                            <p className="text-blue-200 text-xs mb-4">Wallet Balance</p>
                            <button className="w-full py-2.5 bg-[#D7231A] text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">
                                Recharge Now
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* QR Expand Modal */}
            <AnimatePresence>
                {qrExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setQrExpanded(false)}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
                        >
                            <div className="flex h-1 mb-6 rounded-full overflow-hidden">
                                <div className="flex-1 bg-[#D7231A]" /> <div className="flex-1 bg-gray-200" /> <div className="flex-1 bg-[#00873D]" />
                            </div>
                            <QRCodeSVG value={ACTIVE_TICKET.qrData} size={200} bgColor="#ffffff" fgColor="#003087" level="H" className="mx-auto" />
                            <p className="font-mono text-xs text-gray-400 mt-3 mb-1">{ACTIVE_TICKET.id}</p>
                            <p className="font-bold text-gray-800 text-sm">{ACTIVE_TICKET.from} → {ACTIVE_TICKET.to}</p>
                            <button onClick={() => setQrExpanded(false)}
                                className="mt-5 w-full py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                <X size={15} /> Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
