import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,       // { name, email, role: 'admin' | 'user' }
            isAuthenticated: false,

            login: (userData) => set({
                user: userData,
                isAuthenticated: true,
            }),

            logout: () => set({
                user: null,
                isAuthenticated: false,
            }),

            isAdmin: () => get().user?.role === 'admin',
        }),
        {
            name: 'metro-auth-storage',
        }
    )
)
