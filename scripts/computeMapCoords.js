const fs = require('fs');

const INITIAL_NETWORK = [
    {
        id: 'yellow', name: 'Yellow Line',
        stations: ['Samaypur Badli', 'Jahangirpuri',
            'Azadpur', 'Vishwa Vidyalaya',
            'Kashmere Gate', 'Chandni Chowk',
            'Chawri Bazar', 'New Delhi', 'Rajiv Chowk', 'Patel Chowk',
            'Central Secretariat', 'INA', 'AIIMS', 'Green Park', 'Hauz Khas',
            'Malviya Nagar', 'Saket', 'Qutab Minar', 'Chhatarpur',
            'MG Road', 'HUDA City Centre']
    },
    {
        id: 'blue', name: 'Blue Line',
        stations: ['Dwarka Sector 21', 'Dwarka Sector 12',
            'Dwarka', 'Uttam Nagar West', 'Janakpuri West',
            'Rajouri Garden', 'Kirti Nagar', 'Shadipur',
            'Rajendra Place', 'Karol Bagh', 'RK Ashram Marg',
            'Rajiv Chowk', 'Barakhamba Road', 'Mandi House',
            'Yamuna Bank', 'Akshardham', 'Mayur Vihar Phase 1',
            'New Ashok Nagar', 'Noida Sector 16', 'Botanical Garden']
    },
    {
        id: 'red', name: 'Red Line',
        stations: ['Rithala', 'Rohini West', 'Netaji Subhash Place',
            'Keshav Puram', 'Inderlok', 'Shastri Nagar',
            'Kashmere Gate', 'Shastri Park',
            'Welcome', 'Shahdara', 'Dilshad Garden', 'Shaheed Nagar']
    },
    {
        id: 'magenta', name: 'Magenta Line',
        stations: ['Janakpuri West', 'Dabri Mor', 'Dashrath Puri', 'Palam',
            'Terminal 1 IGI Airport', 'Vasant Vihar', 'Munirka', 'IIT Delhi', 'Hauz Khas',
            'Panchsheel Park', 'Greater Kailash',
            'Kalkaji Mandir', 'Jamia Millia Islamia', 'Kalindi Kunj',
            'Botanical Garden']
    },
    {
        id: 'orange', name: 'Orange Line',
        stations: ['New Delhi', 'Shivaji Stadium', 'Dhaula Kuan',
            'Delhi Aerocity', 'Airport (T3)', 'Dwarka Sector 21']
    },
];

// Pre-assigned interchange coordinates (anchor points) (Expanded for 1800x1200)
const interchanges = {
    'Kashmere Gate': { x: 900, y: 300 },
    'Rajiv Chowk': { x: 900, y: 600 },
    'New Delhi': { x: 900, y: 675 },
    'Hauz Khas': { x: 900, y: 850 },
    'Janakpuri West': { x: 300, y: 600 },
    'Dwarka Sector 21': { x: 150, y: 600 },
    'Botanical Garden': { x: 1400, y: 600 },
    'Airport (T3)': { x: 200, y: 1000 },
    'Mandi House': { x: 980, y: 600 }
};

const stationCoords = { ...interchanges };

// Helper to evenly space points between two anchors
function unrollLineBetween(stations, startName, endName, startPos, endPos) {
    const startIndex = stations.indexOf(startName);
    const endIndex = stations.indexOf(endName);

    if (startIndex === -1 || endIndex === -1) return;

    const count = Math.abs(endIndex - startIndex);
    const stepX = (endPos.x - startPos.x) / count;
    const stepY = (endPos.y - startPos.y) / count;

    const dir = startIndex < endIndex ? 1 : -1;

    for (let i = 1; i < count; i++) {
        const stationName = stations[startIndex + (i * dir)];
        if (!stationCoords[stationName]) {
            stationCoords[stationName] = {
                x: Math.round(startPos.x + (stepX * i)),
                y: Math.round(startPos.y + (stepY * i))
            };
        }
    }
}

