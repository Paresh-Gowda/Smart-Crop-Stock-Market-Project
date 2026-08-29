import { useEffect, useState } from "react";
function MarketMovers() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
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
        console.error("Market movers error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarketData();
  }, [API_URL]);
  if (loading) {
    return (
      <section className="market-movers">
        <div className="movers-box">
          <h2>🔥 Highest Mandi Prices</h2>
          <p>Loading...</p>
        </div>
        <div className="movers-box">
          <h2>📉 Lowest Mandi Prices</h2>
          <p>Loading...</p>
        </div>
      </section>
    );
  }
  const highestPrices = [...crops]
    .sort((a, b) => b.modalPrice - a.modalPrice)
    .slice(0, 3);
  const lowestPrices = [...crops]
    .sort((a, b) => a.modalPrice - b.modalPrice)
    .slice(0, 3);
  return (
    <section className="market-movers">
      <div className="movers-box">
        <h2>🔥 Highest Mandi Prices</h2>
        {highestPrices.map((crop, index) => (
          <div
            className="mover-item"
            key={`${crop.market}-${crop.commodity}-${index}`}
          >
            <div>
              <span>{crop.commodity}</span>
              <small>
                {crop.market}, {crop.state}
              </small>
            </div>

            <strong className="positive">₹{crop.modalPrice}</strong>
          </div>
        ))}
      </div>
      <div className="movers-box">
        <h2>📉 Lowest Mandi Prices</h2>
        {lowestPrices.map((crop, index) => (
          <div
            className="mover-item"
            key={`${crop.market}-${crop.commodity}-${index}`}
          >
            <div>
              <span>{crop.commodity}</span>
              <small>
                {crop.market}, {crop.state}
              </small>
            </div>

            <strong className="negative">₹{crop.modalPrice}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
export default MarketMovers;
