/**
 * useRecentSearches — persists last 5 from→to station pairs in localStorage.
 * Usage: const { recents, addSearch, clearSearches } = useRecentSearches()
 */
import { useState, useCallback } from 'react'

const KEY = 'metrosync_recent_searches'
const MAX = 5

function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] }
    catch { return [] }
}

export function useRecentSearches() {
    const [recents, setRecents] = useState(load)

    const addSearch = useCallback((from, to) => {
        if (!from?.id || !to?.id || from.id === to.id) return
        setRecents(prev => {
            // Remove duplicate if same pair already exists
            const filtered = prev.filter(r => !(r.from.id === from.id && r.to.id === to.id))
            const next = [{ from, to, ts: Date.now() }, ...filtered].slice(0, MAX)
            localStorage.setItem(KEY, JSON.stringify(next))
            return next
        })
    }, [])

    const clearSearches = useCallback(() => {
        localStorage.removeItem(KEY)
        setRecents([])
    }, [])

    return { recents, addSearch, clearSearches }
}
