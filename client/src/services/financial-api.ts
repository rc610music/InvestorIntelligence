// Client-side wrapper for financial API calls
export class FinancialAPIClient {
  
  static async getQuote(symbol: string) {
    try {
      const response = await fetch(`/api/market/quote/${symbol}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch quote for ${symbol}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching quote:', error);
      throw error;
    }
  }

  static async getMarketMovers() {
    try {
      const response = await fetch('/api/market/movers');
      if (!response.ok) {
        throw new Error('Failed to fetch market movers');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching market movers:', error);
      throw error;
    }
  }

  static async getNews() {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  static async getEconomicEvents() {
    try {
      const response = await fetch('/api/calendar/events');
      if (!response.ok) {
        throw new Error('Failed to fetch economic events');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching economic events:', error);
      throw error;
    }
  }

  static async getOptionsPlays() {
    try {
      const response = await fetch('/api/options/plays');
      if (!response.ok) {
        throw new Error('Failed to fetch options plays');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching options plays:', error);
      throw error;
    }
  }
}
