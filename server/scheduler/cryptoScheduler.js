import fetchCryptoData from '../utils/fetchCryptoData.js';

const cryptoSymbols = ["bitcoin", "ethereum", "litecoin", "ripple", "dogecoin"];

const scheduleCryptoDataFetch = () => {
  setInterval(() => {
    cryptoSymbols.forEach((symbol) => {
      fetchCryptoData(symbol);
    });
  }, 5000); // Fetch data every 5 seconds
};

export default scheduleCryptoDataFetch;
