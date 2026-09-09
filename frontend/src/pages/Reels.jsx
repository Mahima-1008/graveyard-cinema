import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReels } from '@/hooks/useReels';
import { Skeleton, IconButton, Button, Modal, EmptyState } from '@/components/common';
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

function ReelItem({ data, isActive, onCommentClick }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 1000);
    }
  };

  const handleDoubleTap = (e) => {
    e.preventDefault();
    if (!isLiked) handleLike();
  };

  return (
    <div className="relative w-full h-[100svh] snap-start bg-black overflow-hidden flex-shrink-0">
      
      {/* Background Image / Fake Video */}
      <motion.img 
        src={data.videoThumbUrl} 
        alt="Reel"
        onDoubleClick={handleDoubleTap}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: isActive ? 1.05 : 1 }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Gradients for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>

      {/* Floating Heart Burst Animation */}
      <AnimatePresence>
        {showHeartBurst && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1.5, y: -50 }}
            exit={{ opacity: 0, scale: 2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <Heart className="w-32 h-32 text-crimson fill-crimson drop-shadow-[0_0_30px_rgba(196,30,58,0.8)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Action Rail */}
      <div className="absolute right-4 bottom-24 z-10 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1 group">
          <button onClick={handleLike} className="p-3 bg-black/20 backdrop-blur-md rounded-full transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson">
            <Heart className={clsx("w-7 h-7 transition-colors", isLiked ? "fill-crimson text-crimson" : "text-white")} />
          </button>
          <span className="text-white text-xs font-bold drop-shadow-md">{data.likes || '12K'}</span>
        </div>

        <div className="flex flex-col items-center gap-1 group">
          <button onClick={onCommentClick} className="p-3 bg-black/20 backdrop-blur-md rounded-full transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson">
            <MessageCircle className="w-7 h-7 text-white" />
          </button>
          <span className="text-white text-xs font-bold drop-shadow-md">342</span>
        </div>

        <div className="flex flex-col items-center gap-1 group">
          <button className="p-3 bg-black/20 backdrop-blur-md rounded-full transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson">
            <Bookmark className={clsx("w-7 h-7 transition-colors", isSaved ? "fill-white text-white" : "text-white")} onClick={() => setIsSaved(!isSaved)} />
          </button>
          <span className="text-white text-xs font-bold drop-shadow-md">Save</span>
        </div>

        <div className="flex flex-col items-center gap-1 group">
          <button className="p-3 bg-black/20 backdrop-blur-md rounded-full transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson">
            <Share2 className="w-7 h-7 text-white" />
          </button>
          <span className="text-white text-xs font-bold drop-shadow-md">Share</span>
        </div>

        <div className="flex flex-col items-center gap-1 group mt-4">
          <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-black/20 backdrop-blur-md rounded-full transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson">
            {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Bottom Info Area */}
      <div className="absolute left-4 bottom-8 right-20 z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-surface">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.creator)}&background=151316&color=F5F5F5`} alt={data.creator} className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-bold drop-shadow-md">{data.creator}</span>
          <button className="px-3 py-1 bg-transparent border border-white text-white rounded-full text-xs font-bold hover:bg-white hover:text-black transition-colors focus-visible:outline-none">
            Follow
          </button>
        </div>

        <div className="text-white text-sm drop-shadow-md w-full">
          {showFullCaption ? (
            <p>{data.caption}</p>
          ) : (
            <p className="line-clamp-2">{data.caption}</p>
          )}
          {data.caption?.length > 80 && (
            <button 
              onClick={() => setShowFullCaption(!showFullCaption)}
              className="text-white/70 font-bold text-xs mt-1 hover:text-white focus-visible:outline-none"
            >
              {showFullCaption ? 'Less' : 'more'}
            </button>
          )}
        </div>
        
        {/* Mock audio track info */}
        <div className="flex items-center gap-2 mt-3 text-white/80 text-xs">
          <div className="w-3 h-3 rounded-full bg-white/20 animate-pulse"></div>
          <span className="marquee-text font-mono truncate max-w-[200px]">Original Audio - {data.creator}</span>
        </div>
      </div>
    </div>
  );
}

export default function Reels() {
  const { data: reels, isLoading } = useReels();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  // Intersection Observer to track active reel
  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.6, // Trigger when 60% of the reel is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          if (!isNaN(index)) setActiveIndex(index);
        }
      });
    }, observerOptions);

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [reels]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isCommentOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = Math.min(activeIndex + 1, reels?.length || 0);
        itemRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = Math.max(activeIndex - 1, 0);
        itemRefs.current[prevIndex]?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, reels, isCommentOpen]);

  if (isLoading) {
    return (
      <div className="w-full h-[100svh] bg-black flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (!reels || reels.length === 0) {
    return (
      <div className="w-full h-[100svh] bg-black flex items-center justify-center">
        <EmptyState 
          title="The feed is dead" 
          description="No nightmares to show right now." 
          actionLabel="Back Home" 
          onAction={() => navigate('/')} 
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[100svh] bg-black overflow-hidden">
      
      {/* Minimal Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <IconButton icon={ArrowLeft} variant="ghost" onClick={() => navigate(-1)} className="text-white bg-black/20 backdrop-blur-md" />
        </div>
        <h1 className="text-white font-display font-bold text-xl drop-shadow-md">Reels</h1>
        <div className="pointer-events-auto">
          <IconButton icon={MoreHorizontal} variant="ghost" className="text-white bg-black/20 backdrop-blur-md" />
        </div>
      </div>

      {/* Segmented Progress Bar */}
      <div className="absolute top-16 left-4 right-4 z-50 flex gap-1 h-1 pointer-events-none">
        {reels.map((_, idx) => (
          <div key={idx} className="flex-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={clsx(
                "h-full bg-white transition-all duration-300",
                idx < activeIndex ? "w-full" : idx === activeIndex ? "w-full" : "w-0" // Simplified active state
              )}
            ></div>
          </div>
        ))}
      </div>

      {/* Snap Scroll Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide scroll-smooth"
      >
        {reels.map((reel, index) => (
          <div 
            key={reel.id} 
            data-index={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className="w-full h-[100svh] snap-start"
          >
            <ReelItem 
              data={reel} 
              isActive={activeIndex === index} 
              onCommentClick={() => setIsCommentOpen(true)}
            />
          </div>
        ))}
        
        {/* End Card */}
        <div 
          data-index={reels.length}
          ref={(el) => (itemRefs.current[reels.length] = el)}
          className="w-full h-[100svh] snap-start bg-[#0A0A0B] flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="w-24 h-24 mb-6 rounded-full bg-surface flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-crimson border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="font-display text-3xl text-text-bright mb-2">You're all caught up</h2>
          <p className="text-text-muted mb-8 max-w-sm">You've seen all the trending nightmares. More terrors are brewing in the dark.</p>
          <Button onClick={() => {
            itemRefs.current[0]?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Back to Top
          </Button>
        </div>
      </div>

      {/* Comments Bottom Sheet / Modal */}
      <Modal 
        isOpen={isCommentOpen} 
        onClose={() => setIsCommentOpen(false)} 
        title="Comments"
      >
        <div className="flex flex-col h-[60vh] max-h-[500px]">
          <div className="flex-1 overflow-y-auto space-y-4 p-1 scrollbar-hide">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-surface shrink-0"></div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-sm text-text-bright">user_{i}</span>
                    <span className="text-xs text-text-muted">2h</span>
                  </div>
                  <p className="text-sm text-text-muted mt-1">This is genuinely terrifying. I can't look away!</p>
                  <button className="text-xs text-text-muted font-bold mt-1 hover:text-text-bright">Reply</button>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-surface mt-2 flex gap-2">
            <input 
              type="text" 
              placeholder="Add a comment..."
              className="flex-1 bg-surface border border-surface rounded-full px-4 text-sm text-text-bright focus:outline-none focus:border-crimson"
            />
            <Button size="sm">Post</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
