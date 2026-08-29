import { useEffect, useState } from "react";
function CropCard({ crop, onClick }) {
  const [isWatched, setIsWatched] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("cropWatchlist");
    if (saved) {
      const watchlist = JSON.parse(saved);
      setIsWatched(watchlist.some((item) => item.id === crop.id));
    }
  }, [crop.id]);
  const toggleWatchlist = (event) => {
    event.stopPropagation();
    const saved = localStorage.getItem("cropWatchlist");
    const watchlist = saved ? JSON.parse(saved) : [];
    const alreadyExists = watchlist.some((item) => item.id === crop.id);
    let updatedWatchlist;
    if (alreadyExists) {
      updatedWatchlist = watchlist.filter((item) => item.id !== crop.id);
    } else {
      updatedWatchlist = [...watchlist, crop];
    }
    localStorage.setItem("cropWatchlist", JSON.stringify(updatedWatchlist));
    setIsWatched(!alreadyExists);
  };
  return (
    <div className="crop-card" onClick={onClick} role="button" tabIndex="0">
      <button
        className={`watch-button ${isWatched ? "watched" : ""}`}
        onClick={toggleWatchlist}
      >
        {isWatched ? "★" : "☆"}
      </button>
      <div className="crop-card-top">
        <div>
          <h3>{crop.name}</h3>
          <span>{crop.symbol}</span>
        </div>
      </div>
      <p className="price-label">Modal Price</p>
      <h2>₹{crop.price}</h2>
      <div className="price-range">
        <span>
          Min <strong>₹{crop.minPrice}</strong>
        </span>
        <span>
          Max <strong>₹{crop.maxPrice}</strong>
        </span>
      </div>
    </div>
  );
}
export default CropCard;
