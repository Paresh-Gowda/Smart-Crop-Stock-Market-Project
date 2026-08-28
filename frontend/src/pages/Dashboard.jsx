import { useState } from "react";
import cropData from "../data/cropData";
import CropCard from "../components/CropCard";
import PriceChart from "../components/PriceChart";
import MarketMovers from "../components/MarketMovers";
import MarketFactors from "../components/MarketFactors";
function Dashboard() {
  const [selectedCrop, setSelectedCrop] = useState(cropData[0]);
  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <div>
          <p>AGRICULTURAL COMMODITY MARKET</p>
          <h1>Crop Market Dashboard 🌾</h1>
          <span>Track crop prices and market movements</span>
        </div>
        <div className="market-status">
          <span className="status-dot"></span>
          Market Open
        </div>
      </section>
      <section className="crop-grid">
        {cropData.map((crop) => (
          <CropCard
            key={crop.id}
            crop={crop}
            onClick={() => setSelectedCrop(crop)}
          />
        ))}
      </section>
      <PriceChart crop={selectedCrop} />
      <MarketMovers />
      <MarketFactors />
    </main>
  );
}
export default Dashboard;
