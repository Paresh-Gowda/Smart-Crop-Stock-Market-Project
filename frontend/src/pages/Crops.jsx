import { useEffect, useState } from "react";
import CropCard from "../components/CropCard";
import SearchBar from "../components/SearchBar";
const API_URL = process.env.REACT_APP_API_URL;
function Crops() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [commodity, setCommodity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 12;
  useEffect(() => {
    const fetchCrops = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("offset", offset);
        if (state) {
          params.append("state", state);
        }
        if (commodity) {
          params.append("commodity", commodity);
        }
        const response = await fetch(
          `${API_URL}/api/market-prices?${params.toString()}`,
        );
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
    fetchCrops();
  }, [state, commodity, offset]);
  const filteredCrops = crops.filter((crop) =>
    crop.commodity.toLowerCase().includes(search.toLowerCase()),
  );
  const handleStateChange = (event) => {
    setState(event.target.value);
    setOffset(0);
  };
  const handleCommodityChange = (event) => {
    setCommodity(event.target.value);
    setOffset(0);
  };
  const nextPage = () => {
    setOffset(offset + limit);
  };
  const previousPage = () => {
    setOffset(Math.max(0, offset - limit));
  };
  return (
    <main className="crops-page">
      <section className="page-header">
        <p>LIVE MANDI DATA</p>
        <h1>Explore Crops 🌾</h1>
        <span>Government mandi prices from markets across India</span>
      </section>
      <SearchBar search={search} setSearch={setSearch} />
      <section className="crop-filters">
        <select value={state} onChange={handleStateChange}>
          <option value="">All States</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
        </select>
        <select value={commodity} onChange={handleCommodityChange}>
          <option value="">All Commodities</option>
          <option value="Wheat">Wheat</option>
          <option value="Rice">Rice</option>
          <option value="Paddy(Common)">Paddy</option>
          <option value="Cotton">Cotton</option>
          <option value="Maize">Maize</option>
          <option value="Onion">Onion</option>
          <option value="Potato">Potato</option>
        </select>
      </section>
      {loading && <p className="loading-message">Loading mandi prices...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <>
          <section className="crop-grid">
            {filteredCrops.map((crop, index) => (
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
              />
            ))}
          </section>
          {filteredCrops.length === 0 && (
            <p className="empty-message">No crops found.</p>
          )}
          <div className="pagination">
            <button onClick={previousPage} disabled={offset === 0}>
              ← Previous
            </button>
            <span>Page {offset / limit + 1}</span>
            <button onClick={nextPage} disabled={crops.length < limit}>
              Next →
            </button>
          </div>
        </>
      )}
    </main>
  );
}
export default Crops;
