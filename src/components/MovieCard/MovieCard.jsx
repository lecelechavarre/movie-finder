import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { posterPath } from '../../utils/imageHelper.js';
import FavoriteButton from '../FavoriteButton/FavoriteButton.jsx';
import RatingBadge from '../RatingBadge/RatingBadge.jsx';

export default function MovieCard({ movie, compact = false }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 shadow-glow transition ${
        compact ? 'min-w-[220px] max-w-[220px]' : 'w-full'
      }`}
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <img
          src={posterPath(movie.poster_path)}
          alt={movie.title}
          loading="lazy"
          className="h-[340px] w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate text-base font-semibold text-white">{movie.title}</h3>
          <RatingBadge score={movie.vote_average} />
        </div>
        <p className="text-sm text-slate-400">{movie.release_date?.slice(0, 4) || 'Unknown'}</p>
        <div className="flex items-center justify-between gap-2">
          <Link
            to={`/movie/${movie.id}`}
            className="text-sm font-semibold text-slate-200 transition hover:text-white"
          >
            View details
          </Link>
          <FavoriteButton movie={movie} small />
        </div>
      </div>
    </motion.article>
  );
}
