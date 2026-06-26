import { useMemo, useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import MovieGrid from '../../components/MovieGrid/MovieGrid.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import MainLayout from '../../layouts/MainLayout.jsx';

const SORT_OPTIONS = [
  { value: 'added', label: 'Recently added' },
  { value: 'release_date', label: 'Release date' },
  { value: 'rating', label: 'Rating' }
];

export default function Favorites() {
  const { favorites } = useFavorites();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('added');

  const filteredFavorites = useMemo(() => {
    const result = favorites.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
    return result.sort((a, b) => {
      if (sortBy === 'release_date') {
        return new Date(b.release_date || 0) - new Date(a.release_date || 0);
      }
      if (sortBy === 'rating') {
        return b.vote_average - a.vote_average;
      }
      return 0;
    });
  }, [favorites, query, sortBy]);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-white">Favorites</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-400">
          Your saved movies are stored locally and ready to explore anytime.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search favorites"
          className="rounded-full border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-sm text-slate-200 outline-none transition focus:border-primary"
        />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-full border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-sm text-slate-200 outline-none transition focus:border-primary"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-slate-950 text-slate-200">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {!favorites.length ? (
        <ErrorMessage title="Your favorites list is empty" message="Add movies from the search results or home page to save them here." />
      ) : !filteredFavorites.length ? (
        <ErrorMessage title="No matches" message="Try a different filter or clear your search." />
      ) : (
        <MovieGrid movies={filteredFavorites} />
      )}
    </MainLayout>
  );
}
