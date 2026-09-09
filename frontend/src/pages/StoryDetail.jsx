import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStory, useStories } from '@/hooks/useStories';
import { Skeleton, ErrorState, Button, IconButton, Badge } from '@/components/common';
import { ContentRow } from '@/components/sections';
import { StoryCard } from '@/components/cards';
import { ArrowLeft, Bookmark, Check, Play, Pause, AArrowUp, AArrowDown, Star, MessageSquare } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function StoryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: story, isLoading } = useStory(slug);
  const { data: allStories, isLoading: allLoading } = useStories();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [textSize, setTextSize] = useState('base'); // sm, base, lg, xl
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interactivePath, setInteractivePath] = useState(null);
  const contentRef = useRef(null);

  // Mocking audio and interactive flags for demonstration
  const isAudio = story?.title?.includes('Audio') || Math.random() > 0.7;
  const isInteractive = story?.category === 'Interactive' || Math.random() > 0.8;

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const windowHeight = scrollHeight - clientHeight;
      if (windowHeight <= 0) return setScrollProgress(0);
      setScrollProgress((scrollTop / windowHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTextSize = (increase) => {
    const sizes = ['sm', 'base', 'lg', 'xl'];
    const currentIndex = sizes.indexOf(textSize);
    if (increase && currentIndex < sizes.length - 1) setTextSize(sizes[currentIndex + 1]);
    if (!increase && currentIndex > 0) setTextSize(sizes[currentIndex - 1]);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen pt-24 px-6 max-w-[680px] mx-auto">
        <Skeleton className="w-24 h-6 mb-4" />
        <Skeleton className="w-full h-12 mb-4" />
        <Skeleton className="w-48 h-12 rounded-full mb-12" />
        <div className="space-y-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
          <br/>
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="pt-32 pb-12">
        <ErrorState 
          title="Tale Not Found" 
          description="This story has been ripped from the pages."
          actionLabel="Back to Stories"
          onAction={() => navigate('/stories')}
        />
      </div>
    );
  }

  const textSizeClass = {
    'sm': 'text-sm leading-relaxed',
    'base': 'text-base md:text-lg leading-loose',
    'lg': 'text-lg md:text-xl leading-loose',
    'xl': 'text-xl md:text-2xl leading-loose'
  }[textSize];

  return (
    <div className="w-full min-h-screen pb-32 bg-[#0A0A0B]" ref={contentRef}>
      {/* Sticky Top Reader Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur border-b border-surface">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-0.5 bg-crimson shadow-glow" style={{ width: `${scrollProgress}%` }}></div>
        
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <IconButton icon={ArrowLeft} variant="ghost" size="sm" onClick={() => navigate(-1)} />
            <span className="font-display font-bold text-text-bright truncate hidden sm:block">
              {story.title}
            </span>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <IconButton icon={AArrowDown} variant="ghost" size="sm" onClick={() => handleTextSize(false)} aria-label="Decrease text size" />
            <IconButton icon={AArrowUp} variant="ghost" size="sm" onClick={() => handleTextSize(true)} aria-label="Increase text size" />
            <div className="w-px h-6 bg-surface mx-2"></div>
            <IconButton 
              icon={isBookmarked ? Check : Bookmark} 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsBookmarked(!isBookmarked)} 
              className={isBookmarked ? "text-crimson-bright" : ""}
            />
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <article className="max-w-[680px] mx-auto px-6 pt-28 pb-16">
        
        <div className="mb-8">
          <Badge variant="crimson" className="mb-4">{isInteractive ? 'Interactive' : story.category || 'Story'}</Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-bright leading-tight mb-6">
            {story.title}
          </h1>
          
          {/* Author Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-surface">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(story.author || 'Author')}&background=151316&color=F5F5F5`} alt={story.author} />
              </div>
              <div>
                <p className="font-bold text-text-bright">{story.author}</p>
                <p className="text-xs text-text-muted">12 Stories</p>
              </div>
              <Button variant="secondary" size="sm" className="ml-2 rounded-full text-xs h-7 px-3">Follow</Button>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-bold text-text-muted">
              <span>{story.readTimeMin || 5} min read</span>
              <div className="flex items-center text-warning">
                <Star className="w-4 h-4 fill-warning mr-1" />
                {story.rating?.toFixed(1) || '4.5'}
              </div>
            </div>
          </div>
        </div>

        {/* Story Body */}
        <div className={clsx("font-body text-text-muted", textSizeClass)}>
          <p className="mb-6 first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-crimson first-letter:float-left first-letter:mr-3 first-letter:mt-1">
            The wind howled through the cracked window panes of the old estate, carrying with it a scent of damp earth and something metallic. I had been warned not to return to Blackwood Manor after sunset, but the letter clutched in my trembling hand demanded otherwise. It was written in my sister's unmistakable scrawl, though she had been buried for three years.
          </p>
          <p className="mb-6">
            My flashlight flickered as I stepped over the threshold, the heavy oak door slamming shut behind me with a finality that made my heart hammer against my ribs. The silence that followed was suffocating. Not the absence of sound, but a heavy, expectant quiet—like the house itself was holding its breath.
          </p>
          <p className="mb-6">
            I moved toward the grand staircase, sweeping the beam of light across the peeling wallpaper. The portraits lining the walls seemed to watch me, their eyes following my every move. It was then I heard it: a soft, rhythmic thumping coming from the second floor. Slow, deliberate. Thump. Pause. Thump.
          </p>
          
          {/* Interactive Branching */}
          {isInteractive && (
            <div className="mt-12 p-6 md:p-8 bg-surface/30 border border-surface rounded-xl">
              <h3 className="font-display text-xl text-text-bright mb-6 text-center">What do you do?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setInteractivePath('investigate')}
                  className={interactivePath === 'investigate' ? 'ring-2 ring-crimson' : ''}
                >
                  Climb the stairs
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => setInteractivePath('flee')}
                  className={interactivePath === 'flee' ? 'ring-2 ring-crimson' : ''}
                >
                  Flee the house
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {interactivePath === 'investigate' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-crimson-bright italic"
                  >
                    You grip the banister, the wood slick under your palm. With each step upward, the thumping grows louder, shifting from a dull thud to a wet, heavy slap. As your light hits the landing, the thumping stops. Standing at the end of the hall is a figure, completely still, facing the wall...
                  </motion.p>
                )}
                {interactivePath === 'flee' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-text-bright italic"
                  >
                    You spin around and grab the heavy brass door handle, but it refuses to budge. The wood is warm to the touch, almost fleshy. As you rattle it in panic, the thumping from upstairs suddenly accelerates, rushing toward the top of the stairs...
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-16 pt-8 border-t border-surface">
          <div className="flex flex-col items-center justify-center gap-4 mb-16">
            <h4 className="font-display text-xl text-text-bright">Rate this tale</h4>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(star => (
                <IconButton key={star} icon={Star} variant="ghost" className="hover:text-warning" />
              ))}
            </div>
          </div>

          <h4 className="font-display text-2xl text-text-bright mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" /> Comments
          </h4>
          <div className="bg-surface/30 p-4 rounded-xl border border-surface mb-8">
            <textarea 
              placeholder="Leave a comment in the dark..."
              className="w-full bg-transparent border-none text-text-bright placeholder:text-text-muted focus:outline-none resize-none h-16 text-sm"
            ></textarea>
            <div className="flex justify-end mt-2"><Button size="sm">Post</Button></div>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-surface shrink-0"></div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-text-bright">night_walker</span>
                  <span className="text-xs text-text-muted">2 hours ago</span>
                </div>
                <p className="text-sm text-text-muted mt-1">Gave me absolute chills reading this at 2am.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Stories Row */}
      <div className="container mx-auto px-6 lg:px-12 py-12 border-t border-surface">
        <ContentRow 
          title="Related Tales" 
          items={allStories?.filter(s => s.id !== story.id).slice(0, 4)}
          isLoading={allLoading}
          renderItem={(item) => <StoryCard data={item} />}
        />
      </div>

      {/* Pinned Audio Player */}
      <AnimatePresence>
        {isAudio && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-surface p-4"
          >
            <div className="container mx-auto max-w-4xl flex items-center gap-4 md:gap-6">
              <IconButton 
                icon={isPlaying ? Pause : Play} 
                className="bg-crimson text-text-bright hover:bg-crimson-bright border-transparent w-12 h-12 shrink-0"
                onClick={() => setIsPlaying(!isPlaying)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-text-bright truncate">Narrated by: The Keeper</span>
                  <span className="text-xs font-mono text-text-muted shrink-0">04:12 / 15:30</span>
                </div>
                <div className="w-full h-1.5 bg-background rounded-full overflow-hidden cursor-pointer">
                  <div className="h-full bg-crimson w-1/3"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
