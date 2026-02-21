import { create } from 'zustand'

export const useUIStore = create((set) => ({
    theme: 'light', // 'light' or 'dark'
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
    })),
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}))
