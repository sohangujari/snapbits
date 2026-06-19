import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks on mount
  useEffect(() => {
    const saved = localStorage.getItem('snapbits_bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse bookmarks', e);
      }
    }
  }, []);

  // Save bookmark
  const addBookmark = (article) => {
    setBookmarks(prev => {
      // Prevent duplicates
      if (prev.some(b => b.id === article.id)) return prev;
      const updated = [article, ...prev];
      localStorage.setItem('snapbits_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // Remove bookmark
  const removeBookmark = (articleId) => {
    setBookmarks(prev => {
      const updated = prev.filter(b => b.id !== articleId);
      localStorage.setItem('snapbits_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // Check if bookmarked
  const isBookmarked = (articleId) => {
    return bookmarks.some(b => b.id === articleId);
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
}
