import { useEffect, useState } from "react";
function Market() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/market-prices?limit=50`);
        if (!response.ok) {
          throw new Error("Failed to fetch market data");
        }
        const result = await response.json();
        setCrops(result.data || []);
      } catch (error) {
        console.error(error);
        setError("Unable to load market data.");
      } finally {
        setLoading(false);
      }
    };
    fetchMarketData();
  }, [API_URL]);
  if (loading) {
    return (
      <main className="market-page">
        <section className="page-header">
          <p>MARKET ANALYSIS</p>
          <h1>Market Overview 📊</h1>
          <span>Loading latest mandi data...</span>
        </section>
      </main>
    );
  }
  if (error) {
    return (
      <main className="market-page">
        <section className="page-header">
          <p>MARKET ANALYSIS</p>
          <h1>Market Overview 📊</h1>
          <span>{error}</span>
        </section>
      </main>
    );
  }
  if (crops.length === 0) {
    return (
      <main className="market-page">
        <section className="page-header">
          <p>MARKET ANALYSIS</p>
          <h1>Market Overview 📊</h1>
          <span>No market data available.</span>
        </section>
      </main>
    );
  }
  const averageModalPrice =
    crops.reduce((total, crop) => total + crop.modalPrice, 0) / crops.length;
  const highestPriceCrop = [...crops].sort(
    (a, b) => b.modalPrice - a.modalPrice,
  )[0];
  const lowestPriceCrop = [...crops].sort(
    (a, b) => a.modalPrice - b.modalPrice,
  )[0];
  return (
    <main className="market-page">
      <section className="page-header">
        <p>MARKET ANALYSIS</p>
        <h1>Market Overview 📊</h1>
        <span>Track current agricultural mandi prices across India</span>
      </section>
      <section className="market-stats">
        <div className="market-stat-card">
          <p>Average Modal Price</p>
          <h2>₹{Math.round(averageModalPrice)}</h2>
          <span>Based on {crops.length} mandi records</span>
        </div>
        <div className="market-stat-card">
          <p>Highest Modal Price</p>
          <h2>{highestPriceCrop.commodity}</h2>
          <span className="positive">₹{highestPriceCrop.modalPrice}</span>
          <small>
            {highestPriceCrop.market}, {highestPriceCrop.state}
          </small>
        </div>
        <div className="market-stat-card">
          <p>Lowest Modal Price</p>
          <h2>{lowestPriceCrop.commodity}</h2>
          <span className="negative">₹{lowestPriceCrop.modalPrice}</span>
          <small>
            {lowestPriceCrop.market}, {lowestPriceCrop.state}
          </small>
        </div>
      </section>
      <section className="market-summary">
        <h2>Today's Market Summary</h2>
        <p>
          The market overview is based on the latest government mandi price
          records. Prices shown represent the modal price reported by individual
          agricultural markets.
        </p>
      </section>
    </main>
  );
}
export default Market;
