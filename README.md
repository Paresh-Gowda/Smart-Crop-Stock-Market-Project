# 🌾 Smart Crop Stock Market

Smart Crop Stock Market is a full-stack web application built to help users explore agricultural commodities and understand mandi prices across India. The application provides a simple and interactive interface to search and explore crops, view market information, analyze prices, and maintain a personal crop watchlist.

The frontend is built using React, React Router, Recharts, and CSS, while the backend is powered by Node.js and Express. The application is integrated with the Government of India's Open Government Data (data.gov.in) platform to fetch official daily mandi price data, including minimum price, maximum price, modal price, market, state, district, variety, and grade.

The current version includes the React frontend, Node.js backend, government mandi API integration, crop search, state and commodity filters, pagination, market analysis, price visualization, and a persistent watchlist. The project is currently developed as an MVP, with further improvements such as advanced historical analysis, weather integration, price alerts, and deployment planned for future updates.

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