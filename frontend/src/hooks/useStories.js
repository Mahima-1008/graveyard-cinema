import useFetchData from './useFetchData';
import * as storyService from '../services/storyService';

export const useStorys = () => useFetchData(() => storyService.getAll());
export const useTrendingStorys = () => useFetchData(() => storyService.getTrending());
export const useSearchStorys = (query) => useFetchData(() => storyService.search(query), [query]);