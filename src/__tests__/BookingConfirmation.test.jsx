import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BookingConfirmation from '@/pages/BookingConfirmation'

// Mock zustand store
vi.mock('@/store/uiStore', () => ({
    useUIStore: () => ({
        selectedRoute: {
            id: 'test-123',
            fareStr: '₹40',
            totalTimeMin: 35,
            segments: [
                { from: 'A', to: 'B', line: 'Blue Line', color: '#blue' }
            ]
        }
    })
}))

describe('BookingConfirmation Page', () => {
    it('renders the booking confirmation mock data', async () => {
        render(
            <MemoryRouter initialEntries={['/booking/test-123']}>
                <Routes>
                    <Route path="/booking/:id" element={<BookingConfirmation />} />
                </Routes>
            </MemoryRouter>
        )

        // Assert some static elements or expected mock texts (async for skeleton)
        expect(await screen.findByText('Booking Confirmed!')).toBeInTheDocument()
        expect(screen.getByText('Download Ticket')).toBeInTheDocument()
        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.getByText('B')).toBeInTheDocument()
    })
})
