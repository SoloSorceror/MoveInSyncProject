import { Link } from 'react-router-dom'
import { Train, Phone, Map, Ticket, User, Shield, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

function IndianFlag({ size = 20 }) {
    const w = size * 1.5
    const h = size
    return (
        <svg width={w} height={h} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, flexShrink: 0 }}>
            <rect width="900" height="200" fill="#FF9933" />
            <rect y="200" width="900" height="200" fill="#FFFFFF" />
            <rect y="400" width="900" height="200" fill="#138808" />
            <circle cx="450" cy="300" r="85" fill="none" stroke="#000080" strokeWidth="9" />
            <circle cx="450" cy="300" r="14" fill="#000080" />
            {Array.from({ length: 24 }, (_, i) => {
                const angle = (i * 15 * Math.PI) / 180
                return <line key={i} x1={450 + 14 * Math.cos(angle)} y1={300 + 14 * Math.sin(angle)} x2={450 + 85 * Math.cos(angle)} y2={300 + 85 * Math.sin(angle)} stroke="#000080" strokeWidth="5" />
            })}
        </svg>
    )
}

const FOOTER_LINKS = [
    {
        heading: 'Services', links: [
            { label: 'Journey Planner', to: '/' },
            { label: 'Book Ticket', to: '/' },
            { label: 'Network Map', to: '/map' },
            { label: 'My Dashboard', to: '/dashboard' },
        ]
    },
    {
        heading: 'Metro Lines', links: [
            { label: 'Yellow Line', to: '/map' },
            { label: 'Blue Line', to: '/map' },
            { label: 'Red Line', to: '/map' },
            { label: 'Airport Express', to: '/map' },
        ]
    },
    {
        heading: 'Account', links: [
            { label: 'Sign In', to: '/login' },
            { label: 'Register', to: '/register' },
            { label: 'My Profile', to: '/profile' },
            { label: 'Help & Support', to: 'mailto:support@demo.moveinsync.in' },
        ]
    },
]

export default function Footer() {
    return (
        <footer className="bg-[#003087] text-white">
            {/* Tricolor strip */}
            <div className="flex h-1">
                <div className="flex-1 bg-[#D7231A]" />
                <div className="flex-1 bg-white/30" />
                <div className="flex-1 bg-[#00873D]" />
            </div>

            {/* Main footer content */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 mb-10">

                    {/* Brand column */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#D7231A] flex items-center justify-center shadow-md flex-shrink-0">
                                <Train size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="font-black text-white text-base">MoveIn<span className="text-yellow-300">Sync</span></p>
                                <p className="text-blue-200 text-[10px] font-bold tracking-wider">SMART TRANSIT</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 mb-4">
                            <IndianFlag size={22} />
                            <div>
                                <p className="text-white font-bold text-xs">भारत सरकार</p>
                                <p className="text-blue-200 text-[10px]">Government of India</p>
                            </div>
                        </div>

                        <p className="text-blue-200 text-xs leading-relaxed mb-5">
                            India's smart metro transit platform. Book tickets, plan journeys, and travel smarter across 9 lines and 256 stations.
                        </p>

                        {/* Helpline */}
                        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5 border border-white/10 mb-5">
                            <Phone size={15} className="text-blue-300 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] text-blue-300 font-semibold">24×7 Helpline</p>
                                <p className="text-white font-black text-sm">155370</p>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="flex gap-2">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#D7231A] flex items-center justify-center transition-colors border border-white/10">
                                    <Icon size={14} className="text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {FOOTER_LINKS.map(({ heading, links }) => (
                            <div key={heading}>
                                <h4 className="text-white font-black text-sm mb-4 uppercase tracking-wider">{heading}</h4>
                                <ul className="space-y-2.5">
                                    {links.map(link => (
                                        <li key={link.label}>
                                            {link.to.startsWith('mailto:') ? (
                                                <a href={link.to}
                                                    className="text-blue-200 text-sm font-medium hover:text-white hover:pl-1 transition-all duration-200 flex items-center gap-1.5 group">
                                                    <span className="w-1 h-1 rounded-full bg-[#D7231A] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <Link to={link.to}
                                                    className="text-blue-200 text-sm font-medium hover:text-white hover:pl-1 transition-all duration-200 flex items-center gap-1.5 group">
                                                    <span className="w-1 h-1 rounded-full bg-[#D7231A] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-blue-200 text-xs text-center sm:text-left">
                        © 2026 MoveInSync India. All rights reserved. A Government of India Initiative.
                    </p>
                    <div className="flex items-center gap-4">
                        {['Privacy Policy', 'Terms of Use', 'RTI'].map(t => (
                            <a key={t} href="#" className="text-blue-300 text-xs font-semibold hover:text-white transition-colors">{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
