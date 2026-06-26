import tmdb from '../api/tmdb.js';

const extract = (response) => response.data;

export const getTrending = (page = 1) => tmdb.get('/trending/movie/day', { params: { page } }).then(extract);
export const getPopular = (page = 1) => tmdb.get('/movie/popular', { params: { page } }).then(extract);
export const getTopRated = (page = 1) => tmdb.get('/movie/top_rated', { params: { page } }).then(extract);
export const getUpcoming = (page = 1) => tmdb.get('/movie/upcoming', { params: { page } }).then(extract);
export const searchMovies = (query, page = 1) => tmdb.get('/search/movie', { params: { query, page, include_adult: false } }).then(extract);
export const getMovieDetails = (movieId) => tmdb.get(`/movie/${movieId}`).then(extract);
export const getMovieCredits = (movieId) => tmdb.get(`/movie/${movieId}/credits`).then(extract);
export const getMovieVideos = (movieId) => tmdb.get(`/movie/${movieId}/videos`).then(extract);
export const getRecommendations = (movieId, page = 1) => tmdb.get(`/movie/${movieId}/recommendations`, { params: { page } }).then(extract);
export const getSimilarMovies = (movieId, page = 1) => tmdb.get(`/movie/${movieId}/similar`, { params: { page } }).then(extract);
export const getMovieImages = (movieId) => tmdb.get(`/movie/${movieId}/images`).then(extract);
