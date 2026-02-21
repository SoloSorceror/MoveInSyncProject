import { useEffect } from 'react'
import AnimatedOutlet from '@/components/AnimatedOutlet'
import Navbar from '@/components/Navbar'
import { useUIStore } from '@/store/uiStore'

export default function MainLayout() {
    const { theme } = useUIStore()

    useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
            root.setAttribute('data-theme', 'dark')
        } else {
            root.classList.remove('dark')
            root.setAttribute('data-theme', 'corporate')
        }
    }, [theme])

    return (
        <div className="flex flex-col min-h-screen relative overflow-x-hidden">
            {/* Background Gradients for Premium Feel */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-metro-primary/10 to-transparent -z-10 dark:from-metro-primary/5 pointer-events-none" />

            <Navbar />
            <main className="flex-1 w-full pt-16 pb-20 md:pb-8">
                <AnimatedOutlet />
            </main>
        </div>
    )
}
