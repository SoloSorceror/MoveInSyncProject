export const INITIAL_NETWORK = [
    {
        id: 'yellow', name: 'Yellow Line', color: 'bg-yellow-400',
        stations: ['Samaypur Badli', 'Jahangirpuri',
            'Azadpur', 'Vishwa Vidyalaya',
            'Kashmere Gate', 'Chandni Chowk',
            'Chawri Bazar', 'New Delhi', 'Rajiv Chowk', 'Patel Chowk',
            'Central Secretariat', 'INA', 'AIIMS', 'Green Park', 'Hauz Khas',
            'Malviya Nagar', 'Saket', 'Qutab Minar', 'Chhatarpur',
            'MG Road', 'HUDA City Centre']
    },
    {
        id: 'blue', name: 'Blue Line', color: 'bg-blue-500',
        stations: ['Dwarka Sector 21', 'Dwarka Sector 12',
            'Dwarka', 'Uttam Nagar West', 'Janakpuri West',
            'Rajouri Garden', 'Kirti Nagar', 'Shadipur',
            'Rajendra Place', 'Karol Bagh', 'RK Ashram Marg',
            'Rajiv Chowk', 'Barakhamba Road', 'Mandi House',
            'Yamuna Bank', 'Akshardham', 'Mayur Vihar Phase 1',
            'New Ashok Nagar', 'Noida Sector 16', 'Botanical Garden']
    },
    {
        id: 'red', name: 'Red Line', color: 'bg-red-500',
        stations: ['Rithala', 'Rohini West', 'Netaji Subhash Place',
            'Keshav Puram', 'Inderlok', 'Shastri Nagar',
            'Kashmere Gate', 'Shastri Park',
            'Welcome', 'Shahdara', 'Dilshad Garden', 'Shaheed Nagar']
    },
    {
        id: 'magenta', name: 'Magenta Line', color: 'bg-purple-500',
        stations: ['Janakpuri West', 'Dabri Mor', 'Dashrath Puri', 'Palam',
            'Terminal 1 IGI Airport', 'Vasant Vihar', 'Munirka', 'IIT Delhi', 'Hauz Khas',
            'Panchsheel Park', 'Greater Kailash',
            'Kalkaji Mandir', 'Jamia Millia Islamia', 'Kalindi Kunj',
            'Botanical Garden']
    },
    {
        id: 'orange', name: 'Orange Line', color: 'bg-orange-500',
        stations: ['New Delhi', 'Shivaji Stadium', 'Dhaula Kuan',
            'Delhi Aerocity', 'Airport (T3)', 'Dwarka Sector 21']
    },
]

export const STATION_COORDINATES = {
    "Kashmere Gate": { x: 900, y: 300 },
    "Rajiv Chowk": { x: 900, y: 600 },
    "New Delhi": { x: 900, y: 675 },
    "Hauz Khas": { x: 900, y: 850 },
    "Janakpuri West": { x: 300, y: 600 },
    "Dwarka Sector 21": { x: 150, y: 600 },
    "Botanical Garden": { x: 1400, y: 600 },
    "Airport (T3)": { x: 200, y: 1000 },
    "Mandi House": { x: 980, y: 600 },
    "Chandni Chowk": { x: 900, y: 375 },
    "Chawri Bazar": { x: 900, y: 450 },
    "Patel Chowk": { x: 900, y: 725 },
    "Central Secretariat": { x: 900, y: 750 },
    "INA": { x: 900, y: 775 },
    "AIIMS": { x: 900, y: 800 },
    "Green Park": { x: 900, y: 825 },
    "Samaypur Badli": { x: 900, y: 100 },
    "Jahangirpuri": { x: 900, y: 150 },
    "Azadpur": { x: 900, y: 200 },
    "Vishwa Vidyalaya": { x: 900, y: 250 },
    "HUDA City Centre": { x: 900, y: 1100 },
    "Malviya Nagar": { x: 900, y: 892 },
    "Saket": { x: 900, y: 933 },
    "Qutab Minar": { x: 900, y: 975 },
    "Chhatarpur": { x: 900, y: 1017 },
    "MG Road": { x: 900, y: 1058 },
    "Dwarka Sector 12": { x: 188, y: 600 },
    "Dwarka": { x: 225, y: 600 },
    "Uttam Nagar West": { x: 263, y: 600 },
    "Rajouri Garden": { x: 386, y: 600 },
    "Kirti Nagar": { x: 471, y: 600 },
    "Shadipur": { x: 557, y: 600 },
    "Rajendra Place": { x: 643, y: 600 },
    "Karol Bagh": { x: 729, y: 600 },
    "RK Ashram Marg": { x: 814, y: 600 },
    "Barakhamba Road": { x: 963, y: 600 },
    "Yamuna Bank": { x: 1088, y: 600 },
    "Akshardham": { x: 1150, y: 600 },
    "Mayur Vihar Phase 1": { x: 1213, y: 600 },
    "New Ashok Nagar": { x: 1275, y: 600 },
    "Noida Sector 16": { x: 1338, y: 600 },
    "Rithala": { x: 300, y: 200 },
    "Rohini West": { x: 400, y: 217 },
    "Netaji Subhash Place": { x: 500, y: 233 },
    "Keshav Puram": { x: 600, y: 250 },
    "Inderlok": { x: 700, y: 267 },
    "Shastri Nagar": { x: 800, y: 283 },
    "Shaheed Nagar": { x: 1500, y: 150 },
    "Shastri Park": { x: 1020, y: 270 },
    "Welcome": { x: 1140, y: 240 },
    "Shahdara": { x: 1260, y: 210 },
    "Dilshad Garden": { x: 1380, y: 180 },
    "Terminal 1 IGI Airport": { x: 500, y: 900 },
    "Dabri Mor": { x: 350, y: 675 },
    "Dashrath Puri": { x: 400, y: 750 },
    "Palam": { x: 450, y: 825 },
    "Vasant Vihar": { x: 600, y: 888 },
    "Munirka": { x: 700, y: 875 },
    "IIT Delhi": { x: 800, y: 863 },
    "Panchsheel Park": { x: 983, y: 808 },
    "Greater Kailash": { x: 1067, y: 767 },
    "Kalkaji Mandir": { x: 1150, y: 725 },
    "Jamia Millia Islamia": { x: 1233, y: 683 },
    "Kalindi Kunj": { x: 1317, y: 642 },
    "Shivaji Stadium": { x: 725, y: 756 },
    "Dhaula Kuan": { x: 550, y: 838 },
    "Delhi Aerocity": { x: 375, y: 919 }
};

