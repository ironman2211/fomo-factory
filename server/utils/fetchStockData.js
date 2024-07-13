import axios from 'axios';
import Data from '../models/dataModel.js'; // Import your data model

const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cq961chr01qnitifkjo0cq961chr01qnitifkjog`
    );
    const price = response.data.c; // 'c' is the current price
    const newData = new Data({ symbol, price });
    console.log(`Fetched stock data for ${symbol}:`, price);
    await newData.save();
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
  }
};

export default fetchStockData;
