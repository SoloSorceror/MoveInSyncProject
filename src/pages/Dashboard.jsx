import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import {
    MapPin, Clock, Download, ArrowRight, CheckCircle2,
    Train, Zap, CalendarDays, Ticket, ChevronRight,
    TrendingUp, Shield, Star
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ACTIVE_TICKET = {
    id: 'TKT-9482A',
    from: 'Rajiv Chowk',
    fromLine: 'Yellow Line',
    to: 'Airport (T3)',
    toLine: 'Orange Line',
    date: 'Feb 21, 2026',
    time: '14:30',
    passengers: 1,
    fare: '₹60.00',
    stops: 8,
    duration: '27 min',
    transfers: 1,
    type: 'One-Way',
    qrData: 'metro://ticket/TKT-9482A/valid/rajivchowk-airport-20260221',
    segments: [
        { line: 'Yellow Line', color: '#eab308', from: 'Rajiv Chowk', to: 'New Delhi', stops: 2 },
        { line: 'Orange Line', color: '#f97316', from: 'New Delhi', to: 'Airport (T3)', stops: 6 },
    ]
}

const HISTORY = [
    { id: 'TKT-8812B', from: 'Kashmere Gate', to: 'Hauz Khas', date: 'Feb 19, 2026', fare: '₹45.00', status: 'completed', line: 'Yellow Line', lineColor: '#eab308', duration: '22 min', stops: 7 },
    { id: 'TKT-8571C', from: 'Dwarka Sec 21', to: 'Botanical Garden', date: 'Feb 17, 2026', fare: '₹55.00', status: 'completed', line: 'Blue Line', lineColor: '#3b82f6', duration: '34 min', stops: 11 },
    { id: 'TKT-7934D', from: 'HUDA City Centre', to: 'Rajiv Chowk', date: 'Feb 14, 2026', fare: '₹50.00', status: 'completed', line: 'Yellow Line', lineColor: '#eab308', duration: '18 min', stops: 6 },
    { id: 'TKT-7612E', from: 'Janakpuri West', to: 'Lajpat Nagar', date: 'Feb 10, 2026', fare: '₹40.00', status: 'cancelled', line: 'Magenta Line', lineColor: '#c026d3', duration: '—', stops: 0 },
    { id: 'TKT-7201F', from: 'Noida Sec 15', to: 'New Delhi', date: 'Feb 7, 2026', fare: '₹35.00', status: 'completed', line: 'Blue Line', lineColor: '#3b82f6', duration: '29 min', stops: 9 },
]

const STATS = [
    { icon: Ticket, label: 'Total Journeys', value: '24', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { icon: TrendingUp, label: 'Total Spent', value: '₹1,240', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-500/10' },
    { icon: Star, label: 'Avg. Rating', value: '4.8', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { icon: Shield, label: 'Green Trips', value: '18', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
]

// Status badge config
const STATUS_CONFIG = {
    completed: { label: 'Completed', classes: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' },
    cancelled: { label: 'Cancelled', classes: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400' },
    active: { label: 'Active', classes: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SegmentDot({ color }) {
    return (
        <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-800 shadow" style={{ backgroundColor: color }} />
    )
}

function HistoryRow({ ticket, index }) {
    const { label: statusLabel, classes: statusClasses } = STATUS_CONFIG[ticket.status]
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer"
        >
            {/* Line color strip */}
            <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: ticket.lineColor }} />

            {/* Route info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-semibold text-slate-800 dark:text-white text-sm truncate">{ticket.from}</span>
                    <ArrowRight size={13} className="text-slate-400 flex-shrink-0" />
                    <span className="font-semibold text-slate-800 dark:text-white text-sm truncate">{ticket.to}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><CalendarDays size={11} />{ticket.date}</span>
                    {ticket.status !== 'cancelled' && <span className="flex items-center gap-1"><Clock size={11} />{ticket.duration}</span>}
                </div>
            </div>

            {/* Fare */}
            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm flex-shrink-0">{ticket.fare}</span>

            {/* Status badge */}
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 ${statusClasses}`}>{statusLabel}</span>

            <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-400 transition-colors flex-shrink-0" />
        </motion.div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Dashboard() {
    const { user } = useAuthStore()
    const [qrExpanded, setQrExpanded] = useState(false)
    const [filter, setFilter] = useState('all')

    const filtered = filter === 'all' ? HISTORY : HISTORY.filter(t => t.status === filter)

    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-16 space-y-8">

            {/* ── Header ── */}
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5">
                        Welcome back, {user?.name || 'Passenger'} 👋
                    </p>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">My Tickets</h1>
                </div>
                <Link
                    to="/"
                    className="flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 bg-metro-primary text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-colors"
                >
                    <Train size={16} />
                    Book New Journey
                </Link>
            </motion.div>

            {/* ── Stats Row ── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3"
            >
                {STATS.map(({ icon: Icon, label, value, color, bg }) => (
                    <div key={label} className={`flex items-center gap-3 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                            <Icon size={18} className={color} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                            <p className={`font-bold text-slate-900 dark:text-white text-lg leading-tight`}>{value}</p>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* ── Main Grid ── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">

                {/* ── LEFT: Active Ticket (Boarding Pass) ── */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                >
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <Zap size={18} className="text-blue-500" />
                        Active Journey
                    </h2>

                    {/* Boarding pass card */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">

                        {/* Card header gradient */}
                        <div className="bg-gradient-to-r from-metro-primary via-blue-600 to-indigo-600 px-6 pt-6 pb-10 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
                            <div className="relative flex items-center justify-between">
                                <div>
                                    <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">{ACTIVE_TICKET.type} Ticket</span>
                                    <p className="text-white/70 text-sm mt-1">{ACTIVE_TICKET.date} • {ACTIVE_TICKET.time}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-white text-xs font-bold">ACTIVE</span>
                                </div>
                            </div>

                            {/* Route display */}
                            <div className="relative mt-5 flex items-center gap-3">
                                <div className="flex-1">
                                    <p className="text-blue-200 text-xs font-semibold mb-1">FROM</p>
                                    <p className="text-white text-2xl font-black leading-tight">{ACTIVE_TICKET.from}</p>
                                    <p className="text-blue-200 text-xs mt-1">{ACTIVE_TICKET.fromLine}</p>
                                </div>
                                <div className="flex flex-col items-center gap-1 px-2">
                                    <div className="flex items-center gap-1">
                                        {ACTIVE_TICKET.segments.map((seg, i) => (
                                            <div key={i} className="flex items-center gap-1">
                                                <div className="w-6 h-1 rounded-full" style={{ backgroundColor: seg.color }} />
                                                {i < ACTIVE_TICKET.segments.length - 1 && <div className="w-2 h-2 rounded-full bg-white/50" />}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-blue-200 text-[10px] font-semibold">{ACTIVE_TICKET.stops} stops • {ACTIVE_TICKET.transfers} transfer</span>
                                </div>
                                <div className="flex-1 text-right">
                                    <p className="text-blue-200 text-xs font-semibold mb-1">TO</p>
                                    <p className="text-white text-2xl font-black leading-tight">{ACTIVE_TICKET.to}</p>
                                    <p className="text-blue-200 text-xs mt-1">{ACTIVE_TICKET.toLine}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tear line */}
                        <div className="relative flex items-center -mt-4">
                            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 flex-shrink-0 -ml-4 border-r border-dashed border-slate-200 dark:border-slate-700" />
                            <div className="flex-1 border-t-2 border-dashed border-slate-200 dark:border-slate-700" />
                            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 flex-shrink-0 -mr-4" />
                        </div>

                        {/* Card body */}
                        <div className="px-6 pt-4 pb-6">
                            <div className="flex flex-col sm:flex-row gap-6 items-center">

                                {/* QR Code section */}
                                <div
                                    className="relative cursor-pointer group flex-shrink-0"
                                    onClick={() => setQrExpanded(true)}
                                >
                                    <div className="bg-white dark:bg-slate-100 p-3 rounded-2xl shadow-md border border-slate-100 dark:border-slate-200">
                                        <QRCodeSVG
                                            value={ACTIVE_TICKET.qrData}
                                            size={120}
                                            bgColor="#ffffff"
                                            fgColor="#0f172a"
                                            level="H"
                                            includeMargin={false}
                                        />
                                    </div>
                                    <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/5 flex items-center justify-center transition-all">
                                        <span className="text-xs text-slate-600 dark:text-slate-700 font-semibold opacity-0 group-hover:opacity-100 bg-white px-2 py-1 rounded-lg shadow transition-all">Expand</span>
                                    </div>
                                    <p className="text-center text-xs text-slate-400 mt-2 font-medium">{ACTIVE_TICKET.id}</p>
                                </div>

                                {/* Details */}
                                <div className="flex-1 w-full space-y-3">
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { label: 'Duration', value: ACTIVE_TICKET.duration, icon: Clock },
                                            { label: 'Passengers', value: ACTIVE_TICKET.passengers, icon: MapPin },
                                            { label: 'Fare', value: ACTIVE_TICKET.fare, icon: Ticket },
                                        ].map(({ label, value, icon: Icon }) => (
                                            <div key={label} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
                                                <p className="text-xs text-slate-400 mb-1">{label}</p>
                                                <p className="font-bold text-slate-800 dark:text-white text-sm">{value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Segment timeline */}
                                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 space-y-2">
                                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Route</p>
                                        {ACTIVE_TICKET.segments.map((seg, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs">
                                                <SegmentDot color={seg.color} />
                                                <span className="font-semibold text-slate-600 dark:text-slate-300" style={{ color: seg.color }}>{seg.line}</span>
                                                <span className="text-slate-400">{seg.from} → {seg.to}</span>
                                                <span className="ml-auto text-slate-400">{seg.stops} stops</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-2 pt-1">
                                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-metro-primary text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20">
                                            <Download size={15} /> Save Ticket
                                        </button>
                                        <Link to="/map" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                            <MapPin size={15} /> Track Route
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* ── RIGHT: Booking History ── */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-3"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <CalendarDays size={18} className="text-violet-500" />
                            Booking History
                        </h2>
                        <span className="text-xs text-slate-400 font-medium">{HISTORY.length} trips</span>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        {['all', 'completed', 'cancelled'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`flex-1 text-xs font-semibold py-1.5 rounded-lg capitalize transition-all ${filter === f
                                    ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* History list */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-3 space-y-1.5 max-h-[500px] overflow-y-auto">
                            <AnimatePresence mode="wait">
                                {filtered.length > 0 ? (
                                    filtered.map((ticket, i) => (
                                        <HistoryRow key={ticket.id} ticket={ticket} index={i} />
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-12 text-center text-slate-400"
                                    >
                                        <Ticket size={36} className="mx-auto mb-3 opacity-30" />
                                        <p className="font-medium text-sm">No {filter} bookings</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.section>
            </div>

            {/* ── QR Full-Screen Modal ── */}
            <AnimatePresence>
                {qrExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setQrExpanded(false)}
                        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: 'spring', damping: 22 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 cursor-default"
                        >
                            <div className="w-full flex items-center justify-between mb-2">
                                <div>
                                    <p className="font-black text-slate-900 text-lg">{ACTIVE_TICKET.id}</p>
                                    <p className="text-slate-500 text-sm">{ACTIVE_TICKET.from} → {ACTIVE_TICKET.to}</p>
                                </div>
                                <span className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-sm font-bold">
                                    <CheckCircle2 size={15} /> Valid
                                </span>
                            </div>
                            <QRCodeSVG
                                value={ACTIVE_TICKET.qrData}
                                size={240}
                                bgColor="#ffffff"
                                fgColor="#0f172a"
                                level="H"
                                includeMargin={true}
                            />
                            <p className="text-xs text-slate-400 font-mono">{ACTIVE_TICKET.qrData}</p>
                            <button
                                onClick={() => setQrExpanded(false)}
                                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
