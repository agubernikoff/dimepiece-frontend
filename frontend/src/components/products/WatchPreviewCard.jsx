import React from "react";

function WatchPreviewCard({ watch }) {
  console.log(watch)
  const options = {style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0}
  return (
    <div className="watch-preview-card">
      <img src={watch.store.previewImageUrl} alt={watch.title} />
      <p>{watch.brand.toUpperCase()}</p>
      <p>{watch.title}</p>
      <p>{watch.store.priceRange.maxVariantPrice.toLocaleString('en-US',options)}</p>
    </div>
  );
}

export default WatchPreviewCard;
