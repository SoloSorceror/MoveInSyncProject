import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Train, Mail, Lock, User, Chrome } from 'lucide-react'

// Zod Schema
const registerSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function Register() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data) => {
        // Mock API call
        console.log("Register data", data)
        await new Promise(res => setTimeout(res, 1000))
    }

    return (
        <div className="flex items-center justify-center min-h-[85vh] py-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="glass-panel p-8 md:p-10 rounded-[2rem] shadow-2xl border-white/40 dark:border-white/10 relative overflow-hidden bg-white/60 dark:bg-slate-900/60">

                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-gradient-to-br from-metro-primary to-blue-600 rounded-2xl text-white shadow-lg mx-auto mb-4">
                            <Train size={28} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h2>
                        <p className="text-slate-500 dark:text-slate-400">Join MetroSync for seamless journeys</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label select-none px-1"><span className="label-text font-medium text-slate-700 dark:text-slate-300">Full Name</span></label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    {...register('fullName')}
                                    placeholder="John Doe"
                                    className={`input input-bordered w-full pl-12 rounded-xl bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 focus:outline-none focus:border-metro-primary transition-colors ${errors.fullName ? 'border-red-500 focus:border-red-500' : ''}`}
                                />
                            </div>
                            {errors.fullName && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-1.5 px-1 block">{errors.fullName.message}</motion.span>}
                        </div>

                        <div className="form-control">
                            <label className="label select-none px-1"><span className="label-text font-medium text-slate-700 dark:text-slate-300">Email Address</span></label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    {...register('email')}
                                    placeholder="name@example.com"
                                    className={`input input-bordered w-full pl-12 rounded-xl bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 focus:outline-none focus:border-metro-primary transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                                />
                            </div>
                            {errors.email && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-1.5 px-1 block">{errors.email.message}</motion.span>}
                        </div>

                        <div className="form-control">
                            <label className="label select-none px-1">
                                <span className="label-text font-medium text-slate-700 dark:text-slate-300">Password</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    {...register('password')}
                                    placeholder="••••••••"
                                    className={`input input-bordered w-full pl-12 rounded-xl bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 focus:outline-none focus:border-metro-primary transition-colors ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2 px-1">Must be at least 6 characters long.</p>
                            {errors.password && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-1.5 px-1 block">{errors.password.message}</motion.span>}
                        </div>

                        <button disabled={isSubmitting} className="btn bg-metro-primary hover:bg-blue-600 border-0 text-white w-full rounded-xl text-base font-semibold mt-6 shadow-lg shadow-metro-primary/30 transition-transform active:scale-[0.98] disabled:opacity-70">
                            {isSubmitting ? <span className="loading loading-spinner"></span> : 'Create Account'}
                        </button>
                    </form>

                    <div className="divider text-slate-400 text-sm my-6 before:bg-slate-200 after:bg-slate-200 dark:before:bg-slate-700 dark:after:bg-slate-700">OR REGISTER WITH</div>

                    <button className="btn btn-outline w-full rounded-xl border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all font-medium flex items-center gap-2">
                        <Chrome size={18} className="text-slate-700 dark:text-slate-300" />
                        Sign up with Google
                    </button>

                    <p className="text-center mt-8 text-sm text-slate-600 dark:text-slate-400">
                        Already have an account? <Link to="/login" className="text-metro-primary font-semibold hover:underline transition-colors">Sign in</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