// ── 1. Yellow Line (N-S straight line, x=900)
// Anchor: Kashmere Gate (y=300) -> Rajiv Chowk (y=600)
unrollLineBetween(INITIAL_NETWORK[0].stations, 'Kashmere Gate', 'Rajiv Chowk', interchanges['Kashmere Gate'], interchanges['Rajiv Chowk']);
// Rajiv Chowk (y=600) -> New Delhi (y=675)
unrollLineBetween(INITIAL_NETWORK[0].stations, 'Rajiv Chowk', 'New Delhi', interchanges['Rajiv Chowk'], interchanges['New Delhi']);
// New Delhi (y=675) -> Hauz Khas (y=850)
unrollLineBetween(INITIAL_NETWORK[0].stations, 'New Delhi', 'Hauz Khas', interchanges['New Delhi'], interchanges['Hauz Khas']);
// Samaypur Badli (Start) to Kashmere Gate
stationCoords['Samaypur Badli'] = { x: 900, y: 100 };
unrollLineBetween(INITIAL_NETWORK[0].stations, 'Samaypur Badli', 'Kashmere Gate', stationCoords['Samaypur Badli'], interchanges['Kashmere Gate']);
// Hauz Khas to HUDA City Centre (End)
stationCoords['HUDA City Centre'] = { x: 900, y: 1100 };
unrollLineBetween(INITIAL_NETWORK[0].stations, 'Hauz Khas', 'HUDA City Centre', interchanges['Hauz Khas'], stationCoords['HUDA City Centre']);

// ── 2. Blue Line (W-E straight line, mostly y=600)
unrollLineBetween(INITIAL_NETWORK[1].stations, 'Dwarka Sector 21', 'Janakpuri West', interchanges['Dwarka Sector 21'], interchanges['Janakpuri West']);
unrollLineBetween(INITIAL_NETWORK[1].stations, 'Janakpuri West', 'Rajiv Chowk', interchanges['Janakpuri West'], interchanges['Rajiv Chowk']);
unrollLineBetween(INITIAL_NETWORK[1].stations, 'Rajiv Chowk', 'Botanical Garden', interchanges['Rajiv Chowk'], interchanges['Botanical Garden']);

// ── 3. Red Line (NW-NE, meets at Kashmere Gate y=300)
stationCoords['Rithala'] = { x: 300, y: 200 };
unrollLineBetween(INITIAL_NETWORK[2].stations, 'Rithala', 'Kashmere Gate', stationCoords['Rithala'], interchanges['Kashmere Gate']);
stationCoords['Shaheed Nagar'] = { x: 1500, y: 150 };
unrollLineBetween(INITIAL_NETWORK[2].stations, 'Kashmere Gate', 'Shaheed Nagar', interchanges['Kashmere Gate'], stationCoords['Shaheed Nagar']);

// ── 4. Magenta Line
// Janakpuri West (x=300, y=600) -> Hauz Khas (x=900, y=850)
stationCoords['Terminal 1 IGI Airport'] = { x: 500, y: 900 };
unrollLineBetween(INITIAL_NETWORK[3].stations, 'Janakpuri West', 'Terminal 1 IGI Airport', interchanges['Janakpuri West'], stationCoords['Terminal 1 IGI Airport']);
unrollLineBetween(INITIAL_NETWORK[3].stations, 'Terminal 1 IGI Airport', 'Hauz Khas', stationCoords['Terminal 1 IGI Airport'], interchanges['Hauz Khas']);
// Hauz Khas (x=900, y=850) -> Botanical Garden (x=1400, y=600)
unrollLineBetween(INITIAL_NETWORK[3].stations, 'Hauz Khas', 'Botanical Garden', interchanges['Hauz Khas'], interchanges['Botanical Garden']);

// ── 5. Orange Line (New Delhi to Dwarka Sec 21)
// New Delhi (x=900, y=675) -> Airport T3 (x=200, y=1000)
unrollLineBetween(INITIAL_NETWORK[4].stations, 'New Delhi', 'Airport (T3)', interchanges['New Delhi'], interchanges['Airport (T3)']);
// Airport T3 (x=200, y=1000) -> Dwarka Sec 21 (x=150, y=600)
unrollLineBetween(INITIAL_NETWORK[4].stations, 'Airport (T3)', 'Dwarka Sector 21', interchanges['Airport (T3)'], interchanges['Dwarka Sector 21']);

console.log(JSON.stringify(stationCoords, null, 2));
