import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import * as movieService from '../services/movieService';
import * as seriesService from '../services/seriesService';
import * as shortFilmService from '../services/shortFilmService';
import * as storyService from '../services/storyService';
import * as reelService from '../services/reelService';
import * as creatorService from '../services/creatorService';

let cachedData = null;

export default function useGlobalSearch(query) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(!!cachedData);

  useEffect(() => {
    const fetchAllData = async () => {
      if (cachedData) return;
      setIsLoading(true);
      try {
        const [movies, series, shorts, stories, reels, creators] = await Promise.all([
          movieService.getAll(),
          seriesService.getAll(),
          shortFilmService.getAll(),
          storyService.getAll(),
          reelService.getAll(),
          creatorService.getAll()
        ]);
        
        // Normalize types so they can be filtered later easily
        cachedData = [
          ...movies.map(m => ({ ...m, searchType: 'Movie' })),
          ...series.map(s => ({ ...s, searchType: 'Series' })),
          ...shorts.map(s => ({ ...s, searchType: 'Short Film' })),
          ...stories.map(s => ({ ...s, searchType: 'Story' })),
          ...reels.map(r => ({ ...r, searchType: 'Reel', title: r.caption })),
          ...creators.map(c => ({ ...c, searchType: 'Creator', title: c.name }))
        ];
        setHasLoaded(true);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  const fuse = useMemo(() => {
    if (!cachedData) return null;
    return new Fuse(cachedData, {
      keys: ['title', 'director', 'cast', 'name', 'caption', 'tagline', 'author', 'genres'],
      threshold: 0.3, // allows slight typos
      includeScore: true
    });
  }, [hasLoaded]);

  useEffect(() => {
    if (!fuse) return;
    if (!query || query.trim() === '') {
      setResults([]);
      return;
    }
    const searchResults = fuse.search(query).map(result => result.item);
    setResults(searchResults);
  }, [query, fuse]);

  return { results, isLoading: isLoading && !cachedData, allData: cachedData };
}
