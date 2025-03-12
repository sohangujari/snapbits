import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function NewsCard({ article }) {
  const {
    title,
    summary,
    imageUrl,
    category,
    publishedAt,
    source,
    url
  } = article;

  const handleShare = async () => {
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

  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <motion.div 
      className="w-full h-full bg-black flex flex-col relative cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      onClick={handleClick}
    >
      {/* Full-height image with overlay */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col h-full justify-end p-6 text-white">
        {/* Category badge */}
        <div className="mb-4">
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {category}
          </span>
        </div>

        {/* Title and summary */}
        <h2 className="text-2xl font-bold mb-3 leading-tight text-white">
          {title}
        </h2>
        <p className="text-white/90 mb-6 line-clamp-3 text-base leading-relaxed">
          {summary}
        </p>

        {/* Source and time */}
        <div className="flex items-center justify-between text-sm text-white/70">
          <div className="flex items-center gap-2">
            <span className="font-medium">{source}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(publishedAt))} ago</span>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-4">
            <button 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Save for later"
            >
              <span className="material-icons text-white">bookmark_border</span>
            </button>
            <button 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={handleShare}
              aria-label="Share article"
            >
              <span className="material-icons text-white">share</span>
            </button>
          </div>
        </div>

        {/* Swipe indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <span className="material-icons text-white">keyboard_arrow_up</span>
        </div>
      </div>
    </motion.div>
  );
}