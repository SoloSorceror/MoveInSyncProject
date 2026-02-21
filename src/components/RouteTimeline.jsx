/**
 * RouteTimeline — renders a step-by-step metro route breakdown.
 * Works for single-line journeys and complex multi-interchange journeys.
 *
 * Props:
 *   route      — route object from routeEngine.computeRoutes()
 *   onSelect   — callback(route) when "Select Route" is clicked
 *   compact    — if true, renders a collapsed summary card (no full timeline)
 */
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, RefreshCw, Clock, Train, Zap } from 'lucide-react'

const RouteTimeline = ({ route, onSelect, compact = false }) => {
    if (!route) return null

    const { segments, interchanges, totalStops, totalTimeMin, transfers, fareStr, recommended } = route

    // ── Compact summary card
    if (compact) {
        return (
            <div className="flex items-center gap-3 flex-wrap">
                {segments.map((seg, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
                        <span className="text-sm font-semibold text-gray-700">{seg.line}</span>
                        <span className="text-xs text-gray-400">({seg.stops} stops)</span>
                        {i < segments.length - 1 && (
                            <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                                <RefreshCw size={9} /> Change
                            </span>
                        )}
                    </div>
                ))}
            </div>
        )
    }

    // ── Full vertical timeline
    return (
        <div className="w-full">
            {/* Route header bar */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
                {recommended && (
                    <span className="flex items-center gap-1 text-[10px] font-black bg-[#00873D] text-white px-2.5 py-1 rounded-full">
                        <Zap size={10} /> RECOMMENDED
                    </span>
                )}
                <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} /> {totalTimeMin} min
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Train size={12} /> {totalStops} stops
                </span>
                {transfers > 0 && (
                    <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
                        <RefreshCw size={10} /> {transfers} transfer{transfers > 1 ? 's' : ''}
                    </span>
                )}
                <span className="ml-auto font-black text-[#D7231A] text-base">{fareStr}</span>
            </div>

            {/* Timeline steps */}
            <div className="space-y-0">
                {segments.map((seg, i) => (
                    <div key={i}>
                        {/* Segment start station */}
                        <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full border-2 border-white shadow-md flex-shrink-0 mt-0.5"
                                    style={{ backgroundColor: seg.color }} />
                                <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: seg.color, minHeight: '2rem' }} />
                            </div>
                            <div className="pb-3 min-w-0">
                                <p className="font-black text-gray-900 text-sm leading-tight">{seg.from}</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                                    <span className="text-xs font-bold" style={{ color: seg.color }}>{seg.line}</span>
                                    <span className="text-xs text-gray-400">· {seg.stops} stops · {seg.durationMin} min</span>
                                </div>
                            </div>
                        </div>

                        {/* Interchange node (if next segment exists = transfer) */}
                        {i < segments.length - 1 && (
                            <div className="flex items-center gap-3 my-1">
                                <div className="flex flex-col items-center w-4">
                                    <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-400 flex items-center justify-center shadow-sm flex-shrink-0">
                                        <RefreshCw size={9} className="text-gray-500" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
                                    <span className="text-xs font-black text-amber-700">
                                        Change at {seg.to}
                                    </span>
                                    <ArrowRight size={11} className="text-amber-500" />
                                    <span className="text-xs font-bold" style={{ color: segments[i + 1].color }}>
                                        {segments[i + 1].line}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Final destination */}
                <div className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-white shadow-md flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: segments[segments.length - 1].color }} />
                    <p className="font-black text-gray-900 text-sm leading-tight mt-0.5">
                        {segments[segments.length - 1].to}
                    </p>
                </div>
            </div>

            {/* Select button */}
            {onSelect && (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(route)}
                    className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 bg-[#D7231A] text-white rounded-xl font-black text-sm hover:bg-red-700 transition-colors shadow-md shadow-red-400/20"
                >
                    Select This Route <ChevronRight size={16} />
                </motion.button>
            )}
        </div>
    )
}

export default React.memo(RouteTimeline)
