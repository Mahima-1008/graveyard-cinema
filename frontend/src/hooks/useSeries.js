import useFetchData from './useFetchData';
import * as seriesService from '../services/seriesService';

export const useSeriess = () => useFetchData(() => seriesService.getAll());
export const useTrendingSeriess = () => useFetchData(() => seriesService.getTrending());
export const useSearchSeriess = (query) => useFetchData(() => seriesService.search(query), [query]);
export const useSeries = (slug) => useFetchData(() => seriesService.getBySlug(slug), [slug]);