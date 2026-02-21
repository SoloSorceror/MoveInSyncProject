import { motion } from 'framer-motion'
import { QrCode, MapPin, Clock, ArrowRight, Download } from 'lucide-react'

export default function Dashboard() {
    return (
        <div className="pt-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">My Tickets</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your upcoming journeys and booking history.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">

                {/* Active Ticket Card */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 px-2">Active Journey</h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel p-6 md:p-8 rounded-[2rem] border-metro-primary/30 relative overflow-hidden shadow-xl"
                    >
                        <div className="absolute top-0 right-0 px-5 py-2 bg-gradient-to-r from-metro-primary to-blue-500 text-white rounded-bl-3xl font-semibold shadow-lg backdrop-blur-md">Active</div>
                        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-metro-primary/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mt-2">
                            {/* QR Code */}
                            <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex-shrink-0 relative group">
                                <QrCode size={140} className="text-slate-900 mix-blend-multiply" />
                                <div className="absolute inset-0 bg-black/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                    <button className="btn btn-circle bg-white hover:bg-gray-100 border-0 text-slate-900 shadow-xl"><Download size={20} /></button>
                                </div>
                            </div>

                            <div className="flex-1 space-y-6 w-full relative z-10">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold tracking-widest uppercase text-slate-400">One-way Ticket</span>
                                    <span className="font-bold text-metro-primary bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-sm">TKT-9482A</span>
                                </div>

                                <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-700/50 pb-6">
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-500 mb-1">Origin</p>
                                        <div className="flex items-center gap-2"><MapPin size={18} className="text-metro-primary" /> <span className="font-bold text-lg text-slate-800 dark:text-slate-200">Central Station</span></div>
                                    </div>
                                    <ArrowRight className="text-slate-300 dark:text-slate-600" />
                                    <div className="flex-1 text-right">
                                        <p className="text-sm text-slate-500 mb-1">Destination</p>
                                        <div className="flex items-center justify-end gap-2"><span className="font-bold text-lg text-slate-800 dark:text-slate-200">Airport Terminal</span> <MapPin size={18} className="text-blue-500" /></div>
                                    </div>
                                </div>

                                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                                    <span className="flex items-center gap-2 font-medium"><Clock size={18} className="text-metro-primary" /> Valid until 14:30 PM</span>
                                    <span className="font-bold text-slate-700 dark:text-slate-300">₹60.00</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Past Bookings */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 px-2 lg:mt-0 mt-8">Recent Bookings</h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel p-2 rounded-[2rem] border-slate-200 dark:border-slate-800 flex-1"
                    >
                        <div className="space-y-2 max-h-[400px] overflow-y-auto w-full p-2 custom-scrollbar">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                    <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-1">
                                            Downtown <ArrowRight size={14} className="text-slate-400" /> Tech Park
                                        </h4>
                                        <p className="text-sm text-slate-500 font-medium">Oct 24, 2023 • ₹40.00</p>
                                    </div>
                                    <div className="badge border-0 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-semibold px-3 py-3 rounded-xl shadow-sm">Completed</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    )
}