export const DUMMY_STATIONS = INITIAL_NETWORK.flatMap(line =>
    line.stations.map((name, i) => ({
        id: `S-${line.id}-${i}`,
        name,
        line: line.name,
        isInterchange: INITIAL_NETWORK.filter(l => l.stations.includes(name)).length > 1
    }))
).filter((station, index, self) =>
    index === self.findIndex(s => s.name === station.name)
);


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

/* ── Admin Demo Data ────────────────────────────────────────────── */

export const ADMIN_KPI = [
    { label: 'Total Passengers Today', value: '6,218,430', change: '+4.2%', up: true, iconKey: 'users' },
    { label: 'Tickets Issued Today', value: '1,284,921', change: '+2.8%', up: true, iconKey: 'ticket' },
    { label: 'Active Metro Lines', value: '9 / 9', change: '100%', up: true, iconKey: 'train' },
    { label: 'Avg Journey Time', value: '24 min', change: '-1.3 min', up: true, iconKey: 'clock' },
];

export const ADMIN_RECENT_BOOKINGS = [
    { id: 'MTS-7834', from: 'Rajiv Chowk', to: 'New Delhi', fare: '₹40', time: '09:45 AM', status: 'Active' },
    { id: 'MTS-7833', from: 'Hauz Khas', to: 'Botanical Garden', fare: '₹60', time: '09:32 AM', status: 'Active' },
    { id: 'MTS-7832', from: 'Dwarka Sec 21', to: 'Kashmere Gate', fare: '₹55', time: '09:18 AM', status: 'Completed' },
    { id: 'MTS-7831', from: 'Airport (T3)', to: 'New Delhi', fare: '₹60', time: '09:10 AM', status: 'Completed' },
    { id: 'MTS-7830', from: 'Noida Electronic City', to: 'Rajiv Chowk', fare: '₹45', time: '09:01 AM', status: 'Completed' },
];

export const ADMIN_LINE_STATUS = [
    { line: 'Yellow Line', color: '#D97706', stations: 37, status: 'Operational', freq: '3 min' },
    { line: 'Blue Line', color: '#2563EB', stations: 50, status: 'Operational', freq: '4 min' },
    { line: 'Red Line', color: '#D7231A', stations: 29, status: 'Minor Delay', freq: '6 min' },
    { line: 'Magenta Line', color: '#C026D3', stations: 25, status: 'Operational', freq: '5 min' },
    { line: 'Orange Line', color: '#EA580C', stations: 6, status: 'Operational', freq: '15 min' },
];

export const ADMIN_TOP_BAR_STATS = [
    { label: 'Active Tickets', value: '1,284', colorHex: '#D7231A', bgHex: '#FEF2F2' },
    { label: 'Passengers Today', value: '6.2M', colorHex: '#003087', bgHex: '#EFF6FF' },
    { label: 'Lines Running', value: '9/9', colorHex: '#00873D', bgHex: '#F0FDF4' },
];

