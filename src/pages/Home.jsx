import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeftRight, CalendarDays, Users, TrainFront, CreditCard, Map, Clock, ArrowRight, Search, MapPin } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { DUMMY_STATIONS, DUMMY_ROUTES } from '@/data/dummyData'
import metroImage from '@/assets/metroImage.jpg'

export default function Home() {
    const navigate = useNavigate()
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('book')

    const [origin, setOrigin] = useState(location.state?.setOriginAs || DUMMY_STATIONS[0])
    const [dest, setDest] = useState(location.state?.setDestAs || DUMMY_STATIONS[1])

    useEffect(() => {
        if (location.state?.setOriginAs || location.state?.setDestAs) {
            if (location.state.setOriginAs) setOrigin(location.state.setOriginAs)
            if (location.state.setDestAs) setDest(location.state.setDestAs)
            navigate('.', { replace: true, state: {} })
        }
    }, [location.state, navigate])

    const [originSearch, setOriginSearch] = useState('')
    const [destSearch, setDestSearch] = useState('')
    const [showOriginDropdown, setShowOriginDropdown] = useState(false)
    const [showDestDropdown, setShowDestDropdown] = useState(false)

    const [showResults, setShowResults] = useState(false)
    const [isSwapping, setIsSwapping] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const originRef = useRef(null)
    const destRef = useRef(null)

    // Click outside listener for dropdowns
    useEffect(() => {
        function handleClickOutside(event) {
            if (originRef.current && !originRef.current.contains(event.target)) {
                setShowOriginDropdown(false)
            }
            if (destRef.current && !destRef.current.contains(event.target)) {
                setShowDestDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const filteredOriginStations = DUMMY_STATIONS.filter(s => s.name.toLowerCase().includes(originSearch.toLowerCase()))
    const filteredDestStations = DUMMY_STATIONS.filter(s => s.name.toLowerCase().includes(destSearch.toLowerCase()))

    const handleSwap = () => {
        setIsSwapping(true)
        setTimeout(() => {
            setOrigin(dest)
            setDest(origin)
            setIsSwapping(false)
            setShowResults(false)
        }, 300)
    }

    const handleSearch = () => {
        setIsSearching(true)
        setShowResults(false)
        setShowOriginDropdown(false)
        setShowDestDropdown(false)
        setTimeout(() => {
            setIsSearching(false)
            setShowResults(true)
            setTimeout(() => {
                window.scrollTo({ top: 600, behavior: 'smooth' })
            }, 100)
        }, 1500) // fake loading delay
    }

    return (
        <div className="flex flex-col min-h-[90vh]">
            {/* Hero Section */}
            <div className="relative w-full h-[400px] md:h-[450px] bg-slate-900 overflow-hidden flex flex-col items-center pt-24 md:pt-32">
                <div className="absolute inset-0 bg-gradient-to-r from-metro-dark via-metro-primary/80 to-metro-dark opacity-90"></div>
                <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${metroImage})` }}></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent"></div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center px-4"
                >
                    <span className="inline-block rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md mb-4 px-5 py-1.5 font-semibold text-sm shadow-sm">
                        The #1 Metro Booking Platform
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
                        Skip the line, <span className="text-blue-200">Start the journey.</span>
                    </h1>
                    <p className="text-blue-50 text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-md">
                        Book digital tickets, explore live routes, and commute seamlessly.
                    </p>
                </motion.div>
            </div>

            {/* Main Search Widget */}
            <div className="px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto -mt-24 md:-mt-32 relative z-30 pb-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-2 md:p-4 border border-slate-100 dark:border-slate-700 backdrop-blur-xl"
                >
                    {/* Tabs */}
                    <div className="flex justify-center md:justify-start gap-2 md:gap-4 border-b border-slate-100 dark:border-slate-700 pb-4 px-2 md:px-6 pt-2 overflow-x-auto no-scrollbar">
                        <button onClick={() => setActiveTab('book')} className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all whitespace-nowrap ${activeTab === 'book' ? 'bg-blue-50 text-metro-primary dark:bg-slate-700/50 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/30'}`}>
                            <TrainFront size={20} /> Book Ticket
                        </button>
                        <button onClick={() => setActiveTab('pass')} className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all whitespace-nowrap ${activeTab === 'pass' ? 'bg-blue-50 text-metro-primary dark:bg-slate-700/50 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/30'}`}>
                            <CreditCard size={20} /> Smart Pass
                        </button>
                        <button onClick={() => { setActiveTab('map'); navigate('/map'); }} className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all whitespace-nowrap ${activeTab === 'map' ? 'bg-blue-50 text-metro-primary dark:bg-slate-700/50 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/30'}`}>
                            <Map size={20} /> Live Map
                        </button>
                    </div>

                    {/* Widget Body */}
                    <div className="p-4 md:p-6 lg:p-8">
                        <div className="flex flex-col lg:flex-row items-stretch border border-slate-200 dark:border-slate-600 rounded-2xl bg-white dark:bg-slate-900/50 py-2 shadow-sm">

                            <div className="flex flex-1 flex-col lg:flex-row relative gap-4 lg:gap-0">
                                {/* Origin Autocomplete */}
                                <div ref={originRef} className="flex-1 px-6 py-4 lg:border-r border-slate-200 dark:border-slate-600 hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors cursor-pointer rounded-l-2xl relative" onClick={() => { setShowOriginDropdown(true); setShowDestDropdown(false); }}>
                                    <motion.div animate={{ x: isSwapping ? 50 : 0, opacity: isSwapping ? 0 : 1 }}>
                                        <p className="text-sm font-semibold mb-1 text-slate-500 dark:text-slate-400">FROM</p>
                                        <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-1 line-clamp-1">{origin.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{origin.isInterchange ? 'Interchange' : 'Station'} • {origin.line}</p>
                                    </motion.div>

                                    {showOriginDropdown && (
                                        <div className="absolute top-full left-0 w-full md:w-[350px] mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden" onClick={e => e.stopPropagation()}>
                                            <div className="p-3 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50">
                                                <Search size={18} className="text-slate-400" />
                                                <input
                                                    type="text"
                                                    autoFocus
                                                    placeholder="Search origin station..."
                                                    className="w-full bg-transparent border-0 focus:ring-0 text-slate-800 dark:text-white placeholder-slate-400 text-lg font-medium p-0"
                                                    value={originSearch}
                                                    onChange={(e) => setOriginSearch(e.target.value)}
                                                />
                                            </div>
                                            <ul className="max-h-[300px] overflow-y-auto no-scrollbar py-2">
                                                {filteredOriginStations.map(station => (
                                                    <li
                                                        key={station.id}
                                                        className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700/50 cursor-pointer flex items-center gap-3 transition-colors"
                                                        onClick={() => { setOrigin(station); setShowOriginDropdown(false); setOriginSearch(''); }}
                                                    >
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${station.line.includes('Yellow') ? 'bg-yellow-100 text-yellow-600' : station.line.includes('Blue') ? 'bg-blue-100 text-blue-600' : station.line.includes('Red') ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'} dark:bg-opacity-20`}>
                                                            <MapPin size={16} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800 dark:text-white">{station.name}</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400">{station.line}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                                {filteredOriginStations.length === 0 && (
                                                    <li className="px-4 py-6 text-center text-slate-500">No stations found.</li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Swap Button */}
                                <button onClick={handleSwap} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3 md:p-3.5 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-700 text-metro-primary dark:text-blue-400 z-40 hover:rotate-180 hover:scale-110 hover:text-metro-accent transition-all duration-300">
                                    <ArrowLeftRight size={22} className="hidden md:block" />
                                    <ArrowLeftRight size={18} className="md:hidden" />
                                </button>

                                {/* Destination Autocomplete */}
                                <div ref={destRef} className="flex-1 px-6 py-4 lg:border-r border-slate-200 dark:border-slate-600 hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors cursor-pointer relative" onClick={() => { setShowDestDropdown(true); setShowOriginDropdown(false); }}>
                                    <motion.div animate={{ x: isSwapping ? -50 : 0, opacity: isSwapping ? 0 : 1 }}>
                                        <p className="text-sm font-semibold mb-1 text-slate-500 dark:text-slate-400">TO</p>
                                        <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-1 line-clamp-1">{dest.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{dest.isInterchange ? 'Interchange' : 'Station'} • {dest.line}</p>
                                    </motion.div>

                                    {showDestDropdown && (
                                        <div className="absolute top-full left-0 w-full md:w-[350px] mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden" onClick={e => e.stopPropagation()}>
                                            <div className="p-3 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50">
                                                <Search size={18} className="text-slate-400" />
                                                <input
                                                    type="text"
                                                    autoFocus
                                                    placeholder="Search destination station..."
                                                    className="w-full bg-transparent border-0 focus:ring-0 text-slate-800 dark:text-white placeholder-slate-400 text-lg font-medium p-0"
                                                    value={destSearch}
                                                    onChange={(e) => setDestSearch(e.target.value)}
                                                />
                                            </div>
                                            <ul className="max-h-[300px] overflow-y-auto no-scrollbar py-2">
                                                {filteredDestStations.map(station => (
                                                    <li
                                                        key={station.id}
                                                        className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700/50 cursor-pointer flex items-center gap-3 transition-colors"
                                                        onClick={() => { setDest(station); setShowDestDropdown(false); setDestSearch(''); }}
                                                    >
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${station.line.includes('Yellow') ? 'bg-yellow-100 text-yellow-600' : station.line.includes('Blue') ? 'bg-blue-100 text-blue-600' : station.line.includes('Red') ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'} dark:bg-opacity-20`}>
                                                            <MapPin size={16} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800 dark:text-white">{station.name}</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400">{station.line}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                                {filteredDestStations.length === 0 && (
                                                    <li className="px-4 py-6 text-center text-slate-500">No stations found.</li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Date */}
                            <div className="w-full lg:w-[220px] px-6 py-4 lg:border-r border-slate-200 dark:border-slate-600 hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group flex items-center gap-4">
                                <CalendarDays size={32} className="text-metro-primary/40 dark:text-slate-600 group-hover:text-metro-primary dark:group-hover:text-blue-400 transition-colors" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">DEPARTURE</p>
                                    <p className="font-bold text-slate-800 dark:text-white mt-1">Today</p>
                                </div>
                            </div>

                            {/* Passengers / Tickets */}
                            <div className="w-full lg:w-[150px] px-6 py-4 hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group flex items-center gap-4 rounded-r-2xl">
                                <Users size={32} className="text-metro-primary/40 dark:text-slate-600 group-hover:text-metro-primary dark:group-hover:text-blue-400 transition-colors" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">TICKETS</p>
                                    <p className="font-bold text-slate-800 dark:text-white mt-1">1 Adult</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center -mb-8 lg:-mb-10 relative z-20">
                        <button
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="bg-gradient-to-r from-metro-primary to-metro-accent hover:from-blue-700 hover:to-red-600 text-white font-bold text-xl md:text-2xl px-12 md:px-20 py-4 md:py-5 rounded-full shadow-xl shadow-metro-accent/30 hover:scale-105 transition-all active:scale-95 border-4 border-white dark:border-slate-800 flex items-center gap-3 disabled:opacity-75 disabled:scale-100"
                        >
                            {isSearching ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    SEARCHING...
                                </span>
                            ) : 'SEARCH ROUTES'}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Route Results Rendering */}
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full max-w-4xl mx-auto px-4 pb-12 overflow-hidden"
                    >
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-6 pt-8">Available Routes</h3>
                        <div className="flex flex-col gap-4">
                            {DUMMY_ROUTES.map((route, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={route.id}
                                    className="glass-panel p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-metro-primary/50 transition-all group flex flex-col md:flex-row gap-6 md:items-center justify-between cursor-pointer"
                                    onClick={() => navigate(`/booking/${route.id}`)}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="badge badge-primary badge-outline font-bold bg-blue-50 dark:bg-slate-900 border-0 text-metro-primary">{route.type}</span>
                                            <span className="text-slate-500 font-semibold text-sm flex items-center gap-1"><Clock size={14} /> {route.duration}</span>
                                            <span className="text-slate-500 font-semibold text-sm flex items-center gap-1"><Map size={14} /> {route.stops} stops</span>
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            {route.segments.map((seg, sIdx) => (
                                                <div key={sIdx} className="flex items-center gap-2">
                                                    <span className={`w-3 h-3 rounded-full ${seg.color} shadow-sm shadow-black/20`}></span>
                                                    <span className="font-bold text-slate-800 dark:text-white">{seg.from}</span>
                                                    {sIdx < route.segments.length - 1 && (
                                                        <ArrowRight size={16} className="text-slate-400 mx-1" />
                                                    )}
                                                    {sIdx === route.segments.length - 1 && (
                                                        <>
                                                            <ArrowRight size={16} className="text-slate-400 mx-1" />
                                                            <span className="font-bold text-slate-800 dark:text-white">{seg.to}</span>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col items-center justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-6 min-w-[120px]">
                                        <div className="text-3xl font-black text-slate-800 dark:text-white mb-2">{route.price}</div>
                                        <button className="btn bg-metro-accent text-white hover:bg-red-700 border-0 rounded-xl font-bold w-full gap-2 relative overflow-hidden group-hover:shadow-lg shadow-metro-accent/30">
                                            Select <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )
                }
            </AnimatePresence >

            {/* Featured Offers or Info Cards */}
            < div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6" >
                {
                    [
                        { title: "Metro Pass Offers", desc: "Get up to 20% off on monthly unlimited passes.", icon: "💸" },
                        { title: "New Airport Line", desc: "Reach the terminal in under 25 minutes.", icon: "✈️" },
                        { title: "WhatsApp Ticketing", desc: "Now book your tickets instantly via WhatsApp.", icon: "📱" }
                    ].map((item, i) => (
                        <div key={i} className="glass-panel p-6 rounded-3xl hover:-translate-y-1 transition-transform border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/80 group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 font-medium">{item.desc}</p>
                        </div>
                    ))
                }
            </div >
        </div >
    )
}
