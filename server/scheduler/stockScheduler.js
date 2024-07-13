import fetchStockData from '../utils/fetchStockData.js';

const stockSymbols = ["GOOG", "AAPL", "MSFT", "AMZN", "TSLA"];

const scheduleStockDataFetch = () => {
  setInterval(() => {
    stockSymbols.forEach((symbol) => {
      fetchStockData(symbol);
    });
  }, 10000); // Fetch data every 10 seconds
};

export default scheduleStockDataFetch;
