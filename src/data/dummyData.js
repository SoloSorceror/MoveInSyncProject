export const DUMMY_STATIONS = [
    { id: 'S1', name: 'Rajiv Chowk', line: 'Yellow Line', isInterchange: true },
    { id: 'S2', name: 'New Delhi', line: 'Yellow Line', isInterchange: true },
    { id: 'S3', name: 'Kashmere Gate', line: 'Red Line', isInterchange: true },
    { id: 'S4', name: 'HUDA City Centre', line: 'Yellow Line', isInterchange: false },
    { id: 'S5', name: 'Botanical Garden', line: 'Magenta Line', isInterchange: true },
    { id: 'S6', name: 'Janakpuri West', line: 'Magenta Line', isInterchange: true },
    { id: 'S7', name: 'Welcome', line: 'Red Line', isInterchange: true },
    { id: 'S8', name: 'Indraprastha', line: 'Blue Line', isInterchange: false },
    { id: 'S9', name: 'Dwarka Sector 21', line: 'Blue Line', isInterchange: true },
    { id: 'S10', name: 'Airport (T3)', line: 'Orange Line', isInterchange: false },
    { id: 'S11', name: 'Lajpat Nagar', line: 'Pink Line', isInterchange: true },
    { id: 'S12', name: 'Hauz Khas', line: 'Yellow Line', isInterchange: true },
    { id: 'S13', name: 'Noida Sector 15', line: 'Blue Line', isInterchange: false },
    { id: 'S14', name: 'Gurugram Sector 54', line: 'Rapid Metro', isInterchange: false },
    { id: 'S15', name: 'Kalkaji Mandir', line: 'Violet Line', isInterchange: true },
    { id: 'S16', name: 'Yamuna Bank', line: 'Blue Line', isInterchange: true },
    { id: 'S17', name: 'Majlis Park', line: 'Pink Line', isInterchange: false },
    { id: 'S18', name: 'Delhi Aerocity', line: 'Orange Line', isInterchange: false },
    { id: 'S19', name: 'Chawri Bazar', line: 'Yellow Line', isInterchange: false },
    { id: 'S20', name: 'Chandni Chowk', line: 'Yellow Line', isInterchange: false }
];

export const DUMMY_ROUTES = [
    {
        id: 'R1',
        type: 'Fastest',
        duration: '25 min',
        stops: 8,
        price: '$4.50',
        segments: [
            { line: 'Yellow Line', color: 'bg-yellow-500', from: 'Central', to: 'Downtown', stops: 3 },
            { line: 'Orange Line', color: 'bg-orange-500', from: 'Downtown', to: 'Airport', stops: 5 }
        ]
    },
    {
        id: 'R2',
        type: 'Direct',
        duration: '35 min',
        stops: 12,
        price: '$3.50',
        segments: [
            { line: 'Blue Line', color: 'bg-blue-500', from: 'Central', to: 'Airport', stops: 12 }
        ]
    }
];

export const DUMMY_TICKET = {
    id: 'TKT-8923-4411',
    from: 'Central',
    to: 'Airport',
    date: new Date().toLocaleDateString(),
    passengers: 1,
    type: 'Single Journey',
    status: 'Active',
    qrData: 'metro-ticket-valid-8923-4411'
};
