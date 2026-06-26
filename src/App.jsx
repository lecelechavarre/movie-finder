import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Loader from './components/Loader/Loader.jsx';
import Toast from './components/Toast/Toast.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';

const HomePage = lazy(() => import('./pages/Home/Home.jsx'));
const SearchPage = lazy(() => import('./pages/Search/Search.jsx'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetails/MovieDetails.jsx'));
const FavoritesPage = lazy(() => import('./pages/Favorites/Favorites.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFound.jsx'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/search"
          element={
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <SearchPage />
            </motion.div>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <MovieDetailsPage />
            </motion.div>
          }
        />
        <Route
          path="/favorites"
          element={
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <FavoritesPage />
            </motion.div>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-text">
          <Navbar />
          <Suspense fallback={<Loader />}>
            <AnimatedRoutes />
          </Suspense>
          <Footer />
          <Toast />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
