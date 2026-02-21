import { useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut, Maximize, MapPin, Train, Info, X, Navigation, MousePointer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DUMMY_STATIONS, INITIAL_NETWORK, STATION_COORDINATES } from '@/data/dummyData'
import { useUIStore } from '@/store/uiStore'

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
    const { selectedRoute, setSearchOrigin, setSearchDest } = useUIStore()
    const [activeLine, setActiveLine] = useState('All')
    const [selectedStation, setSelectedStation] = useState(null)
    const [mapActive, setMapActive] = useState(false)

    // Highlight helpers
    const getPathOpacity = (lineName) => {
        if (selectedRoute) {
            const isActive = selectedRoute.segments.some(s => s.line === lineName)
            return isActive ? 'opacity-100 stroke-dasharray-anim' : 'opacity-10'
        }
        if (activeLine !== 'All' && activeLine !== lineName) return 'opacity-10'
        return 'opacity-100'
    }

    const isNodeActive = (stationName) => {
        if (!selectedRoute) return false
        if (selectedRoute.interchanges.includes(stationName)) return true
        if (selectedRoute.segments[0].from.name === stationName) return true
        if (selectedRoute.segments[selectedRoute.segments.length - 1].to.name === stationName) return true
        return false
    }

    const handleStationClick = (stationName) => {
        const stationLines = INITIAL_NETWORK.filter(l => l.stations.includes(stationName))
        setSelectedStation({
            name: stationName,
            lines: stationLines.map(l => {
                const lineConfig = LINES.find(cfg => cfg.id === l.name)
                return { name: l.name, color: lineConfig ? lineConfig.dot : '#64748B' }
            }),
            isInterchange: stationLines.length > 1,
            line: stationLines.length > 0 ? stationLines[0].name : 'Unknown Line'
        })
    }


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
                        {selectedRoute
                            ? `Showing recommended route: ${selectedRoute.segments[0].from.name} to ${selectedRoute.segments[selectedRoute.segments.length - 1].to.name}`
                            : 'Explore routes, find interchange stations and plan your journey visually.'}
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
                                        <div className="flex flex-col gap-2">
                                            {selectedStation.lines ? selectedStation.lines.map(l => (
                                                <div key={l.name} className="flex items-center gap-2 text-sm">
                                                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
                                                    <span className="font-bold text-gray-700">{l.name}</span>
                                                </div>
                                            )) : (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: selectedStation.line?.includes('Yellow') ? '#D97706' : selectedStation.line?.includes('Blue') ? '#2563EB' : selectedStation.line?.includes('Red') ? '#D7231A' : '#64748B' }} />
                                                    <span className="font-bold text-gray-700">{selectedStation.line}</span>
                                                </div>
                                            )}
                                        </div>
                                        {selectedStation.isInterchange && (
                                            <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 text-xs font-bold text-[#003087]">
                                                🔄 Interchange Station
                                            </div>
                                        )}
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                onClick={() => { setSearchOrigin(selectedStation); navigate('/') }}
                                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#003087] text-white rounded-xl font-bold text-xs hover:bg-blue-900 transition-colors"
                                            >
                                                <Navigation size={13} /> Book from here
                                            </button>
                                            <button
                                                onClick={() => { setSearchDest(selectedStation); navigate('/') }}
                                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-50 transition-colors shadow-sm"
                                            >
                                                <MapPin size={13} /> Book to here
                                            </button>
                                        </div>
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
                                        <div className="w-[1800px] h-[1200px]">
                                            <svg width="100%" height="100%" viewBox="0 0 1800 1200">


                                                {/* ── Render Dynamic Lines ── */}
                                                {INITIAL_NETWORK.map(line => {
                                                    // Map stations to their X,Y coords
                                                    const pathCoords = line.stations
                                                        .map(s => STATION_COORDINATES[s])
                                                        .filter(coord => coord); // drop undefined just in case

                                                    // Generate SVG Path 'M x1 y1 L x2 y2 L x3 y3...'
                                                    if (pathCoords.length === 0) return null;
                                                    const d = pathCoords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');

                                                    // Determine stroke width
                                                    const getStrokeWidth = (id) => {
                                                        if (id === 'yellow') return '12';
                                                        if (id === 'blue') return '12';
                                                        if (id === 'red') return '12';
                                                        if (id === 'magenta') return '10';
                                                        if (id === 'orange') return '10';
                                                        return '10';
                                                    };

                                                    const getStrokeColor = (id) => {
                                                        const cfg = LINES.find(cfg => cfg.id.toLowerCase().includes(id));
                                                        return cfg ? cfg.dot : '#94A3B8';
                                                    }

                                                    return (
                                                        <path
                                                            key={line.id}
                                                            d={d}
                                                            stroke={getStrokeColor(line.id)}
                                                            strokeWidth={getStrokeWidth(line.id)}
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className={`transition-opacity duration-300 ease-in-out ${getPathOpacity(line.name)}`}
                                                        />
                                                    );
                                                })}

                                                {/* ── Render Dynamic Station Nodes ── */}
                                                {Object.entries(STATION_COORDINATES).map(([stationName, coords]) => {
                                                    // Check lines
                                                    const stationLines = INITIAL_NETWORK.filter(l => l.stations.includes(stationName));
                                                    const isInterchange = stationLines.length > 1;

                                                    // Primary line color
                                                    const cfg = LINES.find(cfg => cfg.id.toLowerCase().includes(stationLines[0]?.id));
                                                    const primaryDot = cfg ? cfg.dot : '#64748B';

                                                    // If its a major interchange, customize.
                                                    const isMajor = ['Rajiv Chowk', 'Kashmere Gate'].includes(stationName);

                                                    // Determine Node Size
                                                    let outerRadius = 8;
                                                    let innerRadius = 4;
                                                    let strokeW = 4;
                                                    let pulseRadius = 16;

                                                    if (isMajor) {
                                                        outerRadius = 18;
                                                        innerRadius = 8;
                                                        pulseRadius = 26;
                                                    } else if (isInterchange) {
                                                        outerRadius = 13;
                                                        innerRadius = 5;
                                                        pulseRadius = 22;
                                                    }

                                                    // Label Placement offset
                                                    const isVertical = stationLines.some(l => l.id === 'yellow');

                                                    // For horizontal lines, alternate label placement above and below 
                                                    // the line to prevent overlapping.
                                                    let isTop = true;

                                                    if (!isVertical) {
                                                        // Get the index of the station on the primary line to determine alternation
                                                        const primaryLineId = stationLines[0].id;
                                                        const lineData = INITIAL_NETWORK.find(l => l.id === primaryLineId);
                                                        const stationIndex = lineData ? lineData.stations.indexOf(stationName) : 0;
                                                        isTop = stationIndex % 2 === 0;
                                                    }

                                                    const labelTx = isVertical ? coords.x + outerRadius + 8 : coords.x;
                                                    const labelTy = isVertical
                                                        ? coords.y + 4
                                                        : (isTop ? coords.y - (outerRadius + 8) : coords.y + (outerRadius + 14));

                                                    const textAnchor = isVertical ? 'start' : 'middle';

                                                    // Split long names for better layout
                                                    const nameParts = stationName.split(' ');
                                                    const needsWrap = nameParts.length > 2 && !isVertical;

                                                    return (
                                                        <g
                                                            key={stationName}
                                                            className={`cursor-pointer transition-opacity ${!selectedRoute || isNodeActive(stationName) ? 'hover:opacity-75' : 'opacity-30'} ${isNodeActive(stationName) ? 'opacity-100' : ''}`}
                                                            onClick={e => {
                                                                e.stopPropagation() // prevent activating canvas wrapper
                                                                handleStationClick(stationName)
                                                            }}
                                                        >
                                                            {isNodeActive(stationName) && (
                                                                <circle cx={coords.x} cy={coords.y} r={pulseRadius} fill="none" stroke={isMajor ? '#D7231A' : '#003087'} strokeWidth={isMajor ? 4 : 3} className="origin-center animate-ping" />
                                                            )}
                                                            <circle
                                                                cx={coords.x}
                                                                cy={coords.y}
                                                                r={outerRadius}
                                                                fill="white"
                                                                stroke={isMajor ? '#D7231A' : (isInterchange ? '#003087' : primaryDot)}
                                                                strokeWidth={isMajor ? 7 : (isInterchange ? 5 : strokeW)}
                                                                className="hover:scale-110 transition-transform origin-center"
                                                                style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                                                            />
                                                            <text
                                                                x={labelTx}
                                                                y={labelTy}
                                                                fill={isMajor ? '#D7231A' : (isInterchange ? '#003087' : '#1e293b')}
                                                                fontWeight={isMajor ? '900' : (isInterchange ? '800' : '700')}
                                                                fontSize={isMajor ? '13' : (isInterchange ? '11' : '9')}
                                                                fontFamily="Inter,sans-serif"
                                                                textAnchor={textAnchor}
                                                                className="select-none drop-shadow-sm pointer-events-none"
                                                            >
                                                                {needsWrap ? (
                                                                    <>
                                                                        <tspan x={labelTx} dy="-0.6em">{nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(' ')}</tspan>
                                                                        <tspan x={labelTx} dy="1.2em">{nameParts.slice(Math.ceil(nameParts.length / 2)).join(' ')}</tspan>
                                                                    </>
                                                                ) : (
                                                                    stationName
                                                                )}
                                                            </text>
                                                        </g>
                                                    );
                                                })}

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
