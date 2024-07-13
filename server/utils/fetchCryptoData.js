import axios from "axios";
import Data from "../models/dataModel.js";

const fetchCryptoData = async (symbol) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
    );
    const price = response.data[symbol].usd;
    const newData = new Data({ symbol, price });
    await newData.save();
  } catch (error) {
    if (error.response && error.response.status === 429) {
      const retryAfter = error.response.headers["retry-after"] || 5; // Default to 5 seconds
      console.log(
        `coingecko API Rate limit exceeded. Retry after ${retryAfter} seconds...`
      );
    } else {
      console.error(`Error fetching crypto data for ${symbol}:`);
      throw error; // Propagate other errors
    }
  }
};

export default fetchCryptoData;
