import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, Plus, Check, ThumbsUp, ThumbsDown, Share2, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Button, IconButton, Badge, Skeleton, ErrorState, Modal, ToastProvider } from '@/components/common';
import { ContentRow } from '@/components/sections';
import { PosterCard } from '@/components/cards';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useToast } from '@/components/common/Toast';

function CastCard({ person }) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0 w-24">
      <div className="w-16 h-16 rounded-full bg-surface overflow-hidden">
        <img 
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(person)}&background=151316&color=F5F5F5`} 
          alt={person} 
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs font-bold text-text-bright text-center line-clamp-2">{person}</span>
    </div>
  );
}

function ReviewSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-2xl text-text-bright font-bold">Reviews</h3>
        <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(true)}>Write a Review</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-surface/50 p-4 rounded-xl border border-surface">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-text-bright">horror_fan_{i}99</span>
              <div className="flex text-warning">
                {Array.from({length: 5}).map((_, idx) => (
                  <Star key={idx} className={clsx("w-3 h-3", idx < 4 ? "fill-warning" : "fill-surface text-surface")} />
                ))}
              </div>
            </div>
            <p className="text-sm text-text-muted">An absolute nightmare in the best way possible. The atmosphere is suffocating and the pacing is relentless. Highly recommend watching this alone in the dark.</p>
          </div>
        ))}
      </div>
      <button className="text-sm text-crimson hover:text-crimson-bright mt-4 font-bold transition-colors">See All Reviews</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Write a Review">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-2">
            {[1,2,3,4,5].map(star => (
              <button key={star} onClick={() => setRating(star)} className="focus-visible:outline-none">
                <Star className={clsx("w-8 h-8 transition-colors", rating >= star ? "fill-warning text-warning" : "text-surface")} />
              </button>
            ))}
          </div>
          <textarea 
            placeholder="Share your deepest fears..."
            className="w-full bg-background border border-surface rounded-lg p-3 text-text-bright text-sm min-h-[120px] focus:outline-none focus:border-crimson transition-colors"
          ></textarea>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Submit</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function DetailPageLayout({ data, isLoading, similarItems, similarLoading, children }) {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const { showToast } = useToast();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen pb-12">
        <Skeleton className="w-full h-[60vh]" />
        <div className="container mx-auto px-6 lg:px-12 -mt-32 relative z-10 flex flex-col md:flex-row gap-8">
          <Skeleton className="w-48 md:w-64 aspect-[2/3] rounded-lg shrink-0 hidden md:block" />
          <div className="flex-1 space-y-4 pt-12">
            <Skeleton className="w-3/4 h-12" />
            <Skeleton className="w-1/2 h-6" />
            <div className="flex gap-2"><Skeleton className="w-16 h-6" /><Skeleton className="w-16 h-6" /></div>
            <Skeleton className="w-full h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="pt-32 pb-12">
        <ErrorState 
          title="Entity Not Found" 
          description="The title you're looking for has vanished into the ether."
          actionLabel="Back to Safety"
          onAction={() => navigate('/')}
        />
      </div>
    );
  }

  const handleWatchlist = () => {
    setInWatchlist(!inWatchlist);
    showToast(inWatchlist ? "Removed from watchlist" : "Added to watchlist", "success");
  };

  return (
    <div className="w-full min-h-screen pb-24 overflow-x-hidden">
      {/* Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-surface">
        <motion.img 
          src={data.backdropUrl} 
          alt={data.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: shouldReduceMotion ? 1 : 1.05 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent opacity-80"></div>
      </div>

      {/* Main Content Overlap */}
      <div className="container mx-auto px-6 lg:px-12 -mt-40 md:-mt-48 relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Left Column (Poster) */}
        <div className="w-32 md:w-64 shrink-0 mx-auto md:mx-0 -mt-16 md:mt-0">
          <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-glow border border-surface/50 bg-surface">
            <img src={data.posterUrl} alt={data.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Column (Info) */}
        <div className="flex-1 flex flex-col pt-4 md:pt-16">
          <h1 className="font-display font-bold text-4xl md:text-6xl text-text-bright drop-shadow-glow leading-tight mb-2">
            {data.title}
          </h1>
          {data.tagline && (
            <p className="font-body text-lg md:text-xl text-crimson-bright italic drop-shadow-md mb-6">
              "{data.tagline}"
            </p>
          )}

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm font-bold text-text-muted mb-6">
            <span className="border border-text-muted/50 px-1.5 py-0.5 rounded text-text-bright">{data.ageRating}</span>
            <span>{data.year}</span>
            <span>{data.runtime || `${data.seasons?.length || 1} Seasons`}</span>
            <div className="flex items-center text-warning">
              <Star className="w-4 h-4 fill-warning mr-1" />
              {data.userRating?.toFixed(1)}
            </div>
            
            {/* Fear Meter */}
            <div className="flex items-center gap-2 border-l border-surface/50 pl-3 md:pl-4">
              <Badge variant="crimson" className="text-[10px]">Scare Lvl {data.scareLevel}</Badge>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider">Fear</span>
                <div className="w-16 h-1.5 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-crimson" style={{ width: `${data.fearMeter}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-8">
            {data.genres?.map(g => (
              <Badge key={g} variant="default" className="bg-surface/50 border border-surface/50 text-text-muted">{g}</Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Button icon={Play} size="lg" className="w-full sm:w-auto shadow-[0_0_20px_rgba(196,30,58,0.4)]">Watch Now</Button>
            <Button 
              variant="secondary" 
              icon={inWatchlist ? Check : Plus} 
              size="lg" 
              className={clsx("flex-1 sm:flex-none transition-colors", inWatchlist && "border-crimson text-crimson-bright")}
              onClick={handleWatchlist}
            >
              {inWatchlist ? "In Watchlist" : "Watchlist"}
            </Button>
            <div className="flex items-center gap-2">
              <IconButton icon={ThumbsUp} variant="ghost" className="bg-surface/30 border border-surface hover:border-crimson/50" aria-label="Like" />
              <IconButton icon={ThumbsDown} variant="ghost" className="bg-surface/30 border border-surface hover:border-crimson/50" aria-label="Dislike" />
              <IconButton icon={Share2} variant="ghost" className="bg-surface/30 border border-surface hover:border-crimson/50" aria-label="Share" />
            </div>
          </div>

          {/* Synopsis */}
          <p className="font-body text-base md:text-lg text-text-muted leading-relaxed max-w-4xl mb-8">
            {data.synopsis}
          </p>

          {/* Expandable Warnings/Meta */}
          <div className="mb-12 border-t border-surface pt-4">
            <button 
              className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-text-bright transition-colors focus-visible:outline-none"
              onClick={() => setShowWarnings(!showWarnings)}
            >
              Content Info & Warnings {showWarnings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {showWarnings && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="py-4 space-y-2">
                    <p className="text-sm"><span className="text-text-muted">Director:</span> <span className="text-text-bright font-bold">{data.director}</span></p>
                    <p className="text-sm"><span className="text-text-muted">Languages:</span> <span className="text-text-bright font-bold">{data.languages?.join(', ')}</span></p>
                    {data.contentWarnings && data.contentWarnings.length > 0 && (
                      <div className="mt-4">
                        <span className="text-xs font-bold text-crimson uppercase tracking-wider">Content Warnings</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {data.contentWarnings.map(w => (
                            <span key={w} className="bg-crimson/10 text-crimson text-xs px-2 py-1 rounded">{w}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Inject Series Seasons/Episodes if passed */}
          {children && (
            <div className="mb-12">
              {children}
            </div>
          )}

          {/* Cast & Crew */}
          {data.cast && data.cast.length > 0 && (
            <div className="mb-12">
              <h3 className="font-display text-2xl text-text-bright font-bold mb-6">Cast</h3>
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {data.cast.map((person, idx) => (
                  <div key={idx} className="snap-start"><CastCard person={person} /></div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Content */}
          <div className="-mx-6 lg:-mx-12">
            <ContentRow 
              title="Similar Horrors" 
              items={similarItems?.slice(0, 8)}
              isLoading={similarLoading}
              renderItem={(item, isLdg) => <PosterCard data={item} isLoading={isLdg} />}
            />
          </div>

          <ReviewSection />

        </div>
      </div>
    </div>
  );
}
