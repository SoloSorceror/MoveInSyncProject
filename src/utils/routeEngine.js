/**
 * routeEngine.js — BFS-based metro route computation
 *
 * Input : fromStation, toStation (objects with { id, name, line })
 *         network (array of { id, name, color, stations: [stationName,...] })
 * Output: array of route objects sorted by recommendedness
 *
 * Each route:
 * {
 *   id, recommended, totalStops, totalTimeMin, transfers,
 *   segments: [{ line, color, from, to, stops, durationMin }],
 *   interchanges: [stationName, ...]
 * }
 */

const LINE_COLORS = {
    'Yellow Line': '#D97706',
    'Blue Line': '#2563EB',
    'Red Line': '#D7231A',
    'Magenta Line': '#C026D3',
    'Orange Line': '#EA580C',
    'Pink Line': '#EC4899',
    'Violet Line': '#7C3AED',
    'Green Line': '#16A34A',
    'Grey Line': '#64748B',
}

const AVG_MIN_PER_STOP = 2   // average 2 min per stop
const TRANSFER_PENALTY = 5   // 5 min penalty per interchange

/**
 * Build adjacency: station name → set of line IDs it belongs to
 */
function buildGraph(network) {
    // stationLines: { stationName → Set<lineId> }
    const stationLines = {}
    for (const line of network) {
        for (const stn of line.stations) {
            if (!stationLines[stn]) stationLines[stn] = new Set()
            stationLines[stn].add(line.id)
        }
    }

    // interchanges: stations on 2+ lines
    const interchanges = new Set(
        Object.entries(stationLines)
            .filter(([, lines]) => lines.size > 1)
            .map(([name]) => name)
    )

    return { stationLines, interchanges }
}

/**
 * BFS to find all routes between two station names across the network.
 * Returns at most 3 routes.
 */
function bfsRoutes(fromName, toName, network) {
    if (fromName === toName) return []

    const { stationLines, interchanges } = buildGraph(network)

    // Build line index: lineId → line object
    const lineMap = Object.fromEntries(network.map(l => [l.id, l]))

    // BFS state: { stn, lineId, path: [{stn, lineId}], transfers }
    const queue = []
    const found = []

    // Seed: start from fromName on each line it's on
    const startLines = stationLines[fromName] || new Set()
    for (const lineId of startLines) {
        queue.push({ stn: fromName, lineId, path: [{ stn: fromName, lineId }], transfers: 0 })
    }

    const visited = new Set()

    while (queue.length && found.length < 3) {
        const { stn, lineId, path, transfers } = queue.shift()

        const key = `${stn}:${lineId}`
        if (visited.has(key)) continue
        visited.add(key)

        if (stn === toName) {
            found.push({ path, transfers })
            continue
        }

        // Stop if too many transfers
        if (transfers >= 3) continue

        const line = lineMap[lineId]
        if (!line) continue

        const idx = line.stations.indexOf(stn)
        if (idx === -1) continue

        // Move along the same line (forward and backward)
        const neighbours = []
        if (idx > 0) neighbours.push(line.stations[idx - 1])
        if (idx < line.stations.length - 1) neighbours.push(line.stations[idx + 1])

        for (const nextStn of neighbours) {
            queue.push({
                stn: nextStn,
                lineId,
                path: [...path, { stn: nextStn, lineId }],
                transfers,
            })
        }

        // Transfer at interchange stations
        if (interchanges.has(stn)) {
            const otherLines = stationLines[stn] || new Set()
            for (const otherLine of otherLines) {
                if (otherLine !== lineId) {
                    queue.push({
                        stn,
                        lineId: otherLine,
                        path: [...path, { stn, lineId: otherLine }],
                        transfers: transfers + 1,
                    })
                }
            }
        }
    }

    return found
}

/**
 * Collapse a BFS path into segments (one segment = one contiguous line)
 */
function pathToSegments(path, lineMap) {
    if (path.length === 0) return []

    const segments = []
    let segStart = path[0].stn
    let curLine = path[0].lineId
    let stops = 0

    for (let i = 1; i < path.length; i++) {
        const { stn, lineId } = path[i]
        if (lineId !== curLine) {
            // Segment boundary
            segments.push({
                line: lineMap[curLine]?.name || curLine,
                color: LINE_COLORS[lineMap[curLine]?.name] || '#64748B',
                from: segStart,
                to: path[i - 1].stn,
                stops,
                durationMin: stops * AVG_MIN_PER_STOP,
            })
            segStart = path[i - 1].stn
            curLine = lineId
            stops = 0
        }
        stops++
    }

    // Last segment
    segments.push({
        line: lineMap[curLine]?.name || curLine,
        color: LINE_COLORS[lineMap[curLine]?.name] || '#64748B',
        from: segStart,
        to: path[path.length - 1].stn,
        stops,
        durationMin: stops * AVG_MIN_PER_STOP,
    })

    return segments
}

/**
 * Main export: compute top routes between two stations.
 *
 * @param {object} fromStation  - { id, name, line }
 * @param {object} toStation    - { id, name, line }
 * @param {array}  network      - array of line objects from INITIAL_NETWORK
 * @returns {array}             - sorted route objects
 */
export function computeRoutes(fromStation, toStation, network) {
    if (!fromStation || !toStation || fromStation.name === toStation.name) return []

    const lineMap = Object.fromEntries(network.map(l => [l.id, l]))
    const rawRoutes = bfsRoutes(fromStation.name, toStation.name, network)

    if (rawRoutes.length === 0) return []

    // Convert to rich route objects
    const routes = rawRoutes.map((raw, i) => {
        const segments = pathToSegments(raw.path, lineMap)
        const totalStops = segments.reduce((s, seg) => s + seg.stops, 0)
        const baseTime = segments.reduce((s, seg) => s + seg.durationMin, 0)
        const totalTimeMin = baseTime + raw.transfers * TRANSFER_PENALTY
        const fare = computeFare(totalStops)

        // Find interchange station names
        const interchanges = raw.path
            .filter((node, idx) => idx > 0 && node.lineId !== raw.path[idx - 1].lineId)
            .map(node => node.stn)

        return {
            id: `route-${i}`,
            recommended: i === 0,
            totalStops,
            totalTimeMin,
            transfers: raw.transfers,
            fare,
            fareStr: `₹${fare}`,
            segments,
            interchanges,
        }
    })

    // Sort: fewest transfers first, then shortest time
    routes.sort((a, b) => a.transfers - b.transfers || a.totalTimeMin - b.totalTimeMin)

    // Mark first sorted as recommended
    routes[0].recommended = true
    routes.slice(1).forEach(r => (r.recommended = false))

    return routes
}

/**
 * Simple fare model: ₹10 base + ₹2 per stop, capped at ₹60
 */
function computeFare(stops) {
    return Math.min(10 + stops * 2, 60)
}
