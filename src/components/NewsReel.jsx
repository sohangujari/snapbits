import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Mousewheel } from 'swiper/modules';
import NewsCard from './NewsCard';
import { fetchNews } from '../services/newsApi';
import 'swiper/css';

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
    return (
      <div className="h-screen-safe flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!loading && articles.length === 0) {
    return (
      <div className="h-screen-safe flex flex-col items-center justify-center bg-black text-white p-6 text-center">
        <span className="material-icons text-5xl text-gray-500 mb-4">search_off</span>
        <h2 className="text-xl font-bold mb-2">No News Found</h2>
        <p className="text-gray-400">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Virtual, Mousewheel]}
      direction="vertical"
      slidesPerView={1}
      className="h-screen-safe"
      speed={700}
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