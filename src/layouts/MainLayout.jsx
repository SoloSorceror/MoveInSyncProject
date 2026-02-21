import AnimatedOutlet from '@/components/AnimatedOutlet'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-gray-50">
            <Navbar />
            <main className="flex-1 w-full pt-24">
                <AnimatedOutlet />
            </main>
            <Footer />
        </div>
    )
}
