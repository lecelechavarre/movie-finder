import posterPlaceholder from '../assets/poster-placeholder.svg';

export const posterPath = (path, size = 'w500') => {
  if (!path) return posterPlaceholder;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const backdropPath = (path, size = 'w780') => {
  if (!path) return posterPlaceholder;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
