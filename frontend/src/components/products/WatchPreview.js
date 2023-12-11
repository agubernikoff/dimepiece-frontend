import React from "react";
import { useSelector } from "react-redux";
import WatchPreviewCard from "./WatchPreviewCard";

function WatchPreview() {
  const products = useSelector((state) => state.cart.watches);
  const endOfSlice = products.length < 10 ? 5 : 10;
  const mapped = [...products]
    .slice(0, endOfSlice)
    .map((product) => <WatchPreviewCard key={product._id} watch={product} />);
  return (
    <div className="latest-watches">
      <p className="section-title-home">LATEST WATCHES</p>
      <div className="watch-preview-container">{mapped}</div>
    </div>
  );
}

export default WatchPreview;
