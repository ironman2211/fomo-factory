import axios from 'axios';
import Data from '../models/dataModel.js'; 

const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cq961chr01qnitifkjo0cq961chr01qnitifkjog`
    );
    const price = response.data.c; 
    const newData = new Data({ symbol, price });
    await newData.save();
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`);
  }
};

export default fetchStockData;