export const ADMIN_QUICK_ACTIONS = [
    { label: 'View All Passengers', to: '/admin/users', color: '#D7231A', bg: '#FEF2F2' },
    { label: 'Manage Network Lines', to: '/admin/lines', color: '#003087', bg: '#EFF6FF' },
    { label: 'Bulk Import Data', to: '/admin/import', color: '#00873D', bg: '#F0FDF4' },
    { label: 'View Network Map', to: '/map', color: '#7C3AED', bg: '#F5F3FF' },
];

export const PASSENGER_STATS = [
    { label: 'Total Trips', value: '48', iconKey: 'train', colorHex: '#D7231A', bgHex: '#FEF2F2' },
    { label: 'Amount Spent', value: '₹2,340', iconKey: 'wallet', colorHex: '#003087', bgHex: '#EFF6FF' },
    { label: 'Km Travelled', value: '284', iconKey: 'trend', colorHex: '#00873D', bgHex: '#F0FDF4' },
];

export const PASSENGER_BOOKING_HISTORY = [
    { id: 'MTS-20240220-4321', from: 'Hauz Khas', to: 'Rajiv Chowk', date: 'Feb 20', fare: '₹35', status: 'Completed' },
    { id: 'MTS-20240219-3310', from: 'Dwarka Sec 21', to: 'Kashmere Gate', date: 'Feb 19', fare: '₹60', status: 'Completed' },
    { id: 'MTS-20240217-2198', from: 'New Delhi', to: 'Botanical Garden', date: 'Feb 17', fare: '₹55', status: 'Completed' },
];

export const ACTIVE_TICKET_DATA = {
    id: 'MTS-20240221-7834',
    qrData: 'METRO-SYNC-TKT-7834-RAJIV-NEWDELHI',
    from: 'Rajiv Chowk',
    to: 'New Delhi',
    line: 'Yellow Line',
    date: '21 Feb 2026',
    time: '09:45 AM',
    passengers: 2,
    status: 'Active',
    fare: '₹40',
};

/* ── Admin: Compatibility Matrix ───────────────────────────────────── */
export const TRAIN_FLEETS = [
    'Bombardier Movia',
    'Alstom Metropolis',
    'Hyundai Rotem',
    'BEML RS-1',
    'CAF Beas'
];

export const MATRIX_LINES = [
    'Yellow Line', 'Blue Line', 'Red Line', 'Magenta Line', 'Orange Line', 'Rapid Metro'
];

export const TRAIN_COMPATIBILITY_MATRIX = [
    // Bombardier Movia
    [
        { status: 'ok', reason: 'Fully compatible standard gauge.' },
        { status: 'ok', reason: 'Fully compatible standard gauge.' },
        { status: 'blocked', reason: 'Red Line uses broad gauge.' },
        { status: 'ok', reason: 'Compatible with signaling.' },
        { status: 'warn', reason: 'Requires software patch for ATO.' },
        { status: 'blocked', reason: 'Rapid Metro track radius too tight.' },
    ],
    // Alstom Metropolis
    [
        { status: 'ok', reason: 'Native fleet for this line.' },
        { status: 'warn', reason: 'Platform length restriction (6-coach max).' },
        { status: 'blocked', reason: 'Red Line uses broad gauge.' },
        { status: 'ok', reason: 'CBTC signaling compatible.' },
        { status: 'ok', reason: 'High-speed certified.' },
        { status: 'blocked', reason: 'Incompatible power collection.' },
    ],
    // Hyundai Rotem
    [
        { status: 'blocked', reason: 'Broad gauge train on standard gauge track.' },
        { status: 'blocked', reason: 'Broad gauge train on standard gauge track.' },
        { status: 'ok', reason: 'Native broad gauge fleet.' },
        { status: 'blocked', reason: 'Broad gauge train on standard gauge track.' },
        { status: 'blocked', reason: 'Broad gauge train on standard gauge track.' },
        { status: 'blocked', reason: 'Incompatible track gauge.' },
    ],
    // BEML RS-1
    [
        { status: 'blocked', reason: 'Broad gauge train.' },
        { status: 'blocked', reason: 'Broad gauge train.' },
        { status: 'ok', reason: 'Fully compatible with legacy signaling.' },
        { status: 'blocked', reason: 'Broad gauge train.' },
        { status: 'blocked', reason: 'Broad gauge train.' },
        { status: 'blocked', reason: 'Incompatible track gauge.' },
    ],
    // CAF Beas
    [
        { status: 'blocked', reason: 'Requires third-rail power.' },
        { status: 'blocked', reason: 'Requires third-rail power.' },
        { status: 'blocked', reason: 'Broad gauge track.' },
        { status: 'blocked', reason: 'Requires third-rail power.' },
        { status: 'ok', reason: 'Airport Express native fleet.' },
        { status: 'ok', reason: 'Standard gauge, compatible power.' },
    ]
];
