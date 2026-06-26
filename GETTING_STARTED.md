# 🚀 Getting Started with Movie Finder

## Step 1: Get Your TMDB API Key (5 minutes)

1. Visit https://www.themoviedb.org/settings/api
2. Sign up or log in to TMDB
3. Create an API key under "API" section
4. Copy your API key

## Step 2: Configure the Application

1. Open `.env` file in the project root
2. Replace `your_tmdb_api_key_here` with your actual API key:
   ```env
   VITE_TMDB_API_KEY=your_actual_key_here
   ```
3. Save the file

## Step 3: Start the Development Server

Open terminal in the project directory and run:

```bash
npm run dev
```

You should see:
```
  VITE v5.4.21  ready in 244 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## Step 4: Open in Browser

Visit `http://localhost:5173/` in your browser.

## 🎯 Explore the Application

### Home Page
- View trending, popular, top-rated, and upcoming movies
- Scroll through horizontally-scrolled sections
- Click on any movie for detailed information

### Search Page
- Enter any movie title in the search bar
- Results load with infinite scroll
- Sort by popularity, release date, or rating
- Click movies to view full details

### Movie Details
- See comprehensive movie information
- Watch trailers
- Explore cast and crew
- View screenshots and recommendations
- Add to favorites

### Favorites
- Click the heart icon on any movie to save
- View all saved movies in the Favorites page
- Search and sort your collection
- Data persists after page refresh

## 🛠️ Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📝 Troubleshooting

### "No results found" after entering search query
- Wait a few seconds (API response can take time)
- Check internet connection
- Verify API key is correct

### Movies won't load at all
- Open browser console (F12)
- Check for error messages
- Verify `.env` file contains your API key
- Restart development server

### Images not displaying
- This is normal with placeholder image on first load
- TMDB image CDN may need a moment to cache
- Clear browser cache and reload

## 📚 Learn More

- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- TMDB API: https://developer.themoviedb.org/docs

## ✅ Next Steps

1. Customize the color palette in `tailwind.config.js`
2. Add more movie filters (genre, year, language)
3. Implement dark/light mode toggle
4. Deploy to Vercel or your preferred platform
5. Share your creation!

Happy movie discovering! 🎬
