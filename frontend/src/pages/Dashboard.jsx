import { useEffect, useState } from "react";
import CropCard from "../components/CropCard";
import PriceChart from "../components/PriceChart";
import MarketMovers from "../components/MarketMovers";
import MarketFactors from "../components/MarketFactors";
const API_URL = process.env.REACT_APP_API_URL;
function Dashboard() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch(`${API_URL}/api/market-prices?limit=12`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch market data");
        }
        return response.json();
      })
      .then((result) => {
        setCrops(result.data || []);

        if (result.data && result.data.length > 0) {
          setSelectedCrop(result.data[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load market data.");
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <main className="dashboard">
        <h2>Loading market data... 🌾</h2>
      </main>
    );
  }
  if (error) {
    return (
      <main className="dashboard">
        <h2>{error}</h2>
      </main>
    );
  }
  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <div>
          <p>AGRICULTURAL COMMODITY MARKET</p>
          <h1>Crop Market Dashboard 🌾</h1>
          <span>Latest government mandi prices</span>
        </div>
        <div className="market-status">
          <span className="status-dot"></span>
          Mandi Data
        </div>
      </section>
      <section className="crop-grid">
        {crops.map((crop, index) => (
          <CropCard
            key={`${crop.market}-${crop.commodity}-${index}`}
            crop={{
              id: index,
              name: crop.commodity,
              symbol: crop.variety,
              price: crop.modalPrice,
              minPrice: crop.minPrice,
              maxPrice: crop.maxPrice,
            }}
            onClick={() => setSelectedCrop(crop)}
          />
        ))}
      </section>
      {selectedCrop && (
        <PriceChart
          crop={{
            name: selectedCrop.commodity,
            price: selectedCrop.modalPrice,
            market: selectedCrop.market,
            state: selectedCrop.state,
          }}
        />
      )}
      <MarketMovers />
      <MarketFactors />
    </main>
  );
}
export default Dashboard;
