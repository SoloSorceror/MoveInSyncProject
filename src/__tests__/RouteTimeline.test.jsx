import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RouteTimeline from '@/components/RouteTimeline'

const mockRoute = {
    totalStops: 5,
    totalTimeMin: 10,
    transfers: 1,
    fareStr: '₹30',
    recommended: true,
    segments: [
        { line: 'Yellow Line', from: 'A', to: 'B', stops: 2, durationMin: 4, color: '#D97706' },
        { line: 'Blue Line', from: 'B', to: 'C', stops: 3, durationMin: 6, color: '#2563EB' }
    ],
    interchanges: ['B']
}

describe('RouteTimeline Component', () => {
    it('renders route details correctly in full mode', () => {
        render(<RouteTimeline route={mockRoute} />)
        expect(screen.getByText(/10 min/i)).toBeInTheDocument()
        expect(screen.getByText(/5 stops/i)).toBeInTheDocument()
        expect(screen.getByText('Change at B')).toBeInTheDocument()
        expect(screen.getByText('RECOMMENDED')).toBeInTheDocument()
    })

    it('renders correctly in compact mode', () => {
        render(<RouteTimeline route={mockRoute} compact={true} />)
        expect(screen.getByText('Yellow Line')).toBeInTheDocument()
        expect(screen.getByText('(2 stops)')).toBeInTheDocument()
        expect(screen.getByText('Blue Line')).toBeInTheDocument()
        expect(screen.getByText('(3 stops)')).toBeInTheDocument()
    })
})
