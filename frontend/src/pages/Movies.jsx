import React from 'react';
import ContentGridPage from './ContentGridPage';
import { useMovies } from '@/hooks/useMovies';

export default function Movies() {
  const { data, isLoading } = useMovies();
  
  return (
    <ContentGridPage 
      title="Movies" 
      description="Feature-length nightmares guaranteed to keep you awake."
      rawData={data} 
      isLoading={isLoading} 
    />
  );
}
