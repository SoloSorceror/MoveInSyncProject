import { create } from 'zustand'

// Dark mode removed — light mode only
export const useUIStore = create((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
    setSidebarOpen: (val) => set({ isSidebarOpen: val }),
}))
