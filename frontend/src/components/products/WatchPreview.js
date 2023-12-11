import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import WatchPreviewCard from "./WatchPreviewCard";

function WatchPreview() {
  const products = useSelector((state) => state.cart.watches);
  const mapped = products.map((product) => (
    <WatchPreviewCard key={product._id} watch={product} />
  ));
  return (
    <div className="latest-watches">
      <p className="section-title-home">LATEST WATCHES</p>
      <div className="watch-preview-container">{mapped}</div>
    </div>
  );
}

export default WatchPreview;
