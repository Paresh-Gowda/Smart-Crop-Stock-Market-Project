import { useState } from "react";
import cropData from "../data/cropData";
import CropCard from "../components/CropCard";
import SearchBar from "../components/SearchBar";
function Crops() {
  const [search, setSearch] = useState("");
  const filteredCrops = cropData.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <main className="crops-page">
      <section className="page-header">
        <p>AGRICULTURAL MARKET</p>
        <h1>Explore Crops 🌾</h1>
        <span>Search and track agricultural commodities</span>
      </section>
      <SearchBar search={search} setSearch={setSearch} />
      <section className="crop-grid">
        {filteredCrops.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </section>
    </main>
  );
}
export default Crops;
