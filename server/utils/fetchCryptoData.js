import axios from 'axios';
import Data from '../models/dataModel.js'; // Import your data model

const fetchCryptoData = async (symbol) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
    );
    const price = response.data[symbol].usd;
    const newData = new Data({ symbol, price });
    console.log(`Fetched crypto data for ${symbol}:`, price);
    await newData.save();
  } catch (error) {
    console.error(`Error fetching crypto data for ${symbol}:`, error);
  }
};

export default fetchCryptoData;
