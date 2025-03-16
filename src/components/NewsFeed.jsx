import { useState } from 'react';
import AdComponent from './AdComponent';

const NewsFeed = ({ newsItems }) => {
  // Function to insert ads into the news feed with 1:10 ratio
  const getContentWithAds = () => {
    const contentWithAds = [];
    
    newsItems.forEach((newsItem, index) => {
      // Add the news item
      contentWithAds.push(
        <div key={`news-${index}`} className="news-item">
          {/* Your existing news item component */}
          {newsItem}
        </div>
      );
      
      // Add an ad with 10% probability (1:10 ratio)
      if (Math.random() < 0.1) {
        contentWithAds.push(
          <div key={`ad-${index}`} className="ad-wrapper">
            <AdComponent />
          </div>
        );
      }
    });
    
    return contentWithAds;
  };

  return (
    <div className="news-feed">
      {getContentWithAds()}
    </div>
  );
};

export default NewsFeed; 