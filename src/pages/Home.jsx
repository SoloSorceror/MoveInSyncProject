import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeftRight, CalendarDays, Users, Search, MapPin,
    ArrowRight, Zap, ChevronRight, Train, Bell, Shield,
    Map, TicketCheck, Navigation, Clock, AlertCircle,
    CreditCard, TrendingUp, Info, Wifi, History, X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DUMMY_STATIONS, INITIAL_NETWORK } from '@/data/dummyData'
import { computeRoutes } from '@/utils/routeEngine'
import { useRecentSearches } from '@/hooks/useRecentSearches'
import RouteTimeline from '@/components/RouteTimeline'
import { SkeletonCard } from '@/components/Skeleton'
import { useUIStore } from '@/store/uiStore'
import metroImage from '@/assets/metroImage.jpg'

/* ── Constants ──────────────────────────────────────────────────── */
const STATS = [
    { label: 'Network Length (km)', value: '348', icon: Navigation, color: '#D7231A' },
    { label: 'Total Metro Lines', value: '9', icon: Train, color: '#003087' },
    { label: 'Total Stations', value: '256', icon: MapPin, color: '#00873D' },
    { label: 'Daily Ridership', value: '6.2M', icon: Users, color: '#D7231A' },
]

const SERVICE_ALERTS = [
    { date: '21 Feb 2026', type: 'update', title: 'Yellow Line: Slight delays between Rajiv Chowk & Hauz Khas due to maintenance. Normal by 6 PM.', urgent: true },
    { date: '20 Feb 2026', type: 'info', title: 'MoveInSync app update v2.4.1 — faster ticket booking, improved QR scanner.', urgent: false },
    { date: '19 Feb 2026', type: 'info', title: 'New Airport Express schedule effective March 1. First train from New Delhi at 04:45 AM.', urgent: false },
    { date: '18 Feb 2026', type: 'alert', title: 'Magenta Line extended to Janakpuri West — 3 new stations open from Feb 20.', urgent: false },
]

const QUICK_SERVICES = [
    { icon: CreditCard, label: 'Fare Calculator', desc: 'Plan & estimate trip cost', color: '#D7231A', bg: '#FEF2F2' },
    { icon: TicketCheck, label: 'Book Ticket', desc: 'Instant digital booking', color: '#003087', bg: '#EFF6FF' },
    { icon: Map, label: 'Network Map', desc: 'Interactive metro map', color: '#00873D', bg: '#F0FDF4', to: '/map' },
    { icon: Wifi, label: 'Live Status', desc: 'Real-time train tracking', color: '#7C3AED', bg: '#F5F3FF' },
]

const lineColor = (line) => {
    if (line.includes('Yellow')) return '#D97706'
    if (line.includes('Blue')) return '#2563EB'
    if (line.includes('Red')) return '#D7231A'
    if (line.includes('Orange')) return '#EA580C'
    if (line.includes('Magenta')) return '#C026D3'
    return '#64748B'
}

const CountUp = ({ target, suffix = '', delay = 0 }) => {
    const [count, setCount] = useState(0)
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''))
    const hasM = target.includes('M')

    useEffect(() => {
        const timeout = setTimeout(() => {
            let start = 0
            const step = numericTarget / 40
            const interval = setInterval(() => {
                start += step
                if (start >= numericTarget) { setCount(numericTarget); clearInterval(interval) }
                else setCount(Math.floor(start * 10) / 10)
            }, 35)
            return () => clearInterval(interval)
        }, delay)
        return () => clearTimeout(timeout)
    }, [numericTarget, delay])

    return <>{count}{hasM ? 'M' : ''}{suffix}</>
}

