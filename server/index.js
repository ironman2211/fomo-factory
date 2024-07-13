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

// ROUTES
app.get("/data/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const data = await Data.find({ symbol }).sort({ timestamp: -1 }).limit(20);
  res.json(data);
});
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: 💻", err);
  });

// SCHEDULERS
scheduleCryptoDataFetch();
scheduleStockDataFetch();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔨`);
});
