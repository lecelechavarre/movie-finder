import axios from 'axios';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US'
  }
});

const handleError = (error) => {
  if (error.response) {
    const message = error.response.data.status_message || 'Unable to load data from TMDB.';
    throw new Error(message);
  }
  throw new Error('Network error. Please check your connection.');
};

tmdb.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(handleError(error))
);

export default tmdb;
