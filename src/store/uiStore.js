import { create } from 'zustand'

export const useUIStore = create((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
    setSidebarOpen: (val) => set({ isSidebarOpen: val }),

    // Home page search fields (so Map can set them)
    searchOrigin: null,
    setSearchOrigin: (station) => set({ searchOrigin: station }),

    searchDest: null,
    setSearchDest: (station) => set({ searchDest: station }),

    // Selected route — stored so NetworkMap can highlight the journey
    selectedRoute: null,
    setSelectedRoute: (route) => set({ selectedRoute: route }),
    clearSelectedRoute: () => set({ selectedRoute: null }),
}))
