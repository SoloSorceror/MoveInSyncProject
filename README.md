# MetroSync - Next-Gen Metro Booking Platform

MetroSync is a modern, responsive, and accessible interactive web application designed to simulate a futuristic metro network booking system.

## 🚀 Features
- **Smart Station Search:** Autocomplete with recent searches and interchange indicators.
- **Dynamic Route Engine:** Computes fastest and recommended paths across a multi-line graph using BFS.
- **Interactive Network Map:** SVG-based map with pan/zoom, path highlighting, and pulsing interchanges.
- **Digital Tickets:** Generates downloadable QR-code boarding passes.
- **Admin Dashboard:** Manage metro lines (drag-and-drop), bulk import stations via CSV, and view version compatibility matrices.

## 🛠 Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 + Framer Motion for animations
- **State Management:** Zustand (global UI/auth state)
- **Icons & UI:** Lucide React, Radix UI primitives
- **Testing:** Vitest + React Testing Library

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/MetroSync.git
   ```
2. Navigate to the directory:
   ```bash
   cd MetroSync
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

## 🏗 Architecture & Folder Structure

```text
src/
├── assets/         # Images, global CSS
├── components/     # Reusable UI (Button, Input, Skeleton, ErrorBoundary)
├── data/           # dummyData.js (Centralized mock data)
├── layouts/        # MainLayout (passenger), AdminLayout
├── hooks/          # Custom hooks (useRecentSearches)
├── store/          # Zustand stores (uiStore.js, authStore.js)
├── utils/          # Core logic (routeEngine.js)
├── pages/          # Route-level components (Home, Dashboard, AdminLines)
└── __tests__/      # Vitest unit tests
```

### State Management Rationale
We chose **Zustand** over Redux or Context API because:
1. **Minimal Boilerplate:** Direct hook access without massive providers.
2. **Performance:** Subscribing to specific state slices prevents unnecessary re-renders.
3. **Ease of integration:** Cleanly shares state between disconnected components (e.g., Map clicking pre-filling Home search).

## 🔌 API Swap Guide (Moving to Production)
Currently, MetroSync uses mock data from `src/data/dummyData.js`. To switch to a real backend API:

1. **Replace Zustand mock actions:**
   In `src/store/authStore.js`, change the `login` function to make a real `fetch` or `axios` call to your `/api/auth` endpoint.
2. **Create Data Hooks:**
   Fetch `INITIAL_NETWORK`, `KPI_STATS`, and `COMPATIBILITY_MATRIX` dynamically in a root level `useEffect` or via React Query caching.
3. **Route Engine Update:**
   If your backend computes routes via Dijkstra/A* (recommended for large networks), replace the client-side `src/utils/routeEngine.js` with an API call `fetch('/api/routes?from=X&to=Y')`.

## 🌐 Deployment (Vercel)
Deploying to Vercel is seamless since the project uses Vite.

1. Push your repo to GitHub.
2. Go to [Vercel](https://vercel.com/) and create a "New Project".
3. Import your GitHub repository.
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. Click **Deploy**.

## 🧪 Testing
Run the unit test suite:
```bash
npm run test
```

## ♿ Accessibility Notes
- Semantic HTML and ARIA roles applied.
- Keyboard navigable dropdowns.
- Tested against WCAG 2.1 AA contrast requirements.
