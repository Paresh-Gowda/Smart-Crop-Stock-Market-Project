# 🌾 Smart Crop Stock Market

## 🔗 Live Demo
[View Project](https://crop-stock-market-paresh.onrender.com/)

Smart Crop Stock Market is a full-stack web application designed to help users explore agricultural commodities and understand current mandi prices across India. It provides an interactive platform where users can search and explore crops, view market information, analyze available prices, and maintain a personal watchlist of commodities they are interested in tracking.

The application is built with a React frontend and a Node.js/Express backend. It integrates with the Government of India's Open Government Data (data.gov.in) platform to retrieve official daily mandi price information, including commodity, variety, grade, state, district, market, arrival date, minimum price, maximum price, and modal price. The backend provides API endpoints that connect the government data source with the frontend while keeping API credentials protected through environment variables.

The current MVP includes crop exploration and search, state and commodity filtering, pagination, real mandi price data, market statistics, price visualization, and a persistent watchlist. The application has also been deployed online for testing and demonstration. Future improvements may include more comprehensive historical price analysis, weather and market-factor integration, price alerts, and additional features to make the platform more useful for farmers, traders, and agricultural market users.

## 📁 Project Structure

```
Smart-Crop-Stock-Market-Project/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   └── pages/
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```