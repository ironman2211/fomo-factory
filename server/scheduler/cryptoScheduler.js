import fetchCryptoData from '../utils/fetchCryptoData.js';

const cryptoSymbols = ["bitcoin", "ethereum", "litecoin", "ripple", "dogecoin"];

const scheduleCryptoDataFetch = () => {
  setInterval(() => {
    cryptoSymbols.forEach((symbol) => {
      fetchCryptoData(symbol);
    });
  }, 10000); // Fetch data every 10 seconds
};

export default scheduleCryptoDataFetch;
