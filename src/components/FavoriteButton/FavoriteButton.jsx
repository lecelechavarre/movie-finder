import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../../context/FavoritesContext.jsx';

export default function FavoriteButton({ movie, small = false }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const toggleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();
    favorited ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return (
    <button
      type="button"
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      onClick={toggleFavorite}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-sm text-white shadow-sm transition hover:border-primary hover:text-primary ${
        small ? 'p-2' : ''
      }`}
    >
      {favorited ? <FaHeart className="h-4 w-4" /> : <FaRegHeart className="h-4 w-4" />}
    </button>
  );
}
