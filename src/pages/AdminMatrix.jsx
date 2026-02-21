import { useState } from 'react'
import { motion } from 'framer-motion'
import { TRAIN_COMPATIBILITY_MATRIX, TRAIN_FLEETS, MATRIX_LINES } from '@/data/dummyData'
import { Info } from 'lucide-react'

const CELL_STYLES = {
    ok: { bg: '#F0FDF4', border: '#86EFAC', text: '#166534', label: '✓ Compatible' },
    warn: { bg: '#FFFBEB', border: '#FCD34D', text: '#92400E', label: '⚠ Restricted' },
    blocked: { bg: '#FEF2F2', border: '#FCA5A5', text: '#991B1B', label: '✗ Incompatible' },
}

export default function AdminMatrix() {
    const [tooltip, setTooltip] = useState(null) // { row, col, reason, status }

    return (
        <div className="min-h-[90vh] bg-gray-50">
            {/* Tricolor strip */}
            <div className="flex h-1">
                <div className="flex-1 bg-[#D7231A]" />
                <div className="flex-1 bg-white border-y border-gray-200" />
                <div className="flex-1 bg-[#00873D]" />
            </div>

            {/* Page header */}
            <div className="bg-[#003087] px-6 py-6">
                <h1 className="text-2xl font-black text-white">Fleet & Line Compatibility Matrix</h1>
                <p className="text-blue-200 text-sm mt-1">
                    Verify which train models can be safely deployed and routed on specific metro lines.
                </p>
            </div>

            <div className="p-6 max-w-full">
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mb-6">
                    {Object.entries(CELL_STYLES).map(([status, s]) => (
                        <div key={status} className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded border" style={{ backgroundColor: s.bg, borderColor: s.border }} />
                            <span className="text-xs font-bold" style={{ color: s.text }}>{s.label}</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
                        <Info size={13} /> Hover any cell to see details
                    </div>
                </div>

                {/* Matrix grid */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-auto">
                    <table className="w-full border-collapse text-sm" style={{ minWidth: '520px' }}>
                        <thead>
                            <tr>
                                <th className="sticky left-0 z-20 bg-[#003087] text-white font-black text-xs px-4 py-3 text-left border-r border-blue-700 whitespace-nowrap">
                                    Train Fleet ↓ / Metro Line →
                                </th>
                                {MATRIX_LINES.map(line => (
                                    <th key={line} className="bg-[#003087] text-white font-bold text-xs px-4 py-3 text-center min-w-[110px] border-r border-blue-700 last:border-r-0">
                                        {line}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TRAIN_FLEETS.map((train, ri) => (
                                <tr key={train} className="border-b border-gray-100 last:border-b-0">
                                    {/* Sticky row header */}
                                    <td className="sticky left-0 z-10 bg-gray-50 border-r border-gray-200 px-4 py-3 font-black text-gray-800 text-xs whitespace-nowrap">
                                        {train}
                                    </td>
                                    {TRAIN_COMPATIBILITY_MATRIX[ri].map((cell, ci) => {
                                        const style = CELL_STYLES[cell.status]
                                        const isHovered = tooltip?.row === ri && tooltip?.col === ci
                                        return (
                                            <td key={ci}
                                                className="px-3 py-2.5 text-center border-r border-gray-100 last:border-r-0 relative cursor-pointer transition-all"
                                                style={{ backgroundColor: isHovered ? style.border : style.bg }}
                                                onMouseEnter={() => setTooltip({ row: ri, col: ci, reason: cell.reason, status: cell.status })}
                                                onMouseLeave={() => setTooltip(null)}
                                                tabIndex={0}
                                                onFocus={() => setTooltip({ row: ri, col: ci, reason: cell.reason, status: cell.status })}
                                                onBlur={() => setTooltip(null)}
                                            >
                                                <span className="font-bold text-xs whitespace-nowrap" style={{ color: style.text }}>
                                                    {style.label}
                                                </span>

                                                {/* Tooltip */}
                                                {isHovered && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -4, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-xs rounded-xl px-3 py-2.5 shadow-xl text-left pointer-events-none"
                                                    >
                                                        <p className="font-bold mb-1" style={{ color: style.border }}>
                                                            {TRAIN_FLEETS[ri]} → {MATRIX_LINES[ci]}
                                                        </p>
                                                        <p className="text-gray-300 leading-relaxed">{cell.reason}</p>
                                                        {/* Arrow */}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
                                                    </motion.div>
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Info note */}
                <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
                    <Info size={12} />
                    This matrix cross-references physical track gauge, power collection systems (OHE vs Third Rail), and signaling automation limits. Green = Compatible, Amber = Restricted, Red = Incompatible.
                </p>
            </div>
        </div>
    )
}
