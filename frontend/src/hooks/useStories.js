import useFetchData from './useFetchData';
import * as storyService from '../services/storyService';

export const useStories = () => useFetchData(() => storyService.getAll());
export const useStory = (slug) => useFetchData(() => storyService.getBySlug(slug), [slug]);
export const useTrendingStories = () => useFetchData(() => storyService.getTrending());
export const useSearchStories = (query) => useFetchData(() => storyService.search(query), [query]);