import useFetchData from './useFetchData';
import * as reelService from '../services/reelService';

export const useReels = () => useFetchData(() => reelService.getAll());
export const useTrendingReels = () => useFetchData(() => reelService.getTrending());
export const useSearchReels = (query) => useFetchData(() => reelService.search(query), [query]);