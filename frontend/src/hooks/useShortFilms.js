import useFetchData from './useFetchData';
import * as shortFilmService from '../services/shortFilmService';

export const useShortFilms = () => useFetchData(() => shortFilmService.getAll());
export const useTrendingShortFilms = () => useFetchData(() => shortFilmService.getTrending());
export const useSearchShortFilms = (query) => useFetchData(() => shortFilmService.search(query), [query]);
export const useShortFilm = (slug) => useFetchData(() => shortFilmService.getBySlug(slug), [slug]);
