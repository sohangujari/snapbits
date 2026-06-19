import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Mousewheel } from 'swiper/modules';
import { SearchX } from 'lucide-react';
import NewsCard from './NewsCard';
import { fetchNews } from '../services/newsApi';
import 'swiper/css';

const SkeletonCard = () => (
  <div className="w-full h-screen-safe bg-black flex flex-col relative animate-pulse">
    <div className="absolute inset-0 bg-[#0a0a0a]" />
    <div className="relative z-10 flex flex-col h-full justify-end p-6 pb-24">
      <div className="w-24 h-6 bg-white/5 rounded-full mb-4" />
      <div className="w-full h-8 bg-white/5 rounded-lg mb-3" />
      <div className="w-3/4 h-8 bg-white/5 rounded-lg mb-3" />
      <div className="w-full h-4 bg-white/5 rounded mb-2" />
      <div className="w-full h-4 bg-white/5 rounded mb-2" />
      <div className="w-5/6 h-4 bg-white/5 rounded mb-6" />
      <div className="flex justify-between items-center mb-4">
        <div className="w-32 h-4 bg-white/5 rounded" />
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-white/5 rounded-full" />
          <div className="w-10 h-10 bg-white/5 rounded-full" />
        </div>
      </div>
      <div className="w-full h-12 bg-white/5 rounded-xl" />
    </div>
  </div>
);

export default function NewsReel({ category, country, searchQuery }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    loadInitialNews();
  }, [category, country, searchQuery]);

  const loadInitialNews = async () => {
    setLoading(true);
    const initialArticles = await fetchNews({ page: 1, category, country, q: searchQuery });
    setArticles(initialArticles);
    if (initialArticles.length < 10) setHasMore(false);
    setLoading(false);
  };

  const loadMoreNews = async () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    const moreArticles = await fetchNews({ page: nextPage, category, country, q: searchQuery });
    
    if (moreArticles.length === 0) {
      setHasMore(false);
      return;
    }

    setArticles(prev => {
      const newArticles = moreArticles.filter(a => !prev.some(p => p.id === a.id));
      return [...prev, ...newArticles];
    });
    setPage(nextPage);
    if (moreArticles.length < 10) setHasMore(false);
  };

  if (loading && articles.length === 0) {
    return <SkeletonCard />;
  }

  if (!loading && articles.length === 0) {
    return (
      <div className="h-screen-safe flex flex-col items-center justify-center bg-[#050505] text-white p-6 text-center pb-24">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
          <SearchX size={40} className="text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2 tracking-wide">No News Found</h2>
        <p className="text-gray-400 font-light max-w-xs">Try adjusting your region, category, or search query.</p>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Virtual, Mousewheel]}
      direction="vertical"
      slidesPerView={1}
      className="h-screen-safe"
      speed={500}
      spaceBetween={0}
      virtual
      mousewheel={{
        sensitivity: 1,
        thresholdDelta: 50
      }}
      watchSlidesProgress
      onReachEnd={loadMoreNews}
    >
      {articles.map((article, index) => (
        <SwiperSlide key={`${article.id}-${index}`} virtualIndex={index}>
          <NewsCard article={article} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}