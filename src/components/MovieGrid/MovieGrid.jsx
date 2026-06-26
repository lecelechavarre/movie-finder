import MovieCard from '../MovieCard/MovieCard.jsx';
import Loader from '../Loader/Loader.jsx';

export default function MovieGrid({ movies, orientation = 'grid', loading, error, children, sentinelRef }) {
  if (error) return null;

  return (
    <section className={`${orientation === 'grid' ? 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'flex gap-4 overflow-x-auto pb-4 pr-4'} scroll-smooth`}> 
      {movies?.length ? (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} compact={orientation !== 'grid'} />)
      ) : (
        <div className="col-span-full rounded-3xl border border-dashed border-slate-700 bg-slate-950/70 p-10 text-center text-slate-400">
          <p>No movies available yet.</p>
        </div>
      )}
      {loading && (
        <div className="col-span-full flex w-full items-center justify-center py-10">
          <Loader message="Fetching more movies..." />
        </div>
      )}
      <div ref={sentinelRef} className="h-1 w-full" />
      {children}
    </section>
  );
}
