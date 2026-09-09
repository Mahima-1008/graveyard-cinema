import React from 'react';
import ContentGridPage from './ContentGridPage';
import { useSeries } from '@/hooks/useSeries';

export default function Series() {
  const { data, isLoading } = useSeries();
  
  return (
    <ContentGridPage 
      title="Series" 
      description="Binge-worthy horror that follows you episode after episode."
      rawData={data} 
      isLoading={isLoading} 
    />
  );
}
