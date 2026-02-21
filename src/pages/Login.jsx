import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Train, Mail, Lock, Chrome, ShieldCheck, User } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Demo credentials hint per role
const ROLE_HINTS = {
    user: { email: 'user@metro.com', password: 'user123' },
    admin: { email: 'admin@metro.com', password: 'admin123' },
}

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuthStore()
    const [role, setRole] = useState('user') // 'user' | 'admin'

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const handleRoleSwitch = (newRole) => {
        setRole(newRole)
        // Autofill demo credentials for convenience
        setValue('email', ROLE_HINTS[newRole].email)
        setValue('password', ROLE_HINTS[newRole].password)
    }

    const onSubmit = async (data) => {
        await new Promise(res => setTimeout(res, 900)) // Mock API delay

        // Mock auth: accept any email/password, role is determined by selection
        login({
            name: role === 'admin' ? 'Admin User' : 'Passenger',
            email: data.email,
            role,
        })

        const redirectTo = location.state?.from || (role === 'admin' ? '/admin' : '/')
        navigate(redirectTo, { replace: true })
    }

    return (
        <div className="flex items-center justify-center min-h-[85vh] px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full max-w-md"
            >
                <div className="glass-panel p-8 md:p-10 rounded-[2rem] shadow-2xl border-white/40 dark:border-white/10 relative overflow-hidden bg-white/60 dark:bg-slate-900/60">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-metro-primary/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Logo */}
                    <div className="text-center mb-6">
                        <motion.div
                            animate={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="inline-flex p-3 bg-gradient-to-br from-metro-primary to-blue-600 rounded-2xl text-white shadow-lg mx-auto mb-4"
                        >
                            <Train size={28} />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Welcome Back</h2>
                        <p className="text-slate-500 dark:text-slate-400">Sign in to continue to MetroSync</p>
                    </div>

                    {/* Role Switcher */}
                    <div className="flex gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <button
                            type="button"
                            onClick={() => handleRoleSwitch('user')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all ${role === 'user'
                                    ? 'bg-white dark:bg-slate-700 text-metro-primary dark:text-blue-400 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                        >
                            <User size={16} />
                            Passenger
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRoleSwitch('admin')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all ${role === 'admin'
                                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                        >
                            <ShieldCheck size={16} />
                            Admin
                        </button>
                    </div>

                    {/* Role Hint Banner */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={role}
                            initial={{ opacity: 0, height: 0, y: -8 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`mb-4 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${role === 'admin'
                                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20'
                                    : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20'
                                }`}
                        >
                            {role === 'admin' ? <ShieldCheck size={14} /> : <User size={14} />}
                            Demo: <span className="font-mono">{ROLE_HINTS[role].email}</span> / <span className="font-mono">{ROLE_HINTS[role].password}</span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label select-none px-1">
                                <span className="label-text font-medium text-slate-700 dark:text-slate-300">Email Address</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    {...register('email')}
                                    placeholder="name@example.com"
                                    aria-label="Email address"
                                    className={`input input-bordered w-full pl-12 rounded-xl bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 focus:outline-none focus:border-metro-primary transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                                />
                            </div>
                            {errors.email && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-1.5 px-1 block">{errors.email.message}</motion.span>}
                        </div>

                        <div className="form-control">
                            <label className="label select-none px-1">
                                <span className="label-text font-medium text-slate-700 dark:text-slate-300">Password</span>
                                <Link to="#" className="label-text-alt text-metro-primary hover:underline font-medium">Forgot Password?</Link>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    {...register('password')}
                                    placeholder="••••••••"
                                    aria-label="Password"
                                    className={`input input-bordered w-full pl-12 rounded-xl bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 focus:outline-none focus:border-metro-primary transition-colors ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                                />
                            </div>
                            {errors.password && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-1.5 px-1 block">{errors.password.message}</motion.span>}
                        </div>

                        <button
                            disabled={isSubmitting}
                            className={`btn w-full rounded-xl text-base font-semibold border-0 mt-4 shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70 ${role === 'admin'
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30'
                                    : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 text-white shadow-slate-900/20'
                                }`}
                        >
                            {isSubmitting
                                ? <span className="loading loading-spinner" />
                                : `Sign in as ${role === 'admin' ? 'Admin' : 'Passenger'}`
                            }
                        </button>
                    </form>

                    <div className="divider text-slate-400 text-sm my-5 before:bg-slate-200 after:bg-slate-200 dark:before:bg-slate-700 dark:after:bg-slate-700">OR</div>

                    <button className="btn btn-outline w-full rounded-xl border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all font-medium flex items-center gap-2">
                        <Chrome size={18} className="text-slate-700 dark:text-slate-300" />
                        Continue with Google
                    </button>

                    <p className="text-center mt-6 text-sm text-slate-600 dark:text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-metro-primary font-semibold hover:underline transition-colors">Sign up</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