/* ── COMPONENT ──────────────────────────────────────────────────── */
export default function Home() {
    const navigate = useNavigate()

    const {
        searchOrigin, setSearchOrigin,
        searchDest, setSearchDest,
        setSelectedRoute
    } = useUIStore()

    // Initialize if empty
    useEffect(() => {
        if (!searchOrigin) setSearchOrigin(DUMMY_STATIONS[0])
        if (!searchDest) setSearchDest(DUMMY_STATIONS[1])
    }, [searchOrigin, searchDest, setSearchOrigin, setSearchDest])

    const origin = searchOrigin || DUMMY_STATIONS[0]
    const dest = searchDest || DUMMY_STATIONS[1]
    const setOrigin = setSearchOrigin
    const setDest = setSearchDest

    const [tickets, setTickets] = useState(1)
    const [originSearch, setOriginSearch] = useState('')
    const [destSearch, setDestSearch] = useState('')
    const [showOriginDD, setShowOriginDD] = useState(false)
    const [showDestDD, setShowDestDD] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [routeFilter, setRouteFilter] = useState('shortest')
    const [computedRoutes, setComputedRoutes] = useState([])
    const [expandedAlt, setExpandedAlt] = useState(false)

    const { recents, addSearch, clearSearches } = useRecentSearches()

    const originRef = useRef(null)
    const destRef = useRef(null)

    useEffect(() => {
        const h = (e) => {
            if (originRef.current && !originRef.current.contains(e.target)) setShowOriginDD(false)
            if (destRef.current && !destRef.current.contains(e.target)) setShowDestDD(false)
        }
        document.addEventListener('mousedown', h)
        return () => document.removeEventListener('mousedown', h)
    }, [])

    const filteredOrigin = useMemo(() =>
        DUMMY_STATIONS.filter(s => s.name.toLowerCase().includes(originSearch.toLowerCase())),
        [originSearch]
    )
    const filteredDest = useMemo(() =>
        DUMMY_STATIONS.filter(s => s.name.toLowerCase().includes(destSearch.toLowerCase())),
        [destSearch]
    )

    const handleSwap = () => { const tmp = origin; setOrigin(dest); setDest(tmp); setShowResults(false) }

    const handleSearch = () => {
        if (!origin || !dest || origin.id === dest.id) return
        setIsSearching(true); setShowResults(false); setExpandedAlt(false)
        setTimeout(() => {
            const routes = computeRoutes(origin, dest, INITIAL_NETWORK)
            setComputedRoutes(routes)
            setIsSearching(false)
            setShowResults(true)
            addSearch(origin, dest)   // save to recent searches
        }, 900)
    }

    const handleSelectRoute = (route) => {
        setSelectedRoute(route)
        navigate(`/booking/${route.id}`, { state: { route, passengers: tickets } })
    }

    const StationList = ({ stations, onSelect }) => (
        <div className="absolute top-full left-0 w-full z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
            <ul className="max-h-56 overflow-y-auto">
                {stations.map(s => (
                    <li key={s.id} onClick={() => onSelect(s)}
                        className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: lineColor(s.line) }} />
                        <div>
                            <p className="font-semibold text-sm text-gray-800">{s.name}</p>
                            <p className="text-xs text-gray-500">{s.line}</p>
                        </div>
                        {s.isInterchange && <span className="ml-auto text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded">HUB</span>}
                    </li>
                ))}
                {stations.length === 0 && <li className="py-6 text-center text-sm text-gray-400">No stations found</li>}
            </ul>
        </div>
    )

    return (
        /* main page bg with a subtle India-flag-inspired gradient top strip */
        <div className="min-h-[90vh] bg-gray-50">

            {/* ── Tricolor strip (decorative, under nav) */}
            <div className="flex h-1">
                <div className="flex-1 bg-[#D7231A]" />
                <div className="flex-1 bg-white border-y border-gray-200" />
                <div className="flex-1 bg-[#00873D]" />
            </div>

            {/* ── Hero Banner (replaces giant hero with DMRC-style compact photo banner) */}
            <div className="relative w-full h-[200px] md:h-[240px] overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${metroImage})` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#003087]/90 via-[#003087]/70 to-[#D7231A]/60" />

                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
                >
                    <span className="text-xs font-bold tracking-[0.2em] text-blue-200 uppercase mb-3">
                        🇮🇳 India's Smart Metro Network
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Plan Your Journey.{' '}
                        <span className="text-yellow-300">Travel Smart.</span>
                    </h1>
                    <p className="text-blue-100 font-medium mt-2 text-sm md:text-base max-w-lg">
                        Book tickets, explore the network, track live status — all in one place.
                    </p>
                </motion.div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent" />
            </div>

            {/* ── Main Three-Column Layout (like DMRC) ─────────────────── */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr_300px] gap-5">

                    {/* ── Column 1: Journey Planner ─────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-visible"
                    >
                        {/* Card Header */}
                        <div className="flex items-center gap-3 px-5 py-4 bg-[#003087] rounded-t-2xl">
                            <div className="w-8 h-8 rounded-full bg-[#D7231A] flex items-center justify-center flex-shrink-0">
                                <Navigation size={16} className="text-white" />
                            </div>
                            <div>
                                <h2 className="font-black text-white text-base">Plan Your Journey</h2>
                                <p className="text-blue-200 text-xs">Click to select stations</p>
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            {/* Route filter */}
                            <div className="flex gap-2">
                                {[
                                    { id: 'shortest', label: 'Shortest Route' },
                                    { id: 'interchange', label: 'Min Interchange' },
                                ].map(f => (
                                    <button key={f.id} onClick={() => setRouteFilter(f.id)}
                                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${routeFilter === f.id
                                            ? 'bg-[#003087] text-white border-[#003087]'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-[#003087]'
                                            }`}>
                                        {f.label}
                                    </button>
                                ))}
                            </div>

                            {/* From */}
                            <div ref={originRef} className="relative">
                                <label className="block text-xs font-bold text-[#D7231A] uppercase tracking-wider mb-1">From</label>
                                <div className="relative cursor-pointer" onClick={() => { setShowOriginDD(true); setShowDestDD(false) }}>
                                    <input readOnly value={originSearch || origin?.name} onChange={() => { }}
                                        onFocus={() => { setShowOriginDD(true); setOriginSearch('') }}
                                        placeholder="Type station name or select"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-gray-50 cursor-pointer focus:outline-none focus:border-[#003087] focus:ring-1 focus:ring-[#003087]/20 transition-all" />
                                    <MapPin size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                                {showOriginDD && (
                                    <div onClick={e => e.stopPropagation()}>
                                        <div className="absolute top-full left-0 w-full z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                                            <div className="p-2 border-b border-gray-100">
                                                <input autoFocus type="text" value={originSearch} onChange={e => setOriginSearch(e.target.value)}
                                                    placeholder="Search stations..."
                                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#003087]" />
                                            </div>
                                            <ul className="max-h-48 overflow-y-auto">
                                                {filteredOrigin.map(s => (
                                                    <li key={s.id} onClick={() => { setOrigin(s); setShowOriginDD(false); setOriginSearch('') }}
                                                        className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors">
                                                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: lineColor(s.line) }} />
                                                        <div><p className="font-semibold text-sm text-gray-800">{s.name}</p><p className="text-xs text-gray-500">{s.line}</p></div>
                                                        {s.isInterchange && <span className="ml-auto text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded">HUB</span>}
                                                    </li>
                                                ))}
                                                {filteredOrigin.length === 0 && <li className="py-6 text-center text-sm text-gray-400">No stations found</li>}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Swap */}
                            <div className="flex justify-center -my-1">
                                <button onClick={handleSwap}
                                    className="w-8 h-8 bg-[#D7231A] text-white rounded-full shadow-md hover:bg-red-700 hover:rotate-180 transition-all duration-300 flex items-center justify-center z-10">
                                    <ArrowLeftRight size={14} />
                                </button>
                            </div>

                            {/* To */}
                            <div ref={destRef} className="relative">
                                <label className="block text-xs font-bold text-[#00873D] uppercase tracking-wider mb-1">To</label>
                                <div className="relative cursor-pointer" onClick={() => { setShowDestDD(true); setShowOriginDD(false) }}>
                                    <input readOnly value={destSearch || dest?.name} onChange={() => { }}
                                        onFocus={() => { setShowDestDD(true); setDestSearch('') }}
                                        placeholder="Type station name or select"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-gray-50 cursor-pointer focus:outline-none focus:border-[#00873D] focus:ring-1 focus:ring-[#00873D]/20 transition-all" />
                                    <MapPin size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                                {showDestDD && (
                                    <div onClick={e => e.stopPropagation()}>
                                        <div className="absolute top-full left-0 w-full z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                                            <div className="p-2 border-b border-gray-100">
                                                <input autoFocus type="text" value={destSearch} onChange={e => setDestSearch(e.target.value)}
                                                    placeholder="Search stations..."
                                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#00873D]" />
                                            </div>
                                            <ul className="max-h-48 overflow-y-auto">
                                                {filteredDest.map(s => (
                                                    <li key={s.id} onClick={() => { setDest(s); setShowDestDD(false); setDestSearch('') }}
                                                        className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-green-50 transition-colors">
                                                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: lineColor(s.line) }} />
                                                        <div><p className="font-semibold text-sm text-gray-800">{s.name}</p><p className="text-xs text-gray-500">{s.line}</p></div>
                                                        {s.isInterchange && <span className="ml-auto text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">HUB</span>}
                                                    </li>
                                                ))}
                                                {filteredDest.length === 0 && <li className="py-6 text-center text-sm text-gray-400">No stations found</li>}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Leaving */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Leaving</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:border-[#003087] transition-colors">
                                        <CalendarDays size={15} className="text-[#003087]" />
                                        <span className="text-sm font-semibold text-gray-700">Today</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
                                        <button onClick={() => setTickets(Math.max(1, tickets - 1))}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-gray-800 disabled:opacity-40 transition-colors text-base"
                                            disabled={tickets <= 1}>−</button>
                                        <span className="w-5 text-center font-bold text-gray-800 text-sm">{tickets}</span>
                                        <button onClick={() => setTickets(Math.min(6, tickets + 1))}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-gray-800 disabled:opacity-40 transition-colors text-base"
                                            disabled={tickets >= 6}>+</button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent searches */}
                            {recents.length > 0 && !showOriginDD && !showDestDD && (
                                <div className="mt-1">
                                    <div className="flex items-center gap-1 mb-1.5">
                                        <History size={11} className="text-gray-400" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Recent</span>
                                        <button onClick={clearSearches} className="ml-auto text-[10px] text-gray-400 hover:text-gray-600 underline">Clear</button>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {recents.map((r, i) => (
                                            <button key={i}
                                                onClick={() => { setOrigin(r.from); setDest(r.to); setShowResults(false) }}
                                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-blue-50 text-left transition-colors border border-gray-100 group"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-[#003087]/10 flex items-center justify-center flex-shrink-0">
                                                    <History size={11} className="text-[#003087]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-gray-700 truncate">{r.from.name}</p>
                                                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                                        <ArrowRight size={9} /> {r.to.name}
                                                    </p>
                                                </div>
                                                <ChevronRight size={12} className="text-gray-300 group-hover:text-[#003087] transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Search button */}
                            <button onClick={handleSearch} disabled={isSearching}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-[#D7231A] text-white rounded-xl font-black text-base hover:bg-red-700 active:scale-[0.98] transition-all shadow-md shadow-red-400/30 disabled:opacity-70">
                                {isSearching ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Searching...</>
                                ) : (
                                    <><Search size={18} /> Show Route & Fare</>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* ── Column 2: Center — Stats + Route Results + Map preview */}
                    <div className="space-y-5">

                        {/* Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-3"
                        >
                            {STATS.map(({ label, value, icon: Icon, color }, i) => (
                                <div key={label} className="bg-white rounded-2xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
                                    <p className="text-3xl font-black mb-1" style={{ color }}>
                                        <CountUp target={value} delay={i * 150} />
                                    </p>
                                    <p className="text-xs text-gray-500 font-semibold leading-tight">{label}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Route Results (appears after search) */}
                        <AnimatePresence mode="wait">
                            {showResults && (
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-black text-[#003087]">
                                            {origin.name} → {dest.name}
                                        </h3>
                                        <button onClick={() => setShowResults(false)} className="text-xs text-gray-500 hover:text-gray-700 underline flex items-center gap-1">
                                            <X size={12} /> Clear
                                        </button>
                                    </div>

                                    {computedRoutes.length === 0 ? (
                                        /* ── Empty state */
                                        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Train size={24} className="text-gray-400" />
                                            </div>
                                            <p className="font-black text-gray-700 mb-1">No Route Found</p>
                                            <p className="text-sm text-gray-400">We couldn't find a route between these stations. Try selecting different stations or check the network map.</p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* ── Recommended Route */}
                                            <div className="bg-white border-2 border-[#003087] rounded-2xl p-5 shadow-sm">
                                                <RouteTimeline
                                                    route={computedRoutes[0]}
                                                    onSelect={handleSelectRoute}
                                                />
                                            </div>

                                            {/* ── Alternative Routes (collapsible) */}
                                            {computedRoutes.length > 1 && (
                                                <div>
                                                    <button
                                                        onClick={() => setExpandedAlt(v => !v)}
                                                        className="flex items-center gap-2 text-sm font-bold text-[#003087] hover:text-[#D7231A] transition-colors mb-2"
                                                    >
                                                        <ChevronRight size={15} className={`transition-transform ${expandedAlt ? 'rotate-90' : ''}`} />
                                                        {expandedAlt ? 'Hide' : 'Show'} {computedRoutes.length - 1} alternative route{computedRoutes.length > 2 ? 's' : ''}
                                                    </button>
                                                    <AnimatePresence>
                                                        {expandedAlt && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="space-y-3 overflow-hidden"
                                                            >
                                                                {computedRoutes.slice(1).map(route => (
                                                                    <div key={route.id} className="bg-white border border-gray-200 rounded-2xl p-5">
                                                                        <RouteTimeline route={route} onSelect={handleSelectRoute} />
                                                                    </div>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Quick Services Grid (hidden when results are shown or loading) */}
                        {!showResults && !isSearching && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                            >
                                {QUICK_SERVICES.map(({ icon: Icon, label, desc, color, bg, to: link }) => (
                                    <button key={label} onClick={() => link && navigate(link)}
                                        className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all group cursor-pointer">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ backgroundColor: bg }}>
                                            <Icon size={22} style={{ color }} />
                                        </div>
                                        <p className="font-bold text-gray-800 text-sm mb-0.5">{label}</p>
                                        <p className="text-xs text-gray-500">{desc}</p>
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {/* Interactive Map Preview Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            onClick={() => navigate('/map')}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
                        >
                            <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
                                <Map size={17} className="text-[#D7231A]" />
                                <h3 className="font-black text-gray-800 text-sm">Interactive Metro Map</h3>
                                <span className="text-xs text-gray-500">Plan your journey using our clickable map</span>
                                <button className="ml-auto text-xs font-bold text-[#003087] flex items-center gap-1 hover:text-[#D7231A] transition-colors">
                                    Open Full Map <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>

                            {/* Minimal metro line visualization */}
                            <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-4 h-[130px] relative overflow-hidden">
                                <svg width="100%" height="100%" viewBox="0 0 600 130" className="opacity-90">
                                    <line x1="300" y1="10" x2="300" y2="120" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
                                    <line x1="60" y1="65" x2="540" y2="65" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
                                    <line x1="120" y1="10" x2="300" y2="10" stroke="#D7231A" strokeWidth="5" strokeLinecap="round" />
                                    <line x1="100" y1="100" x2="300" y2="75" stroke="#C026D3" strokeWidth="4" strokeLinecap="round" />
                                    <circle cx="300" cy="65" r="10" fill="white" stroke="#1C2B39" strokeWidth="5" />
                                    <circle cx="300" cy="10" r="7" fill="white" stroke="#D7231A" strokeWidth="4" />
                                    <circle cx="60" cy="65" r="7" fill="white" stroke="#2563EB" strokeWidth="4" />
                                    <circle cx="540" cy="65" r="7" fill="white" stroke="#2563EB" strokeWidth="4" />
                                    <text x="314" y="67" fill="#003087" fontWeight="900" fontSize="11" fontFamily="Inter,sans-serif">Rajiv Chowk</text>
                                    <text x="45" y="55" fill="#2563EB" fontWeight="700" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">Dwarka</text>
                                    <text x="543" y="55" fill="#2563EB" fontWeight="700" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">Noida</text>
                                </svg>
                                <div className="absolute bottom-2 right-3 text-xs font-bold text-gray-400">Tap to explore full map →</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Column 3: Service Updates + Alerts ─────────────── */}
                    <div className="space-y-5">

                        {/* Service Update Box (dark, like DMRC's blue-black box) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#003087] rounded-2xl overflow-hidden"
                        >
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#D7231A]">
                                <Wifi size={14} className="text-white" />
                                <h3 className="font-black text-white text-sm">Service Update</h3>
                                <span className="ml-auto text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">LIVE</span>
                            </div>
                            <div className="px-4 py-4 text-blue-100 text-xs leading-relaxed space-y-1.5">
                                <p className="text-white font-bold text-sm">All Lines Operating Normally</p>
                                <p>Metro services are running on regular schedule. Average frequency of 3–5 minutes during peak hours.</p>
                                <div className="space-y-1.5 mt-3">
                                    {[
                                        { line: 'Yellow Line', color: '#D97706', status: 'Normal' },
                                        { line: 'Blue Line', color: '#2563EB', status: 'Normal' },
                                        { line: 'Red Line', color: '#D7231A', status: 'Slight delay' },
                                        { line: 'Orange Line', color: '#EA580C', status: 'Normal' },
                                    ].map(l => (
                                        <div key={l.line} className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
                                            <span className="text-blue-200 font-semibold">{l.line}</span>
                                            <span className={`ml-auto font-bold ${l.status === 'Normal' ? 'text-[#00D166]' : 'text-yellow-300'}`}>{l.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Notices & Alerts */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                            className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                        >
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                                <Bell size={15} className="text-[#D7231A]" />
                                <h3 className="font-black text-gray-800 text-sm">Notices & Alerts</h3>
                            </div>
                            <div className="divide-y divide-gray-100 max-h-[340px] overflow-y-auto">
                                {SERVICE_ALERTS.map((alert, i) => (
                                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.06 }}
                                        className="px-4 py-3 flex gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${alert.urgent ? 'bg-red-100' : alert.type === 'info' ? 'bg-blue-50' : 'bg-yellow-50'}`}>
                                            {alert.urgent
                                                ? <AlertCircle size={15} className="text-[#D7231A]" />
                                                : alert.type === 'info'
                                                    ? <Info size={15} className="text-[#003087]" />
                                                    : <Bell size={15} className="text-amber-500" />
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-gray-400 font-semibold mb-0.5">{alert.date}</p>
                                            <p className={`text-xs leading-relaxed ${alert.urgent ? 'font-bold text-[#D7231A]' : 'text-gray-700 font-medium'}`}>
                                                {alert.title}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Know Your Station box */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                        >
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                                <Search size={15} className="text-[#00873D]" />
                                <h3 className="font-black text-gray-800 text-sm">Know Your Station</h3>
                            </div>
                            <div className="p-4 space-y-3">
                                <input placeholder="Search metro station..."
                                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#003087] transition-all" />
                                <button className="w-full py-2.5 bg-[#003087] text-white rounded-xl font-bold text-sm hover:bg-blue-900 transition-colors flex items-center justify-center gap-2">
                                    <Search size={15} /> Advanced Search
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ── Trust / Info Strip ──────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 bg-white border border-gray-200 rounded-2xl px-6 py-5"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        {[
                            { icon: Zap, label: 'Instant Booking', value: '< 30 seconds', color: '#D7231A', bg: '#FEF2F2' },
                            { icon: Shield, label: 'Secure Payments', value: 'PCI-DSS compliant', color: '#003087', bg: '#EFF6FF' },
                            { icon: TrendingUp, label: 'Happy Commuters', value: '6.2M+ daily', color: '#00873D', bg: '#F0FDF4' },
                        ].map(({ icon: Icon, label, value, color, bg }) => (
                            <div key={label} className="flex items-center gap-4 justify-center">
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                                    <Icon size={20} style={{ color }} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-gray-500 font-semibold">{label}</p>
                                    <p className="font-black text-gray-800 text-sm">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
