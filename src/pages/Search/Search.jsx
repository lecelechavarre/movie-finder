import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce.js';
import useInfiniteScroll from '../../hooks/useInfiniteScroll.js';
import { searchMovies } from '../../services/movieService.js';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import MovieGrid from '../../components/MovieGrid/MovieGrid.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import MainLayout from '../../layouts/MainLayout.jsx';

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'release_date', label: 'Release date' },
  { value: 'vote_average', label: 'Rating' }
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('popularity');

  const debouncedQuery = useDebounce(query, 400);
  const navigate = useNavigate();

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setTotalPages(0);
      setError(null);
      return;
    }

    setPage(1);
    setLoading(true);
    setError(null);

    searchMovies(debouncedQuery, 1)
      .then((data) => {
        setResults(data.results);
        setTotalPages(data.total_pages);
        setSearchParams({ q: debouncedQuery });
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [debouncedQuery, setSearchParams]);

  useEffect(() => {
    if (page === 1 || !debouncedQuery) return;
    setLoading(true);
    searchMovies(debouncedQuery, page)
      .then((data) => setResults((prev) => [...prev, ...data.results]))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [debouncedQuery, page]);

  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      if (sortOption === 'release_date') {
        return new Date(b.release_date || 0) - new Date(a.release_date || 0);
      }
      return b[sortOption] - a[sortOption];
    });
  }, [results, sortOption]);

  const hasMore = page < totalPages;
  const sentinelRef = useInfiniteScroll({ onLoadMore: () => setPage((current) => current + 1), hasMore, isLoading: loading });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setTotalPages(0);
    setSearchParams({});
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-white">Search movies</h1>
        <p className="mt-2 text-sm text-slate-400">Find titles, filter with sort options, and browse results instantly.</p>
      </div>
      <SearchBar query={query} onChange={(event) => setQuery(event.target.value)} onSubmit={handleSubmit} onClear={handleClear} loading={loading} />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">
          {results.length ? `${results.length} results found` : loading ? 'Searching...' : 'Enter a title to begin.'}
        </p>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-300">Sort by</label>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="rounded-full border border-slate-700/90 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-primary"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-950 text-slate-200">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <ErrorMessage title="Search failed" message={error.message} />}
      {!error && !loading && !results.length && debouncedQuery && <ErrorMessage title="No results found" message="Try a different movie title or change the spelling." />}
      {!error && !debouncedQuery && <p className="text-slate-400">Start typing to discover movies from TMDB.</p>}

      {results.length > 0 && <MovieGrid movies={sortedResults} sentinelRef={sentinelRef} loading={loading} />}

      {loading && !results.length && <Loader message="Searching for movies..." />}
    </MainLayout>
  );
}
