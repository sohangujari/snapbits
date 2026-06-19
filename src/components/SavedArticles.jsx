import { useBookmarks } from '../hooks/useBookmarks';
import { Bookmark } from 'lucide-react';
import NewsCard from './NewsCard';

export default function SavedArticles() {
  const { bookmarks } = useBookmarks();

  if (bookmarks.length === 0) {
    return (
      <div className="h-screen-safe flex flex-col items-center justify-center bg-[#050505] text-white p-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
          <Bookmark size={36} className="text-gray-500" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold mb-3 tracking-wide">No saved articles yet</h2>
        <p className="text-gray-400 font-light leading-relaxed max-w-xs">
          Tap the bookmark icon on any news story to save it for later reading.
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen-safe bg-[#050505] overflow-y-auto pb-24">
      <div className="p-6 pt-20">
        <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">Saved News</h2>
        <div className="grid grid-cols-1 gap-6">
          {bookmarks.map((article) => (
            <div key={article.id} className="h-[400px] rounded-3xl overflow-hidden relative shadow-2xl shadow-black/50 border border-white/10">
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
