import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Home from '@/pages/Home'

// Mock zustand store
vi.mock('@/store/uiStore', () => ({
    useUIStore: () => ({
        searchOrigin: null,
        setSearchOrigin: vi.fn(),
        searchDest: null,
        setSearchDest: vi.fn(),
        setSelectedRoute: vi.fn()
    })
}))

// Mock useRecentSearches
vi.mock('@/hooks/useRecentSearches', () => ({
    useRecentSearches: () => ({
        recents: [],
        addSearch: vi.fn(),
        clearSearches: vi.fn()
    })
}))

// Mock ResizeObserver for framer-motion
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

describe('Home Page', () => {
    it('renders search form and stats', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        expect(screen.getByText(/Plan Your Journey/i)).toBeInTheDocument()
        expect(screen.getByText(/Show Route & Fare/i)).toBeInTheDocument()

        // Stats
        expect(screen.getByText('Network Length (km)')).toBeInTheDocument()
        expect(screen.getByText('Total Stations')).toBeInTheDocument()
    })
})
