function CropCard({ crop, onClick }) {
  return (
    <div className="crop-card" onClick={onClick} role="button" tabIndex="0">
      <div className="crop-card-top">
        <h3>{crop.name}</h3>
        <span>{crop.symbol}</span>
      </div>
      <h2>₹{crop.price}</h2>
      <p className={crop.percentage >= 0 ? "positive" : "negative"}>
        {crop.percentage >= 0 ? "+" : ""}
        {crop.percentage}%
      </p>
    </div>
  );
}
export default CropCard;
