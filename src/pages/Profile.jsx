import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import {
    User, Mail, Phone, Shield, Train, Edit3, Save,
    TicketCheck, TrendingUp, Wallet, MapPin, LogOut
} from 'lucide-react'

const TRIP_HISTORY = [
    { from: 'Rajiv Chowk', to: 'New Delhi', date: '21 Feb 2026', fare: '₹40' },
    { from: 'Hauz Khas', to: 'Rajiv Chowk', date: '20 Feb 2026', fare: '₹35' },
    { from: 'Dwarka Sec 21', to: 'Kashmere Gate', date: '19 Feb 2026', fare: '₹60' },
]

export default function Profile() {
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(user?.name || 'Passenger')
    const [phone, setPhone] = useState('+91 98765 43210')

    const handleLogout = () => { logout(); navigate('/login') }

    return (
        <div className="min-h-[90vh] bg-gray-50 pb-12">

            {/* Tricolor strip */}
            <div className="flex h-1">
                <div className="flex-1 bg-[#D7231A]" />
                <div className="flex-1 bg-white border-y border-gray-200" />
                <div className="flex-1 bg-[#00873D]" />
            </div>

            {/* Profile header banner */}
            <div className="bg-[#003087] px-4 sm:px-6 lg:px-8 pb-20 pt-8">
                <div className="max-w-4xl mx-auto flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full bg-[#D7231A] flex items-center justify-center text-white text-3xl font-black shadow-xl flex-shrink-0">
                        {(user?.name || 'P').charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white">{user?.name || 'Passenger'}</h1>
                        <p className="text-blue-200 text-sm">{user?.email}</p>
                        <span className="inline-block mt-1.5 text-[10px] font-black px-2.5 py-1 rounded-full bg-[#00873D] text-white uppercase tracking-wider">
                            {user?.role === 'admin' ? '🛡 Administrator' : '🎫 Passenger'}
                        </span>
                    </div>
                    <button onClick={() => setEditing(e => !e)}
                        className="ml-auto flex items-center gap-2 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors">
                        <Edit3 size={14} /> {editing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 space-y-5">

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Total Trips', value: '48', icon: Train, color: '#D7231A', bg: '#FEF2F2' },
                        { label: 'Wallet Balance', value: '₹1,240', icon: Wallet, color: '#003087', bg: '#EFF6FF' },
                        { label: 'Km Travelled', value: '284', icon: TrendingUp, color: '#00873D', bg: '#F0FDF4' },
                    ].map(({ label, value, icon: Icon, color, bg }) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                                <Icon size={18} style={{ color }} />
                            </div>
                            <div>
                                <p className="text-xl font-black text-gray-900">{value}</p>
                                <p className="text-xs text-gray-500 font-semibold">{label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
                    {/* Personal Info card */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                            <User size={16} className="text-[#D7231A]" />
                            <h2 className="font-black text-gray-800 text-sm">Personal Information</h2>
                        </div>
                        <div className="p-5 space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                                {editing ? (
                                    <input value={name} onChange={e => setName(e.target.value)}
                                        className="w-full px-3 py-2.5 border border-[#003087] rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
                                ) : (
                                    <p className="font-bold text-gray-800">{name}</p>
                                )}
                            </div>
                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-gray-400 flex-shrink-0" />
                                    <p className="font-semibold text-gray-700 text-sm">{user?.email || 'user@metro.com'}</p>
                                </div>
                            </div>
                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Mobile Number</label>
                                {editing ? (
                                    <input value={phone} onChange={e => setPhone(e.target.value)}
                                        className="w-full px-3 py-2.5 border border-[#003087] rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-gray-400 flex-shrink-0" />
                                        <p className="font-semibold text-gray-700 text-sm">{phone}</p>
                                    </div>
                                )}
                            </div>
                            {/* Role badge */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Account Type</label>
                                <div className="flex items-center gap-2">
                                    <Shield size={14} className="text-[#003087] flex-shrink-0" />
                                    <span className="font-bold text-[#003087] text-sm capitalize">{user?.role || 'Passenger'}</span>
                                </div>
                            </div>

                            {editing && (
                                <button onClick={() => setEditing(false)}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#003087] text-white rounded-xl font-bold text-sm hover:bg-blue-900 transition-colors">
                                    <Save size={14} /> Save Changes
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Right column */}
                    <div className="space-y-5">
                        {/* Recent trips mini */}
                        <motion.div
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                        >
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                                <TicketCheck size={15} className="text-[#D7231A]" />
                                <h3 className="font-black text-gray-800 text-sm">Recent Trips</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {TRIP_HISTORY.map((t, i) => (
                                    <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                                        <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                                            <MapPin size={13} className="text-[#D7231A]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-gray-800 truncate">{t.from} → {t.to}</p>
                                            <p className="text-[10px] text-gray-400">{t.date}</p>
                                        </div>
                                        <span className="font-black text-[#D7231A] text-sm flex-shrink-0">{t.fare}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* MoveInSync Pass widget */}
                        <motion.div
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#003087] rounded-2xl p-5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 flex">
                                <div className="flex-1 bg-[#D7231A]" />
                                <div className="flex-1 bg-white/20" />
                                <div className="flex-1 bg-[#00873D]" />
                            </div>
                            <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/5" />
                            <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1 pt-1">MoveInSync Pass</p>
                            <p className="text-3xl font-black text-white mb-0.5">₹1,240</p>
                            <p className="text-blue-200 text-xs mb-4">Available Balance</p>
                            <button className="w-full py-2.5 bg-[#D7231A] text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">
                                Top Up Now
                            </button>
                        </motion.div>

                        {/* Sign out */}
                        <button onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 py-3 border border-red-200 bg-red-50 text-[#D7231A] rounded-2xl font-bold text-sm hover:bg-red-100 transition-colors">
                            <LogOut size={15} /> Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
