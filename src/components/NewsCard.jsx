import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useBookmarks } from '../hooks/useBookmarks';
import { Bookmark, Share2, ChevronUp } from 'lucide-react';

export default function NewsCard({ article }) {
  const {
    id,
    title,
    summary,
    imageUrl,
    category,
    publishedAt,
    source,
    url
  } = article;

  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(id);

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: summary,
          url: url
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const toggleBookmark = (e) => {
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(id);
    } else {
      addBookmark(article);
    }
  };

  return (
    <motion.div 
      className="w-full h-full bg-black flex flex-col relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      {/* Full-height image with improved overlay */}
      <div className="absolute inset-0 z-0">
        <LazyLoadImage
          src={imageUrl}
          alt={title}
          effect="blur"
          className="w-full h-full object-cover"
          wrapperClassName="w-full h-full"
          placeholder={
            <div className="w-full h-full bg-gray-900 animate-pulse" />
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col h-full justify-end p-6 text-white pb-24">
        
        {/* Category badge */}
        <div className="mb-4">
          <span className="bg-white/20 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-lg inline-block">
            {category}
          </span>
        </div>

        {/* Title and summary */}
        <h2 className="text-3xl font-bold mb-3 leading-tight text-white drop-shadow-md">
          {title}
        </h2>
        <p className="text-white/80 mb-6 line-clamp-3 text-base leading-relaxed font-light drop-shadow-sm">
          {summary}
        </p>

        {/* Source, time, and actions */}
        <div className="flex items-center justify-between text-sm text-white/70 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white/90">{source}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(publishedAt))} ago</span>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3">
            <button 
              className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
              onClick={toggleBookmark}
              aria-label="Save for later"
            >
              <Bookmark size={20} className="text-white drop-shadow-md" fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
            <button 
              className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
              onClick={handleShare}
              aria-label="Share article"
            >
              <Share2 size={20} className="text-white drop-shadow-md" />
            </button>
          </div>
        </div>

        {/* Read Full Story Button */}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full block text-center py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl font-semibold text-white border border-white/10 shadow-lg transition-all"
        >
          Read Full Story
        </a>

        {/* Swipe indicator */}
        <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 animate-bounce opacity-40 pointer-events-none hidden md:block">
          <ChevronUp size={28} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}