import { useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut, Maximize, MapPin, Train, Info, X, Navigation, MousePointer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DUMMY_STATIONS } from '@/data/dummyData'

/* ── Line config ─────────────────────────────────────────────── */
const LINES = [
    { id: 'All', label: 'All Lines', activeCls: 'bg-[#003087] text-white' },
    { id: 'Yellow Line', label: 'Yellow', activeCls: 'bg-yellow-500 text-white', dot: '#D97706' },
    { id: 'Blue Line', label: 'Blue', activeCls: 'bg-blue-600 text-white', dot: '#2563EB' },
    { id: 'Red Line', label: 'Red', activeCls: 'bg-[#D7231A] text-white', dot: '#D7231A' },
    { id: 'Magenta Line', label: 'Magenta', activeCls: 'bg-fuchsia-600 text-white', dot: '#C026D3' },
    { id: 'Orange Line', label: 'Orange', activeCls: 'bg-orange-500 text-white', dot: '#EA580C' },
]

export default function NetworkMap() {
    const navigate = useNavigate()
    const [activeLine, setActiveLine] = useState('All')
    const [selectedStation, setSelectedStation] = useState(null)
    const [mapActive, setMapActive] = useState(false)


    return (
        <div className="flex flex-col min-h-[90vh] bg-gray-50">

            {/* ── Tricolor strip */}
            <div className="flex h-1">
                <div className="flex-1 bg-[#D7231A]" />
                <div className="flex-1 bg-white border-y border-gray-200" />
                <div className="flex-1 bg-[#00873D]" />
            </div>

            {/* ── Page Banner */}
            <div className="relative w-full bg-[#003087] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541818780709-a4176840d252?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />
                <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-gray-50 to-transparent" />

                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 text-center py-8 px-4"
                >
                    <span className="inline-block text-[10px] font-black tracking-[0.2em] text-blue-300 uppercase mb-3">
                        🚇 Interactive Network Map
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                        Metro <span className="text-yellow-300">Network</span>
                    </h1>
                    <p className="text-blue-200 text-sm max-w-lg mx-auto">
                        Explore routes, find interchange stations and plan your journey visually.
                    </p>
                </motion.div>
            </div>

            {/* ── Main layout */}
            <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full py-6">
                <div className="flex flex-col lg:flex-row gap-5">

                    {/* ── Left Panel: Filters ─────────────────────────── */}
                    <div className="w-full lg:w-[280px] shrink-0 space-y-5">

                        {/* Line Filter */}
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                        >
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#003087]">
                                <Train size={15} className="text-blue-300" />
                                <h3 className="font-black text-white text-sm">Filter Lines</h3>
                            </div>
                            <div className="p-3 space-y-1.5">
                                {LINES.map(line => (
                                    <button key={line.id} onClick={() => setActiveLine(line.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all ${activeLine === line.id
                                            ? line.activeCls + ' shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-100 bg-gray-50 border border-gray-200'
                                            }`}>
                                        {line.dot && <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: activeLine === line.id ? 'rgba(255,255,255,0.7)' : line.dot }} />}
                                        {!line.dot && <Train size={13} className={activeLine === line.id ? 'text-white/70' : 'text-gray-400'} />}
                                        {line.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Station Info card */}
                        <AnimatePresence mode="wait">
                            {selectedStation ? (
                                <motion.div
                                    key="selected"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 px-4 py-3 bg-[#D7231A]">
                                        <MapPin size={14} className="text-white" />
                                        <h3 className="font-black text-white text-sm flex-1 truncate">{selectedStation.name}</h3>
                                        <button onClick={() => setSelectedStation(null)} className="text-white/60 hover:text-white transition-colors">
                                            <X size={15} />
                                        </button>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: selectedStation.line?.includes('Yellow') ? '#D97706' : selectedStation.line?.includes('Blue') ? '#2563EB' : selectedStation.line?.includes('Red') ? '#D7231A' : '#64748B' }} />
                                            <span className="font-bold text-gray-700">{selectedStation.line}</span>
                                        </div>
                                        {selectedStation.isInterchange && (
                                            <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 text-xs font-bold text-[#003087]">
                                                🔄 Interchange Station
                                            </div>
                                        )}
                                        <button
                                            onClick={() => navigate('/')}
                                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#003087] text-white rounded-xl font-bold text-sm hover:bg-blue-900 transition-colors"
                                        >
                                            <Navigation size={14} /> Plan from here
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                                        <Info size={14} className="text-[#00873D]" />
                                        <h3 className="font-black text-gray-800 text-sm">Map Legend</h3>
                                    </div>
                                    <div className="p-4 space-y-2.5">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="w-4 h-4 rounded-full border-[3px] border-gray-400 bg-white flex-shrink-0" />
                                            <span className="font-semibold">Standard Station</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="w-5 h-5 rounded-full border-[4px] border-[#003087] bg-white flex-shrink-0" />
                                            <span className="font-semibold">Interchange Hub</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="w-5 h-5 rounded-full border-[4px] border-[#D7231A] bg-white flex-shrink-0" />
                                            <span className="font-semibold">Major Interchange</span>
                                        </div>
                                        <p className="text-xs text-gray-400 pt-1 font-medium">Click any station node to view details.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── Map Canvas ──────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-[580px] lg:h-[680px] relative"
                        onBlur={() => setMapActive(false)}
                        tabIndex={-1}
                    >
                        {/* Click-to-activate overlay */}
                        <AnimatePresence>
                            {!mapActive && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setMapActive(true)}
                                    className="absolute inset-0 z-30 bg-black/10 flex flex-col items-center justify-center gap-3 cursor-pointer focus:outline-none"
                                >
                                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-4 flex flex-col items-center gap-2 border border-gray-200">
                                        <MousePointer size={22} className="text-[#003087]" />
                                        <p className="font-black text-[#003087] text-sm">Click to interact with map</p>
                                        <p className="text-gray-400 text-xs">Scroll to zoom · Drag to pan</p>
                                    </div>
                                </motion.button>
                            )}
                        </AnimatePresence>

                        <TransformWrapper
                            initialScale={0.55}
                            minScale={0.25}
                            maxScale={5}
                            centerOnInit={true}
                            wheel={{ step: 0.08, disabled: !mapActive }}
                            panning={{ disabled: !mapActive }}
                            limitToBounds={false}
                            doubleClick={{ mode: 'zoomIn', step: 0.5 }}
                        >
                            {({ zoomIn, zoomOut, resetTransform }) => (
                                <>
                                    {/* Zoom Controls */}
                                    <div className="absolute right-5 bottom-5 z-20 flex flex-col gap-2 p-2.5 rounded-xl bg-white border border-gray-200 shadow-md">
                                        <button onClick={() => zoomIn(0.3)} aria-label="Zoom in" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <ZoomIn size={18} className="text-[#003087]" />
                                        </button>
                                        <div className="w-full h-px bg-gray-200" />
                                        <button onClick={() => zoomOut(0.3)} aria-label="Zoom out" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <ZoomOut size={18} className="text-[#003087]" />
                                        </button>
                                        <div className="w-full h-px bg-gray-200" />
                                        <button onClick={() => resetTransform()} aria-label="Reset" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Maximize size={18} className="text-[#003087]" />
                                        </button>
                                    </div>

                                    <TransformComponent
                                        wrapperClass="!w-full !h-full bg-gray-50 cursor-grab active:cursor-grabbing"
                                        contentClass="flex items-center justify-center"
                                    >
                                        <div className="w-[1200px] h-[900px]">
                                            <svg width="100%" height="100%" viewBox="0 0 1200 900">

                                                {/* Yellow Line N-S */}
                                                <path d="M 600 100 L 600 800" stroke="#D97706" strokeWidth="12" fill="none" strokeLinecap="round"
                                                    className={`transition-opacity duration-300 ${activeLine !== 'All' && activeLine !== 'Yellow Line' ? 'opacity-8' : 'opacity-100'}`} />

                                                {/* Blue Line E-W */}
                                                <path d="M 100 450 L 1100 450" stroke="#2563EB" strokeWidth="12" fill="none" strokeLinecap="round"
                                                    className={`transition-opacity duration-300 ${activeLine !== 'All' && activeLine !== 'Blue Line' ? 'opacity-8' : 'opacity-100'}`} />

                                                {/* Red Line */}
                                                <path d="M 200 200 L 600 200 L 1000 100" stroke="#D7231A" strokeWidth="12" fill="none" strokeLinecap="round"
                                                    className={`transition-opacity duration-300 ${activeLine !== 'All' && activeLine !== 'Red Line' ? 'opacity-8' : 'opacity-100'}`} />

                                                {/* Magenta Line */}
                                                <path d="M 200 700 L 600 600 L 1000 700" stroke="#C026D3" strokeWidth="10" fill="none" strokeLinecap="round"
                                                    className={`transition-opacity duration-300 ${activeLine !== 'All' && activeLine !== 'Magenta Line' ? 'opacity-8' : 'opacity-100'}`} />

                                                {/* Orange Line (Airport) */}
                                                <path d="M 600 450 L 400 550 L 150 750" stroke="#EA580C" strokeWidth="10" fill="none" strokeLinecap="round"
                                                    className={`transition-opacity duration-300 ${activeLine !== 'All' && activeLine !== 'Orange Line' ? 'opacity-8' : 'opacity-100'}`} />

                                                {/* ── Standard Nodes: Yellow Line ── */}
                                                {[
                                                    { cx: 600, cy: 100, stroke: '#D97706', label: 'Majlis Park', tx: 625, ty: 105, anchor: 'start' },
                                                    { cx: 600, cy: 270, stroke: '#D97706', label: 'Chandni Chowk', tx: 625, ty: 275, anchor: 'start' },
                                                    { cx: 600, cy: 330, stroke: '#D97706', label: 'Chawri Bazar', tx: 625, ty: 335, anchor: 'start' },
                                                    { cx: 600, cy: 800, stroke: '#D97706', label: 'HUDA City Centre', tx: 625, ty: 805, anchor: 'start' },
                                                ].map(s => (
                                                    <g key={s.label} className="cursor-pointer hover:opacity-75 transition-opacity"
                                                        onClick={() => setSelectedStation(DUMMY_STATIONS.find(st => st.name === s.label) || { name: s.label, line: 'Yellow Line', isInterchange: false })}>
                                                        <circle cx={s.cx} cy={s.cy} r="11" fill="white" stroke={s.stroke} strokeWidth="5" />
                                                        <text x={s.tx} y={s.ty} fill="#1e293b" fontWeight="700" fontSize="13" fontFamily="Inter,sans-serif" textAnchor={s.anchor}>{s.label}</text>
                                                    </g>
                                                ))}

                                                {/* ── Standard Nodes: Blue Line ── */}
                                                {[
                                                    { cx: 100, cy: 450, stroke: '#2563EB', label: 'Dwarka Sec 21', tx: 100, ty: 425, anchor: 'middle' },
                                                    { cx: 1100, cy: 450, stroke: '#2563EB', label: 'Noida Electronic City', tx: 1100, ty: 425, anchor: 'middle' },
                                                ].map(s => (
                                                    <g key={s.label} className="cursor-pointer hover:opacity-75 transition-opacity"
                                                        onClick={() => setSelectedStation({ name: s.label, line: 'Blue Line', isInterchange: false })}>
                                                        <circle cx={s.cx} cy={s.cy} r="11" fill="white" stroke={s.stroke} strokeWidth="5" />
                                                        <text x={s.tx} y={s.ty} fill="#1e293b" fontWeight="700" fontSize="13" fontFamily="Inter,sans-serif" textAnchor={s.anchor}>{s.label}</text>
                                                    </g>
                                                ))}

                                                {/* ── Airport (Orange) ── */}
                                                <g className="cursor-pointer group"
                                                    onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Airport (T3)') || { name: 'Airport (T3)', line: 'Orange Line', isInterchange: false })}>
                                                    <circle cx="150" cy="750" r="14" fill="white" stroke="#EA580C" strokeWidth="6" className="group-hover:scale-110 transition-transform origin-[150px_750px]" />
                                                    <text x="175" y="755" fill="#1e293b" fontWeight="700" fontSize="13" fontFamily="Inter,sans-serif">Airport (T3)</text>
                                                </g>

                                                {/* ── Interchange Nodes ── */}
                                                {/* Kashmere Gate (Red/Yellow) */}
                                                <g className="cursor-pointer group"
                                                    onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Kashmere Gate') || { name: 'Kashmere Gate', line: 'Red Line', isInterchange: true })}>
                                                    <circle cx="600" cy="200" r="18" fill="white" stroke="#003087" strokeWidth="7" className="group-hover:scale-110 transition-transform origin-[600px_200px]" />
                                                    <text x="630" y="195" fill="#003087" fontWeight="900" fontSize="14" fontFamily="Inter,sans-serif">Kashmere Gate</text>
                                                </g>

                                                {/* Rajiv Chowk (Yellow/Blue) — HIGHLIGHTED */}
                                                <g className="cursor-pointer group"
                                                    onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Rajiv Chowk') || { name: 'Rajiv Chowk', line: 'Yellow Line', isInterchange: true })}>
                                                    <circle cx="600" cy="450" r="22" fill="white" stroke="#D7231A" strokeWidth="9" className="group-hover:scale-110 transition-transform origin-[600px_450px]" />
                                                    <text x="638" y="468" fill="#D7231A" fontWeight="900" fontSize="18" fontFamily="Inter,sans-serif">Rajiv Chowk</text>
                                                </g>

                                                {/* New Delhi (Yellow/Orange) */}
                                                <g className="cursor-pointer group"
                                                    onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'New Delhi') || { name: 'New Delhi', line: 'Yellow Line', isInterchange: true })}>
                                                    <circle cx="600" cy="500" r="18" fill="white" stroke="#003087" strokeWidth="7" className="group-hover:scale-110 transition-transform origin-[600px_500px]" />
                                                    <text x="630" y="505" fill="#003087" fontWeight="900" fontSize="14" fontFamily="Inter,sans-serif">New Delhi</text>
                                                </g>

                                                {/* Hauz Khas (Yellow/Magenta) */}
                                                <g className="cursor-pointer group"
                                                    onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Hauz Khas') || { name: 'Hauz Khas', line: 'Yellow Line', isInterchange: true })}>
                                                    <circle cx="600" cy="625" r="18" fill="white" stroke="#003087" strokeWidth="7" className="group-hover:scale-110 transition-transform origin-[600px_625px]" />
                                                    <text x="630" y="630" fill="#003087" fontWeight="900" fontSize="14" fontFamily="Inter,sans-serif">Hauz Khas</text>
                                                </g>

                                                {/* Janakpuri West (Blue/Magenta) */}
                                                <g className="cursor-pointer group"
                                                    onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Janakpuri West') || { name: 'Janakpuri West', line: 'Blue Line', isInterchange: true })}>
                                                    <circle cx="200" cy="450" r="16" fill="white" stroke="#003087" strokeWidth="6" className="group-hover:scale-110 transition-transform origin-[200px_450px]" />
                                                    <text x="200" y="490" fill="#003087" fontWeight="800" fontSize="13" fontFamily="Inter,sans-serif" textAnchor="middle">Janakpuri West</text>
                                                </g>

                                                {/* Botanical Garden (Blue/Magenta) */}
                                                <g className="cursor-pointer group"
                                                    onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Botanical Garden') || { name: 'Botanical Garden', line: 'Blue Line', isInterchange: true })}>
                                                    <circle cx="900" cy="450" r="16" fill="white" stroke="#003087" strokeWidth="6" className="group-hover:scale-110 transition-transform origin-[900px_450px]" />
                                                    <text x="900" y="490" fill="#003087" fontWeight="800" fontSize="13" fontFamily="Inter,sans-serif" textAnchor="middle">Botanical Garden</text>
                                                </g>

                                            </svg>
                                        </div>
                                    </TransformComponent>
                                </>
                            )}
                        </TransformWrapper>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
