import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Mousewheel } from 'swiper/modules';
import NewsCard from './NewsCard';
import { getTopNews } from '../services/newsApi';
import 'swiper/css';

export default function NewsReel() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadInitialNews();
  }, []);

  const loadInitialNews = async () => {
    setLoading(true);
    const initialArticles = await getTopNews(1);
    setArticles(initialArticles);
    setLoading(false);
  };

  const loadMoreNews = async () => {
    const nextPage = page + 1;
    const moreArticles = await getTopNews(nextPage);
    setArticles(prev => [...prev, ...moreArticles]);
    setPage(nextPage);
  };

  if (loading) {
    return (
      <div className="h-screen-safe flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
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
      {articles.map((article) => (
        <SwiperSlide key={article.id}>
          <NewsCard article={article} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}