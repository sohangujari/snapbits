// const BASE_URL = 'http://localhost:8000'; //Local
const BASE_URL = 'https://snapbits-backend.vercel.app'; //Production (removed trailing slash)

export async function getTopNews(page = 1) {
  try {
    // Cache the fetch promise to avoid multiple requests
    const fetchNews = async () => {
      const response = await fetch(`${BASE_URL}/news?days=7`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    };

    // Use Promise.race to timeout long requests
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 5000)
    );

    const articles = await Promise.race([fetchNews(), timeoutPromise]);
    
    if (!articles || !Array.isArray(articles)) {
      return [];
    }

    // Articles are already sorted by published_at DESC from the backend
    // Map them efficiently with a single pass
    return articles.map((article) => ({
      id: article.id || crypto.randomUUID(), // More efficient unique ID generation
      title: article.title || 'No title available',
      summary: article.description || 'No description available',
      imageUrl: article.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
      category: article.category || 'General',
      publishedAt: article.published_at || new Date().toISOString(),
      source: article.source_name || 'Unknown Source',
      url: article.source_url || '#'
    }));

  } catch (error) {
    console.error('Error fetching news:', error);
    return [{
      id: crypto.randomUUID(),
      title: 'Unable to load news',
      summary: error.message || 'Please check your connection or try again later.',
      imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
      category: 'Error',
      publishedAt: new Date().toISOString(),
      source: 'System',
      url: '#'
    }];
  }
}

// Add a memoized version for components that need to avoid unnecessary refetches
export const getMemoizedNews = (() => {
  let cache = {
    data: null,
    timestamp: 0
  };
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  return async () => {
    const now = Date.now();
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
      return cache.data;
    }

    const freshData = await getTopNews();
    cache = {
      data: freshData,
      timestamp: now
    };
    return freshData;
  };
})();

export async function getNewsByCategory(category, page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/news?category=${category}&days=1`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const articles = await response.json();
    
    if (!articles || articles.length === 0) {
      throw new Error('No articles found in response');
    }
    
    // Transform the backend response to match our article structure
    return articles.map((article, index) => ({
      id: `${page}-${index}`,
      title: article.title || 'No title available',
      summary: article.description || 'No description available',
      imageUrl: article.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
      category: article.category || 'General',
      publishedAt: article.published_at || new Date().toISOString(),
      source: article.source_name || 'Unknown Source',
      url: article.source_url || '#'
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [
      {
        id: '1-1',
        title: 'Unable to load news',
        summary: 'Please check your API key configuration or try again later.',
        imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
        category: 'Error',
        publishedAt: new Date().toISOString(),
        source: 'System',
        url: '#'
      }
    ];
  }
}

export async function getNewsBySource(source, page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/news?source=${source}&days=1`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const articles = await response.json();
    
    if (!articles || articles.length === 0) {
      throw new Error('No articles found in response');
    }
    
    // Transform the backend response to match our article structure
    return articles.map((article, index) => ({
      id: `${page}-${index}`,
      title: article.title || 'No title available',
      summary: article.description || 'No description available',
      imageUrl: article.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
      category: article.category || 'General',
      publishedAt: article.published_at || new Date().toISOString(),
      source: article.source_name || 'Unknown Source',
      url: article.source_url || '#'
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [
      {
        id: '1-1',
        title: 'Unable to load news',
        summary: 'Please check your API key configuration or try again later.',
        imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
        category: 'Error',
        publishedAt: new Date().toISOString(),
        source: 'System',
        url: '#'
      }
    ];
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getSources() {
  try {
    const response = await fetch(`${BASE_URL}/sources`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.sources;
  } catch (error) {
    console.error('Error fetching sources:', error);
    return [];
  }
} 