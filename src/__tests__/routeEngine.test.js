import { describe, it, expect } from 'vitest'
import { computeRoutes } from '@/utils/routeEngine'
import { INITIAL_NETWORK, DUMMY_STATIONS } from '@/data/dummyData'

describe('Route Engine (BFS)', () => {
    it('returns empty array if start and end are same', () => {
        const routes = computeRoutes(DUMMY_STATIONS[0], DUMMY_STATIONS[0], INITIAL_NETWORK)
        expect(routes).toEqual([])
    })

    it('computes direct route on the same line', () => {
        const from = DUMMY_STATIONS.find(s => s.name === 'Rajiv Chowk')
        const to = DUMMY_STATIONS.find(s => s.name === 'Kashmere Gate')

        const routes = computeRoutes(from, to, INITIAL_NETWORK)
        expect(routes.length).toBeGreaterThan(0)

        const recommended = routes[0]
        expect(recommended.transfers).toBe(0)
        expect(recommended.segments.length).toBe(1)
        expect(recommended.segments[0].line).toBe('Yellow Line')
    })

    it('computes route with interchange', () => {
        const from = DUMMY_STATIONS.find(s => s.name === 'Janakpuri West') // Blue
        const to = DUMMY_STATIONS.find(s => s.name === 'Samaypur Badli')   // Yellow

        const routes = computeRoutes(from, to, INITIAL_NETWORK)
        expect(routes.length).toBeGreaterThan(0)

        const recommended = routes[0]
        expect(recommended.transfers).toBe(1)
        expect(recommended.segments.length).toBe(2)
        expect(recommended.interchanges).toContain('Rajiv Chowk')
    })

    it('returns empty array if no route is possible', () => {
        const isolatedNetwork = [...INITIAL_NETWORK, { id: 'test', name: 'Test Line', stations: ['Isolated 1', 'Isolated 2'] }]
        const from = { name: 'Isolated 1' }
        const to = DUMMY_STATIONS.find(s => s.name === 'Rajiv Chowk')

        const routes = computeRoutes(from, to, isolatedNetwork)
        expect(routes).toEqual([])
    })
})
