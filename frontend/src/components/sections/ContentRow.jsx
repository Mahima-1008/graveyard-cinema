import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IconButton, EmptyState } from '../common';
import clsx from 'clsx';

export default function ContentRow({ 
  title, 
  seeAllLink, 
  items = [], 
  isLoading = false, 
  loadingCount = 6,
  renderItem,
  emptyMessage = "Nothing found in the shadows...",
  className,
  itemWidthClass = "w-36 md:w-48 lg:w-52"
}) {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftArrow(scrollLeft > 0);
    // Add 2px buffer for rounding errors
    setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [items, isLoading]);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth + 100 : clientWidth - 100;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!isLoading && items.length === 0) {
    return (
      <section className={clsx("py-6", className)}>
        <h2 className="px-6 lg:px-12 font-display text-2xl text-text-bright mb-4">{title}</h2>
        <EmptyState title={emptyMessage} description="" />
      </section>
    );
  }

  return (
    <section className={clsx("py-6 relative group", className)}>
      <div className="px-6 lg:px-12 flex items-end justify-between mb-4">
        <h2 className="font-display text-2xl text-text-bright font-bold tracking-wide drop-shadow-md">{title}</h2>
        {seeAllLink && (
          <Link to={seeAllLink} className="text-sm font-body text-text-muted hover:text-crimson-bright transition-colors focus-visible:outline-none focus-visible:underline">
            See All
          </Link>
        )}
      </div>

      <div className="relative">
        {/* Left Arrow - Desktop Only */}
        {showLeftArrow && (
          <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-20 items-center justify-start pl-4 pointer-events-none">
            <IconButton 
              icon={ChevronLeft} 
              variant="secondary" 
              className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity bg-surface/80 backdrop-blur border-transparent text-text-bright"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            />
          </div>
        )}

        {/* Scrollable Container */}
        <div 
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-4 px-6 lg:px-12 overflow-x-auto snap-x snap-mandatory pb-6 pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Hide Webkit scrollbar via a style tag temporarily injected or handled by global CSS */}
          <style>{`
            .overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {isLoading 
            ? Array.from({ length: loadingCount }).map((_, i) => (
                <div key={i} className={clsx("snap-start shrink-0", itemWidthClass)}>
                  {renderItem ? renderItem(null, true) : null}
                </div>
              ))
            : items.map((item, index) => (
                <div key={item.id || index} className={clsx("snap-start shrink-0", itemWidthClass)}>
                  {renderItem(item, false)}
                </div>
              ))
          }
        </div>

        {/* Right Arrow - Desktop Only */}
        {showRightArrow && !isLoading && items.length > 0 && (
          <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-20 items-center justify-end pr-4 pointer-events-none">
            <IconButton 
              icon={ChevronRight} 
              variant="secondary" 
              className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity bg-surface/80 backdrop-blur border-transparent text-text-bright"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            />
          </div>
        )}
      </div>
    </section>
  );
}
