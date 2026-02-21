import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Train, Mail, Lock, User, ArrowRight, Chrome, Phone } from 'lucide-react'

const schema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Enter a valid phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

const FIELDS = [
    { name: 'fullName', icon: User, type: 'text', label: 'Full Name', placeholder: 'John Doe' },
    { name: 'email', icon: Mail, type: 'email', label: 'Email Address', placeholder: 'name@example.com' },
    { name: 'phone', icon: Phone, type: 'tel', label: 'Mobile Number', placeholder: '+91 98765 43210' },
    { name: 'password', icon: Lock, type: 'password', label: 'Password', placeholder: '••••••••' },
]

export default function Register() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data) => {
        console.log('Register', data)
        await new Promise(r => setTimeout(r, 800))
        navigate('/login')
    }

    return (
        <div className="min-h-[88vh] flex items-center justify-center bg-gray-50 px-4 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row"
            >
                {/* ── Left decorative panel */}
                <div className="hidden md:flex md:w-[38%] flex-col bg-[#003087] p-10 relative overflow-hidden">
                    {/* Tricolor strip */}
                    <div className="flex h-1.5 rounded-full overflow-hidden mb-8">
                        <div className="flex-1 bg-[#D7231A]" />
                        <div className="flex-1 bg-white/40" />
                        <div className="flex-1 bg-[#00873D]" />
                    </div>

                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-12 rounded-full bg-[#D7231A] flex items-center justify-center shadow-lg">
                            <Train size={22} className="text-white" />
                        </div>
                        <div>
                            <p className="font-black text-white text-lg">Metro<span className="text-[#D7231A]">Sync</span></p>
                            <p className="text-blue-200 text-xs font-semibold tracking-wider">SMART TRANSIT</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-3xl font-black text-white leading-tight mb-4">
                            Join the<br />
                            <span className="text-yellow-300">Smart Commuters</span>
                        </h2>
                        <p className="text-blue-200 text-sm leading-relaxed mb-8">
                            Get your digital metro pass, book tickets in seconds, and travel smarter across the network.
                        </p>

                        <div className="space-y-3">
                            {[
                                { icon: '✅', text: 'Free passenger account' },
                                { icon: '⚡', text: 'Book tickets in under 30 seconds' },
                                { icon: '🔒', text: 'Secure & encrypted data' },
                            ].map(({ icon, text }) => (
                                <div key={text} className="flex items-center gap-3">
                                    <span className="text-base">{icon}</span>
                                    <span className="text-blue-100 text-sm font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-8 border-t border-white/10">
                        {[['256', 'Stations'], ['9', 'Lines'], ['6.2M', 'Daily Rides']].map(([v, l]) => (
                            <div key={l} className="text-center">
                                <p className="font-black text-white text-lg">{v}</p>
                                <p className="text-blue-200 text-[10px] font-semibold">{l}</p>
                            </div>
                        ))}
                    </div>

                    <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-white/5" />
                </div>

                {/* ── Right panel: Form */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex h-1 mb-6 md:hidden">
                        <div className="flex-1 bg-[#D7231A]" />
                        <div className="flex-1 bg-gray-200" />
                        <div className="flex-1 bg-[#00873D]" />
                    </div>

                    <h1 className="text-2xl font-black text-[#003087] mb-1">Create Account</h1>
                    <p className="text-gray-500 text-sm mb-6">Join MetroSync for seamless daily travel</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {FIELDS.map(({ name, icon: Icon, type, label, placeholder }) => (
                                <div key={name} className={name === 'password' ? 'sm:col-span-2' : ''}>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>
                                    <div className="relative">
                                        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type={type} {...register(name)} placeholder={placeholder}
                                            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-gray-800 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:border-[#003087] focus:ring-[#003087]/20 transition-all focus:bg-white ${errors[name] ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : 'border-gray-200'}`} />
                                    </div>
                                    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
                                </div>
                            ))}
                        </div>

                        <p className="text-[11px] text-gray-400 leading-relaxed">
                            By creating an account you agree to our <a href="#" className="text-[#003087] font-semibold underline">Terms of Service</a> and <a href="#" className="text-[#003087] font-semibold underline">Privacy Policy</a>.
                        </p>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#D7231A] text-white rounded-xl font-black text-sm hover:bg-red-700 shadow-md shadow-red-300/40 transition-all disabled:opacity-60">
                            {isSubmitting
                                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating…</>
                                : <><ArrowRight size={16} /> Create Passenger Account</>
                            }
                        </motion.button>
                    </form>

                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 font-semibold">OR</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        <Chrome size={16} className="text-gray-500" /> Sign up with Google
                    </button>

                    <p className="text-center mt-5 text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-[#D7231A]">Sign in</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
