import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(onIntersect, hasMore) {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: '200px', threshold: 0.1 } // 200px before reaching the bottom
    );
    
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    
    return () => observer.disconnect();
  }, [onIntersect, hasMore]);

  return targetRef;
}
