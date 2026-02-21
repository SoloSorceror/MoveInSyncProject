import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle2, Download, ArrowRight, MapPin } from 'lucide-react';
import { DUMMY_TICKET } from '@/data/dummyData';

export default function BookingConfirmation() {
    const { id } = useParams();

    // Using dummy ticket for demonstration
    const ticket = DUMMY_TICKET;

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="w-full max-w-md glass-panel bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700 relative"
            >
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-green-500 to-emerald-600 -z-10" />

                <div className="p-8 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl mb-4"
                    >
                        <CheckCircle2 size={48} className="text-emerald-500" />
                    </motion.div>

                    <h2 className="text-2xl font-black text-white mb-1">Booking Confirmed!</h2>
                    <p className="text-emerald-50 font-medium mb-8">Ticket ID: {ticket.id}</p>

                    <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 mb-6 shadow-inner border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-left">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Origin</p>
                                <p className="text-xl font-black text-slate-800 dark:text-white">{ticket.from}</p>
                            </div>
                            <ArrowRight className="text-slate-300 dark:text-slate-600" />
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Destination</p>
                                <p className="text-xl font-black text-slate-800 dark:text-white">{ticket.to}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl flex justify-center mb-4">
                            <QRCodeSVG
                                value={ticket.qrData}
                                size={160}
                                bgColor={"#ffffff"}
                                fgColor={"#0f172a"}
                                level={"H"}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-left border-t border-slate-200 dark:border-slate-700 pt-4">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</p>
                                <p className="font-semibold text-slate-800 dark:text-slate-200">{ticket.date}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passengers</p>
                                <p className="font-semibold text-slate-800 dark:text-slate-200">{ticket.passengers} Adult</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex gap-3">
                        <button className="flex-1 btn bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white border-0 rounded-xl font-bold gap-2">
                            <Download size={18} /> Save
                        </button>
                        <Link to="/map" className="flex-1 btn btn-primary border-0 rounded-xl font-bold shadow-lg shadow-blue-500/30 gap-2">
                            <MapPin size={18} /> Track
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
