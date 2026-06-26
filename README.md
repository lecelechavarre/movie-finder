# Movie Finder - Production-Ready React Application

A professional-grade movie discovery web application consuming the TMDB (The Movie Database) API. Built with React, Vite, Tailwind CSS, and modern best practices.

## 🎬 Features

- **Search & Browse**: Real-time movie search with debounced input
- **Movie Collections**: Trending, popular, top-rated, and upcoming movies
- **Movie Details**: Comprehensive movie information with cast, crew, trailers, and recommendations
- **Favorites**: Save and manage favorite movies with localStorage persistence
- **Infinite Scrolling**: Load more results seamlessly with Intersection Observer
- **Responsive Design**: Mobile-first approach optimized for all device sizes
- **Modern UI**: Netflix-inspired glassmorphism design with smooth animations
- **Performance**: Optimized components with React.memo, lazy loading, and efficient rendering

## 📋 Tech Stack

**Core**
- React 18 with React Hooks
- Vite (modern bundler)
- React Router v6 (routing)
- Tailwind CSS (utility-first styling)
- Axios (HTTP client)

**Features**
- Framer Motion (animations)
- React Icons (icon library)
- React Infinite Scroll Component
- Context API (state management)
- Local Storage (data persistence)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- TMDB API key (free at https://www.themoviedb.org/settings/api)

### Installation

1. **Clone or navigate to project directory**
```bash
cd c:\xampp\htdocs\movie-finder
```

2. **Configure API key**
Edit `.env` file and add your TMDB API key:
```env
VITE_TMDB_API_KEY=your_actual_api_key_here
```

3. **Install dependencies** (already done)
```bash
npm install
```

4. **Start development server**
```bash
npm run dev
```

The app will start at `http://localhost:5173/`

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm preview
```

## 📁 Project Structure

```
src/
├── api/
│   └── tmdb.js              # Axios TMDB client
├── assets/
│   └── poster-placeholder.svg
├── components/
│   ├── Navbar/
│   ├── Footer/
│   ├── SearchBar/
│   ├── MovieCard/
│   ├── MovieGrid/
│   ├── FavoriteButton/
│   ├── RatingBadge/
│   ├── GenreTag/
│   ├── BackButton/
│   ├── Loader/
│   ├── ErrorMessage/
│   ├── Pagination/
│   └── Toast/
├── context/
│   └── FavoritesContext.jsx # Favorites state with localStorage
├── hooks/
│   ├── useFetch.js          # Data fetching with cleanup
│   ├── useInfiniteScroll.js # Intersection Observer for infinite scroll
│   └── useDebounce.js       # Debounced search input
├── layouts/
│   └── MainLayout.jsx       # Main content wrapper
├── pages/
│   ├── Home/                # Hero + trending/popular/top-rated/upcoming
│   ├── Search/              # Search with sort and infinite scroll
│   ├── MovieDetails/        # Full movie information
│   ├── Favorites/           # Saved movies with search and sort
│   └── NotFound/            # 404 page
├── services/
│   └── movieService.js      # Centralized TMDB API functions
├── styles/
│   ├── theme.js
│   └── index.css            # Tailwind + custom styles
├── utils/
│   ├── formatDate.js
│   ├── imageHelper.js
│   └── ratingColor.js
├── App.jsx
└── main.jsx
```

## 🎨 Design System

**Color Palette**
- Background: `#0F172A` (slate-950)
- Surface: `#1E293B` (slate-900)
- Primary: `#E50914` (Netflix red)
- Accent: `#FACC15` (amber)
- Text: `#F8FAFC` (slate-100)

**Typography**
- Modern system font stack
- Responsive font sizes
- Consistent tracking and line heights

## 🔧 Key Features Implementation

### 1. **Search with Debounce**
- Debounced input prevents excessive API calls
- Real-time results with loading states
- Sort by popularity, release date, and rating

### 2. **Infinite Scrolling**
- Uses Intersection Observer API
- 220px rootMargin for early trigger
- Auto-loading on scroll

### 3. **Favorites Management**
- Context API for state management
- localStorage for persistence
- Toast notifications on actions
- Prevent duplicate additions

### 4. **Movie Details Page**
- Comprehensive information display
- Cast and crew information
- Trailer embeds from YouTube
- Screenshots gallery
- Recommendations and similar movies

### 5. **Responsive Design**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Landscape and portrait support

## 📝 API Endpoints Used

```
GET /trending/movie/day
GET /movie/popular
GET /movie/top_rated
GET /movie/upcoming
GET /search/movie
GET /movie/{movie_id}
GET /movie/{movie_id}/credits
GET /movie/{movie_id}/videos
GET /movie/{movie_id}/recommendations
GET /movie/{movie_id}/similar
GET /movie/{movie_id}/images
```

## 🌐 Deployment

### Vercel (Recommended - Zero Config)

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Deploy
```bash
vercel
```

3. Set environment variable in Vercel Dashboard:
   - Add `VITE_TMDB_API_KEY` to environment variables

### Other Platforms

The build output is in `dist/` directory. Deploy as a static site with:
```bash
npm run build
```

## ⚡ Performance Optimizations

- **Code Splitting**: Lazy-loaded routes with React.lazy
- **Image Optimization**: Uses TMDB's optimized image URLs
- **Memoization**: Prevents unnecessary re-renders
- **Debouncing**: Reduces API calls
- **Asset Caching**: Browser caching via Vite
- **Bundle Size**: Optimized with tree-shaking

## 🎯 Component Patterns

### Custom Hooks
- `useFetch()`: Handles API requests with cleanup
- `useInfiniteScroll()`: Intersection Observer pattern
- `useDebounce()`: Debounces input values

### Context Provider
- `FavoritesProvider`: Wraps app with favorites state
- `useFavorites()`: Hook to access favorites context

### Reusable Components
- Smart components handle logic
- Presentational components for UI
- Props-based customization

## 🔐 Environment Variables

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Never commit `.env` file. Use `.env.example` as template.

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.14.1",
  "axios": "^1.5.0",
  "tailwindcss": "^3.4.19",
  "framer-motion": "^11.0.0",
  "react-icons": "^5.0.0",
  "react-infinite-scroll-component": "^6.1.0"
}
```

## 🚨 Troubleshooting

### API Not Responding
- Verify API key in `.env`
- Check TMDB API status
- Ensure network connectivity

### Images Not Loading
- Clear browser cache
- Verify image paths from API
- Check content security policy

### Build Fails
- Delete `node_modules` and run `npm install`
- Clear Vite cache: `rm -rf .vite`
- Check Node.js version (16+)

## 📄 License

Open source - Feel free to use for personal and commercial projects.

## 🙏 Credits

- **TMDB API**: https://www.themoviedb.org/
- **Icons**: React Icons
- **Design Inspiration**: Netflix, Letterboxd

---

Built with ❤️ for movie enthusiasts and developers.
