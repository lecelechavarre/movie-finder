import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaStar, FaClock, FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch.js';
import useInfiniteScroll from '../../hooks/useInfiniteScroll.js';
import { getTrending, getPopular, getTopRated, getUpcoming } from '../../services/movieService.js';
import MovieGrid from '../../components/MovieGrid/MovieGrid.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { backdropPath } from '../../utils/imageHelper.js';
import MainLayout from '../../layouts/MainLayout.jsx';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingPage, setTrendingPage] = useState(1);

  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError
  } = useFetch(() => getTrending(trendingPage), [trendingPage]);

  const { data: popularData, isLoading: popularLoading, error: popularError } = useFetch(() => getPopular(), []);
  const { data: topRatedData, isLoading: topRatedLoading } = useFetch(() => getTopRated(), []);
  const { data: upcomingData, isLoading: upcomingLoading } = useFetch(() => getUpcoming(), []);

  useEffect(() => {
    if (!trendingData?.results) return;
    setTrendingMovies((prev) => (trendingPage === 1 ? trendingData.results : [...prev, ...trendingData.results]));
  }, [trendingData, trendingPage]);

  const hasMoreTrending = trendingData ? trendingData.page < trendingData.total_pages : true;
  const trendingAnchor = useInfiniteScroll({ onLoadMore: () => setTrendingPage((page) => page + 1), hasMore: hasMoreTrending, isLoading: trendingLoading });

  const hero = useMemo(() => trendingMovies[0] || popularData?.results?.[0], [trendingMovies, popularData]);

  if (trendingError || popularError) {
    return (
      <MainLayout>
        <ErrorMessage title="Unable to load movie collections" message={trendingError?.message || popularError?.message} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="relative mb-12 overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 shadow-glow sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.24),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.82))]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-primary">
              <FaFire className="h-3.5 w-3.5" /> Trending now
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Discover the best movies on the planet.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Browse trending, popular, top rated and upcoming releases with a modern streaming-inspired experience built for performance.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/search" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-red-600">
                Start searching
              </Link>
              <div className="inline-flex items-center gap-4 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2"><FaStar className="h-4 w-4 text-amber-400" /> Hand-picked selections</span>
                <span className="inline-flex items-center gap-2"><FaClock className="h-4 w-4 text-slate-400" /> Updated daily</span>
              </div>
            </div>
          </div>
          {hero && (
            <motion.div className="overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-950/80 shadow-2xl shadow-slate-950/25">
              <img src={backdropPath(hero.backdrop_path)} alt={hero.title} className="h-full w-full object-cover object-center" />
            </motion.div>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Collections</p>
            <h2 className="text-3xl font-semibold text-white">Trending movies</h2>
          </div>
          <p className="text-sm text-slate-400">Scroll for more recommendations.</p>
        </div>
        <MovieGrid movies={trendingMovies} orientation="horizontal" loading={trendingLoading} sentinelRef={trendingAnchor} />
      </section>

      <section className="mt-10 space-y-4">
        <h3 className="text-2xl font-semibold text-white">Popular right now</h3>
        {popularLoading ? <Loader /> : <MovieGrid movies={popularData?.results || []} />}
      </section>

      <section className="mt-10 space-y-4">
        <h3 className="text-2xl font-semibold text-white">Top rated</h3>
        {topRatedLoading ? <Loader /> : <MovieGrid movies={topRatedData?.results || []} />}
      </section>

      <section className="mt-10 space-y-4 pb-10">
        <h3 className="text-2xl font-semibold text-white">Upcoming releases</h3>
        {upcomingLoading ? <Loader /> : <MovieGrid movies={upcomingData?.results || []} />}
      </section>
    </MainLayout>
  );
}
