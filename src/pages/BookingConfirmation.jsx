import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import html2canvas from 'html2canvas'
import {
    CheckCircle2, Download, MapPin, ArrowRight, Train,
    Calendar, Users, TicketCheck, Printer, RotateCcw
} from 'lucide-react'

export default function BookingConfirmation() {
    const navigate = useNavigate()
    const location = useLocation()
    const [qrReady, setQrReady] = useState(false)

    // Parse state from Home.jsx
    const route = location.state?.route || {
        id: 'R-DEFAULT', from: { name: 'Rajiv Chowk', line: 'Yellow Line' }, to: { name: 'New Delhi', line: 'Yellow Line' }, fare: '₹40'
    }
    const passengers = location.state?.passengers || 1
    const fareNum = parseInt(route.fare.replace(/[^0-9]/g, ''), 10) || 40

    // Build dynamic ticket object
    const TICKET = {
        id: `MTS-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
        qrData: `METRO-SYNC-TKT-${route.id}-${passengers}`,
        from: route.from.name,
        to: route.to.name,
        line: route.from.line,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        passengers: passengers,
        type: 'Single Journey',
        fare: `₹${fareNum * passengers}`,
        status: 'Confirmed',
    }

    // Simulate async QR generation (1.5s)
    useEffect(() => {
        const t = setTimeout(() => setQrReady(true), 1500)
        return () => clearTimeout(t)
    }, [])

    const handleDownload = async () => {
        const ticketElement = document.getElementById('ticket-card')
        if (!ticketElement) return

        try {
            // Wait for QR code to be rendered fully
            if (!qrReady) return;

            const canvas = await html2canvas(ticketElement, { scale: 3, useCORS: true, backgroundColor: '#ffffff' })
            const image = canvas.toDataURL('image/png', 1.0)
            const link = document.createElement('a')
            link.download = `${TICKET.id}.png`
            link.href = image
            link.click()
        } catch (error) {
            console.error("Could not generate ticket image", error)
        }
    }

    return (
        <div className="min-h-[90vh] bg-gray-50 flex flex-col items-center justify-center py-12 px-4">

            {/* Success header */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1, damping: 15 }}
                    className="w-20 h-20 bg-[#00873D] rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-400/30 mb-4"
                >
                    <CheckCircle2 size={40} className="text-white" />
                </motion.div>
                <h1 className="text-2xl font-black text-[#003087] mb-1">Booking Confirmed!</h1>
                <p className="text-gray-500 text-sm font-medium">Your digital ticket is ready to use</p>
            </motion.div>

            {/* Ticket card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', damping: 20 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
            >
                {/* Tricolor strip */}
                <div className="h-1 flex">
                    <div className="flex-1 bg-[#D7231A]" />
                    <div className="flex-1 bg-white border-y border-gray-200" />
                    <div className="flex-1 bg-[#00873D]" />
                </div>

                {/* Navy header */}
                <div className="bg-[#003087] px-6 pt-5 pb-10 relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/5" />
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <TicketCheck size={15} className="text-blue-300" />
                            <span className="text-blue-200 font-bold text-xs tracking-wider uppercase">Digital Ticket</span>
                        </div>
                        <span className="bg-[#00873D] text-white text-[10px] font-black px-2.5 py-1 rounded-full">● {TICKET.status}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-0.5">From</p>
                            <p className="text-2xl font-black text-white">{TICKET.from}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[#D7231A] flex items-center justify-center flex-shrink-0">
                            <ArrowRight size={16} className="text-white" />
                        </div>
                        <div className="flex-1 text-right">
                            <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-0.5">To</p>
                            <p className="text-2xl font-black text-white">{TICKET.to}</p>
                        </div>
                    </div>
                </div>

                {/* Tear line */}
                <div className="relative flex items-center -mt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex-shrink-0 -ml-4 border-r border-dashed border-gray-300" />
                    <div className="flex-1 border-t-2 border-dashed border-gray-300" />
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex-shrink-0 -mr-4" />
                </div>

                {/* QR body */}
                <div id="ticket-card" className="px-6 pt-4 pb-6">
                    {/* QR Code — skeleton first, then fade in */}
                    <div className="flex justify-center mb-4">
                        <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 shadow-sm relative min-h-[180px] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {!qrReady ? (
                                    <motion.div key="skel" exit={{ opacity: 0 }}
                                        className="w-40 h-40 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"
                                    />
                                ) : (
                                    <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                        <QRCodeSVG value={TICKET.qrData} size={160} bgColor="#ffffff" fgColor="#003087" level="H" />
                                        <p className="text-center text-[10px] text-gray-400 mt-2 font-mono">{TICKET.id}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Detail grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        {[
                            { icon: Calendar, label: 'Date', value: TICKET.date },
                            { icon: Train, label: 'Departs', value: TICKET.time },
                            { icon: Users, label: 'Passengers', value: `${TICKET.passengers} Adult` },
                            { icon: TicketCheck, label: 'Type', value: TICKET.type },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                                    <Icon size={10} /> {label}
                                </p>
                                <p className="font-bold text-gray-800 text-sm">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Fare */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#FEF2F2] border border-red-100 rounded-xl mb-5">
                        <span className="font-bold text-gray-700 text-sm">Total Fare</span>
                        <span className="font-black text-[#D7231A] text-xl">{TICKET.fare}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleDownload}
                            className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 bg-gray-50 text-gray-800 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
                        >
                            <Printer size={15} /> Download Ticket
                        </button>
                        <Link to="/map" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#003087] text-white rounded-xl font-bold text-sm hover:bg-blue-900 transition-colors shadow-sm">
                            <MapPin size={15} /> Track Route
                        </Link>
                    </div>

                    {/* Book Another Journey */}
                    <button
                        onClick={() => navigate('/')}
                        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 border border-[#D7231A] text-[#D7231A] rounded-xl font-bold text-sm hover:bg-red-50 transition-colors"
                    >
                        <RotateCcw size={13} /> Book Another Journey
                    </button>
                </div>
            </motion.div>

            {/* Back link */}
            <Link to="/dashboard" className="mt-5 text-sm font-semibold text-[#003087] hover:text-[#D7231A] transition-colors flex items-center gap-2">
                ← Back to Dashboard
            </Link>
        </div>
    )
}
