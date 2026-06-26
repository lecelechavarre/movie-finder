# 🎬 Movie Finder - Developer Quick Reference

## 🚀 First Time Setup (2 minutes)

```bash
cd c:\xampp\htdocs\movie-finder

# 1. Edit .env and add your TMDB API key
VITE_TMDB_API_KEY=your_key_here

# 2. Start development
npm run dev

# 3. Open http://localhost:5173/
```

## 📁 Key Folders

```
src/
├── api/          → TMDB API client (tmdb.js)
├── services/     → Movie API functions (movieService.js)
├── components/   → Reusable UI components
├── pages/        → Full page components
├── hooks/        → useFetch, useInfiniteScroll, useDebounce
├── context/      → Favorites state (FavoritesContext)
└── utils/        → Helpers for dates, images, colors
```

## 🎯 Common Tasks

### Add a new page
1. Create folder in `src/pages/PageName/`
2. Create `PageName.jsx`
3. Add route in `src/App.jsx`

### Create new component
1. Create `src/components/ComponentName/ComponentName.jsx`
2. Import and use in pages

### Fetch data from TMDB
```javascript
import { getTrending } from '../../services/movieService.js';
const { data, isLoading, error } = useFetch(() => getTrending());
```

### Add to favorites
```javascript
import { useFavorites } from '../../context/FavoritesContext.jsx';

const { addFavorite, removeFavorite, isFavorite } = useFavorites();
addFavorite(movieObject);
```

### Style with Tailwind
```jsx
<button className="rounded-full bg-primary px-6 py-3 text-white hover:bg-red-600">
  Click me
</button>
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📚 File Purposes

| File | Purpose |
|------|---------|
| `App.jsx` | Main app shell, routing |
| `main.jsx` | React DOM entry point |
| `index.css` | Global Tailwind + styles |
| `vite.config.js` | Vite build config |
| `tailwind.config.js` | Tailwind theme customization |
| `.env` | Environment variables (local) |
| `package.json` | Dependencies and scripts |

## 🎨 Color System

```
Primary (Red):    #E50914   → bg-primary
Accent (Yellow):  #FACC15   → bg-accent
Background:       #0F172A   → bg-background
Surface:          #1E293B   → bg-surface
Text:             #F8FAFC   → text-text
```

## 🔌 API Functions Available

```javascript
getTrending(page)              // Trending movies
getPopular(page)               // Popular movies
getTopRated(page)              // Top rated movies
getUpcoming(page)              // Upcoming movies
searchMovies(query, page)       // Search movies
getMovieDetails(movieId)        // Full movie info
getMovieCredits(movieId)        // Cast & crew
getMovieVideos(movieId)         // Trailers
getSimilarMovies(movieId, page) // Similar movies
getRecommendations(movieId)     // Recommendations
getMovieImages(movieId)         // Screenshots
```

## 🐛 Debugging Tips

```javascript
// Check API response
console.log('Movie data:', data);

// Check favorites
const { favorites } = useFavorites();
console.log('Favorites:', favorites);

// Check loading state
console.log('Loading:', isLoading);

// Check errors
console.log('Error:', error?.message);
```

## ⚡ Performance Tips

- Use React.lazy for new pages
- Memoize expensive computations
- Debounce search and filter inputs
- Lazy load images with `loading="lazy"`
- Use Suspense for async components

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "API key not found" | Add to `.env` file |
| "Routes not working" | Check route paths in `App.jsx` |
| "Favorites not saving" | Check localStorage in DevTools |
| "Images not showing" | Verify TMDB image URLs |
| "No results on search" | Wait for API response, check query |

## 📦 Installed Packages

- `react` & `react-dom` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP requests
- `tailwindcss` - Styling
- `framer-motion` - Animations
- `react-icons` - Icon library
- `react-infinite-scroll-component` - Infinite scroll

## 🌐 TMDB API Docs

- Full API reference: https://developer.themoviedb.org/docs
- Image CDN: https://image.tmdb.org/t/p/
- Get API key: https://www.themoviedb.org/settings/api

## 📤 Deployment Checklist

- [ ] Build runs: `npm run build`
- [ ] No build errors
- [ ] `.env` NOT committed (in .gitignore)
- [ ] TMDB API key added to deployment platform
- [ ] All pages tested
- [ ] Responsive on mobile
- [ ] Images loading
- [ ] Favorites working

## 🎓 Learning Resources

- **Component patterns**: `src/components/`
- **Hook usage**: `src/hooks/`
- **API integration**: `src/services/movieService.js`
- **Context API**: `src/context/FavoritesContext.jsx`
- **Routing**: `src/App.jsx`

## 🆘 Quick Help

**Page won't load?**
→ Check browser console (F12) for errors

**API returning 401?**
→ Invalid or missing API key in `.env`

**Styles not applying?**
→ Rebuild Tailwind or restart dev server

**State not persisting?**
→ Check localStorage in DevTools Application tab

---

**Questions?** Check README.md or DEPLOYMENT.md

**Ready to ship?** Run `npm run build` and deploy!

🚀 Happy coding!
