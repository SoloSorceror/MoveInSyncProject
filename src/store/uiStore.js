import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUIStore = create(
    persist(
        (set) => ({
            theme: 'light',
            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            })),
            isSidebarOpen: false,
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            setSidebarOpen: (val) => set({ isSidebarOpen: val }),
        }),
        {
            name: 'metro-ui-storage',
            partialize: (state) => ({ theme: state.theme }), // only persist theme
        }
    )
)

