const IEX_CLOUD_API_KEY = 'pk_3af404fd17e1494680a168c86adb9db9';

const fetchStockData = async () => {
  try {
    const response = await fetch(`https://cloud.iexapis.com/v1/ref-data/symbols?token=${IEX_CLOUD_API_KEY}`);
    const data = await response.json();

    // Sort the data based on the latestPrice in descending order
    const sortedData = data.sort((a, b) => b.latestPrice - a.latestPrice);

    // Return only the top 100 stocks
    return sortedData.slice(0, 100);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

const fetchStockDetail = async (symbol) => {
  try {
    const response = await fetch(`https://cloud.iexapis.com/v1/stock/${symbol}/quote?token=${IEX_CLOUD_API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock details:', error);
    throw error;
  }
};

const fetchHistoricalData = async (symbol) => {
  try {
    const response = await fetch(
      `https://cloud.iexapis.com/v1/stock/${symbol}/chart/1m?token=${IEX_CLOUD_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch historical data');
    }

    const historicalData = await response.json();
    const formattedData = historicalData.map((data) => ({
      date: data.date,
      close: data.close,
    }));

    return formattedData;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

export { fetchStockData, fetchStockDetail, fetchHistoricalData };
