import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Mousewheel } from 'swiper/modules';
import NewsCard from './NewsCard';
import { getTopNews } from '../services/newsApi';
import 'swiper/css';
import AdComponent from './AdComponent';

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

  // Function to determine if we should show an ad
  const shouldShowAd = (index) => {
    return (index + 1) % 10 === 0 && Math.floor(index / 10) < 3;
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
      {articles.map((article, index) => (
        <div key={`news-container-${index}`}>
          <SwiperSlide key={`news-${index}`}>
            <NewsCard article={article} />
          </SwiperSlide>
          
          {shouldShowAd(index) && (
            <SwiperSlide key={`ad-wrapper-${index}`}>
              <AdComponent />
            </SwiperSlide>
          )}
        </div>
      ))}
    </Swiper>
  );
}