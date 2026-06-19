const BASE_URL = '/api';

export async function fetchNews(params = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.pageSize) queryParams.append('pageSize', params.pageSize);
    else queryParams.append('pageSize', '10');

    if (params.category && params.category !== 'All') {
      queryParams.append('category', params.category.toLowerCase());
    }
    if (params.country && params.country !== 'All') {
      queryParams.append('country', params.country);
    }
    if (params.q) {
      queryParams.append('q', params.q);
    }

    const queryString = queryParams.toString();
    const url = `${BASE_URL}/news${queryString ? `?${queryString}` : ''}`;
    
    // Timeout logic
    const fetchPromise = async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    };

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 8000)
    );

    const data = await Promise.race([fetchPromise(), timeoutPromise]);
    const articles = data.articles;
    
    if (!articles || !Array.isArray(articles)) {
      return [];
    }
    
    return articles.map((article) => ({
      id: article.id || crypto.randomUUID(),
      title: article.title || 'No title available',
      summary: article.description || 'No description available',
      imageUrl: article.image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
      category: article.category || 'General',
      publishedAt: article.published_at || new Date().toISOString(),
      source: article.source || 'Unknown Source',
      url: article.url || '#'
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

export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Assuming the response is an array of strings like ["technology", "business"]
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCountries() {
  try {
    const response = await fetch(`${BASE_URL}/countries`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Assuming the response is an array of objects or strings
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
} 