import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Search, Home, Bookmark } from 'lucide-react';
import NewsReel from './components/NewsReel';
import SavedArticles from './components/SavedArticles';

const CATEGORIES = ['All', 'General', 'Technology', 'Business', 'Sports', 'Health', 'Science', 'Entertainment'];
const COUNTRIES = [{code: 'All', name: 'Global'}, {code: 'US', name: 'USA'}, {code: 'IN', name: 'India'}, {code: 'GB', name: 'UK'}, {code: 'AU', name: 'Australia'}, {code: 'CA', name: 'Canada'}, {code: 'SG', name: 'Singapore'}];

function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' or 'saved'
  const [category, setCategory] = useState('All');
  const [country, setCountry] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setShowFilters(false);
  };

  return (
    <div className="flex justify-center bg-black min-h-screen font-sans">
      <div className="w-full max-w-[430px] h-screen-safe overflow-hidden relative shadow-2xl shadow-white/5">
        
        {/* Top Header */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/90 via-black/50 to-transparent p-5 flex justify-between items-center pointer-events-auto">
          <h1 className="text-2xl font-bold text-white tracking-widest text-logo drop-shadow-md">
            Snapbits
          </h1>
          {activeTab === 'home' && (
            <button 
              onClick={() => setShowFilters(true)}
              className="text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 shadow-lg transition-all"
            >
              <SlidersHorizontal size={20} />
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="h-full w-full bg-[#050505]">
          {activeTab === 'home' ? (
            <NewsReel 
              category={category} 
              country={country} 
              searchQuery={searchQuery} 
            />
          ) : (
            <SavedArticles />
          )}
        </div>

        {/* Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-t border-white/10 pb-safe pt-3 px-6 flex justify-around items-center h-[70px]">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Home size={24} fill={activeTab === 'home' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-semibold tracking-wider">HOME</span>
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'saved' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Bookmark size={24} fill={activeTab === 'saved' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-semibold tracking-wider">SAVED</span>
          </button>
        </div>

        {/* Animated Bottom Sheet for Filters */}
        <AnimatePresence>
          {showFilters && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)}
                className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
              />
              
              {/* Sheet */}
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-white/10 rounded-t-3xl p-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
              >
                <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-6 opacity-50" />
                
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search breaking news..." 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-5 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-light"
                    />
                    <button type="submit" className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors">
                      <Search size={22} />
                    </button>
                  </div>
                </form>

                <div className="mb-6">
                  <h3 className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-widest pl-1">Region</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {COUNTRIES.map(c => (
                      <button 
                        key={c.code}
                        onClick={() => { setCountry(c.code); setShowFilters(false); }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${country === c.code ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-widest pl-1">Category</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => { setCategory(cat); setShowFilters(false); }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}

export default App;