import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaHeart, FaStar, FaVideo } from 'react-icons/fa';
import useFetch from '../../hooks/useFetch.js';
import { getMovieCredits, getMovieDetails, getMovieImages, getMovieVideos, getRecommendations, getSimilarMovies } from '../../services/movieService.js';
import BackButton from '../../components/BackButton/BackButton.jsx';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton.jsx';
import GenreTag from '../../components/GenreTag/GenreTag.jsx';
import RatingBadge from '../../components/RatingBadge/RatingBadge.jsx';
import MovieGrid from '../../components/MovieGrid/MovieGrid.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { backdropPath, posterPath } from '../../utils/imageHelper.js';
import { formatDate } from '../../utils/formatDate.js';
import MainLayout from '../../layouts/MainLayout.jsx';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: detailData, isLoading: detailLoading, error: detailError } = useFetch(() => getMovieDetails(id), [id]);

  useEffect(() => {
    setLoading(detailLoading);
  }, [detailLoading]);

  useEffect(() => {
    if (!id) return;
    const loadDetails = async () => {
      setError(null);
      setLoading(true);
      try {
        const [creditsData, videosData, recommendationsData, similarData, imagesData] = await Promise.all([
          getMovieCredits(id),
          getMovieVideos(id),
          getRecommendations(id),
          getSimilarMovies(id),
          getMovieImages(id)
        ]);
        setCredits(creditsData);
        setVideos(videosData);
        setRecommendations(recommendationsData);
        setSimilar(similarData);
        setImages(imagesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  useEffect(() => {
    setMovie(detailData);
  }, [detailData]);

  const director = useMemo(() => {
    return credits?.crew?.find((member) => member.job === 'Director');
  }, [credits]);

  const trailer = useMemo(() => {
    return videos?.results?.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
  }, [videos]);

  const screenshotImages = images?.backdrops?.slice(0, 6) ?? [];

  if (detailError || error) {
    return (
      <MainLayout>
        <ErrorMessage title="Unable to load movie details" message={(detailError || error)?.message} />
      </MainLayout>
    );
  }

  if (!movie || loading) {
    return (
      <MainLayout>
        <Loader message="Loading movie details..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8 space-y-6">
        <BackButton />
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] border border-slate-800/90 bg-slate-950/90 shadow-glow">
            <img src={backdropPath(movie.backdrop_path, 'w1280')} alt={movie.title} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                {movie.status || 'Released'}
              </span>
              <RatingBadge score={movie.vote_average} />
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
                <FaClock className="h-3.5 w-3.5" /> {movie.runtime ? `${movie.runtime} min` : 'N/A'}
              </span>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-white">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-3">
                {movie.genres?.map((genre) => (
                  <GenreTag key={genre.id} label={genre.name} />
                ))}
              </div>
              <p className="max-w-3xl text-slate-300">{movie.overview}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-800/90 bg-slate-900/70 p-5">
                <h2 className="text-sm uppercase tracking-[0.3em] text-slate-400">Details</h2>
                <dl className="mt-4 space-y-3 text-sm text-slate-200">
                  <div className="flex justify-between text-slate-300"><dt>Release</dt><dd>{formatDate(movie.release_date)}</dd></div>
                  <div className="flex justify-between text-slate-300"><dt>Budget</dt><dd>{movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}</dd></div>
                  <div className="flex justify-between text-slate-300"><dt>Revenue</dt><dd>{movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}</dd></div>
                  <div className="flex justify-between text-slate-300"><dt>Votes</dt><dd>{movie.vote_count.toLocaleString()}</dd></div>
                </dl>
              </div>

              <div className="rounded-3xl border border-slate-800/90 bg-slate-900/70 p-5">
                <h2 className="text-sm uppercase tracking-[0.3em] text-slate-400">Production</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  <div>
                    <p className="text-slate-400">Company</p>
                    <p>{movie.production_companies?.[0]?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Country</p>
                    <p>{movie.production_countries?.[0]?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Director</p>
                    <p>{director?.name || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <FavoriteButton movie={movie} />
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-red-600"
                >
                  <FaVideo /> Watch trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Cast</h2>
            <p className="text-sm text-slate-400">Main cast members from the movie.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {credits?.cast?.slice(0, 6).map((actor) => (
            <div key={actor.id} className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-5">
              <h3 className="font-semibold text-white">{actor.name}</h3>
              <p className="mt-2 text-sm text-slate-400">as {actor.character}</p>
            </div>
          ))}
        </div>
      </section>

      {screenshotImages.length > 0 && (
        <section className="mt-10 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-white">Screenshots</h2>
              <p className="text-sm text-slate-400">Explore visual moments from the film.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {screenshotImages.map((screen, index) => (
              <img key={`${screen.file_path}-${index}`} src={backdropPath(screen.file_path, 'w780')} alt={`${movie.title} screenshot`} className="h-56 w-full rounded-3xl object-cover" />
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-white">Recommendations</h2>
          <p className="mt-2 text-sm text-slate-400">Movies that match your taste.</p>
        </div>
        <MovieGrid movies={recommendations?.results || []} />
      </section>

      <section className="mt-10 space-y-8 pb-10">
        <div>
          <h2 className="text-2xl font-semibold text-white">Similar movies</h2>
          <p className="mt-2 text-sm text-slate-400">Explore related titles.</p>
        </div>
        <MovieGrid movies={similar?.results || []} />
      </section>
    </MainLayout>
  );
}
