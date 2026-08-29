import { useEffect, useState } from "react";
import CropCard from "../components/CropCard";
import SearchBar from "../components/SearchBar";
function Crops() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/api/market-prices")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch market data");
        }
        return response.json();
      })
      .then((result) => {
        setCrops(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load market data.");
        setLoading(false);
      });
  }, []);
  const filteredCrops = crops.filter((crop) =>
    crop.commodity.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <main className="crops-page">
      <section className="page-header">
        <p>LIVE MANDI DATA</p>
        <h1>Explore Crops 🌾</h1>
        <span>Government mandi prices from markets across India</span>
      </section>
      <SearchBar search={search} setSearch={setSearch} />
      {loading && <p>Loading market data...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <section className="crop-grid">
          {filteredCrops.map((crop, index) => (
            <CropCard
              key={`${crop.market}-${crop.commodity}-${index}`}
              crop={{
                id: index,
                name: crop.commodity,
                symbol: crop.variety,
                price: crop.modalPrice,
                percentage: 0,
              }}
            />
          ))}
        </section>
      )}
      {!loading && !error && filteredCrops.length === 0 && (
        <p>No crops found.</p>
      )}
    </main>
  );
}
export default Crops;
