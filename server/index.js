import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Data from "./models/dataModel.js"; // Import your data model
import scheduleCryptoDataFetch from "./scheduler/CryptoScheduler.js";
import scheduleStockDataFetch from "./scheduler/StockScheduler.js";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/real-time-data";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ROUTES
app.get("/data/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const data = await Data.find({ symbol }).sort({ timestamp: -1 }).limit(20);
  res.json(data);
});

// SCHEDULERS
scheduleCryptoDataFetch();
scheduleStockDataFetch();

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
