import axios from "axios";
import Data from "../models/dataModel.js";

const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cq961chr01qnitifkjo0cq961chr01qnitifkjog`
    );
    const price = response.data.c;
    const newData = new Data({ symbol, price });
    await newData.save();
  } catch (error) {
    if (error.response && error.response.status === 429) {
      const retryAfter = error.response.headers["retry-after"] || 5; // Default to 5 seconds
      console.log(
        `finnhub API Rate limit exceeded. Retry after ${retryAfter} seconds...`
      );
    } else {
      console.error(`Error fetching stock data for ${symbol}:`);
      throw error; // Propagate other errors
    }
  }
};

export default fetchStockData;
