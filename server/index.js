import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Data from "./models/dataModel.js"; // Import your data model
import scheduleCryptoDataFetch from "./scheduler/CryptoScheduler.js";
import scheduleStockDataFetch from "./scheduler/StockScheduler.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// ROUTES
app.get("/data/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const data = await Data.find({ symbol }).sort({ timestamp: -1 }).limit(20);
  res.json(data);
});

// SCHEDULERS
scheduleCryptoDataFetch();
scheduleStockDataFetch();

// MONGODB CONNECTION && SERVER START
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT} 🔨 `));
  })
  .catch((error) => console.log(`${error} did not connect`));
