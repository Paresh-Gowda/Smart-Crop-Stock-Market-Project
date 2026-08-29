require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
const MANDI_API_URL =
  "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";
// --------------------
// Health Check
// --------------------
app.get("/api/health", (req, res) => {
  res.json({
    message: "Smart Crop Stock Market API is running",
  });
});
// --------------------
// Get Mandi Prices
// --------------------
app.get("/api/market-prices", async (req, res) => {
  try {
    const { state, district, market, commodity } = req.query;

    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const offset = Math.max(Number(req.query.offset) || 0, 0);
    const params = {
      "api-key": process.env.DATA_GOV_API_KEY,
      format: "json",
      limit,
      offset,
    };
    // Optional filters
    if (state) {
      params["filters[state.keyword]"] = state;
    }
    if (district) {
      params["filters[district]"] = district;
    }
    if (market) {
      params["filters[market]"] = market;
    }
    if (commodity) {
      params["filters[commodity]"] = commodity;
    }
    const response = await axios.get(MANDI_API_URL, {
      params,
    });
    const records = response.data.records || [];
    // Clean government response
    const cleanData = records.map((item) => ({
      state: item.state,
      district: item.district,
      market: item.market,
      commodity: item.commodity,
      variety: item.variety,
      grade: item.grade,
      arrivalDate: item.arrival_date,
      minPrice: item.min_price,
      maxPrice: item.max_price,
      modalPrice: item.modal_price,
    }));
    res.json({
      count: cleanData.length,
      limit: Number(limit),
      offset: Number(offset),
      data: cleanData,
    });
  } catch (error) {
    console.error("Mandi API Error:", error.message);
    res.status(500).json({
      message: "Failed to fetch mandi market prices",
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// --------------------
// Get Historical Prices
// --------------------
app.get("/api/market-history", async (req, res) => {
  try {
    const { commodity, market, state, limit = 30 } = req.query;
    if (!commodity) {
      return res.status(400).json({
        message: "Commodity is required",
      });
    }
    const params = {
      "api-key": process.env.DATA_GOV_API_KEY,
      format: "json",
      limit,
    };
    params["filters[commodity]"] = commodity;
    if (market) {
      params["filters[market]"] = market;
    }
    if (state) {
      params["filters[state.keyword]"] = state;
    }
    const response = await axios.get(MANDI_API_URL, {
      params,
    });
    const records = response.data.records || [];
    const history = records
      .map((item) => ({
        date: item.arrival_date,
        price: item.modal_price,
        minPrice: item.min_price,
        maxPrice: item.max_price,
        market: item.market,
      }))
      .sort((a, b) => {
        const dateA = a.date.split("/").reverse().join("-");
        const dateB = b.date.split("/").reverse().join("-");
        return new Date(dateA) - new Date(dateB);
      });
    res.json({
      commodity,
      market: market || "All Markets",
      count: history.length,
      history,
    });
  } catch (error) {
    console.error("Market History Error:", error.message);
    res.status(500).json({
      message: "Failed to fetch historical market data",
    });
  }
});
