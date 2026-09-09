import useFetchData from './useFetchData';
import * as genreService from '../services/genreService';

export const useGenres = () => useFetchData(() => genreService.getAll());
export const useTrendingGenres = () => useFetchData(() => genreService.getTrending());
export const useSearchGenres = (query) => useFetchData(() => genreService.search(query), [query]);
export const useGenre = (slug) => useFetchData(() => genreService.getBySlug(slug), [slug]);