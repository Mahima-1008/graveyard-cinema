import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovie, useMovies } from '@/hooks/useMovies';
import { DetailPageLayout } from '@/components/sections';

export default function MovieDetail() {
  const { slug } = useParams();
  
  const { data: movie, isLoading: movieLoading } = useMovie(slug);
  const { data: allMovies, isLoading: allLoading } = useMovies();

  // Find similar movies (share at least one genre, exclude self)
  const similarItems = React.useMemo(() => {
    if (!movie || !allMovies) return [];
    return allMovies.filter(m => 
      m.id !== movie.id && 
      m.genres?.some(g => movie.genres?.includes(g))
    );
  }, [movie, allMovies]);

  return (
    <DetailPageLayout 
      data={movie} 
      isLoading={movieLoading} 
      similarItems={similarItems} 
      similarLoading={allLoading}
    />
  );
}
