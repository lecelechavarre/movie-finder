import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchBar({ query, onChange, onSubmit, onClear, loading }) {
  return (
    <form onSubmit={onSubmit} className="mb-8 grid gap-3 sm:grid-cols-[1fr_auto]">
      <label className="flex w-full items-center gap-3 rounded-[2rem] border border-slate-700/80 bg-slate-900/80 px-4 py-3 shadow-glow transition focus-within:border-primary">
        <FaSearch className="h-5 w-5 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={onChange}
          placeholder="Search any movie title"
          aria-label="Search movies"
          className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
        {query && (
          <button type="button" onClick={onClear} aria-label="Clear search" className="text-slate-400 transition hover:text-white">
            <FaTimes />
          </button>
        )}
      </label>
      <button
        type="submit"
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!query || loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
