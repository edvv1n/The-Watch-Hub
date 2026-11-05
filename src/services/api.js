const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = (import.meta.env.VITE_API_URL || 'https://api.themoviedb.org/3').replace(/\/$/, '');
export const imageUrl = (path, size = 'w780') => path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
async function request(path, params = {}) {
  if (!API_KEY) throw new Error('TMDB API key missing. Set VITE_API_KEY in your .env file.');
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');
  Object.entries(params).forEach(([key,value]) => { if(value !== undefined && value !== '') url.searchParams.set(key, value); });
  const response = await fetch(url);
  if (!response.ok) throw new Error(`TMDB request failed (${response.status})`);
  return response.json();
}
export const getPopularMovies = async () => (await request('/movie/popular')).results;
export const searchMovies = async (query) => (await request('/search/movie', {query, include_adult: false})).results;
export const getMovies = async (category = 'popular') => (await request(`/movie/${category}`)).results;
export const getMovie = (id) => request(`/movie/${id}`, {append_to_response: 'videos,credits,recommendations,watch/providers,release_dates'});
export const getGenres = async () => (await request('/genre/movie/list')).genres;
export const discoverMovies = async (genre) => (await request('/discover/movie', {with_genres: genre, sort_by:'popularity.desc', include_adult:false})).results;
