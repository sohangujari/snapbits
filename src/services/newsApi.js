const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export async function getTopNews(page = 1) {
  try {
    if (!API_KEY) {
      throw new Error('NewsAPI key is not configured');
    }

    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&pageSize=10&page=${page}`,
      {
        headers: {
          'X-Api-Key': API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.articles) {
      throw new Error('No articles found in response');
    }
    
    // Transform the API response to match our article structure
    return data.articles.map((article, index) => ({
      id: `${page}-${index}`,
      title: article.title || 'No title available',
      summary: article.description || 'No description available',
      imageUrl: article.urlToImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
      category: article.source?.name || 'General',
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: article.source?.name || 'Unknown Source',
      url: article.url || '#'
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return mock data in case of error
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