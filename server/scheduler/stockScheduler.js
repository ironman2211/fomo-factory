import fetchStockData from '../utils/fetchStockData.js';

const stockSymbols = ["GOOG", "AAPL", "MSFT", "AMZN", "TSLA"];

const scheduleStockDataFetch = () => {
  setInterval(() => {
    stockSymbols.forEach((symbol) => {
      fetchStockData(symbol);
    });
  }, 5000); // Fetch data every 5 seconds
};

export default scheduleStockDataFetch;
