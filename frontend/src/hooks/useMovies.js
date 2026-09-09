import useFetchData from './useFetchData';
import * as movieService from '../services/movieService';

export const useMovies = () => useFetchData(() => movieService.getAll());
export const useTrendingMovies = () => useFetchData(() => movieService.getTrending());
export const useSearchMovies = (query) => useFetchData(() => movieService.search(query), [query]);
export const useMovie = (slug) => useFetchData(() => movieService.getBySlug(slug), [slug]);