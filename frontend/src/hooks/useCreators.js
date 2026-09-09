import useFetchData from './useFetchData';
import * as creatorService from '../services/creatorService';

export const useCreators = () => useFetchData(() => creatorService.getAll());
export const useTrendingCreators = () => useFetchData(() => creatorService.getTrending());
export const useSearchCreators = (query) => useFetchData(() => creatorService.search(query), [query]);