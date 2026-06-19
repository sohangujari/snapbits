import { useState } from 'react';
import NewsReel from './components/NewsReel';

const CATEGORIES = ['All', 'General', 'Technology', 'Business', 'Sports', 'Health', 'Science', 'Entertainment'];
const COUNTRIES = [{code: 'All', name: 'Global'}, {code: 'US', name: 'USA'}, {code: 'IN', name: 'India'}, {code: 'GB', name: 'UK'}, {code: 'AU', name: 'Australia'}, {code: 'CA', name: 'Canada'}, {code: 'SG', name: 'Singapore'}];

function App() {
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
    <div className="flex justify-center bg-black min-h-screen">
      <div className="w-full max-w-[430px] h-screen-safe overflow-hidden relative">
        
        {/* Top Header */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-center pointer-events-auto">
          <h1 className="text-2xl font-bold text-white tracking-wider text-logo pointer-events-auto">
            Snapbits
          </h1>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="text-white p-2 rounded-full hover:bg-white/10"
          >
            <span className="material-icons">{showFilters ? 'close' : 'filter_list'}</span>
          </button>
        </div>

        {/* Filters Overlay */}
        {showFilters && (
          <div className="absolute top-16 left-0 right-0 z-30 bg-black/95 backdrop-blur-md p-4 border-b border-gray-800 animate-fade-in max-h-[80vh] overflow-y-auto pointer-events-auto">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search news..." 
                  className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                />
                <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-white">
                  <span className="material-icons text-[20px]">search</span>
                </button>
              </div>
            </form>

            <div className="mb-4">
              <h3 className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wider">Country</h3>
              <div className="flex flex-wrap gap-2">
                {COUNTRIES.map(c => (
                  <button 
                    key={c.code}
                    onClick={() => { setCountry(c.code); setShowFilters(false); }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${country === c.code ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wider">Category</h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setCategory(cat); setShowFilters(false); }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Swipeable Reel */}
        <NewsReel 
          category={category} 
          country={country} 
          searchQuery={searchQuery} 
        />
        
      </div>
    </div>
  );
}

export default App;