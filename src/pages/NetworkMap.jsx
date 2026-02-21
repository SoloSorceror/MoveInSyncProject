import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize, MapPin, TrainTrack, Info, CornerDownRight, CornerUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DUMMY_STATIONS } from '@/data/dummyData';

export default function NetworkMap() {
    const navigate = useNavigate();
    const [activeLine, setActiveLine] = useState('All');
    const [selectedStation, setSelectedStation] = useState(null);

    const lines = [
        { id: 'All', color: 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' },
        { id: 'Yellow Line', color: 'bg-yellow-500 text-white' },
        { id: 'Blue Line', color: 'bg-blue-500 text-white' },
        { id: 'Red Line', color: 'bg-red-500 text-white' },
        { id: 'Magenta Line', color: 'bg-fuchsia-600 text-white' },
        { id: 'Orange Line', color: 'bg-orange-500 text-white' },
    ];

    return (
        <div className="flex flex-col min-h-[90vh] bg-slate-50 dark:bg-slate-950">
            {/* Header Section */}
            <div className="relative w-full h-[200px] md:h-[250px] bg-slate-900 overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-metro-dark via-metro-primary/90 to-metro-dark opacity-95"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541818780709-a4176840d252?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent"></div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center px-4 -mt-10 md:-mt-16"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 drop-shadow-lg">
                        Live <span className="text-blue-200">Network Map</span>
                    </h1>
                    <p className="text-blue-50 text-base md:text-xl font-medium max-w-2xl mx-auto drop-shadow-md">
                        Explore routes, find interchanges, and plan your journey visually.
                    </p>
                </motion.div>
            </div>

            {/* Main Interactive Map Layout */}
            <div className="px-4 sm:px-6 lg:px-8 w-full max-w-[1400px] 2xl:max-w-[1600px] mx-auto -mt-12 md:-mt-16 relative z-30 pb-12 flex flex-col lg:flex-row gap-6">

                {/* Left Side: Controls & Legend Box */}
                <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
                    {/* Filter Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 border border-slate-200 dark:border-slate-800 backdrop-blur-xl"
                    >
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                            <TrainTrack className="text-metro-primary" /> Filter Lines
                        </h3>
                        <div className="flex flex-col gap-2">
                            {lines.map((line) => (
                                <button
                                    key={line.id}
                                    onClick={() => setActiveLine(line.id)}
                                    className={`w-full text-left px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-3 ${activeLine === line.id
                                        ? line.color + ' shadow-lg border-transparent scale-[1.02]'
                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {line.id !== 'All' && (
                                        <div className={`w-3 h-3 rounded-full bg-white/80 shadow-inner block`}></div>
                                    )}
                                    {line.id}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Station Info Card (appears when a node is clicked) */}
                    <AnimatePresence>
                        {selectedStation && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: 20 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -20 }}
                                className="bg-gradient-to-br from-metro-primary to-blue-800 rounded-3xl shadow-xl p-6 border border-white/10 text-white overflow-hidden"
                            >
                                <h3 className="text-2xl font-black mb-1">{selectedStation.name}</h3>
                                <p className="text-blue-100 text-sm font-medium mb-4 flex items-center gap-1">
                                    <MapPin size={16} /> {selectedStation.isInterchange ? 'Interchange Hub' : 'Standard Station'}
                                </p>

                                <div className="bg-white/10 rounded-2xl p-4 mb-4 backdrop-blur-sm">
                                    <p className="text-xs text-blue-200 font-bold mb-2 uppercase tracking-wider">Connecting Lines</p>
                                    <div className="flex flex-wrap gap-2">
                                        {/* Extremely basic mock connection rendering */}
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${selectedStation.line.includes('Yellow') ? 'bg-yellow-500' : selectedStation.line.includes('Blue') ? 'bg-blue-500' : selectedStation.line.includes('Red') ? 'bg-red-500' : 'bg-slate-500'}`}>
                                            {selectedStation.line}
                                        </span>
                                        {selectedStation.isInterchange && (
                                            <span className="px-2 py-1 rounded-md text-xs font-bold bg-white/20">
                                                + Other Lines
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => navigate('/', { state: { setOriginAs: selectedStation } })}
                                        className="w-full py-3 bg-white text-metro-primary font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <CornerUpRight size={18} /> Book From Here
                                    </button>
                                    <button
                                        onClick={() => navigate('/', { state: { setDestAs: selectedStation } })}
                                        className="w-full py-3 bg-transparent border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 transition-colors active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <CornerDownRight size={18} /> Book To Here
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Quick Legend */}
                    <div className="hidden lg:flex flex-col gap-3 bg-slate-100 dark:bg-slate-900/50 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2"><Info size={16} /> Map Legend</h4>
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                            <div className="w-5 h-5 rounded-full border-4 border-slate-400 bg-white"></div>
                            Standard Station
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                            <div className="w-6 h-6 rounded-full border-[6px] border-slate-800 dark:border-white bg-white dark:bg-slate-900"></div>
                            Interchange Hub
                        </div>
                    </div>
                </div>

                {/* Right Side: Vast Interactive Map Canvas */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex-1 min-w-0 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-[600px] lg:h-[700px] relative group"
                >
                    {/* Draggable Warning Overlay */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-slate-900/80 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-2">
                        Scroll to Zoom • Drag to Pan
                    </div>

                    <TransformWrapper
                        initialScale={0.55}
                        minScale={0.2}
                        maxScale={4}
                        centerOnInit={true}
                        wheel={{ smoothStep: 0.01 }}
                    >
                        {({ zoomIn, zoomOut, resetTransform }) => (
                            <>
                                <div className="absolute right-6 bottom-6 z-20 flex flex-col gap-3 glass-panel p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
                                    <button onClick={() => zoomIn()} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors shadow-sm">
                                        <ZoomIn size={24} className="text-slate-700 dark:text-slate-300" />
                                    </button>
                                    <div className="w-full h-px bg-slate-200 dark:bg-slate-700"></div>
                                    <button onClick={() => zoomOut()} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors shadow-sm">
                                        <ZoomOut size={24} className="text-slate-700 dark:text-slate-300" />
                                    </button>
                                    <div className="w-full h-px bg-slate-200 dark:bg-slate-700"></div>
                                    <button onClick={() => resetTransform()} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors shadow-sm">
                                        <Maximize size={24} className="text-slate-700 dark:text-slate-300" />
                                    </button>
                                </div>

                                <TransformComponent wrapperClass="w-full h-full bg-[#f8fafc] dark:bg-[#020617] cursor-grab active:cursor-grabbing" contentClass="w-full h-full flex items-center justify-center">
                                    {/* The SVG Canvas using realistic hubs (Same SVG logic as before but with clickable nodes) */}
                                    <div className="w-[1200px] h-[900px]">
                                        <svg width="100%" height="100%" viewBox="0 0 1200 900" className="opacity-95 drop-shadow-sm">

                                            {/* Yellow Line (N-S) */}
                                            <path
                                                d="M 600 100 L 600 800"
                                                stroke="#eab308"
                                                strokeWidth="14"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={`transition-opacity duration-300 ${activeLine !== 'All' && activeLine !== 'Yellow Line' ? 'opacity-10' : 'opacity-100'}`}
                                            />

                                            {/* Blue Line (E-W) */}
                                            <path
                                                d="M 100 450 L 1100 450"
                                                stroke="#3b82f6"
                                                strokeWidth="14"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={`transition-opacity duration-300 ${activeLine !== 'All' && activeLine !== 'Blue Line' ? 'opacity-10' : 'opacity-100'}`}
                                            />

                                            {/* Red Line */}
                                            <path
                                                d="M 200 200 L 600 200 L 1000 100"
                                                stroke="#ef4444"
                                                strokeWidth="14"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={`transition-opacity duration-300 ${activeLine !== 'All' && activeLine !== 'Red Line' ? 'opacity-10' : 'opacity-100'}`}
                                            />

                                            {/* Magenta Line */}
                                            <path
                                                d="M 200 700 L 600 600 L 1000 700"
                                                stroke="#c026d3"
                                                strokeWidth="12"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={`transition-opacity duration-300 ${activeLine !== 'All' && activeLine !== 'Magenta Line' ? 'opacity-10' : 'opacity-100'}`}
                                            />

                                            {/* Orange Line (Airport Express) */}
                                            <path
                                                d="M 600 450 L 400 550 L 150 750"
                                                stroke="#f97316"
                                                strokeWidth="12"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={`transition-opacity duration-300 ${activeLine !== 'All' && activeLine !== 'Orange Line' ? 'opacity-10' : 'opacity-100'}`}
                                            />

                                            {/* Standard Nodes (Yellow Line) */}
                                            <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Majlis Park') || { name: 'Majlis Park', line: 'Yellow Line', isInterchange: false })}>
                                                <circle cx="600" cy="100" r="12" fill="white" stroke="#eab308" strokeWidth="6" />
                                                <text x="625" y="105" className="fill-slate-800 dark:fill-slate-200 font-bold font-sans text-base hover:fill-metro-primary">Majlis Park (N)</text>
                                            </g>

                                            <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Chandni Chowk'))}>
                                                <circle cx="600" cy="270" r="12" fill="white" stroke="#eab308" strokeWidth="6" />
                                                <text x="625" y="275" className="fill-slate-800 dark:fill-slate-200 font-bold font-sans text-base">Chandni Chowk</text>
                                            </g>

                                            <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Chawri Bazar'))}>
                                                <circle cx="600" cy="330" r="12" fill="white" stroke="#eab308" strokeWidth="6" />
                                                <text x="625" y="335" className="fill-slate-800 dark:fill-slate-200 font-bold font-sans text-base">Chawri Bazar</text>
                                            </g>

                                            <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'HUDA City Centre'))}>
                                                <circle cx="600" cy="800" r="12" fill="white" stroke="#eab308" strokeWidth="6" />
                                                <text x="625" y="805" className="fill-slate-800 dark:fill-slate-200 font-bold font-sans text-base">HUDA City Centre</text>
                                            </g>

                                            {/* Standard Nodes (Blue Line) */}
                                            <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Dwarka Sector 21'))}>
                                                <circle cx="100" cy="450" r="12" fill="white" stroke="#3b82f6" strokeWidth="6" />
                                                <text x="100" y="420" className="fill-slate-800 dark:fill-slate-200 font-bold font-sans text-base" textAnchor="middle">Dwarka Sec 21</text>
                                            </g>

                                            <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedStation({ name: 'Noida Electronic City', line: 'Blue Line', isInterchange: false })}>
                                                <circle cx="1100" cy="450" r="12" fill="white" stroke="#3b82f6" strokeWidth="6" />
                                                <text x="1100" y="420" className="fill-slate-800 dark:fill-slate-200 font-bold font-sans text-base" textAnchor="middle">Noida Electronic City</text>
                                            </g>

                                            {/* Interchange Nodes */}
                                            {/* Kashmere Gate (Red/Yellow) */}
                                            <g className="cursor-pointer group" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Kashmere Gate'))}>
                                                <circle cx="600" cy="200" r="20" fill="white" stroke="#0f172a" strokeWidth="8" className="dark:stroke-white dark:fill-slate-900 group-hover:scale-110 transition-transform origin-[600px_200px]" />
                                                <text x="635" y="195" className="fill-slate-900 dark:fill-white font-black font-sans text-xl">Kashmere Gate</text>
                                            </g>

                                            {/* Rajiv Chowk (Yellow/Blue) */}
                                            <g className="cursor-pointer group" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Rajiv Chowk'))}>
                                                <circle cx="600" cy="450" r="24" fill="white" stroke="#0f172a" strokeWidth="10" className="dark:stroke-white dark:fill-slate-900 animate-pulse-slow shadow-xl group-hover:scale-110 transition-transform origin-[600px_450px]" />
                                                <text x="640" y="470" className="fill-slate-900 dark:fill-white font-black font-sans text-2xl drop-shadow-md">Rajiv Chowk</text>
                                            </g>

                                            {/* New Delhi (Yellow/Orange) */}
                                            <g className="cursor-pointer group" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'New Delhi'))}>
                                                <circle cx="600" cy="500" r="20" fill="white" stroke="#0f172a" strokeWidth="8" className="dark:stroke-white dark:fill-slate-900 group-hover:scale-110 transition-transform origin-[600px_500px]" />
                                                <text x="635" y="505" className="fill-slate-900 dark:fill-white font-black font-sans text-lg">New Delhi</text>
                                            </g>

                                            {/* Hauz Khas (Yellow/Magenta) */}
                                            <g className="cursor-pointer group" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Hauz Khas'))}>
                                                <circle cx="600" cy="625" r="20" fill="white" stroke="#0f172a" strokeWidth="8" className="dark:stroke-white dark:fill-slate-900 group-hover:scale-110 transition-transform origin-[600px_625px]" />
                                                <text x="635" y="630" className="fill-slate-900 dark:fill-white font-black font-sans text-lg">Hauz Khas</text>
                                            </g>

                                            {/* Janakpuri West (Blue/Magenta) */}
                                            <g className="cursor-pointer group" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Janakpuri West'))}>
                                                <circle cx="200" cy="450" r="18" fill="white" stroke="#0f172a" strokeWidth="7" className="dark:stroke-white dark:fill-slate-900 group-hover:scale-110 transition-transform origin-[200px_450px]" />
                                                <text x="180" y="485" className="fill-slate-900 dark:fill-white font-black font-sans text-base" textAnchor="middle">Janakpuri West</text>
                                            </g>

                                            {/* Botanical Garden (Blue/Magenta) */}
                                            <g className="cursor-pointer group" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Botanical Garden'))}>
                                                <circle cx="900" cy="450" r="18" fill="white" stroke="#0f172a" strokeWidth="7" className="dark:stroke-white dark:fill-slate-900 group-hover:scale-110 transition-transform origin-[900px_450px]" />
                                                <text x="920" y="485" className="fill-slate-900 dark:fill-white font-black font-sans text-base" textAnchor="middle">Botanical Garden</text>
                                            </g>

                                            {/* Airport */}
                                            <g className="cursor-pointer group" onClick={() => setSelectedStation(DUMMY_STATIONS.find(s => s.name === 'Airport (T3)'))}>
                                                <circle cx="150" cy="750" r="16" fill="white" stroke="#f97316" strokeWidth="7" className="group-hover:scale-110 transition-transform origin-[150px_750px]" />
                                                <text x="175" y="755" className="fill-slate-900 dark:fill-white font-black font-sans text-base drop-shadow-sm">Airport (T3)</text>
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
    );
}
