import React from 'react';
import ContentGridPage from './ContentGridPage';
import { useShortFilms } from '@/hooks/useShortFilms';

export default function ShortFilms() {
  const { data, isLoading } = useShortFilms();
  
  return (
    <ContentGridPage 
      title="Short Films" 
      description="Bite-sized terror. Maximum impact in minimum time."
      rawData={data} 
      isLoading={isLoading} 
    />
  );
}
