import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Lock, Train, User, ShieldCheck, ArrowRight, Chrome } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

const ROLE_CONFIG = {
    passenger: {
        label: 'Passenger',
        icon: User,
        demo: 'user@metro.com / user123',
        buttonColor: 'bg-[#D7231A] hover:bg-red-700 shadow-red-300/40',
        accentColor: '#D7231A',
    },
    admin: {
        label: 'Administrator',
        icon: ShieldCheck,
        demo: 'admin@metro.com / admin123',
        buttonColor: 'bg-[#003087] hover:bg-blue-900 shadow-blue-300/40',
        accentColor: '#003087',
    },
}

export default function Login() {
    const [role, setRole] = useState('passenger')
    const navigate = useNavigate()
    const { login } = useAuthStore()
    const cfg = ROLE_CONFIG[role]

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data) => {
        await new Promise(r => setTimeout(r, 800))
        login({ name: role === 'admin' ? 'Admin User' : 'Passenger', email: data.email, role })
        navigate(role === 'admin' ? '/admin' : '/dashboard')
    }

    return (
        <div className="min-h-[88vh] flex items-center justify-center bg-gray-50 px-4 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row"
            >
                {/* ── Left Panel  */}
                <div className="hidden md:flex md:w-[42%] flex-col bg-[#003087] p-10 relative overflow-hidden">
                    {/* Tricolor strip at top */}
                    <div className="flex h-1.5 rounded-full overflow-hidden mb-8">
                        <div className="flex-1 bg-[#D7231A]" />
                        <div className="flex-1 bg-white/40" />
                        <div className="flex-1 bg-[#00873D]" />
                    </div>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-full bg-[#D7231A] flex items-center justify-center shadow-lg">
                            <Train size={22} className="text-white" />
                        </div>
                        <div>
                            <p className="font-black text-white text-lg">MoveIn<span className="text-yellow-300">Sync</span></p>
                            <p className="text-blue-200 text-xs font-semibold tracking-wider">SMART TRANSIT</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-3xl font-black text-white leading-tight mb-4">
                            India's Smartest<br />
                            <span className="text-yellow-300">Metro Platform</span>
                        </h2>
                        <p className="text-blue-200 text-sm leading-relaxed mb-8">
                            Book tickets, track routes, and manage your commute — all in one place.
                        </p>

                        <div className="space-y-3">
                            {[
                                { icon: '🎫', text: 'Instant digital ticket booking' },
                                { icon: '🗺️', text: 'Live route & network map' },
                                { icon: '📱', text: 'QR code boarding passes' },
                            ].map(({ icon, text }) => (
                                <div key={text} className="flex items-center gap-3">
                                    <span className="text-lg">{icon}</span>
                                    <span className="text-blue-100 text-sm font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-white/5" />
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                </div>

                {/* ── Right Panel: Form */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                    {/* Tricolor strip (mobile only) */}
                    <div className="flex h-1 mb-6 md:hidden">
                        <div className="flex-1 bg-[#D7231A]" />
                        <div className="flex-1 bg-gray-200" />
                        <div className="flex-1 bg-[#00873D]" />
                    </div>

                    <h1 className="text-2xl font-black text-[#003087] mb-1">Welcome Back</h1>
                    <p className="text-gray-500 text-sm mb-6">Sign in to continue to MoveInSync</p>

                    {/* Role Toggle */}
                    <div className="flex bg-gray-100 rounded-xl p-1 mb-6 gap-1">
                        {Object.entries(ROLE_CONFIG).map(([key, { label, icon: Icon }]) => (
                            <button key={key} onClick={() => setRole(key)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${role === key
                                    ? key === 'admin'
                                        ? 'bg-[#003087] text-white shadow-sm'
                                        : 'bg-[#D7231A] text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}>
                                <Icon size={15} /> {label}
                            </button>
                        ))}
                    </div>

                    {/* Demo hint */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-5">
                        <User size={12} />
                        <span>Demo: <span className="font-mono font-semibold text-gray-700">{cfg.demo}</span></span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="email" {...register('email')}
                                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-gray-800 bg-gray-50 text-sm focus:outline-none focus:ring-2 transition-all focus:bg-white ${errors.email
                                        ? 'border-red-400 focus:ring-red-200'
                                        : role === 'admin'
                                            ? 'border-gray-200 focus:border-[#003087] focus:ring-[#003087]/20'
                                            : 'border-gray-200 focus:border-[#D7231A] focus:ring-[#D7231A]/20'
                                        }`} />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
                                <a href="#" className="text-xs font-semibold" style={{ color: cfg.accentColor }}>Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="password" {...register('password')}
                                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-gray-800 bg-gray-50 text-sm focus:outline-none focus:ring-2 transition-all focus:bg-white ${errors.password
                                        ? 'border-red-400 focus:ring-red-200'
                                        : role === 'admin'
                                            ? 'border-gray-200 focus:border-[#003087] focus:ring-[#003087]/20'
                                            : 'border-gray-200 focus:border-[#D7231A] focus:ring-[#D7231A]/20'
                                        }`} />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-black text-sm shadow-md transition-all disabled:opacity-60 ${cfg.buttonColor}`}>
                            {isSubmitting
                                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in…</>
                                : <><ArrowRight size={16} /> Sign in as {cfg.label}</>
                            }
                        </motion.button>
                    </form>

                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 font-semibold">OR</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        <Chrome size={16} className="text-gray-500" /> Continue with Google
                    </button>

                    <p className="text-center mt-5 text-sm text-gray-500">
                        New passenger?{' '}
                        <Link to="/register" className="font-bold" style={{ color: cfg.accentColor }}>Create account</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
